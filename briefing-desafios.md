# Briefing — Redesign da tela "Desafios"

> Para o Claude Design. Anexar junto: `src/pages/Desafios.js`, `src/theme/palettes.js`,
> `src/pages/MeusErros.js` (referência do padrão visual novo) e prints das telas Home e Perfil.

---

Preciso que você redesenhe a tela "Desafios" de um app mobile de ensino de inglês
(React Native + Expo). Estou anexando o arquivo atual da tela (`src/pages/Desafios.js`),
a paleta do app (`src/theme/palettes.js`) e prints das telas de referência.

## O que a tela faz

É o duelo 1x1 entre amigos. O aluno escolhe **um amigo** e **uma meta**, dispara o convite,
e os dois competem para bater a meta primeiro — quem chegar antes leva o XP de recompensa.

Regras do fluxo que o design precisa respeitar:

- **Só existe um desafio por vez.** Enquanto houver um desafio pendente ou ativo, a tela
  mostra só ele; o seletor de amigo/meta some.
- **Convite pendente expira em 24 h.** Se o amigo não responder, o desafio morre sozinho.
- **Desafio ativo expira no prazo da meta** (1 a 14 dias, depende da meta escolhida).
- Quando alguém vence, o desafio sai desta tela — o resultado chega por notificação. Ou seja:
  **não existe tela de "você venceu/perdeu" aqui**, e o design não deve inventar uma.

## Estados obrigatórios

1. **Carregando**
2. **Convite recebido** — "Fulano te desafiou": botões Aceitar / Recusar
3. **Convite enviado** — "Você desafiou Fulano": "esperando resposta…" + Cancelar
4. **Duelo ativo** — progresso dos dois lados + dias restantes
5. **Sem desafio** — seleção: escolha um amigo → escolha uma meta → botão "Desafiar"
   (desabilitado até os dois estarem escolhidos)
6. **Sem amigos** — hoje é só uma frase solta pedindo pro aluno adicionar alguém na comunidade
7. **Processando** — os botões de ação viram spinner enquanto a requisição roda

## Dados disponíveis

**Regra dura: o design não pode pedir nada além disso.** Não vou alterar a API.

**Do desafio atual** (pendente ou ativo):

- status (`pendente` / `ativo`)
- os dois participantes: nome, foto (pode ser nula → cai na inicial do nome) e o progresso
  numérico de cada um
- a meta: título, descrição, tipo (`xp_total` ou `aulas_precisao`), valor alvo,
  precisão mínima, prazo em dias, XP de recompensa
- datas: criado em, respondido em, iniciado em, expira em

**Da lista de amigos:** nome, foto e **XP total de cada amigo** (esse dado já vem da API e a
tela ignora hoje — pode virar informação útil na hora de escolher o rival).

**Das metas** (são 8 fixas, sempre as mesmas):

| Meta | Tipo | Alvo | Prazo | Recompensa |
| --- | --- | --- | --- | --- |
| Duelo relâmpago | XP | 100 XP | 1 dia | +50 XP |
| Corrida de fim de semana | XP | 300 XP | 2 dias | +75 XP |
| Corrida de 500 XP | XP | 500 XP | 7 dias | +75 XP |
| Maratona de 1000 XP | XP | 1000 XP | 14 dias | +100 XP |
| Um passo de cada vez | Aulas | 2 aulas com 70%+ | 3 dias | +50 XP |
| 3 aulas perfeitas | Aulas | 3 aulas com 100% | 7 dias | +50 XP |
| 5 aulas com 90%+ de precisão | Aulas | 5 aulas com 90%+ | 10 dias | +100 XP |
| Perfeccionista | Aulas | 5 aulas com 100% | 14 dias | +100 XP |

### Os dois tipos de meta medem coisas diferentes

Esse campo (`meta.tipo`) já vem da API e é um dos pontos que mais precisa aparecer no
redesenho, porque hoje a tela trata os dois tipos exatamente igual — uma barra genérica.

- **`xp_total`** — o progresso é o **XP acumulado** por cada jogador. Conta tudo que dá XP no
  app (aulas normais, Aulas Plus, outros desafios). O alvo é um número de XP, então a barra lê
  `340 / 500 XP`.
- **`aulas_precisao`** — o progresso é a **contagem de aulas concluídas com acurácia igual ou
  acima do mínimo exigido** (70%, 90% ou 100%, depende da meta). O alvo é um número de aulas,
  então a barra lê `2 / 5 aulas`.

Três consequências para o design:

1. **A unidade da barra muda** entre um tipo e outro. Um rótulo genérico "progresso" esconde
   isso; o número precisa vir com a unidade certa.
2. **O tipo `aulas_precisao` tem uma condição escondida.** Aula terminada abaixo da precisão
   exigida não conta: dá para fechar cinco aulas com 85% numa meta de 90% e o contador ficar
   em zero. Se a tela não deixar "só valem aulas com 90%+" bem visível, o aluno vai achar que
   o app está quebrado. Isso vale tanto no card do duelo ativo quanto no card da meta na hora
   de escolher.
3. **Ajuda a escolher** entre as 8 metas da lista rolável: um tratamento visual distinto para
   "corrida de XP" e "aulas caprichadas" deixa o aluno filtrar com o olho.

Um detalhe que vale sinalizar no duelo ativo: **o progresso só conta a partir do aceite** do
desafio, não da criação do convite. XP e aulas anteriores não entram.

**Estatísticas do usuário** (rota que já existe e o app já consome no Perfil — posso usar aqui
sem mexer em nada): total de desafios, número de vitórias e percentual de vitórias.

Derivados que também são de graça (calculo na própria tela):

- percentual de progresso de cada lado e **quem está na frente**
- dias/horas restantes até expirar
- quanto falta para bater a meta ("faltam 220 XP")

**Não existe e não pode aparecer no design:** histórico de desafios passados, placar
cabeça-a-cabeça contra um amigo específico ("3 x 1 contra o João"), ranking entre amigos,
streak de desafios, troféus/medalhas, gráfico de evolução do duelo ao longo dos dias, vários
desafios simultâneos, ou qualquer coisa que dependa de dado novo no servidor.

## O problema

O visual está genérico demais. O duelo — que é a parte divertida — hoje é um card branco com
duas barrinhas cinzas empilhadas e uma linha de texto "5 dias restantes". Não parece uma
competição: não tem confronto visual entre os dois jogadores, não tem tensão de prazo, e o
card não celebra o XP em jogo. A seleção de amigo e meta também é plana: avatares soltos numa
linha e cards de meta que se distinguem só por uma borda azul fina quando selecionados.

## Linguagem visual do app (seguir à risca)

Estilo: cards claros sobre fundo cinza-azulado, cantos **muito** arredondados (16-22px),
sombras suaves e difusas, tipografia pesada (weights 700/800/900), chips e pills com raio 99,
ícones de linha (MaterialCommunityIcons), acentos em azul, verde para XP/sucesso e dourado
para conquista.

**Importante:** acabei de refazer a tela "Meus erros" com você e ela virou a referência do
padrão novo (estou anexando o arquivo). Esta tela precisa ser da mesma família: card com
`borderRadius: 20` e padding 16, chips pill de 11px em weight 900, botão de ação como pill de
44px de altura, faixa de resumo no topo com gradiente azul, badges coloridos por categoria.

### Paleta — modo claro

| Papel | Cor |
| --- | --- |
| Fundo da tela | `#EEF1F7` |
| Card / superfície | `#FFFFFF` |
| Superfície alternativa | `#F7F9FC` |
| Texto forte (navy) | `#16305C` |
| Texto médio | `#7E8CA0` |
| Texto fraco | `#9AA6B8` |
| Azul acento (botão cheio) | `#3F6FA8` |
| Azul forte | `#2563EB` |
| Verde XP (bg) | `#2E9E5B` (`#E6F4EC`) |
| Âmbar prazo | `#E8A317` |
| Vermelho (bg) | `#EF4444` (`#FEE2E2`) |
| Dourado (bg) | `#F5C451` (`#FDF1DF`) |
| Chip neutro | `#F1F5FA` |
| Borda | `#E5E7EB` |
| Trilho de progresso | `#E6ECF4` |

Sombra: preta-azulada, offset (0,4), opacidade ~0.06, raio 12.

### Paleta — modo escuro

O app tem dark mode completo, **o design precisa vir nas duas versões**.

| Papel | Cor |
| --- | --- |
| Fundo | `#0F111E` |
| Card | `#1A1E36` |
| Card elevado | `#232845` |
| Texto | `#F5F6FC` |
| Texto médio | `#9EA3C4` |
| Texto fraco | `#6E7396` |
| Acento indigo / cheio | `#5B6EF5` / `#4A5CE0` |
| Verde | `#3DDC84` |
| Vermelho | `#FF6B6B` |
| Dourado | `#F7C34D` |
| Borda | `rgba(255,255,255,0.08)` |

## O que eu quero que você entregue

Um canvas com artboards de **390x844** (iPhone), cobrindo:

1. Duelo ativo — modo claro
2. Duelo ativo — modo escuro
3. Convite recebido (Aceitar / Recusar) e convite enviado (esperando / Cancelar) — pode ser
   um artboard com os dois cards
4. Sem desafio: seleção de amigo + meta — modo claro
5. Sem desafio: seleção — modo escuro (pode mostrar o botão "Desafiar" já habilitado)
6. Estado sem amigos + estado carregando (skeleton)
7. Zoom nos componentes: card de meta (normal e selecionado), item de amigo (normal e
   selecionado), a barra/medidor de progresso nas três situações (eu na frente, eu atrás,
   empate) e o botão desabilitado
8. Painel com as cores novas que você criar

Direções que quero ver exploradas:

- **o duelo como confronto**: os dois avatares se encarando, "Você vs Fulano", progresso lado
  a lado em vez de duas barras empilhadas soltas — e deixar claro quem está na frente
- o prazo com peso visual real (dias restantes ficando urgente quando falta pouco)
- o XP em jogo tratado como prêmio, não como uma linha de texto verde
- **tratar os dois tipos de meta de forma distinta** (ver a seção "Os dois tipos de meta medem
  coisas diferentes"): unidade certa na barra, a exigência de precisão sempre à vista, e
  identidade visual própria para cada tipo no card da meta e no card do duelo
- usar as estatísticas (total de desafios, vitórias, % de vitórias) em algum lugar — uma faixa
  de resumo no topo do seletor, por exemplo
- a seleção de amigo e meta com estado selecionado inequívoco, e o XP total do amigo à mostra
- tratar "sem amigos" como um convite pra ação, não como um parágrafo cinza

## Restrições técnicas (importante)

Isso vai ser implementado em React Native puro, então:

- nada de efeito que só existe na web: sem blur/backdrop-filter, sem pseudo-elementos, sem
  sombra interna, sem gradiente em texto
- gradiente linear simples é OK (uso `expo-linear-gradient`)
- SVG e animação são OK (`react-native-svg`, `reanimated`)
- ícones devem sair do MaterialCommunityIcons (`@expo/vector-icons`)
- fonte: system font (San Francisco / Roboto) — o app não usa fonte custom
- respeitar safe area no topo e área de toque mínima de 44px
- toda cor usada deve ter par claro/escuro, porque as telas leem as cores de um objeto de tema
- **avatar pode não existir**: quando não tem foto, o app desenha um círculo com a inicial do
  nome — o design precisa dos dois casos
- **nome de amigo pode ser longo**: mostre como o layout se comporta com nome curto e longo
- a lista de amigos varia de 1 a muitos; a lista de metas é sempre 8 (então ela rola)

No fim, me entregue também a lista das cores novas que você criou (se criar), com o valor no
claro e no escuro. Use o prefixo `DES_` nos nomes — a tela de erros já ocupou o prefixo `ERR_`
na paleta.
