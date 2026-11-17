import React from "react";
import Svg, { Circle, Path } from "react-native-svg";
import { MEDALS } from "./goldRush";

// Medalha do Gold Rush: cinza antes da primeira, depois bronze, prata e ouro.
export function Medal({ tier, size = 58 }) {
  const medal = MEDALS[tier];
  const ribbon = tier ? ["#e05555", "#3a6fd8"] : ["#3a4470", "#2f3854"];
  return (
    <Svg width={size} height={(size * 66) / 58} viewBox="0 0 58 66">
      <Path d="M17 2h10l6 22h-10z" fill={ribbon[0]} />
      <Path d="M41 2H31l-6 22h10z" fill={ribbon[1]} />
      <Circle cx={29} cy={42} r={21} fill={medal.deep} />
      <Circle cx={29} cy={42} r={17} fill={medal.color} />
      <Path
        d="M29 31.5l3.2 6.6 7.2 1-5.2 5 1.3 7.2-6.5-3.4-6.5 3.4 1.3-7.2-5.2-5 7.2-1z"
        fill={medal.deep}
        opacity={0.85}
      />
    </Svg>
  );
}
