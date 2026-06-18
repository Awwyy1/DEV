import type { CSSProperties, ReactNode } from 'react';

/**
 * Cool / high-key photo surface.
 * - `gradient` is the placeholder AND the loading fallback (sits behind).
 * - `image` (a real photo) renders as a crisp <img> on top, no white wash.
 */
export function Photo({
  gradient,
  image,
  sun = true,
  style,
  className = '',
  children,
}: {
  gradient?: string;
  image?: string;
  sun?: boolean;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
}) {
  const s: CSSProperties = { ...style };
  if (gradient) (s as Record<string, string>)['--p'] = gradient;
  return (
    <div className={`ph ${image ? 'has-img' : ''} ${className}`} style={s}>
      {image ? <img className="ph-img" src={image} alt="" loading="lazy" /> : sun && <span className="sun" />}
      {children}
    </div>
  );
}
