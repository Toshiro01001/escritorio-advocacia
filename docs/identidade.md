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
