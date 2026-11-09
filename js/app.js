/* Albuquerque Prado Advogados. Tudo roda no navegador; nada sai para a internet.
   Dados fictícios: pessoas, processos, publicações, números de OAB e de processo. */
(function () {
  "use strict";

  const $ = (sel, raiz) => (raiz || document).querySelector(sel);
  const $$ = (sel, raiz) => Array.from((raiz || document).querySelectorAll(sel));
  function el(tag, attrs, filhos) {
    const n = document.createElement(tag);
    if (attrs) for (const k of Object.keys(attrs)) {
      if (k === "class") n.className = attrs[k];
      else if (k === "text") n.textContent = attrs[k];
      else if (k === "hidden") n.hidden = !!attrs[k];
      else n.setAttribute(k, attrs[k]);
    }
    if (filhos) for (const f of filhos) if (f) n.appendChild(typeof f === "string" ? document.createTextNode(f) : f);
    return n;
  }
  const normalizar = (s) => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

  const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Menu do celular ---------- */
  const menuBotao = $("[data-menu]");
  const menu = $("#menu");
  if (menuBotao && menu) {
    const fechar = () => { menu.classList.remove("aberto"); menuBotao.setAttribute("aria-expanded", "false"); };
    menuBotao.addEventListener("click", () => {
      const aberto = menu.classList.toggle("aberto");
      menuBotao.setAttribute("aria-expanded", String(aberto));
    });
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) fechar(); });
    document.addEventListener("click", (e) => {
      if (menu.classList.contains("aberto") && !e.target.closest(".topo")) fechar();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("aberto")) { fechar(); menuBotao.focus(); }
    });
  }

  /* ---------- Cabeçalho em vidro: escurece o texto sobre as seções claras ---------- */
  const topo = $(".topo");
  if (topo) {
    const claras = $$(".secao-clara, .secao-clara-2");
    let agendado = false;
    function ajustarTopo() {
      agendado = false;
      document.documentElement.style.setProperty("--topo-altura", topo.offsetHeight + "px");
      const base = topo.getBoundingClientRect().bottom - 1;
      let sobreClaro = false;
      for (const sec of claras) {
        const r = sec.getBoundingClientRect();
        if (r.top <= base && r.bottom > base) { sobreClaro = true; break; }
      }
      topo.classList.toggle("sobre-claro", sobreClaro);
    }
    window.addEventListener("scroll", () => { if (!agendado) { agendado = true; requestAnimationFrame(ajustarTopo); } }, { passive: true });
    window.addEventListener("resize", ajustarTopo);
    ajustarTopo();
  }

  /* ---------- Hero: título palavra a palavra e contador ---------- */
  const titulo = $("[data-titulo-palavras]");
  if (titulo) {
    const palavras = titulo.textContent.trim().split(/\s+/);
    titulo.replaceChildren(...palavras.flatMap((p, i) => {
      const span = el("span", { class: "palavra", text: p });
      span.style.setProperty("--i", String(i));
      return i < palavras.length - 1 ? [span, " "] : [span];
    }));
    titulo.classList.add("dividido");
  }
  const contador = $("[data-contador]");
  if (contador && !semMovimento && "IntersectionObserver" in window) {
    const alvo = parseInt(contador.dataset.contador, 10);
    const obs = new IntersectionObserver((entradas) => {
      if (!entradas.some((e) => e.isIntersecting)) return;
      obs.disconnect();
      const inicio = performance.now();
      const passo = (agora) => {
        const t = Math.min(1, (agora - inicio) / 900);
        const suave = 1 - Math.pow(1 - t, 3);
        contador.textContent = String(Math.round(alvo * suave));
        if (t < 1) requestAnimationFrame(passo);
      };
      contador.textContent = "0";
      requestAnimationFrame(passo);
    }, { threshold: 0.6 });
    obs.observe(contador);
  }

  /* ---------- Equipe ---------- */
  const AREAS = { empresarial: "Empresarial e societário", tributario: "Tributário", trabalhista: "Trabalhista", contratos: "Contratos" };
  const EQUIPE = [
    { nome: "Helena Albuquerque", cargo: "Sócia fundadora", oab: "OAB/MT 00.101", areas: ["empresarial", "contratos"], foto: "img/socia-helena.webp", fotoAlt: "Retrato corporativo de uma advogada madura de perfil, diante de parede de pedra clara, em luz lateral suave. Imagem gerada por IA, ilustrativa.", bio: "Coordena a área empresarial. Atua em reorganizações societárias e acordos de sócios de empresas familiares do agronegócio.", temas: "acordos de sócios, governança, sucessão em empresas familiares" },
    { nome: "Rogério Prado", cargo: "Sócio fundador", oab: "OAB/MT 00.102", areas: ["tributario"], foto: "img/socio-rogerio.webp", fotoAlt: "Retrato corporativo de um advogado maduro de terno cinza, visto de três quartos e olhando para fora do quadro, em escritório com parede de pedra. Imagem gerada por IA, ilustrativa.", bio: "Coordena a área tributária. Trinta anos de contencioso administrativo federal e estadual.", temas: "autuações, CARF, ICMS, transação tributária" },
    { nome: "Marina Castelo Branco", cargo: "Sócia", oab: "OAB/MT 00.103", areas: ["trabalhista"], foto: "img/socia-marina.webp", fotoAlt: "Retrato corporativo de uma advogada de cerca de 40 anos, blazer cinza-claro, de perfil junto a uma janela alta de edifício. Imagem gerada por IA, ilustrativa.", bio: "Coordena a área trabalhista. Negocia acordos coletivos e conduz auditorias de passivo em empresas com mais de mil empregados.", temas: "negociação coletiva, auditoria de passivo, saúde e segurança" },
    { nome: "Tiago Nogueira", cargo: "Sócio", oab: "OAB/MT 00.104", areas: ["contratos", "empresarial"], bio: "Responsável pela área de contratos. Redige e negocia contratos de fornecimento, distribuição e tecnologia.", temas: "contratos de distribuição, tecnologia, garantias" },
    { nome: "Beatriz Sampaio", cargo: "Sócia", oab: "OAB/MT 00.105", areas: ["tributario"], bio: "Consultoria preventiva e revisão de regimes de apuração. Acompanha a implantação da reforma do consumo.", temas: "reforma tributária, planejamento, regimes especiais" },
    { nome: "Caio Figueiredo", cargo: "Sócio", oab: "OAB/MT 00.106", areas: ["empresarial"], bio: "Recuperação judicial e extrajudicial, reestruturação de dívidas e negociação com credores.", temas: "recuperação judicial, reestruturação, credores" },
    { nome: "Larissa Mendes Rocha", cargo: "Advogada associada", oab: "OAB/MT 00.107", areas: ["trabalhista"], bio: "Contencioso trabalhista empresarial e políticas internas de conformidade.", temas: "reclamações trabalhistas, políticas internas, compliance" },
    { nome: "Eduardo Lins Vasconcelos", cargo: "Advogado associado", oab: "OAB/MT 00.108", areas: ["tributario"], bio: "Defesas em autuações municipais e estaduais, parcelamentos e transações na Procuradoria.", temas: "ISS, ICMS, parcelamentos, PGFN" },
    { nome: "Juliana Arruda", cargo: "Advogada associada", oab: "OAB/MT 00.109", areas: ["contratos"], bio: "Modelos contratuais, manuais de uso e gestão de renovações para empresas de serviços.", temas: "modelos contratuais, locação comercial, prestação de serviços" },
    { nome: "Pedro Henrique Barros", cargo: "Advogado associado", oab: "OAB/MT 00.110", areas: ["empresarial", "contratos"], bio: "Auditoria jurídica em compra e venda de empresas e contratos de investimento.", temas: "due diligence, M&A, investimento" },
    { nome: "Camila Teixeira Dantas", cargo: "Advogada associada", oab: "OAB/MT 00.111", areas: ["trabalhista"], bio: "Saúde e segurança do trabalho, perícias e programas de prevenção.", temas: "NR, perícias, adicionais, prevenção" },
    { nome: "Rafael Monteiro Lima", cargo: "Advogado associado", oab: "OAB/MT 00.112", areas: ["tributario", "empresarial"], bio: "Tributação de operações societárias e reorganizações com reflexo fiscal.", temas: "ganho de capital, reorganizações, holding" },
    { nome: "Sofia Guimarães", cargo: "Advogada associada", oab: "OAB/MT 00.113", areas: ["contratos"], bio: "Contratos de tecnologia, proteção de dados e termos de uso.", temas: "LGPD, software, termos de uso" },
    { nome: "André Luiz Carvalho", cargo: "Advogado associado", oab: "OAB/MT 00.114", areas: ["trabalhista", "contratos"], bio: "Contratos de trabalho de alta gestão, não concorrência e remuneração variável.", temas: "executivos, não concorrência, bônus" }
  ];

  const equipeLista = $("[data-equipe-lista]");
  const equipeFiltros = $("[data-equipe-filtros]");
  if (equipeLista && equipeFiltros) {
    const iniciais = (nome) => { const p = nome.split(" "); return (p[0][0] + p[p.length - 1][0]).toUpperCase(); };
    for (const pessoa of EQUIPE) {
      const li = el("li", { class: "pessoa", "data-areas": pessoa.areas.join(" "), "data-texto": normalizar([pessoa.nome, pessoa.cargo, pessoa.temas, pessoa.areas.map((a) => AREAS[a]).join(" ")].join(" ")) }, [
        pessoa.foto
          ? el("img", { class: "retrato retrato-foto", src: pessoa.foto, width: "1088", height: "1456", alt: pessoa.fotoAlt, loading: "lazy", decoding: "async" })
          : el("span", { class: "retrato", "aria-hidden": "true", text: iniciais(pessoa.nome) }),
        el("div", null, [
          el("h3", { text: pessoa.nome }),
          el("p", { class: "cargo", text: `${pessoa.cargo}. ${pessoa.areas.map((a) => AREAS[a]).join(" e ")}. ${pessoa.oab}` }),
          el("p", { class: "bio", text: pessoa.bio }),
          el("p", { class: "temas", text: "Temas: " + pessoa.temas })
        ])
      ]);
      equipeLista.appendChild(li);
    }
    const contagem = $("[data-equipe-contagem]");
    const vazio = $("[data-equipe-vazio]");
    function filtrarEquipe() {
      const area = equipeFiltros.area.value;
      const busca = normalizar(equipeFiltros.busca.value.trim());
      let n = 0;
      for (const li of $$(".pessoa", equipeLista)) {
        const bateArea = area === "todas" || li.dataset.areas.split(" ").includes(area);
        const bateBusca = !busca || li.dataset.texto.includes(busca);
        const mostra = bateArea && bateBusca;
        li.hidden = !mostra;
        if (mostra) n++;
      }
      contagem.textContent = n === 1 ? "1 pessoa" : `${n} pessoas`;
      vazio.hidden = n > 0;
    }
    equipeFiltros.addEventListener("input", filtrarEquipe);
    equipeFiltros.addEventListener("submit", (e) => { e.preventDefault(); filtrarEquipe(); });
    filtrarEquipe();
  }

  /* ---------- Datas e feriados (compartilhado) ---------- */
  const DIA = 86400000;
  const utc = (a, m, d) => new Date(Date.UTC(a, m - 1, d));
  const deISO = (s) => { const [a, m, d] = s.split("-").map(Number); return utc(a, m, d); };
  const somaDias = (dt, n) => new Date(dt.getTime() + n * DIA);
  const mesmaData = (a, b) => a.getTime() === b.getTime();
  const fmtData = new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC", day: "2-digit", month: "2-digit", year: "numeric" });
  const fmtLonga = new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC", weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const fmtCurta = new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC", weekday: "short", day: "2-digit", month: "2-digit" });

  function pascoa(ano) { // algoritmo de Meeus
    const a = ano % 19, b = Math.floor(ano / 100), c = ano % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
    const mes = Math.floor((h + l - 7 * m + 114) / 31), dia = ((h + l - 7 * m + 114) % 31) + 1;
    return utc(ano, mes, dia);
  }
  const cacheFeriados = {};
  function feriadosDoAno(ano, comForenses) {
    const chave = ano + (comForenses ? "f" : "n");
    if (cacheFeriados[chave]) return cacheFeriados[chave];
    const lista = new Map();
    const poe = (dt, nome) => lista.set(dt.getTime(), nome);
    poe(utc(ano, 1, 1), "Confraternização Universal");
    poe(utc(ano, 4, 21), "Tiradentes");
    poe(utc(ano, 5, 1), "Dia do Trabalho");
    poe(utc(ano, 9, 7), "Independência");
    poe(utc(ano, 10, 12), "Nossa Senhora Aparecida");
    poe(utc(ano, 11, 2), "Finados");
    poe(utc(ano, 11, 15), "Proclamação da República");
    if (ano >= 2024) poe(utc(ano, 11, 20), "Consciência Negra");
    poe(utc(ano, 12, 25), "Natal");
    if (comForenses) {
      const p = pascoa(ano);
      poe(somaDias(p, -48), "Segunda-feira de Carnaval");
      poe(somaDias(p, -47), "Terça-feira de Carnaval");
      poe(somaDias(p, -46), "Quarta-feira de Cinzas");
      poe(somaDias(p, -3), "Quinta-feira Santa");
      poe(somaDias(p, -2), "Sexta-feira Santa");
      poe(somaDias(p, 60), "Corpus Christi");
    }
    cacheFeriados[chave] = lista;
    return lista;
  }
  function emRecesso(dt) { const m = dt.getUTCMonth() + 1, d = dt.getUTCDate(); return (m === 12 && d >= 20) || (m === 1 && d <= 20); }
  // Devolve null se for dia útil, ou o motivo de não ser.
  function motivoNaoUtil(dt, op) {
    const ds = dt.getUTCDay();
    if (ds === 0) return "domingo";
    if (ds === 6) return "sábado";
    const f = feriadosDoAno(dt.getUTCFullYear(), op.forenses).get(dt.getTime());
    if (f) return f;
    if (op.recesso && emRecesso(dt)) return "recesso forense (art. 220)";
    return null;
  }
  function proximoUtil(dt, op) { let d = dt; while (motivoNaoUtil(d, op)) d = somaDias(d, 1); return d; }

  /* ---------- Calculadora de prazos ---------- */
  const prazosForm = $("[data-prazos]");
  if (prazosForm) {
    const saidaFinal = $("[data-prazos-final]");
    const saidaPub = $("[data-prazos-pub]");
    const saidaInicio = $("[data-prazos-inicio]");
    const saidaPulados = $("[data-prazos-pulados]");
    const tabela = $("[data-prazos-tabela]");
    const erro = $("[data-prazos-erro]");
    const hoje = new Date();
    prazosForm.data.value = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;

    function calcular(e) {
      if (e) e.preventDefault();
      erro.hidden = true;
      const valorData = prazosForm.data.value;
      let dias = parseInt(prazosForm.dias.value, 10);
      if (!valorData || !/^\d{4}-\d{2}-\d{2}$/.test(valorData)) { erro.textContent = "Informe a data do marco inicial."; erro.hidden = false; return; }
      if (!(dias >= 1 && dias <= 365)) { erro.textContent = "O prazo precisa ser um número de 1 a 365."; erro.hidden = false; return; }
      const op = { recesso: prazosForm.recesso.checked, forenses: prazosForm.forenses.checked };
      if (prazosForm.dobro.checked) dias *= 2;
      const marco = deISO(valorData);
      const evento = prazosForm.evento.value;
      const uteis = prazosForm.unidade.value === "uteis";

      // Art. 224, §2º: disponibilizado no DJe, considera-se publicado no 1º dia útil seguinte.
      let publicacao = evento === "dje" ? proximoUtil(somaDias(marco, 1), op) : marco;
      // Art. 224, caput e §3º: exclui o dia do começo; a contagem começa no 1º dia útil seguinte.
      const inicio = proximoUtil(somaDias(publicacao, 1), op);

      const linhas = [];
      let fim, contados = 0, pulados = 0, d = inicio;
      if (uteis) {
        while (contados < dias) {
          const motivo = motivoNaoUtil(d, op);
          if (motivo) { pulados++; linhas.push({ data: d, texto: "não conta", motivo, pulado: true }); }
          else { contados++; linhas.push({ data: d, texto: `${contados}º dia`, motivo: "", pulado: false }); }
          d = somaDias(d, 1);
        }
        fim = somaDias(d, -1);
      } else {
        for (let i = 0; i < dias; i++) {
          const dt = somaDias(inicio, i);
          const motivo = motivoNaoUtil(dt, op);
          linhas.push({ data: dt, texto: `${i + 1}º dia`, motivo: motivo || "", pulado: false });
        }
        fim = somaDias(inicio, dias - 1);
        // Art. 224, §1º: vencimento em dia não útil prorroga para o 1º dia útil seguinte.
        let p = fim, m;
        while ((m = motivoNaoUtil(p, op))) {
          const linha = linhas.find((l) => mesmaData(l.data, p));
          if (linha) { linha.pulado = true; linha.motivo = m; }
          else linhas.push({ data: p, texto: "não vence", motivo: m, pulado: true });
          pulados++;
          p = somaDias(p, 1);
        }
        if (!mesmaData(p, fim)) linhas.push({ data: p, texto: "prorrogado", motivo: "1º dia útil seguinte (art. 224, § 1º)", pulado: false });
        fim = p;
      }
      linhas[linhas.length - 1].final = true;

      saidaFinal.classList.add("trocando");
      setTimeout(() => {
        saidaFinal.textContent = fmtLonga.format(fim);
        saidaFinal.classList.remove("trocando");
      }, 150);
      saidaPub.textContent = evento === "dje" ? `${fmtData.format(publicacao)} (1º dia útil após a disponibilização)` : fmtData.format(publicacao);
      saidaInicio.textContent = fmtData.format(inicio);
      saidaPulados.textContent = uteis
        ? (pulados === 0 ? "nenhum" : `${pulados} (fins de semana, feriados ou recesso)`)
        : (pulados === 0 ? "nenhum; o vencimento caiu em dia útil" : `vencimento prorrogado em ${pulados} dia(s)`);
      tabela.replaceChildren(...linhas.map((l) => el("li", { class: (l.pulado ? "pulado" : "") + (l.final ? " final" : "") }, [
        el("span", { class: "ordem", text: l.texto }),
        el("time", { datetime: l.data.toISOString().slice(0, 10), text: fmtCurta.format(l.data) }),
        el("span", { class: "motivo", text: l.motivo })
      ])));
    }
    prazosForm.addEventListener("submit", calcular);
    prazosForm.addEventListener("change", calcular);
    calcular();
  }

  /* ---------- Área do cliente ---------- */
  const CREDENCIAIS = { usuario: "empresa.demo", senha: "acesso2026" };
  const CLIENTE = {
    nome: "Horizonte Agroindustrial Ltda.",
    socia: "Helena Albuquerque",
    processos: [
      {
        numero: "0000000-11.2025.8.11.0041", titulo: "Ação anulatória de auto de infração de ICMS", area: "Tributário", vara: "Vara Especializada da Fazenda Pública de Cuiabá", responsavel: "Rogério Prado", fase: "Instrução", concluido: false,
        proximo: "Audiência de instrução para oitiva do perito marcada para 19/11/2026. Não é preciso comparecer; o sócio representa a empresa.",
        movimentos: [
          { data: "2026-10-28", texto: "Laudo pericial juntado aos autos. Nossa equipe está preparando quesitos complementares." },
          { data: "2026-09-02", texto: "Perito nomeado pelo juízo. Honorários periciais depositados pela empresa." },
          { data: "2026-06-15", texto: "Decisão saneadora: deferida a perícia contábil que pedimos." },
          { data: "2026-03-20", texto: "Contestação do Estado apresentada. Réplica protocolada em 10/04." },
          { data: "2025-11-07", texto: "Ação distribuída. Pedido de tutela para suspender a exigibilidade do crédito deferido em 12/11." }
        ]
      },
      {
        numero: "0000000-22.2026.5.23.0001", titulo: "Reclamação trabalhista: horas extras e adicional de insalubridade", area: "Trabalhista", vara: "1ª Vara do Trabalho de Cuiabá", responsavel: "Marina Castelo Branco", fase: "Aguardando sentença", concluido: false,
        proximo: "Sentença esperada para as próximas semanas. Assim que publicada, enviamos a análise e as opções em até dois dias úteis.",
        movimentos: [
          { data: "2026-10-14", texto: "Razões finais apresentadas pelas duas partes. Autos conclusos para sentença." },
          { data: "2026-08-26", texto: "Audiência de instrução realizada: ouvidas duas testemunhas de cada lado." },
          { data: "2026-05-05", texto: "Proposta de acordo rejeitada pelo reclamante. Processo segue para instrução." },
          { data: "2026-02-18", texto: "Defesa protocolada com documentos de ponto e laudo ambiental da empresa." }
        ]
      },
      {
        numero: "0000000-33.2024.8.11.0041", titulo: "Execução de contrato de fornecimento: cobrança de parcelas em atraso", area: "Contratos", vara: "4ª Vara Cível de Cuiabá", responsavel: "Tiago Nogueira", fase: "Encerrado com acordo", concluido: true,
        proximo: "Acordo homologado e integralmente cumprido. Processo arquivado; nada pendente para a empresa.",
        movimentos: [
          { data: "2026-07-30", texto: "Sentença de extinção pelo cumprimento do acordo. Arquivamento definitivo." },
          { data: "2026-01-12", texto: "Última parcela do acordo recebida e confirmada." },
          { data: "2025-04-03", texto: "Acordo homologado: pagamento em dez parcelas com correção." },
          { data: "2024-09-19", texto: "Execução distribuída com base no contrato e nas notas fiscais." }
        ]
      }
    ],
    compromissos: [
      { data: "2026-11-19", hora: "14h", texto: "Audiência de instrução (ação anulatória de ICMS)", quem: "Rogério Prado comparece pela empresa" },
      { data: "2026-11-26", hora: "10h", texto: "Reunião trimestral de revisão de contratos de fornecimento", quem: "Tiago Nogueira e Juliana Arruda, por vídeo" },
      { data: "2026-12-04", hora: "9h", texto: "Entrega do relatório de auditoria de passivo trabalhista", quem: "Marina Castelo Branco, presencial" }
    ]
  };
  const loginForm = $("[data-login]");
  const painel = $("[data-painel]");
  if (loginForm && painel) {
    const loginErro = $("[data-login-erro]");
    const CHAVE = "ap.sessao";
    const guardar = (v) => { try { v ? sessionStorage.setItem(CHAVE, v) : sessionStorage.removeItem(CHAVE); } catch (e) { /* armazenamento indisponível */ } };
    const lembrada = () => { try { return sessionStorage.getItem(CHAVE); } catch (e) { return null; } };

    function montarPainel() {
      $("[data-painel-cliente]").textContent = CLIENTE.nome;
      $("[data-painel-socia]").textContent = CLIENTE.socia;
      const lista = $("[data-processos]");
      lista.replaceChildren(...CLIENTE.processos.map((p, i) => {
        const idDet = `processo-detalhe-${i}`;
        const detalhe = el("div", { class: "processo-detalhe", id: idDet, hidden: true }, [
          el("ol", { class: "linha-tempo" }, p.movimentos.map((m, j) => el("li", null, [
            el("time", { datetime: m.data, text: fmtData.format(deISO(m.data)) }),
            j === 0 ? el("span", { class: "atual", text: "Movimento mais recente" }) : null,
            el("p", { text: m.texto })
          ]))),
          el("p", { class: "proximo-passo", text: "Próximo passo: " + p.proximo })
        ]);
        const botao = el("button", { class: "processo-botao", type: "button", "aria-expanded": "false", "aria-controls": idDet }, [
          el("p", { class: "processo-numero", text: p.numero }),
          el("div", { class: "processo-texto" }, [
            el("p", { class: "processo-titulo", text: p.titulo }),
            el("p", { class: "processo-meta", text: `${p.vara}. ${p.area}. Responsável: ${p.responsavel}. Último movimento em ${fmtData.format(deISO(p.movimentos[0].data))}.` })
          ]),
          el("span", { class: "chip" + (p.concluido ? " chip-concluido" : " chip-pendente"), text: p.fase })
        ]);
        botao.addEventListener("click", () => {
          const abrir = detalhe.hidden;
          detalhe.hidden = !abrir;
          botao.setAttribute("aria-expanded", String(abrir));
        });
        return el("li", { class: "processo" }, [botao, detalhe]);
      }));
      $("[data-compromissos]").replaceChildren(...CLIENTE.compromissos.map((c) => el("li", { class: "compromisso" }, [
        el("time", { datetime: c.data, text: `${fmtData.format(deISO(c.data))}, ${c.hora}` }),
        el("div", { class: "compromisso-texto" }, [
          el("p", { text: c.texto }),
          el("p", { class: "quem", text: c.quem })
        ]),
        el("span", { class: "chip chip-concluido", text: "Em dia" })
      ])));
    }
    function entrar() { montarPainel(); loginForm.hidden = true; painel.hidden = false; }
    function sair() { guardar(null); painel.hidden = true; loginForm.hidden = false; loginForm.reset(); loginForm.usuario.focus(); }

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const u = loginForm.usuario.value.trim().toLowerCase();
      const s = loginForm.senha.value;
      if (!u || !s) { loginErro.textContent = "Preencha usuário e senha."; loginErro.hidden = false; return; }
      if (u !== CREDENCIAIS.usuario || s !== CREDENCIAIS.senha) { loginErro.textContent = "Usuário ou senha não conferem. Use os dados de demonstração mostrados acima."; loginErro.hidden = false; return; }
      loginErro.hidden = true;
      guardar(u);
      entrar();
      $("[data-painel-cliente]").setAttribute("tabindex", "-1");
      $("[data-painel-cliente]").focus();
    });
    $("[data-sair]").addEventListener("click", sair);
    if (lembrada() === CREDENCIAIS.usuario) entrar();
  }

  /* ---------- Agendamento de reunião ---------- */
  const reuniaoForm = $("[data-reuniao]");
  if (reuniaoForm) {
    const resumo = $("[data-reuniao-resumo]");
    const dados = $("[data-reuniao-dados]");
    const erroGeral = $("[data-reuniao-erro]");
    const hoje = new Date();
    const hojeUTC = utc(hoje.getFullYear(), hoje.getMonth() + 1, hoje.getDate());
    reuniaoForm.data.min = hojeUTC.toISOString().slice(0, 10);

    function marcarErro(campo, msg) {
      const caixa = campo.closest(".campo") || campo.closest(".consentimento") || campo.parentElement;
      caixa.classList.toggle("campo-invalido", !!msg);
      let aviso = caixa.querySelector(".campo-erro");
      if (msg) {
        if (!aviso) { aviso = el("p", { class: "campo-erro" }); caixa.appendChild(aviso); }
        aviso.textContent = msg;
        campo.setAttribute("aria-invalid", "true");
      } else {
        if (aviso) aviso.remove();
        campo.removeAttribute("aria-invalid");
      }
    }
    function validar() {
      const f = reuniaoForm;
      const erros = [];
      const checa = (campo, cond, msg) => { marcarErro(campo, cond ? "" : msg); if (!cond) erros.push(campo); };
      checa(f.nome, f.nome.value.trim().length >= 3, "Escreva o seu nome.");
      checa(f.empresa, f.empresa.value.trim().length >= 2, "Informe a empresa.");
      checa(f.email, /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.value.trim()), "Informe um e-mail válido.");
      checa(f.area, !!f.area.value, "Escolha uma área, ou \"Ainda não sei\".");
      checa(f.assunto, f.assunto.value.trim().length >= 20, "Conte um pouco mais, pelo menos 20 caracteres.");
      let dataOk = /^\d{4}-\d{2}-\d{2}$/.test(f.data.value);
      let msgData = "Escolha uma data.";
      if (dataOk) {
        const d = deISO(f.data.value);
        if (d.getTime() <= hojeUTC.getTime()) { dataOk = false; msgData = "Escolha uma data a partir de amanhã."; }
        else { const m = motivoNaoUtil(d, { recesso: false, forenses: true }); if (m) { dataOk = false; msgData = `Essa data cai em ${m}. Escolha um dia útil.`; } }
      }
      checa(f.data, dataOk, msgData);
      checa(f.ciente, f.ciente.checked, "Marque a caixa para continuar.");
      return erros;
    }
    reuniaoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const erros = validar();
      if (erros.length) {
        erroGeral.textContent = erros.length === 1 ? "Falta corrigir um campo." : `Faltam corrigir ${erros.length} campos.`;
        erroGeral.hidden = false;
        erros[0].focus();
        return;
      }
      erroGeral.hidden = true;
      const f = reuniaoForm;
      const protocolo = "AP-" + String(Date.now()).slice(-6);
      const pares = [
        ["Protocolo de demonstração", protocolo],
        ["Nome", f.nome.value.trim()],
        ["Empresa", f.empresa.value.trim()],
        ["E-mail", f.email.value.trim()],
        ["Área", f.area.value],
        ["Assunto", f.assunto.value.trim()],
        ["Data e período", `${fmtLonga.format(deISO(f.data.value))}, ${f.periodo.value.toLowerCase()}`],
        ["Modalidade", f.modalidade.value]
      ];
      dados.replaceChildren(...pares.map(([k, v]) => el("div", null, [el("dt", { text: k }), el("dd", { text: v })])));
      resumo.hidden = false;
      resumo.querySelector("h3").setAttribute("tabindex", "-1");
      resumo.querySelector("h3").focus();
    });
    reuniaoForm.addEventListener("input", (e) => { if (e.target.closest(".campo-invalido")) validar(); });
    $("[data-reuniao-novo]").addEventListener("click", () => {
      reuniaoForm.reset();
      $$(".campo-erro", reuniaoForm).forEach((n) => n.remove());
      $$(".campo-invalido", reuniaoForm).forEach((n) => n.classList.remove("campo-invalido"));
      resumo.hidden = true;
      reuniaoForm.nome.focus();
    });
  }

  /* ---------- Publicações ---------- */
  const PUBLICACOES = [
    { titulo: "Reforma do consumo: o que a empresa precisa mapear antes da transição", area: "tributario", data: "2026-10-21", autor: "Beatriz Sampaio", minutos: 6, resumo: "A substituição gradual de PIS, Cofins, ICMS e ISS pelos novos tributos muda cadastros, sistemas e contratos. Listamos o que revisar primeiro.", texto: "O período de transição exige que a empresa saiba, por operação, qual é a base de cálculo hoje e qual será amanhã. Começamos sempre pelo mapa de contratos de longo prazo, porque cláusulas de preço sem previsão de reequilíbrio tributário serão as primeiras a gerar discussão. Depois vêm os sistemas de emissão de documentos fiscais e, só então, o planejamento de regimes. Este texto é informativo e não substitui a análise do caso concreto." },
    { titulo: "Acordo de sócios: cinco cláusulas que evitam a maioria dos litígios", area: "empresarial", data: "2026-09-30", autor: "Helena Albuquerque", minutos: 5, resumo: "Saída de sócio, avaliação de quotas, impasse, não concorrência e distribuição de lucros. Como escrevê-las para que funcionem quando a relação azedar.", texto: "Um acordo de sócios bom é aquele que ninguém precisa ler enquanto tudo vai bem e que resolve sozinho quando algo vai mal. A cláusula de avaliação de quotas, por exemplo, deve indicar o método e quem o aplica, não apenas dizer que será feita uma avaliação. A cláusula de impasse precisa prever um mecanismo de desempate que funcione em semanas, não em anos. Conteúdo informativo." },
    { titulo: "Prazos em dias úteis: erros comuns na contagem após o CPC de 2015", area: "contratos", data: "2026-09-12", autor: "Tiago Nogueira", minutos: 4, resumo: "Dia da disponibilização, dia da publicação e primeiro dia contado são três datas diferentes. Explicamos a regra do art. 224 com exemplos.", texto: "O erro mais frequente é contar a partir do dia em que a intimação aparece no Diário eletrônico. Pela regra do art. 224, parágrafos 2º e 3º, a publicação se considera feita no primeiro dia útil seguinte à disponibilização, e o prazo só começa no dia útil seguinte à publicação. Somam-se ainda os feriados forenses locais e as suspensões de expediente, que variam de tribunal para tribunal. A calculadora deste site aplica a regra geral; o calendário do tribunal continua sendo a referência final." },
    { titulo: "Auditoria de passivo trabalhista: por onde começar em uma empresa com mil empregados", area: "trabalhista", data: "2026-08-19", autor: "Marina Castelo Branco", minutos: 7, resumo: "Jornada, adicionais e terceirização concentram a maior parte das reclamações. Um roteiro de levantamento em três etapas.", texto: "Antes de estimar valores, a auditoria precisa reconstruir o que de fato acontece na operação: como o ponto é registrado, quais funções têm exposição a agentes insalubres e como os contratos com prestadores são geridos. Só depois faz sentido projetar cenários. A auditoria bem feita gera um plano de correções com prazos, não apenas um número de passivo. Conteúdo informativo." },
    { titulo: "Transação tributária com a Fazenda: quando faz sentido e quando não faz", area: "tributario", data: "2026-07-24", autor: "Rogério Prado", minutos: 6, resumo: "A transação não é um parcelamento melhorado. Depende da capacidade de pagamento da empresa e da situação do crédito. O que avaliar antes de aderir.", texto: "A decisão de aderir a uma transação passa por três perguntas: o crédito é devido, no todo ou em parte? A classificação de capacidade de pagamento atribuída à empresa está correta? As condições oferecidas cabem no fluxo de caixa dos próximos anos? Responder a essas perguntas antes de assinar evita a adesão a condições que não serão cumpridas. Não há promessa de resultado em nenhum desses caminhos." },
    { titulo: "Contratos de tecnologia: o que não pode faltar quando a empresa contrata software", area: "contratos", data: "2026-06-30", autor: "Sofia Guimarães", minutos: 5, resumo: "Nível de serviço, propriedade dos dados, saída do contrato e proteção de dados pessoais. Um roteiro para quem contrata, não para quem vende.", texto: "A cláusula de saída costuma ser a mais negligenciada: a empresa precisa saber como e em que formato recebe os seus dados de volta ao final do contrato. Em seguida vêm os níveis de serviço com consequências concretas e a definição clara de quem é controlador e quem é operador de dados pessoais, nos termos da LGPD. Conteúdo informativo." },
    { titulo: "Recuperação judicial: sinais de que é hora de conversar com credores", area: "empresarial", data: "2026-05-28", autor: "Caio Figueiredo", minutos: 6, resumo: "A reestruturação começa muito antes do pedido em juízo. Indicadores que pedem uma conversa franca e as alternativas extrajudiciais.", texto: "Quando o caixa deixa de cobrir a folha e os fornecedores essenciais em dois meses seguidos, a conversa com credores já está atrasada. A recuperação extrajudicial e a renegociação direta costumam ser menos custosas quando iniciadas cedo. A judicial é um instrumento legítimo, mas tem custos e exigências que precisam ser conhecidos antes. Conteúdo informativo." },
    { titulo: "Teletrabalho e controle de jornada: o que a reforma deixou claro e o que não deixou", area: "trabalhista", data: "2026-04-16", autor: "Larissa Mendes Rocha", minutos: 4, resumo: "A dispensa de controle de jornada não é automática no trabalho remoto. Depende do regime contratado e de como a empresa opera de fato.", texto: "O trabalho remoto por produção ou tarefa dispensa o controle de jornada; o remoto por jornada, não. Na prática, o que decide é a forma como a empresa cobra o trabalho: se há horário de conexão exigido e reuniões obrigatórias em intervalos fixos, a jornada existe e precisa ser registrada. Políticas internas claras evitam a maior parte das discussões. Conteúdo informativo." }
  ];
  const pubLista = $("[data-pub-lista]");
  const pubFiltros = $("[data-pub-filtros]");
  if (pubLista && pubFiltros) {
    const AREAS_CURTO = { empresarial: "Empresarial", tributario: "Tributário", trabalhista: "Trabalhista", contratos: "Contratos" };
    for (const pub of PUBLICACOES) {
      const li = el("li", { class: "pub", "data-area": pub.area, "data-texto": normalizar([pub.titulo, pub.resumo, pub.texto, pub.autor, AREAS_CURTO[pub.area]].join(" ")) }, [
        el("p", { class: "pub-meta" }, [
          el("time", { datetime: pub.data, text: fmtData.format(deISO(pub.data)) }),
          el("span", { text: AREAS_CURTO[pub.area] }),
          el("span", { text: `${pub.minutos} min de leitura` })
        ]),
        el("h3", { text: pub.titulo }),
        el("p", { class: "resumo", text: pub.resumo }),
        el("details", null, [
          el("summary", { text: "Ler o artigo" }),
          el("p", { text: pub.texto }),
          el("p", { class: "autor", text: "Por " + pub.autor + ". Conteúdo informativo, não é consulta jurídica." })
        ])
      ]);
      pubLista.appendChild(li);
    }
    const contagem = $("[data-pub-contagem]");
    const vazio = $("[data-pub-vazio]");
    function filtrarPub() {
      const area = pubFiltros.area.value;
      const busca = normalizar(pubFiltros.busca.value.trim());
      let n = 0;
      for (const li of $$(".pub", pubLista)) {
        const mostra = (area === "todas" || li.dataset.area === area) && (!busca || li.dataset.texto.includes(busca));
        li.hidden = !mostra;
        if (mostra) n++;
      }
      contagem.textContent = n === 1 ? "1 publicação" : `${n} publicações`;
      vazio.hidden = n > 0;
    }
    pubFiltros.addEventListener("input", filtrarPub);
    pubFiltros.addEventListener("submit", (e) => { e.preventDefault(); filtrarPub(); });
    filtrarPub();
  }
})();
