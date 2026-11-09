# Vistoria de segurança: Albuquerque Prado Advogados

Data: 08/11/2026. Site estático de demonstração, sem servidor próprio, sem banco de dados e sem envio de dados.

## Política de segurança de conteúdo (CSP)

Declarada por `<meta http-equiv="Content-Security-Policy">` em `index.html` e `404.html`:

`default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'`

- Nenhum script inline, nenhum estilo inline (nem atributo `style`). O único script é `js/app.js`; o único estilo é `css/estilo.css`.
- `connect-src 'none'`: o navegador bloqueia qualquer `fetch`, `XMLHttpRequest` ou WebSocket, mesmo que um código fosse injetado.
- `form-action 'none'`: nenhum formulário consegue enviar para endereço algum; todos são interceptados por JavaScript e tratados na tela.
- `frame-ancestors` não entra porque o navegador ignora essa diretiva em meta. Se o site ganhar servidor próprio, adicionar por cabeçalho HTTP.
- O `404.html` usa `script-src 'none'`, porque não tem JavaScript.

## Envio de dados

Nenhum. Não há endpoint, analytics, pixel, fonte externa ou CDN. O único link externo é https://mileumalinhas.com.br, com `rel="noopener"`. Os formulários de login, prazos e reunião têm `novalidate` e `preventDefault`; o resumo da reunião é montado na tela e descartado ao recarregar.

## Armazenamento no navegador

- `sessionStorage`, chave `ap.sessao`: guarda só a string `empresa.demo` quando o visitante entra na área do cliente, para a sessão sobreviver a um recarregamento da aba. Some quando a aba fecha. Leituras e gravações estão em `try/catch`.
- `localStorage`: não é usado. Os testes verificam que continua vazio.
- Cookies: nenhum.

## Dados fictícios

Banca, sócios, números de OAB (`OAB/MT 00.1xx`), números de processo (`0000000-xx.…`), cliente, movimentos, endereço, telefone e e-mail (`.exemplo`) são inventados. As credenciais `empresa.demo` / `acesso2026` são de demonstração, aparecem na tela de propósito e não dão acesso a nada além do painel fictício.

## Renderização

Todo o conteúdo dinâmico (equipe, processos, publicações, resumo da reunião, tabela de prazos) é criado com `createElement` e `textContent`. Não há `innerHTML` com dados nem `eval`. O texto digitado pelo visitante volta à tela só como texto.

## Dependências

Nenhuma em produção. Em desenvolvimento, apenas Playwright (já instalado no ambiente) para `tests/site.cjs`. As fontes Source Serif 4 e Inter são arquivos locais com licença SIL OFL 1.1 em `fonts/`.

## Riscos residuais

- A calculadora de prazos aplica a regra geral do CPC e os feriados nacionais e forenses mais comuns. Não conhece feriados estaduais e municipais nem suspensões de expediente dos tribunais; o site diz isso ao lado do resultado. Em um site real, isso deve ser conferido pelo advogado responsável.
- A CSP por meta não protege contra embutimento em iframe (`frame-ancestors`). Mitigação: cabeçalho HTTP no servidor, quando houver.
- O GitHub Pages serve o site sob HTTPS; o conteúdo é estático e não há segredo a proteger.

## Revisão de 08/11/2026 (leva final de design)

Revisão feita depois de aplicar os design systems da leva final e encaixar as fotos geradas por IA no Canva.

- **CSP:** a política do `index.html` é a mesma de antes da leva (conferida linha a linha). Continua sem `unsafe-inline`, sem `unsafe-eval` e sem origem externa.
- **Script e estilo inline:** nenhum `<script>` inline, nenhum `<style>` e nenhum atributo `style` nas páginas. Os efeitos novos mudam só classes, `textContent` e propriedades CSS pelo CSSOM, que a CSP permite.
- **Recursos externos:** nenhum script, fonte, imagem ou folha de estilo de fora. Os únicos links externos são de navegação comum (mileumalinhas.com.br e, nesta leva, o link "Ver calendário do tribunal" para www.tjmt.jus.br, que abre a página do tribunal sem enviar nada do site).
- **Bibliotecas:** nenhuma entrou. Movimento, vidro, contadores e revelação ao rolar são CSS e JavaScript escritos à mão, desligados com `prefers-reduced-motion`.
- **innerHTML:** nenhum uso no JavaScript.
- **eval e Function:** nenhum uso.
- **Armazenamento:** só o `sessionStorage` da área do cliente de demonstração (`ap.sessao`), que já existia e some ao fechar a aba; nenhuma chave nova nesta leva.
- **Dados pessoais:** nenhum dado pessoal real entrou. Pessoas, empresas, telefones e endereços seguem fictícios. As fotos não retratam pessoas reais.
- **Imagens:** arquivos webp locais em `img/`, com `width`/`height`, `loading="lazy"` e `decoding="async"`. Nenhuma é carregada de outro domínio.
- **Testes:** `tests/site.cjs` passa em 1280x900, iPhone 13 e 320px, sem erro de console e sem rolagem horizontal.
