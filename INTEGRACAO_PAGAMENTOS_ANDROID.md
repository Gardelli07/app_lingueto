# Integração de Pagamentos — Android (Google Play Billing)

Guia para implementar a compra real via Google Play no app mobile do Lingueto. O iOS já está pronto (`src/services/iap.js`, `src/services/assinaturas.js`) — este documento cobre especificamente o que falta pro Android, que hoje está **completamente bloqueado**: `COMPRA_SUPORTADA = Platform.OS === "ios"` em `iap.js` impede qualquer tentativa de compra na outra plataforma.

---

## 1. A diferença de modelo que muda tudo

Na Apple, mensal e anual são **dois produtos separados** (`com.shironora.lingueto.mensal` / `.anual`). No Google Play é o oposto: **um produto só**, com os dois períodos como "base plans" dentro dele.

```
ID da assinatura (productId):  premium
Plano básico mensal:           mensal   — R$14,90/mês, 175 países
Plano básico anual:            anual    — R$200/ano (preço regular)
Oferta no plano anual:         primeiro-ano — R$89,90 no 1º ano, pagamento único,
                                só para "Aquisição de novos clientes"
```

Pacote: `com.shironora.lingueto` (mesmo valor do bundle iOS).

Isso significa: ao buscar o catálogo, o Google devolve **um produto** (`premium`) com uma lista de `subscriptionOfferDetails` — cada entrada tem um `basePlanId` (`mensal` ou `anual`) e um `offerToken` que precisa ser passado na hora de comprar. Não dá pra tratar como "dois produtos" igual no iOS.

---

## 2. Contrato do backend (já pronto e testado, não mexer)

### `POST /assinaturas/validar-compra` — variante Android

```json
{
  "plataforma": "android",
  "token_compra": "<purchaseToken retornado pela Billing Library>",
  "id_produto": "premium"
}
```

Diferente do iOS, **não existe `id_transacao`** no corpo Android — quem identifica a compra é o `token_compra` (o `purchaseToken`). `id_produto` é opcional mas recomendado (ajuda o backend a confirmar contra o item certo da resposta do Google).

### `GET /assinaturas/minha` — igual nas duas plataformas

```json
{ "acesso_completo": true, "assinatura": { "plataforma": "android", "status": "ativa", "id_produto_loja": "premium", "periodo_atual_fim": "...", "renovacao_automatica": true } }
```

Mesma regra do iOS: `acesso_completo` é quem decide liberar o app, nunca o HTTP 201 da validação sozinho.

### Limitação conhecida (aceita, não é bug)
Como mensal e anual compartilham o mesmo `productId` (`premium`), o backend **não consegue saber pela tabela `produtos_loja` qual dos dois períodos o usuário tem** — só sabe que é `premium` → plano `base`. Isso não afeta o acesso (os dois liberam o mesmo conteúdo), só significa que se algum dia for preciso exibir "você está no plano mensal/anual" na tela, essa informação precisa vir do próprio app (que sabe qual `basePlanId` comprou), não do backend.

### Webhook (já configurado e verificado, não precisa mexer)
`https://api.linguetoapp.com.br/assinaturas/webhook/google` já está recebendo notificações RTDN (Pub/Sub) do Google Play. Renovações e cancelamentos são processados automaticamente pelo backend sem depender do app estar aberto.

---

## 3. O que mudar em `src/services/iap.js`

Hoje o arquivo é 100% específico de iOS. Pontos a adaptar:

- **`COMPRA_SUPORTADA`**: trocar `Platform.OS === "ios"` por `Platform.OS === "ios" || Platform.OS === "android"`.
- **IDs de produto**: adicionar uma constante Android separada das atuais (`PRODUTO_MENSAL`/`PRODUTO_ANUAL`, que são só da Apple):
  ```js
  export const PRODUTO_ANDROID = "premium";
  ```
- **`buscarProdutos()`**: hoje chama `fetchProducts({ skus: PRODUTOS_ASSINATURA, type: "subs" })` com os SKUs fixos da Apple. No Android, busca por `PRODUTO_ANDROID` e o retorno traz `subscriptionOfferDetails` — precisa mapear cada oferta (`basePlanId` + `offerToken` + `pricingPhases`) pros dois planos exibidos no paywall, em vez de dois produtos prontos como hoje.
- **`comprar(sku)`**: no iOS é só `requestPurchase({ request: { apple: { sku } }, type: "subs" })`. No Android a Billing Library exige informar **qual oferta** (não só o produto) — precisa do `offerToken` da oferta escolhida. Isso muda a assinatura da função: ela vai precisar receber também qual `basePlanId`/oferta foi selecionada no paywall, não só o SKU.
- **`elegivelOfertaIntrodutoria()`**: é 100% iOS (`subscriptionGroupIdIOS`, `isEligibleForIntroOfferIOS`). No Android **não existe chamada equivalente** — a elegibilidade já vem embutida: se a oferta `primeiro-ano` aparecer na lista de `subscriptionOfferDetails` do produto pra aquele usuário, ele é elegível; se não aparecer, não é. Essa função pode nem ser necessária no Android, só checar se a oferta está presente no catálogo retornado.
- **`buscarAssinaturasAtivas()`**: usa `onlyIncludeActiveItemsIOS: true`, que é um parâmetro iOS — precisa ser condicional por plataforma ou removido se o Android não precisar dele.
- **`abrirGerenciarAssinaturas()`**: é só iOS (`showManageSubscriptionsIOS`, fallback pra App Store). No Android é um link direto:
  ```
  https://play.google.com/store/account/subscriptions?sku=premium&package=com.shironora.lingueto
  ```
- **`observarCompras()` / `finishTransaction`**: a estrutura de "só finalizar depois que o backend confirmar" já é o padrão certo e deve funcionar igual nas duas plataformas (a lib mapeia `finishTransaction` pra `acknowledgePurchase` por trás no Android) — mas vale testar, já que "confirmar" (`acknowledge`) no Android tem prazo de 3 dias antes de reembolso automático.

---

## 4. O que adicionar em `src/services/assinaturas.js`

Hoje só existe o trio `validarCompraApple` / `registrarCompraApple` / `restaurarComprasApple`. Precisa do equivalente Android:

```js
export function validarCompraAndroid(compra) {
  return api.post("/assinaturas/validar-compra", {
    plataforma: "android",
    token_compra: compra.purchaseToken,
    id_produto: compra.productId, // sempre "premium"
  });
}
```

`registrarCompraApple` e `restaurarComprasApple` têm lógica totalmente reaproveitável (valida → confere `/assinaturas/minha` → decide acesso) — melhor generalizar numa função única parametrizada por plataforma do que duplicar tudo copiando e colando.

---

## 5. Testando

Diferente do Sandbox Tester da Apple (conta fake, `lingueto.sandbox01@teste.com`), o Google **não tem conta de teste separada** — testa-se com uma **conta Google real**, adicionada como testadora da faixa de **Teste interno** (Play Console → Testar e lançar → Teste interno → aba Testadores → adicionar e-mail). Só compras feitas por contas dessa lista, numa build instalada pelo link de opt-in do teste interno, contam como teste (não cobram de verdade).

---

## 6. Risco conhecido — resolver junto, já que vão mexer nesse código mesmo

O mesmo problema documentado pro iOS (restaurar a mesma compra em contas Lingueto diferentes libera acesso nas duas, sem limite) existe aqui. O equivalente Android do `appAccountToken` da Apple é o **`obfuscatedAccountIdAndroid`** — passado na hora da compra pra vincular a transação à conta do usuário. Como vocês vão estar exatamente nesse trecho de código (`comprar()`), faz sentido implementar nas duas plataformas na mesma rodada em vez de deixar pra depois.
