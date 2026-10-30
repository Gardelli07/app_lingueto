import React from "react";
import Svg, { Circle, Path, Rect } from "react-native-svg";

const stroke = (color, width) => ({
  fill: "none",
  stroke: color,
  strokeWidth: width,
  strokeLinecap: "round",
  strokeLinejoin: "round",
});

export const CloseIcon = ({ size = 18, color = "#fff", width = 4 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M5 5l14 14M19 5L5 19" {...stroke(color, width)} />
  </Svg>
);

export const XIcon = ({ size = 16, color = "#fff", width = 3.5 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M6 6l12 12M18 6L6 18" {...stroke(color, width)} />
  </Svg>
);

export const CheckIcon = ({ size = 20, color = "#fff", width = 3.2 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M5 12.5l4.5 4.5L19 7.5" {...stroke(color, width)} />
  </Svg>
);

export const BackIcon = ({ size = 20, color = "#fff" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M15 18l-6-6 6-6" {...stroke(color, 2.5)} />
  </Svg>
);

export const ArrowIcon = ({ size = 20, color = "#fff" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M5 12h14M13 6l6 6-6 6" {...stroke(color, 2.5)} />
  </Svg>
);

export const PauseIcon = ({ color = "#fff" }) => (
  <Svg width={16} height={20} viewBox="0 0 18 22">
    <Rect x="2" y="1" width="4.5" height="20" rx="1" fill={color} />
    <Rect x="11.5" y="1" width="4.5" height="20" rx="1" fill={color} />
  </Svg>
);

export const PlayIcon = ({ color = "#fff" }) => (
  <Svg width={18} height={20} viewBox="0 0 18 22">
    <Path d="M3 2.2v17.6a1 1 0 0 0 1.5.9l13-8.8a1 1 0 0 0 0-1.7l-13-8.8A1 1 0 0 0 3 2.2z" fill={color} />
  </Svg>
);

export const BoltIcon = ({ size = 16, color = "#7E90FF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill={color} />
  </Svg>
);

export const TrophyIcon = ({ size = 16, color = "#A3ABC4" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"
      {...stroke(color, 2)}
    />
  </Svg>
);

export const BulbIcon = ({ size = 24, color = "#F3F5FA" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z"
      {...stroke(color, 2)}
    />
  </Svg>
);

export const RetryIcon = ({ size = 20, color = "#F79A91" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M3 12a9 9 0 1 0 3-6.7" {...stroke(color, 2.4)} />
    <Path d="M3 4v5h5" {...stroke(color, 2.4)} />
  </Svg>
);

export const BookIcon = ({ size = 20, color = "#F79A91" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M2 5h7a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H2zM22 5h-7a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h8z"
      {...stroke(color, 2.2)}
    />
  </Svg>
);

export const TapIcon = ({ size = 14, color = "#A3ABC4" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M9 11V6a2 2 0 0 1 4 0v5" {...stroke(color, 2)} />
    <Path
      d="M13 10a2 2 0 0 1 4 0v1a2 2 0 0 1 4 0v4a6 6 0 0 1-6 6h-2a6 6 0 0 1-5-2.7L5 14a2 2 0 0 1 3-2.6l1 1"
      {...stroke(color, 2)}
    />
  </Svg>
);

// Anel de progresso (meta do dia).
export const Ring = ({
  size = 50,
  progress = 0,
  track = "#23544F",
  color = "#2FAE8A",
  width = 6,
}) => {
  const r = (size - width) / 2 - 1;
  const c = 2 * Math.PI * r;
  return (
    <Svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ transform: [{ rotate: "-90deg" }] }}
    >
      <Circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={width} />
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={`${c}`}
        strokeDashoffset={c * (1 - Math.max(0, Math.min(1, progress)))}
      />
    </Svg>
  );
};
