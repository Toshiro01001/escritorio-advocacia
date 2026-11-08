/* Testes do site Albuquerque Prado Advogados com Playwright.
   Como rodar (na pasta que CONTÉM o repositório, para o caminho /escritorio-advocacia/ funcionar como no GitHub Pages):
     python3 -m http.server 8312 &
     node escritorio-advocacia/tests/site.cjs
   Variáveis opcionais: PORTA (padrão 8312), CAPTURAS=1 para salvar imagens em docs/ e SHOTS_DIR para PNGs extras. */
const { chromium, devices } = require("playwright");
const path = require("path");
const fs = require("fs");

const PORTA = process.env.PORTA || "8312";
const BASE = `http://localhost:${PORTA}/escritorio-advocacia/`;
const CAPTURAS = process.env.CAPTURAS === "1";
const SHOTS_DIR = process.env.SHOTS_DIR || "";
const DOCS = path.join(__dirname, "..", "docs");

const TELAS = [
  { nome: "computador", opcoes: { viewport: { width: 1280, height: 900 } } },
  { nome: "iphone13", opcoes: { ...devices["iPhone 13"] } },
  { nome: "320px", opcoes: { viewport: { width: 320, height: 640 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } }
];

let falhas = 0;
function ok(cond, msg) {
  console.log(`${cond ? "  ok " : "  FALHA"} ${msg}`);
  if (!cond) falhas++;
}

async function semBarras(page) {
  await page.evaluate(() => {
    document.querySelector(".topo").style.position = "static";
    document.querySelector(".aviso-demo").style.display = "none";
  });
}
async function comBarras(page) {
  await page.evaluate(() => {
    document.querySelector(".topo").style.position = "";
    document.querySelector(".aviso-demo").style.display = "";
  });
}

async function medir(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const rolagemHorizontal = doc.scrollWidth > doc.clientWidth + 1;
    const cortados = [];
    const tudo = document.querySelectorAll("h1, h2, h3, h4, p, a, button, label, summary, dt, dd, li, span, legend, time, code");
    for (const el of tudo) {
      if (el.closest("[hidden]") || (el.offsetParent === null && getComputedStyle(el).position !== "fixed")) continue;
      const est = getComputedStyle(el);
      if (est.overflow === "hidden" || est.overflowX === "hidden") {
        if (el.scrollWidth > el.clientWidth + 2) cortados.push(`${el.tagName.toLowerCase()}: ${el.textContent.trim().slice(0, 40)}`);
      }
      const r = el.getBoundingClientRect();
      if (r.width && r.right > doc.clientWidth + 1) cortados.push(`fora da tela: ${el.tagName.toLowerCase()} ${el.textContent.trim().slice(0, 40)}`);
    }
    return { rolagemHorizontal, cortados, largura: doc.scrollWidth, cliente: doc.clientWidth };
  });
}

async function captura(page, seletor, nome) {
  if (!CAPTURAS || nome.endsWith("-320px")) return;
  await semBarras(page);
  await page.locator(seletor).screenshot({ path: path.join(DOCS, `${nome}.png`) });
  await comBarras(page);
}

(async () => {
  const browser = await chromium.launch();
  for (const tela of TELAS) {
    console.log(`\n== ${tela.nome} ==`);
    const contexto = await browser.newContext(tela.opcoes);
    const page = await contexto.newPage();
    const erros = [];
    page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") erros.push(`${m.type()}: ${m.text()}`); });
    page.on("pageerror", (e) => erros.push(`pageerror: ${e.message}`));
    page.on("requestfailed", (r) => erros.push(`request falhou: ${r.url()}`));

    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);

    let m = await medir(page);
    ok(!m.rolagemHorizontal, `sem rolagem horizontal na abertura (${m.largura} x ${m.cliente})`);
    ok(m.cortados.length === 0, `sem textos cortados na abertura${m.cortados.length ? ": " + m.cortados.join(" | ") : ""}`);

    const fontes = await page.evaluate(() => document.fonts.check("16px 'Source Serif 4'") && document.fonts.check("16px Inter"));
    ok(fontes, "fontes Source Serif 4 e Inter carregadas");

    const heroFoto = await page.evaluate(() => { const i = document.querySelector(".hero-foto"); return i && i.complete && i.naturalWidth > 0; });
    ok(heroFoto, "foto do hero carregada");

    // Menu no celular
    const menuVisivel = await page.locator("[data-menu]").isVisible();
    if (menuVisivel) {
      await page.click("[data-menu]");
      ok(await page.locator("#menu").isVisible(), "menu abre no celular");
      await page.click("#menu a[href='#areas']");
      ok(!(await page.locator("#menu").isVisible()), "menu fecha ao escolher um link");
    }

    // Equipe: filtro e busca
    await page.locator("#equipe").scrollIntoViewIfNeeded();
    const total = await page.locator(".pessoa:visible").count();
    ok(total === 14, `equipe mostra ${total} pessoas no início`);
    await page.click(".filtro-areas label:has(input[value=tributario])");
    const trib = await page.locator(".pessoa:visible").count();
    ok(trib === 4, `filtro Tributário mostra ${trib} pessoas`);
    await page.fill("#equipe-busca", "reforma");
    const busca = await page.locator(".pessoa:visible").count();
    ok(busca === 1, `busca "reforma" em Tributário mostra ${busca} pessoa`);
    await captura(page, "#equipe", `funcao-equipe-${tela.nome}`);
    await page.fill("#equipe-busca", "zzzz");
    ok(await page.locator("[data-equipe-vazio]").isVisible(), "aviso de lista vazia aparece");
    await page.fill("#equipe-busca", "");
    await page.click(".filtro-areas label:has(input[value=todas])");

    // Área do cliente: login errado, login certo, linha do tempo, sair
    await page.locator("#cliente").scrollIntoViewIfNeeded();
    await page.fill("#login-usuario", "alguem");
    await page.fill("#login-senha", "errada");
    await page.click("#login-form button[type=submit]");
    ok(await page.locator("[data-login-erro]").isVisible(), "login errado mostra aviso");
    await page.fill("#login-usuario", "empresa.demo");
    await page.fill("#login-senha", "acesso2026");
    await page.click("#login-form button[type=submit]");
    ok(await page.locator("[data-painel]").isVisible(), "login de demonstração entra no painel");
    const processos = await page.locator(".processo").count();
    ok(processos === 3, `painel lista ${processos} processos`);
    await page.locator(".processo-botao").first().click();
    ok(await page.locator("#processo-detalhe-0").isVisible(), "linha do tempo do primeiro processo abre");
    const movimentos = await page.locator("#processo-detalhe-0 .linha-tempo li").count();
    ok(movimentos === 5, `linha do tempo tem ${movimentos} movimentos`);
    const sessao = await page.evaluate(() => sessionStorage.getItem("ap.sessao"));
    ok(sessao === "empresa.demo", "sessão guardada só em sessionStorage");
    const semLocal = await page.evaluate(() => localStorage.length === 0);
    ok(semLocal, "nada no localStorage");
    m = await medir(page);
    ok(!m.rolagemHorizontal && m.cortados.length === 0, `painel sem rolagem horizontal nem texto cortado${m.cortados.length ? ": " + m.cortados.join(" | ") : ""}`);
    await captura(page, "#cliente", `funcao-cliente-${tela.nome}`);
    await page.reload({ waitUntil: "networkidle" });
    ok(await page.locator("[data-painel]").isVisible(), "sessão continua após recarregar a aba");
    await page.click("[data-sair]");
    ok(await page.locator("#login-form").isVisible(), "sair volta ao login");

    // Prazos: caso conhecido. DJe em sexta 06/11/2026: publicação seg 09/11, início ter 10/11,
    // 15 dias úteis pulando 14/11, 15/11, 20/11 (feriado), 21/11, 22/11, 28/11, 29/11 => 01/12/2026 (terça).
    await page.locator("#prazos").scrollIntoViewIfNeeded();
    await page.selectOption("#prazo-evento", "dje");
    await page.fill("#prazo-data", "2026-11-06");
    await page.fill("#prazo-dias", "15");
    await page.selectOption("#prazo-unidade", "uteis");
    await page.click("#prazos-form button[type=submit]");
    await page.waitForTimeout(400);
    const final1 = await page.locator("[data-prazos-final]").textContent();
    ok(/1 de dezembro de 2026/.test(final1), `15 dias úteis a partir do DJe de 06/11/2026 termina em "${final1.trim()}"`);
    const pub1 = await page.locator("[data-prazos-pub]").textContent();
    ok(pub1.startsWith("09/11/2026"), `publicação considerada em ${pub1.trim()}`);
    const inicio1 = await page.locator("[data-prazos-inicio]").textContent();
    ok(inicio1.trim() === "10/11/2026", `primeiro dia contado ${inicio1.trim()}`);
    // Recesso: DJe em 15/12/2026 (terça): pub 16/12, início 17/12; úteis 17 e 18/12, depois recesso até 20/01; retoma 21/01 (quinta).
    // 5 dias úteis: 17/12, 18/12, 21/01, 22/01, 25/01 => 25/01/2027.
    await page.fill("#prazo-data", "2026-12-15");
    await page.fill("#prazo-dias", "5");
    await page.click("#prazos-form button[type=submit]");
    await page.waitForTimeout(400);
    const final2 = await page.locator("[data-prazos-final]").textContent();
    ok(/25 de janeiro de 2027/.test(final2), `5 dias úteis atravessando o recesso termina em "${final2.trim()}"`);
    // Corridos com prorrogação: intimação em 2026-11-02 (feriado, segunda): início 03/11; 10 corridos => 12/11 (quinta).
    await page.selectOption("#prazo-evento", "intimacao");
    await page.selectOption("#prazo-unidade", "corridos");
    await page.fill("#prazo-data", "2026-11-02");
    await page.fill("#prazo-dias", "10");
    await page.click("#prazos-form button[type=submit]");
    await page.waitForTimeout(400);
    const final3 = await page.locator("[data-prazos-final]").textContent();
    ok(/12 de novembro de 2026/.test(final3), `10 dias corridos após intimação em feriado termina em "${final3.trim()}"`);
    // Corridos caindo no fim de semana: início 03/11, 11 corridos => 13/11 sexta; 12 => 14/11 sábado => prorroga 16/11 (segunda).
    await page.fill("#prazo-dias", "12");
    await page.click("#prazos-form button[type=submit]");
    await page.waitForTimeout(400);
    const final4 = await page.locator("[data-prazos-final]").textContent();
    ok(/16 de novembro de 2026/.test(final4), `12 dias corridos com vencimento no sábado prorroga para "${final4.trim()}"`);
    await page.fill("#prazo-dias", "0");
    await page.click("#prazos-form button[type=submit]");
    ok(await page.locator("[data-prazos-erro]").isVisible(), "prazo inválido mostra aviso");
    await page.selectOption("#prazo-evento", "dje");
    await page.selectOption("#prazo-unidade", "uteis");
    await page.fill("#prazo-data", "2026-11-06");
    await page.fill("#prazo-dias", "15");
    await page.click("#prazos-form button[type=submit]");
    await page.waitForTimeout(400);
    await page.locator(".resultado-lista summary").click();
    await captura(page, "#prazos", `funcao-prazos-${tela.nome}`);

    // Reunião: inválido, depois válido
    await page.locator("#reuniao").scrollIntoViewIfNeeded();
    await page.click("#reuniao-form button[type=submit]");
    ok(await page.locator("[data-reuniao-erro]").isVisible(), "formulário vazio mostra avisos");
    const camposComErro = await page.locator(".campo-erro").count();
    ok(camposComErro >= 6, `${camposComErro} campos marcados como inválidos`);
    await page.fill("#reuniao-nome", "Visitante Teste");
    await page.fill("#reuniao-empresa", "Empresa Exemplo Ltda.");
    await page.fill("#reuniao-email", "visitante@exemplo.com");
    await page.selectOption("#reuniao-area", "Tributário");
    await page.fill("#reuniao-assunto", "Recebemos um auto de infração de ICMS e queremos entender as opções.");
    // próxima quarta-feira útil a partir de hoje + 7
    const dataReuniao = await page.evaluate(() => {
      const d = new Date(); d.setDate(d.getDate() + 7);
      while ([0, 6].includes(d.getDay())) d.setDate(d.getDate() + 1);
      return d.toISOString().slice(0, 10);
    });
    await page.fill("#reuniao-data", dataReuniao);
    await page.check("input[name=ciente]");
    await page.click("#reuniao-form button[type=submit]");
    const resumoVisivel = await page.locator("[data-reuniao-resumo]").isVisible();
    ok(resumoVisivel, "pedido válido mostra o resumo na tela");
    if (resumoVisivel) {
      const resumoTexto = await page.locator("[data-reuniao-dados]").textContent();
      ok(resumoTexto.includes("Empresa Exemplo Ltda.") && resumoTexto.includes("Tributário"), "resumo repete os dados digitados");
    }
    await captura(page, "#reuniao", `funcao-reuniao-${tela.nome}`);
    await page.click("[data-reuniao-novo]");
    ok(await page.locator("#reuniao-form").isVisible(), "botão de novo pedido volta ao formulário");

    // Publicações
    await page.locator("#publicacoes").scrollIntoViewIfNeeded();
    const pubs = await page.locator(".pub:visible").count();
    ok(pubs === 8, `publicações listadas: ${pubs}`);
    await page.fill("#pub-busca", "reforma");
    const pubsBusca = await page.locator(".pub:visible").count();
    ok(pubsBusca >= 1 && pubsBusca < 8, `busca "reforma" mostra ${pubsBusca}`);
    await page.selectOption("#pub-area", "trabalhista");
    const pubsCombo = await page.locator(".pub:visible").count();
    ok(pubsCombo === 1, `"reforma" em Trabalhista mostra ${pubsCombo}`);
    await page.fill("#pub-busca", "zzzz");
    const pubsZero = await page.locator(".pub:visible").count();
    ok(pubsZero === 0 && (await page.locator("[data-pub-vazio]").isVisible()), "busca sem resultado mostra aviso");
    await page.fill("#pub-busca", "");
    const pubsTrab = await page.locator(".pub:visible").count();
    ok(pubsTrab === 2, `filtro Trabalhista mostra ${pubsTrab} publicações`);
    await page.locator(".pub:visible details summary").first().click();
    await captura(page, "#publicacoes", `funcao-publicacoes-${tela.nome}`);
    await page.selectOption("#pub-area", "todas");

    // Medição final da página inteira, com tudo aberto
    m = await medir(page);
    ok(!m.rolagemHorizontal, `sem rolagem horizontal no fim (${m.largura} x ${m.cliente})`);
    ok(m.cortados.length === 0, `sem textos cortados no fim${m.cortados.length ? ": " + m.cortados.join(" | ") : ""}`);

    // 404
    const r404 = await page.goto(BASE + "404.html", { waitUntil: "networkidle" });
    ok(r404.ok() && (await page.locator("h1").textContent()).includes("não existe"), "404.html carrega com a mesma identidade");
    const m404 = await medir(page);
    ok(!m404.rolagemHorizontal, "404 sem rolagem horizontal");

    ok(erros.length === 0, `console limpo${erros.length ? ": " + erros.join(" | ") : ""}`);

    if (CAPTURAS) {
      await page.goto(BASE, { waitUntil: "networkidle" });
      await page.waitForTimeout(1200);
      if (tela.nome === "computador") await page.screenshot({ path: path.join(DOCS, "capa-desktop.png") });
      if (tela.nome === "iphone13") await page.screenshot({ path: path.join(DOCS, "capa-celular.png") });
      if (SHOTS_DIR && tela.nome !== "320px") {
        fs.mkdirSync(SHOTS_DIR, { recursive: true });
        if (tela.nome === "computador") {
          await page.setViewportSize({ width: 1440, height: 900 });
          await page.waitForTimeout(500);
          await page.screenshot({ path: path.join(SHOTS_DIR, "escritorio-advocacia-desk.png") });
        } else {
          await page.screenshot({ path: path.join(SHOTS_DIR, "escritorio-advocacia-cel.png") });
        }
      }
    }
    await contexto.close();
  }
  await browser.close();
  console.log(falhas ? `\n${falhas} falha(s).` : "\nTudo passou.");
  process.exit(falhas ? 1 : 0);
})();
