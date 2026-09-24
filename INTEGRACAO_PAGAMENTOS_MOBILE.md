# Integração de Pagamentos — App Mobile

Guia para implementar a compra real (StoreKit) no app mobile do Lingueto, conectando com o backend de assinaturas já pronto neste repositório.

---

## Contexto

O backend (`api_lingueto`) já tem toda a validação de compra pronta e testada — Apple StoreKit Server API, Google Play Developer API, webhooks assinados, tudo funcionando (ver [contextoapi.md](contextoapi.md), seção `/assinaturas`, e [src/modules/assinaturas/compras.service.ts](src/modules/assinaturas/compras.service.ts)).

O que falta é só o lado do app: hoje ele não tem nenhuma integração real de IAP — o botão de upgrade grava um flag local (`AsyncStorage`) e o serviço de compra chama um endpoint fake que não valida nada de verdade.

Este documento descreve exatamente o que precisa mudar no app pra conectar com o backend real.

---

## 1. Instalar uma lib de IAP

Não existe `react-native-iap`, `expo-in-app-purchases` nem RevenueCat no projeto ainda. Recomendado: **`react-native-iap`** (mais madura, suporta StoreKit 2).

**Importante**: como o projeto usa Expo, compra dentro do app **não funciona no Expo Go** — exige build nativo via **EAS Build** com um **development client** (ou build de produção). Isso muda o fluxo de teste: não dá pra testar rodando `expo start` e escaneando o QR code normalmente.

---

## 2. IDs de produto reais (já cadastrados na Apple)

```
Mensal: com.shironora.lingueto.mensal   (1 mês, R$14,90)
Anual:  com.shironora.lingueto.anual    (1 ano, R$200 regular / R$89,90 no 1º ano)
```

Use esses IDs exatos ao chamar `getSubscriptions()` / `requestSubscription()` da lib — a Apple já tem os preços, nomes e ofertas configurados, então **não precisa hardcodear preço no app**, só buscar do catálogo da loja.

Google Play ainda não tem produtos cadastrados (aguardando DUNS da empresa) — foco inicial deve ser só iOS.

---

## 3. Contrato da API — `POST /assinaturas/validar-compra`

Depois que a compra é confirmada no StoreKit, o app chama esse endpoint (rota já existe e funciona):

```
POST /assinaturas/validar-compra
Authorization: Bearer <access_token>   (o JWT do login que já existe no app)
Content-Type: application/json

{
  "plataforma": "ios",
  "id_transacao": "<transactionId retornado pelo StoreKit>",     // OBRIGATÓRIO no iOS
  "token_compra": "<mesmo transactionId, ou o JWS da transação>", // obrigatório, 8-10000 chars, guardado só pra auditoria
  "id_produto": "com.shironora.lingueto.mensal"                  // opcional
}
```

Pra iOS, quem realmente valida a compra é o `id_transacao` — o backend consulta a Apple direto pelo App Store Server API usando esse ID. O `token_compra` é obrigatório no schema mas não é usado pra validar no caminho da Apple (só fica salvo pra histórico) — pode mandar o mesmo `transactionId` nos dois campos se não tiver outro valor à mão.

**Resposta**: `201` com o objeto `assinatura` (status, período de vigência, etc.) se validou certo. Erros de validação (compra rejeitada pela Apple, produto não mapeado etc.) vêm como erro HTTP com mensagem — tratar como falha de compra na UI.

---

## 4. Onde plugar no código atual

- Trocar `upgradeToFullAccessPlan()` (`AuthContext.js`) pra não gravar mais um flag local — o estado de acesso deve vir do backend (via `/nivelamento` / permissões, que já existe) depois que a compra for validada.
- Reescrever `services/assinaturas.js` pra chamar o endpoint real acima em vez do sandbox fake.
- Implementar **Restore Purchases** (obrigatório pela Apple) — usar o mesmo endpoint, reenviando o `id_transacao` de uma compra já existente.

---

## 5. Como testar

Use a conta de sandbox já criada no App Store Connect: **`lingueto.sandbox01@teste.com`** (Brasil). Numa build de dev client/TestFlight, ao tentar comprar, o iOS vai pedir login com essa conta em vez da conta real do Apple ID do dispositivo.

Se quiser testar o fluxo do backend **sem** depender do StoreKit funcionando ainda, o backend tem `MODO_SANDBOX_COMPRAS=true` — nesse modo qualquer chamada ao endpoint aplica uma compra fake sem consultar a Apple. Útil pra validar a integração da chamada HTTP antes de ter o StoreKit funcionando de verdade, mas não substitui o teste real com a conta sandbox.
