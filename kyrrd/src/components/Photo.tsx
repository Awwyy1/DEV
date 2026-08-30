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
  alt = '',
  eager = false,
  position,
  children,
}: {
  gradient?: string;
  image?: string;
  sun?: boolean;
  style?: CSSProperties;
  className?: string;
  alt?: string;
  /** Above the fold: skip lazy loading so the largest paint is not deferred. */
  eager?: boolean;
  /** object-position for the crop, e.g. 'top' to keep a tall subject's head. */
  position?: string;
  children?: ReactNode;
}) {
  const s: CSSProperties = { ...style };
  if (gradient) (s as Record<string, string>)['--p'] = gradient;
  return (
    <div className={`ph ${image ? 'has-img' : ''} ${className}`} style={s}>
      {image ? (
        <img
          className="ph-img"
          src={image}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          {...(eager ? { fetchPriority: 'high' as const } : {})}
          style={position ? { objectPosition: position } : undefined}
        />
      ) : (
        sun && <span className="sun" />
      )}
      {children}
    </div>
  );
}
