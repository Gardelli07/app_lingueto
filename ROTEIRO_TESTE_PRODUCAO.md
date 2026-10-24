# Roteiro do teste em produção — iPhone e Android

Para rodar em 23/10/2026, contra `api.linguetoapp.com.br` e o RDS de São Paulo.

Este teste é o que confirma, de uma vez, **as afirmações já escritas na Política e nos Termos**
que nunca foram exercitadas. Siga na ordem: a exclusão de conta vem por último porque destrói o
que foi testado antes.

Marque o resultado na tabela do fim.

---

## 0. Antes de começar

| Pré-requisito | Como confirmar |
|---|---|
| `MODO_SANDBOX_COMPRAS=false` na Railway | ✅ conferido em 22/10 |
| Produto Android no banco | ✅ conferido em 22/10 (`android` / `premium`) |
| Paid Applications Schedule reaceito | App Store Connect → Negócios. **Sem isso a compra iOS não roda** |
| Dev client do iPhone reconstruído | `eas build --profile development --platform ios` — o `expo-iap` é módulo nativo novo |
| App apontando para produção | `EXPO_PUBLIC_API_URL` = `https://api.linguetoapp.com.br` |
| Conta sandbox da Apple | `lingueto.sandbox01@teste.com`, em Ajustes → App Store → Conta sandbox |
| Conta de teste da Google | na lista de testadores internos e de teste de licença |

**Não existe tela de moderação no app.** As ações de moderação se fazem pelo **console da
Railway**, chamando o serviço direto — é o caminho que dispara o e-mail de verdade. Modelo:

```
node -e 'const s=require("/app/dist/modules/moderacao/moderacao.service");s.FUNCAO(...).then(r=>{console.log(r);process.exit(0)}).catch(e=>{console.log("ERRO",e.message);process.exit(1)})'
```

Para consultar o banco, o mesmo console:

```
node -e 'const {prisma}=require("/app/dist/config/prisma");prisma.TABELA.findMany().then(r=>{console.log(r);process.exit(0)})'
```

---

## 0.1 Preparação do notebook

> Esta seção é para a sessão do Claude que vai configurar a máquina. As outras seções são
> para quem executa o teste.

**O teste roda inteiramente contra produção.** O notebook serve só para compilar o app e
servir o JavaScript pelo Metro. **Não suba API local, não instale XAMPP, não use MariaDB** — se
o app falar com uma API local, o teste passa sem ter tocado em produção, que é a pior falha
possível aqui.

Só o repositório **mobile** é necessário (`app_inglesh`). O da API não entra: a API está na
Railway e o banco na AWS.

### Passos

1. **Node.js** instalado (o projeto usa Expo SDK 54 / React Native 0.81).
2. Clonar ou atualizar o repositório mobile e instalar as dependências:
   ```
   npm install
   ```
3. **Criar o `.env` na raiz do repositório mobile.** Ele é `gitignore`d, então não vem no
   clone. São quatro variáveis:

   ```
   EXPO_PUBLIC_API_URL=https://api.linguetoapp.com.br,https://apilingueto-production-ac5a.up.railway.app
   EXPO_PUBLIC_GOOGLE_CLIENT_ID=<copiar de eas.json>
   EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=<copiar de eas.json>
   EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=<copiar de eas.json>
   ```

   Os três client IDs do Google estão em `eas.json`, no perfil `build.production.env`, com os
   **mesmos valores** — conferido. Client ID do Google não é segredo: vai embutido no app de
   qualquer forma.

   **O `EXPO_PUBLIC_API_URL` precisa ser o de produção.** Nunca um endereço `192.168.x.x`.

4. **Reconstruir o dev client do iPhone:**
   ```
   eas login
   eas build --profile development --platform ios
   ```
   É obrigatório, não opcional: o `expo-iap` é **módulo nativo**, e um dev client antigo não o
   contém — a compra falharia com erro de módulo ausente. Esta é a etapa mais demorada; comece
   por ela.

5. Instalar o build no iPhone pelo link que o EAS devolve.

6. **Subir o Metro**, com o iPhone na mesma rede Wi-Fi do notebook:
   ```
   npx expo start --dev-client -c
   ```
   O `-c` limpa o cache — importante, porque o `EXPO_PUBLIC_API_URL` é embutido no bundle em
   tempo de build do JavaScript, e cache antigo carregaria o endereço errado.

### Antes de entregar a máquina para o teste

Confirme da própria rede do notebook que a produção responde:

```
curl -s -o /dev/null -w "%{http_code}
" https://api.linguetoapp.com.br/aulas-plus/ranking
```

Tem que devolver **200**. Esse endpoint lê o banco de verdade, diferente do `/health`.

---

## 1. Login e aceite — iPhone

1. Abra o app e confira que a caixa de aceite **bloqueia** o login enquanto não for marcada.
2. Toque nos nomes dos documentos: **Termos** e **Política** devem abrir no navegador, em HTTPS.
3. Entre com **Apple**. Escolha **Ocultar meu e-mail** — é o caminho que nunca foi testado.
4. Confirme no banco que a conta nasceu com o aceite registrado:

```
node -e 'const {prisma}=require("/app/dist/config/prisma");Promise.all([prisma.usuarios.findMany({select:{id:true,nome_exibicao:true,status:true}}),prisma.identidades_usuario.findMany({select:{usuario_id:true,provedor:true,email:true}}),prisma.aceites_termos.findMany()]).then(r=>{console.log(JSON.stringify(r,(k,v)=>typeof v==="bigint"?v.toString():v,1));process.exit(0)})'
```

**O que esperar:** um usuário novo, a identidade `apple` com e-mail
`...@privaterelay.appleid.com`, e uma linha em `aceites_termos` com a versão `2026-11-01`.

> Anote o **id do usuário**. Ele é usado no passo 2.

---

## 2. Promover o admin da moderação

Decidido na reunião de hoje qual conta será a administradora. Com o id em mãos:

```
node -e 'const {prisma}=require("/app/dist/config/prisma");prisma.administradores_lingueto.create({data:{usuario_id:BigInt(ID)}}).then(r=>{console.log("admin criado",r.id.toString());process.exit(0)})'
```

Confira que funcionou chamando a API com o token do app — ou, mais simples, siga para o passo 6,
que só funciona se o admin existir.

> **Cuidado:** o admin não pode moderar a si mesmo. Para testar o passo 6 você precisa de
> **duas contas**: a admin e uma segunda, que será punida. Use o Android para a segunda.

---

## 3. Foto de perfil e o S3 de São Paulo

1. Troque a foto de perfil no app.
2. Confira a URL que a API devolve: deve apontar para o bucket `lingueto-midia-prod`, com
   `X-Amz-` na query e `X-Amz-Expires=604800` (7 dias).
3. **Copie a URL e abra numa janela anônima, sem login.** Deve abrir.
   É o comportamento que a Política descreve — link temporário, não acesso autenticado. Se não
   abrir, a Política está errada.
4. Troque a foto de novo e confirme que o arquivo anterior **deixou de existir** (abra a URL
   antiga: deve dar erro).

---

## 4. Áudio na comunidade — o opt-in

1. Num exercício de fala, **grave e não publique**. Volte ao feed: a gravação **não** pode
   aparecer.
2. Grave de novo e toque em **Publicar na comunidade**. Agora aparece.
3. Apague o post. Confirme que sumiu do feed e que a URL do áudio parou de abrir.

Isto sustenta a base legal de consentimento na Política: a publicação é ato do usuário.

---

## 5. Compra real

### 5.1 iPhone (App Store, conta sandbox)

1. Abra o paywall. Os preços devem vir **do catálogo da loja**, não escritos no app.
2. Compre o mensal com a conta sandbox.
3. Confirme no banco:

```
node -e 'const {prisma}=require("/app/dist/config/prisma");Promise.all([prisma.assinaturas.findMany(),prisma.eventos_compra.findMany({orderBy:{id:"desc"},take:5})]).then(r=>{console.log(JSON.stringify(r,(k,v)=>typeof v==="bigint"?v.toString():v,1));process.exit(0)})'
```

**O que esperar:** uma linha em `assinaturas` com `status=ativa`, `plataforma=ios`, e um evento
`validacao_app`. Se vier `validacao_sandbox`, o `MODO_SANDBOX_COMPRAS` está errado e **o teste
não valeu**.

4. Feche e reabra o app: o acesso premium deve persistir (vem de `/assinaturas/minha`, não de
   flag local).
5. Toque em **Restaurar compras** e confirme que não duplica.
6. Minutos depois, confira se chegou notificação da Apple:

```
node -e 'const {prisma}=require("/app/dist/config/prisma");prisma.eventos_compra.findMany({where:{tipo_evento:{contains:"webhook"}},orderBy:{id:"desc"},take:5}).then(r=>{console.log(JSON.stringify(r,(k,v)=>typeof v==="bigint"?v.toString():v,1));process.exit(0)})'
```

> **Não é bug:** no sandbox a assinatura renova em minutos, não em um mês, e depois expira.

### 5.2 Android (Google Play, teste interno)

Mesma sequência, com a conta de teste. Diferença esperada: `plataforma=android`,
`id_produto_loja=premium` nas duas durações — é o modelo do Google, está documentado.

Confirme também a notificação em tempo real (RTDN) chegando, na mesma consulta de eventos.

---

## 6. Moderação e o e-mail — pelo console da Railway

Com a conta admin (passo 2) punindo a **segunda conta**.

### 6.1 Restrição temporária

```
node -e 'const s=require("/app/dist/modules/moderacao/moderacao.service");s.aplicarRestricao(BigInt(ID_ADMIN),BigInt(ID_ALVO),"post",7,"Teste de restricao").then(r=>{console.log("ok");process.exit(0)})'
```

**O que esperar:** a conta alvo recebe **e-mail** com motivo e prazo, e ao tentar publicar no app
recebe 403 com a data de término. O e-mail **não** deve falar de assinatura.

### 6.2 Suspensão da conta

Faça com a conta que **tem assinatura ativa**, para exercitar o bloco de cancelamento.

```
node -e 'const s=require("/app/dist/modules/moderacao/moderacao.service");s.bloquearConta(BigInt(ID_ADMIN),BigInt(ID_ALVO),"Teste de suspensao").then(()=>{console.log("ok");process.exit(0)})'
```

**O que esperar:**
- a sessão cai na hora e o login passa a ser recusado;
- chega e-mail com o motivo, o canal `moderacao@linguetoapp.com.br` **e** as instruções de
  cancelamento **das duas lojas**;
- o remetente é `contato@linguetoapp.com.br`.

**Se a conta alvo entrou com Apple ocultando o e-mail**, este é o teste que prova o registro do
domínio em Sign in with Apple. Se não chegar, é ali que está o problema.

Depois reative:

```
node -e 'const s=require("/app/dist/modules/moderacao/moderacao.service");s.desbloquearConta(BigInt(ID_ADMIN),BigInt(ID_ALVO),"Fim do teste").then(()=>{console.log("ok");process.exit(0)})'
```

---

## 7. Denúncia

Com a segunda conta, denuncie um post. Deve chegar e-mail em `moderacao@linguetoapp.com.br`, com
o resumo do conteúdo e o motivo.

---

## 8. Exclusão de conta — por último

Use a conta que entrou com **Apple**, porque é a única que testa a revogação.

1. Perfil → Excluir conta. **Leia o alerta:** deve avisar que apagar não cancela a assinatura e
   mostrar instruções das **duas lojas** (a versão só-iPhone foi corrigida em 20/10).
2. Confirme a exclusão.
3. **A verificação que importa:** no iPhone, Ajustes → seu nome → Iniciar sessão e segurança →
   Iniciar sessão com a Apple. **O Lingueto não pode mais aparecer na lista.** Se aparecer, a
   revogação falhou — e ela falha em silêncio de propósito, então é o único jeito de saber.
4. No banco, confirme que sobraram só os registros que a Política diz que sobram:

```
node -e 'const {prisma}=require("/app/dist/config/prisma");Promise.all([prisma.usuarios.count(),prisma.identidades_usuario.count(),prisma.posts_comunidade.count(),prisma.assinaturas.count(),prisma.eventos_compra.count(),prisma.denuncias.count(),prisma.acoes_moderacao.count()]).then(r=>{console.log("usuarios",r[0],"identidades",r[1],"posts",r[2],"assinaturas",r[3],"eventos_compra",r[4],"denuncias",r[5],"acoes_moderacao",r[6]);process.exit(0)})'
```

**O que esperar:** usuário, identidades, posts e assinaturas da conta excluída **zerados**;
`eventos_compra` e `acoes_moderacao` **permanecem** (5 anos e 6 meses, por obrigação legal).

5. Confira que os arquivos dela sumiram do S3 — a URL da foto deve parar de abrir.

---

## Resultado

| # | Item | Resultado |
|---|---|---|
| 1 | Caixa de aceite bloqueia o login | |
| 1 | Links de Termos e Política abrem | |
| 1 | Login Apple com e-mail oculto | |
| 1 | `aceites_termos` registrado | |
| 2 | Admin promovido | |
| 3 | Foto no S3 com link de 7 dias | |
| 3 | Link abre sem login | |
| 3 | Foto antiga apagada | |
| 4 | Áudio só publica com opt-in | |
| 4 | Post apagado remove o áudio | |
| 5 | Preço vindo da loja | |
| 5 | Compra iOS com `validacao_app` | |
| 5 | Acesso persiste após reabrir | |
| 5 | Restaurar compras não duplica | |
| 5 | Webhook da Apple chegou | |
| 5 | Compra Android | |
| 5 | RTDN da Google chegou | |
| 6 | E-mail de restrição | |
| 6 | E-mail de suspensão com as duas lojas | |
| 6 | Login recusado após suspensão | |
| 7 | E-mail de denúncia em `moderacao@` | |
| 8 | Alerta de exclusão cita as duas lojas | |
| 8 | **Lingueto sumiu da lista da Apple** | |
| 8 | Dados apagados, compras preservadas | |
| 8 | Arquivos sumiram do S3 | |

---

## Depois do teste

- Se a compra ficou ativa numa conta de teste, cancele a assinatura na loja.
- Anote o que falhou **com o texto do erro**, não só "não funcionou".
- A base legal que cada item sustenta está no `RELATORIO_REDACAO_POLITICA.md` e no
  `RELATORIO_REDACAO_TERMOS.md`. Item que falhar vira correção de texto **ou** de código, e a
  decisão de qual é das duas depende do que o documento promete.
