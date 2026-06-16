import type { CSSProperties } from 'react';

/** Wordmark — Space Grotesk Medium, lowercase, the ð is the only coloured glyph. */
export function Wordmark({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <span className={`wm ${className}`} style={style}>
      kyrr<span className="eth">ð</span>
    </span>
  );
}

/** The Mark — square seal. `label` adds the brand line beneath the ð. */
export function Mark({ size = 104, label = true }: { size?: number; label?: boolean }) {
  return (
    <svg className="seal" width={size} height={size} viewBox="0 0 120 120" fill="none" aria-label="kyrrð mark">
      <rect x="12" y="12" width="96" height="96" stroke="currentColor" strokeWidth="1" />
      <text
        x="60"
        y={label ? 74 : 80}
        textAnchor="middle"
        fontSize={label ? 48 : 58}
        fill="currentColor"
        style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
      >
        ð
      </text>
      {label && (
        <text x="60" y="99" textAnchor="middle" fontSize="6.5" letterSpacing="4" fill="currentColor" style={{ fontFamily: "'Inter', sans-serif" }}>
          KYRRÐ
        </text>
      )}
    </svg>
  );
}
