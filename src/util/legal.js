import * as WebBrowser from "expo-web-browser";

// Endereços públicos dos documentos legais.
//
// Ainda vazios porque o domínio próprio não existe (o endereço atual da API é
// um subdomínio gerado pela Railway, que não serve para isso). Enquanto
// estiverem vazios, a tela de login mostra os nomes como texto comum, sem
// link — nada de botão que não abre nada.
//
// Quando o domínio estiver no ar, preencha aqui e os links passam a funcionar
// em todo lugar que usar estas constantes. As duas páginas precisam estar
// acessíveis ANTES de publicar nas lojas: a Apple e a Google pedem os dois
// endereços na ficha do app, e a Apple também no fluxo de assinatura.
export const URL_TERMOS = "";
export const URL_PRIVACIDADE = "";

// 16 para acompanhar a classificação da App Store (A16 no Brasil, calculada a
// partir do questionário). A escala da Apple é 4+, 9+, 13+, 16+ e 18+, e a
// classificação não pode ficar abaixo da idade mínima declarada nos Termos.
export const IDADE_MINIMA = 16;

// Versão dos documentos que a tela de login apresenta. Vai junto no login e o
// backend guarda em `aceites_termos` (quem aceitou, qual versão, quando).
// Mude isto sempre que os Termos ou a Política mudarem de conteúdo: é assim que
// dá para saber depois quem aceitou qual texto.
export const VERSAO_TERMOS = "2026-11-01";

export function abrirLinkLegal(url) {
  if (!url) return;
  WebBrowser.openBrowserAsync(url).catch(() => {});
}
