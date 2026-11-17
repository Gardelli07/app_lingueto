import React from "react";
import Svg, { G, Line, Path, Text as SvgText } from "react-native-svg";
import { colors } from "./theme";

// Vista lateral da boca fazendo /θ/: ponta da lingua entre os dentes, ar
// saindo pela frente e cordas vocais relaxadas (etapa Understand, Exercise35).
export function MouthDiagram() {
  return (
    <Svg
      width="100%"
      height={210}
      viewBox="0 0 340 210"
      accessibilityLabel="Vista lateral da boca: a ponta da língua fica entre os dentes de cima e de baixo, e o ar sai pela frente"
    >
      {/* perfil */}
      <Path d="M40 18 C 120 10, 200 18, 232 40 C 250 52, 262 62, 268 76 L 276 80 C 284 84, 284 92, 274 94 C 262 96, 252 96, 248 98" fill="none" stroke="#5d6890" strokeWidth={2.5} strokeLinecap="round" />
      <Path d="M248 98 C 258 100, 262 104, 258 108" fill="none" stroke="#e0a3a3" strokeWidth={5} strokeLinecap="round" />
      <Path d="M256 124 C 262 128, 260 134, 250 136" fill="none" stroke="#e0a3a3" strokeWidth={5} strokeLinecap="round" />
      <Path d="M250 136 C 250 150, 246 166, 236 176 C 222 190, 190 196, 160 198" fill="none" stroke="#5d6890" strokeWidth={2.5} strokeLinecap="round" />
      {/* palato */}
      <Path d="M70 92 C 110 70, 170 66, 214 84 L 232 94" fill="none" stroke="#3a4470" strokeWidth={2} strokeDasharray="4 4" />
      {/* dentes */}
      <Path d="M226 92 L 242 94 L 240 112 C 236 116, 230 114, 228 110 Z" fill="#f4f1ea" stroke="#c9c2b4" strokeWidth={1.5} />
      <Path d="M222 140 L 238 136 L 240 120 C 236 117, 229 118, 227 122 Z" fill="#f4f1ea" stroke="#c9c2b4" strokeWidth={1.5} />
      {/* lingua, ponta entre os dentes */}
      <Path d="M84 160 C 100 128, 150 108, 200 110 C 222 110, 238 112, 252 116 C 258 117, 258 121, 252 122 C 236 126, 220 130, 204 134 C 160 146, 120 158, 96 172 Z" fill="#d9707a" stroke="#b5525d" strokeWidth={1.5} />
      <Path d="M120 148 C 160 130, 200 124, 236 120" fill="none" stroke="#b5525d" strokeWidth={1} opacity={0.6} />
      {/* garganta e cordas vocais */}
      <Path d="M70 92 C 60 120, 60 160, 66 204" fill="none" stroke="#3a4470" strokeWidth={2} />
      <Path d="M96 172 C 92 184, 92 196, 94 206" fill="none" stroke="#3a4470" strokeWidth={2} />
      <Path d="M70 190 L 80 186 M 92 190 L 82 186" stroke="#7cc4ff" strokeWidth={2.5} strokeLinecap="round" />
      {/* ar */}
      <Path d="M260 118 L 322 112" fill="none" stroke={colors.lime} strokeWidth={3} strokeLinecap="round" strokeDasharray="8 4" />
      <Path d="M262 124 L 320 130" fill="none" stroke={colors.lime} strokeWidth={3} strokeLinecap="round" strokeDasharray="8 4" />
      <Path d="M314 106 L 324 112 L 314 117" fill="none" stroke={colors.lime} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      {/* legendas */}
      <G fontSize={11} fontWeight="700">
        <Line x1={236} y1={92} x2={214} y2={52} stroke="#7f8aad" strokeWidth={1} />
        <SvgText x={150} y={48} fill="#c9cfe4">Dentes de cima</SvgText>
        <Line x1={232} y1={138} x2={222} y2={176} stroke="#7f8aad" strokeWidth={1} />
        <SvgText x={166} y={190} fill="#c9cfe4">Dentes de baixo</SvgText>
        <Line x1={250} y1={119} x2={268} y2={152} stroke="#7f8aad" strokeWidth={1} />
        <SvgText x={262} y={166} fill="#f2a7ae">Ponta da língua</SvgText>
        <SvgText x={292} y={100} fill={colors.lime}>Ar</SvgText>
        <SvgText x={8} y={182} fill="#7cc4ff">Cordas vocais</SvgText>
        <SvgText x={8} y={196} fill="#7cc4ff">relaxadas</SvgText>
      </G>
    </Svg>
  );
}
