import React from "react";
import Svg, { Path } from "react-native-svg";

function Stroke({ d, size = 20, color = "#0E1430", strokeWidth = 2 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d={d}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function Fill({ d, size = 14, color = "#3355FF" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d={d} fill={color} />
    </Svg>
  );
}

export const ChevronLeft = (p) => (
  <Stroke d="M15 18l-6-6 6-6" strokeWidth={2.2} {...p} />
);
export const Check = (p) => (
  <Stroke d="M5 12.5l4.5 4.5L19 7.5" strokeWidth={3} {...p} />
);
export const Cross = (p) => (
  <Stroke d="M6 6l12 12M18 6L6 18" strokeWidth={3} {...p} />
);
export const ArrowRight = (p) => (
  <Stroke d="M5 12h14M13 6l6 6-6 6" strokeWidth={2.4} {...p} />
);
export const Bulb = (p) => (
  <Stroke
    d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z"
    {...p}
  />
);
export const Trophy = (p) => (
  <Stroke
    d="M8 4h8v5a4 4 0 01-8 0V4zM8 6H5a3 3 0 003 4M16 6h3a3 3 0 01-3 4M12 13v4M9 20h6"
    {...p}
  />
);
export const Retry = (p) => (
  <Stroke d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" strokeWidth={2.2} {...p} />
);

export const Bolt = (p) => (
  <Fill d="M13 2L4.5 13.5H11L10 22l8.5-11.5H12L13 2z" {...p} />
);
