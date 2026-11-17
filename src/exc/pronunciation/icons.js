import React from "react";
import Svg, { Circle, Path, Rect } from "react-native-svg";

// Icones do Pronunciation Lab que o Grammar Lab nao tem (os outros vem de
// ../grammarlab/icons).

function Stroke({ size = 14, color = "#fff", strokeWidth = 2.2, children }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </Svg>
  );
}

export const ArrowRightIcon = (p) => (
  <Stroke {...p}>
    <Path d="M5 12h14M13 6l6 6-6 6" />
  </Stroke>
);

export const MicIcon = (p) => (
  <Stroke {...p}>
    <Rect x="9" y="2" width="6" height="12" rx="3" />
    <Path d="M5 11a7 7 0 0 0 14 0M12 18v4" />
  </Stroke>
);

export const UsersIcon = (p) => (
  <Stroke {...p}>
    <Circle cx="9" cy="8" r="3.5" />
    <Path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
    <Path d="M17 4.5a3.5 3.5 0 0 1 0 7M18.5 14a6 6 0 0 1 3 6" />
  </Stroke>
);

export function PlayIcon({ size = 20, color = "#fff" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M8 5.5v13a1 1 0 0 0 1.5.9l10.4-6.5a1 1 0 0 0 0-1.8L9.5 4.6A1 1 0 0 0 8 5.5z"
        fill={color}
      />
    </Svg>
  );
}

export function StopIcon({ size = 14, color = "#fff" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x="5" y="5" width="14" height="14" rx="3" fill={color} />
    </Svg>
  );
}

export function SpeakerIcon({ size = 28, color = "#fff" }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M11 5L6 9H2v6h4l5 4V5z" fill={color} />
      <Path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <Path d="M19 5a10 10 0 0 1 0 14" />
    </Svg>
  );
}
