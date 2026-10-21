import * as WebBrowser from "expo-web-browser";

// Endereços públicos dos documentos legais, no domínio próprio
// linguetoapp.com.br (comprado em 14/10/2026).
//
// As duas páginas precisam estar NO AR antes de publicar nas lojas: a Apple e
// a Google pedem os dois endereços na ficha do app, e a Apple também no fluxo
// de assinatura. Enquanto o site não subir, estes links abrem em 404.
//
// Se algum endereço mudar, muda só aqui — todo lugar que mostra os documentos
// usa estas constantes.
export const URL_TERMOS = "https://linguetoapp.com.br/termos";
export const URL_PRIVACIDADE = "https://linguetoapp.com.br/privacidade";

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
