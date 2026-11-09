# Identidade visual: Albuquerque Prado Advogados

Estudo curto feito antes do código. Tudo aqui é fictício: a banca, os sócios, os números de OAB, o endereço, os processos e as publicações. É uma demonstração da Mil e Uma Linhas!.

## Nome e posicionamento

**Albuquerque Prado Advogados**, banca fictícia de advocacia empresarial com sede em Cuiabá e quatro áreas: empresarial e societário, tributário, trabalhista e contratos.

Frase de posicionamento: **"Sócios na linha de frente de cada decisão da sua empresa."**

A diferença para o site `advogado` da série (Clara Montenegro, advogada autônoma, papel e tinta azul, marca-texto amarelo, Newsreader e Public Sans) está no porte e no tom. Lá é uma pessoa que atende sozinha e explica o caso em português claro. Aqui é uma instituição: vários sócios, várias áreas, clientes que são empresas, processos acompanhados em equipe. O site precisa parecer um prédio de escritórios bem construído, não uma mesa de trabalho.

Cuidado ético (Código de Ética e Provimento 205/2021 da OAB): sem preço, sem promessa de resultado, sem comparação com outros escritórios, sem "fale agora" insistente. O site informa, mostra quem somos e abre um canal de conversa. Só isso.

## O que faz uma banca grande parecer séria sem cair no clichê

- Fugimos da balança, do martelo, do mármore e do dourado. O universo visual vem da arquitetura de um edifício institucional: pedra clara, sombra profunda, linhas retas, uma única peça de metal.
- Pouca cor, muita disciplina. Uma paleta quase monocromática, com um acento de bronze usado uma vez por tela.
- Hierarquia tipográfica forte: títulos grandes em serifa, corpo em sans neutra, números e datas em tabela.
- Formas quadradas. Nenhum canto arredondado além de 2 px. Blocos separados por linhas finas e por troca de fundo, não por sombras.

## Paleta

| Papel | Nome | Hex | Uso |
| --- | --- | --- | --- |
| Fundo escuro | Noite | `#0E1823` | preto-azulado profundo: cabeçalho, hero, área do cliente, rodapé |
| Fundo escuro 2 | Noite clara | `#172330` | blocos de apoio sobre Noite (cartões da área do cliente, campos de login) |
| Fundo claro | Calcário | `#E9E5DD` | pedra clara: fundo das seções de conteúdo |
| Fundo claro 2 | Calcário escuro | `#DAD4C8` | campos de formulário, filtros, linhas de tabela alternadas |
| Texto | Ardósia | `#1B2633` | todo o texto sobre fundo claro |
| Texto 2 | Pedra cinza | `#4F5964` | texto secundário sobre fundo claro |
| Texto sobre escuro | Névoa | `#A7B0BA` | texto secundário sobre Noite |
| Acento | Bronze | `#8A5A20` sobre claro, `#C99A55` sobre escuro | a única cor quente: uma peça por tela |
| Acento escuro | Bronze escuro | `#6E4617` | só no link da faixa de demonstração, sobre Calcário escuro (5,6:1) |
| Sinal | Verde-garrafa | `#2E6B4E` | só para estado "concluído" na linha do tempo e confirmações |

Regras de uso:

- O **bronze aparece uma vez por tela**: a linha fina sob o título do hero (o botão principal do hero é Calcário, não bronze), a área escolhida no filtro da equipe, a data final na calculadora de prazos, o movimento mais recente na linha do tempo, o botão principal do agendamento. Nunca em texto corrido, nunca em dois lugares da mesma seção.
- Não existe gradiente decorativo e não existe sombra em cartão. Separação por linha de 1 px (`#C9C2B4` sobre Calcário, `#2A3744` sobre Noite) ou por troca de fundo.
- As seções alternam entre Noite e Calcário em blocos largos, como andares de um edifício: hero escuro, áreas e equipe claros, área do cliente escura, ferramentas claras, rodapé escuro.
- Contraste (WCAG): Ardósia sobre Calcário 12,2:1; Pedra cinza sobre Calcário 5,4:1; Calcário sobre Noite 14,2:1; Névoa sobre Noite 8,2:1; Bronze claro sobre Noite 7,0:1; Calcário sobre Bronze 4,7:1; Calcário sobre Verde-garrafa 5,0:1. Tudo em AA; o texto grande fica em AAA.

## Tipografia

Duas famílias, ambas variáveis, locais em `fonts/`, licença SIL OFL 1.1 (arquivos `LICENSE-SourceSerif4.txt` e `LICENSE-Inter.txt`). Nada de Google Fonts por link.

- **Source Serif 4** (eixos peso e tamanho óptico): títulos, nome da banca, citação institucional e os números grandes. É uma serifa transicional desenhada para livro e para tela, com cara de documento impresso em boa gráfica, sem o ar de jornal da Newsreader. Peso 500 nos títulos grandes, 600 nos nomes dos sócios. Itálico só na citação institucional.
- **Inter** (eixo peso): corpo, menus, formulários, tabelas, botões e legendas. Sans neutra, com números tabulares (`font-variant-numeric: tabular-nums`) para datas e prazos alinharem em coluna. Peso 400 no corpo, 500 em rótulos, 600 em botões.

Escala (base 16 px, razão 1,25, com `clamp` para o celular):

| Papel | Tamanho | Fonte e peso |
| --- | --- | --- |
| Título do hero | `clamp(2.5rem, 6vw, 4.5rem)` | Source Serif 4, 500, entrelinha 1,02, opsz 60 |
| Título de seção | `clamp(1.9rem, 3.4vw, 2.75rem)` | Source Serif 4, 500, entrelinha 1,1 |
| Subtítulo e nome de sócio | `1.375rem` | Source Serif 4, 600 |
| Citação | `clamp(1.4rem, 2.6vw, 2rem)` | Source Serif 4, itálico 400 |
| Corpo | `1rem` até `1.0625rem` | Inter 400, entrelinha 1,6 |
| Rótulo e legenda | `0.875rem` | Inter 500, espaçamento 0,01em |
| Número grande (data final do prazo) | `clamp(2rem, 4vw, 3rem)` | Source Serif 4, 500, cor Bronze |

Sem rótulos em caixa alta acima dos títulos. Sem numeração 01/02/03. Sem seta em link.

## Layout

- Grade de 12 colunas, largura máxima 1200 px, margens laterais 20 px no celular e 56 px no computador.
- Ritmo de espaçamento em múltiplos de 8: 8, 16, 24, 32, 48, 72, 112.
- Alinhamento à esquerda em tudo. Os títulos de seção ocupam a coluna da esquerda (4 de 12) e o conteúdo as 8 colunas da direita, como um índice de livro; no celular, empilham.
- Raio de borda 2 px em tudo. Linhas finas de 1 px como divisórias horizontais, lembrando as juntas de pedra da fachada.
- A equipe é uma lista em grade de retratos abstratos (iniciais sobre Calcário escuro), não cartões com sombra. A área do cliente é uma tabela com linha do tempo vertical. A calculadora é um painel de duas colunas: parâmetros à esquerda, resultado à direita com a data em Bronze.

## Imagem forte

O hero tem uma **fotografia em proporção 3:2** (`img/hero.webp`), em um contêiner de cantos retos, à direita do título, sobre o fundo Noite. A foto atual foi gerada por IA no Canva (ilustrativa, não é uma obra real), 1620 x 1080px, sem texto.

Os demais elementos gráficos são CSS e SVG: o símbolo da marca (duas barras verticais e uma travessa, como um pórtico), os retratos abstratos da equipe, a linha do tempo da área do cliente e os ícones de área.

## Foto do hero

Prompt para gerar no Canva (proporção 3:2, mínimo 1600 x 1067 px, sem texto, sem pessoas):

> Fotografia editorial de arquitetura, estilo site institucional premium. Detalhe do saguão de um edifício corporativo moderno: parede de pedra calcária clara com juntas finas e precisas, iluminada por uma luz lateral suave de fim de tarde que entra por uma fachada de vidro fora do quadro. Ao fundo, sombra profunda em tom azul-escuro quase preto (#0E1823). Em primeiro plano, à direita, uma mesa de reunião de madeira escura com uma única pasta de documentos fechada em couro cinza e uma caneta de metal em tom bronze fosco. Composição assimétrica, muito espaço vazio, linhas horizontais e verticais retas. Profundidade de campo média. Cores: pedra clara (#E9E5DD), azul-noite (#0E1823), um único acento bronze. Sem pessoas, sem texto, sem logotipo, sem balança, sem martelo, sem livros dourados.

Variação aceitável: fachada externa do mesmo edifício vista de baixo, pedra clara contra céu de fim de tarde escurecido, sem pessoas.

## Movimento

- Um momento orquestrado: na abertura, a linha de bronze sob o título do hero se desenha da esquerda para a direita (600 ms) e o título e a foto surgem com um deslocamento de 12 px (500 ms, escalonados em 80 ms).
- Respostas a ações: filtro da equipe troca a lista sem animação de entrada; a linha do tempo da área do cliente aparece de uma vez; o resultado do prazo muda de número com um fade de 200 ms; o menu do celular desliza 160 ms.
- Com `prefers-reduced-motion: reduce`, tudo aparece sem animação.

## Regra de ouro

Uma coisa memorável por tela: a foto e a linha de bronze no hero; a grade de retratos na equipe; a linha do tempo na área do cliente; a data em Bronze na calculadora; o resumo da reunião no agendamento. O resto fica quieto e alinhado.

## Design systems aplicados (leva final)

Dupla escolhida no catálogo da Mil e Uma Linhas!: **Sora** (escuro) para os andares em Noite e **Hanzo** (claro) para os andares em Calcário. A paleta não mudou; o que mudou foi superfície, tipografia de apoio, botões, navegação, cartões, faixas e movimento. O laranja do Hanzo e o céu do Sora foram trocados pelo Bronze `#8A5A20` / `#C99A55`; a esmeralda do Sora virou o Verde-garrafa `#2E6B4E`. Tudo em CSS e JavaScript próprios, sem biblioteca, sem fonte externa e sem WebGL; com `prefers-reduced-motion: reduce` nada se mexe.

**Como misturam.** As seções em Calcário (áreas, equipe, prazos, reunião, publicações, como funciona) recebem o Hanzo: olho em Source Serif 4 itálico entre réguas que desvanecem, pílulas com anel translúcido em vez de sombra (a regra "sem sombra em cartão" continua; o anel de 8px fica), acordeão com sinal de mais, lista de benefícios em três colunas e menu do celular em cartão Calcário. As seções em Noite (hero, área do cliente, contato, rodapé) recebem o Sora: pílula de navegação em vidro a 5% com blur, painéis em vidro a 4% com raio 2px, linhas de conta, badges, callout de informação e rodapé em colunas sobre véu.

| Padrão | Origem | Onde está |
| --- | --- | --- |
| Eyebrow em serifa itálica entre réguas que desvanecem (`.olho`) | Hanzo | `p.hero-chapeu` e o olho curto acima dos títulos de Áreas, Equipe, Prazos, Reunião e Publicações |
| Display dividido por palavra, tracking -0.02em | Hanzo | `h1#hero-titulo`: as palavras entram uma a uma (12px, 500ms, 60ms entre elas); a linha de bronze se desenha depois |
| Pílula com anel translúcido de 8px, raio 2px, sem sombra | Hanzo | radios do filtro da equipe (a escolhida ganha a linha de 2px em Bronze na base) e os campos de busca e área das publicações no foco |
| Status tab: ponto Verde-garrafa + texto | Hanzo | `p.hero-status` ("Agenda aberta para primeira conversa") e `p.painel-status` ("Sessão de demonstração ativa") |
| Benefits list: traço + texto + régua que desvanece, três colunas | Hanzo | `ul` de cada `article.area` |
| FAQ item: hairline, sinal de mais em Bronze que gira 45 graus, conteúdo desliza 300ms | Hanzo | `details.resultado-lista` (prazos) e `details.tecnico` (como funciona) |
| Menu panel em cartão sob o botão; barras do botão viram X | Hanzo | `nav.menu` no celular |
| Navigation pill em vidro a 5%, blur 12px, hairline 10%, highlight interno | Sora | `header.topo .faixa`; sobre Calcário o JS liga `.sobre-claro` e a pílula vira `rgba(14,24,35,.04)` com texto Ardósia |
| Glass panel a 4%, blur 24px, hairline 8%, raio 2px | Sora | `form.login` e `div.painel`, sobre linhas de pedra a 3% no fundo de `#cliente` |
| Account row: número tabular, título, responsável em Névoa, chip de fase, hairline, hover a 6% | Sora | `ul.processos li` e `ul.compromissos li` |
| Badge Verde-garrafa a 20% com texto `#8FCBA8`; pendente em Névoa a 15% | Sora | fase "Encerrado com acordo" e selo "Em dia"; o movimento mais recente da linha do tempo segue em Bronze claro |
| Smart tip: borda Bronze a 30%, fundo Bronze a 8% (claro) ou Névoa a 6% (escuro), ícone de 16px, ação em texto à direita | Sora | `.dica` ao fim do resultado dos prazos ("Ver calendário do tribunal") e `.contato-aviso` ("Como este site funciona") |
| Statistic: número grande com legenda apagada, hairlines verticais; o 14 conta de 0 a 14 em 900ms na primeira vista | Sora | `dl.hero-dados` |
| Footer em três colunas sobre véu `rgba(0,0,0,.4)` com blur 24px e hairline | Sora | `footer.rodape` (marca e endereço, mapa do site, aviso ético e demonstração) |

**Fotografias desta leva** (todas geradas por IA no Canva, ilustrativas; os arquivos finais estão em `img/` com o nome e a proporção certos):

| Arquivo | Proporção | Onde | Prompt |
| --- | --- | --- | --- |
| `img/equipe-reuniao.webp` | 16:9 | `figure.equipe-foto`, acima do filtro da equipe | Fotografia editorial realista de site institucional de advocacia: sala de reunião com mesa comprida de madeira escura, quatro advogados adultos em roupas sóbrias cinza e azul-marinho vistos de costas e de três quartos, sem rosto reconhecível, debruçados sobre pastas de couro cinza e um bloco de notas; parede de pedra calcária clara com juntas finas ao fundo e uma fachada de vidro fora de quadro à esquerda. Luz lateral suave de fim de tarde, sombra profunda em azul-noite quase preto nos cantos. Paleta: pedra clara (#E9E5DD), ardósia (#1B2633), azul-noite (#0E1823) e um único detalhe em bronze fosco (uma caneta de metal). Sem texto, sem logotipos, sem balança, sem martelo, sem livros dourados. Proporção 16:9 horizontal. |
| `img/socia-helena.webp` | 3:4 | retrato de Helena Albuquerque na lista da equipe | Retrato editorial corporativo de uma mulher adulta de cerca de 55 anos, cabelo grisalho preso, blazer azul-marinho, fotografada de perfil e com o rosto parcialmente voltado para a janela, sem traços reconhecíveis de pessoa real, diante de uma parede de pedra calcária clara. Luz lateral suave de fim de tarde vinda da esquerda, fundo com sombra profunda azul-noite, profundidade de campo rasa. Cores dessaturadas: pedra clara, ardósia, azul-noite, um brinco discreto em bronze fosco. Sem texto, sem logotipos. Proporção vertical 3:4, estilo sóbrio de revista de negócios. |
| `img/socio-rogerio.webp` | 3:4 | retrato de Rogério Prado | Retrato editorial corporativo de um homem adulto de cerca de 60 anos, cabelo grisalho curto, terno cinza-ardósia e camisa clara, visto de três quartos olhando para fora do quadro, sem traços reconhecíveis de pessoa real, com uma estante de madeira escura desfocada e parede de pedra calcária clara ao fundo. Mesma luz lateral suave de fim de tarde da série, sombras profundas em azul-noite, profundidade de campo rasa. Paleta: pedra clara, ardósia, azul-noite, um relógio de pulso em bronze fosco. Sem texto, sem logotipos. Proporção vertical 3:4. |
| `img/socia-marina.webp` | 3:4 | retrato de Marina Castelo Branco | Retrato editorial corporativo de uma mulher adulta de cerca de 40 anos, cabelo escuro na altura dos ombros, blazer cinza-claro, de perfil junto a uma janela alta com esquadria escura, sem traços reconhecíveis de pessoa real; ao fundo, parede de pedra calcária clara e sombra azul-noite. Luz lateral suave de fim de tarde, mesma série das demais, profundidade de campo rasa, tons dessaturados. Paleta: pedra clara, ardósia, azul-noite e um único detalhe em bronze fosco (fecho da pasta). Sem texto, sem logotipos. Proporção vertical 3:4. |
| `img/recepcao-edificio.webp` | 4:3 | `figure.contato-foto`, coluna direita de "Onde estamos" | Fotografia editorial de arquitetura de interiores: recepção de um escritório de advocacia em andar alto, balcão de pedra calcária clara com juntas precisas, duas poltronas de couro cinza, piso de pedra polida e uma janela de vidro do chão ao teto mostrando a cidade de Cuiabá desfocada sob céu de fim de tarde escurecido. Luz lateral suave e quente, sombras profundas em azul-noite quase preto nos cantos, composição assimétrica com muito espaço vazio e linhas retas. Paleta: pedra clara (#E9E5DD), ardósia, azul-noite (#0E1823) e um único acento em bronze fosco (um puxador de porta). Sem pessoas, sem texto, sem logotipos, sem balança, sem martelo. Proporção 4:3 horizontal. |
| `img/biblioteca-publicacoes.webp` | 4:5 | `figure.pub-foto`, coluna esquerda de Publicações, abaixo do texto de abertura | Fotografia editorial de natureza-morta para site de advocacia: detalhe de uma estante de madeira escura com volumes de lombadas lisas em cinza e azul-escuro, sem títulos legíveis, e, em primeiro plano, um caderno de capa cinza fechado sobre uma prateleira de pedra clara com uma caneta de metal em bronze fosco apoiada. Luz lateral suave de fim de tarde, sombras profundas azul-noite, profundidade de campo curta com foco na caneta. Paleta: pedra clara, ardósia, azul-noite, um único acento bronze. Sem pessoas, sem texto legível, sem logotipos, sem livros dourados. Proporção vertical 4:5. |

Os três retratos substituem o retrato abstrato de iniciais só para os sócios fundadores e a sócia coordenadora; os demais onze continuam com as iniciais sobre Noite, agora também em 3:4 para alinhar a grade.
