import type { CSSProperties, ReactNode } from 'react';

/** Cool / high-key photo placeholder. Pass `image` to use a real photograph. */
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
  if (image) s.backgroundImage = `url(${image})`;
  else if (gradient) (s as Record<string, string>)['--p'] = gradient;
  return (
    <div className={`ph ${className}`} style={s}>
      {sun && <span className="sun" />}
      {children}
    </div>
  );
}
