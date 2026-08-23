/**
 * Where kyrrð lives outside the site. Both addresses are kept here so there is
 * one place to change them, and the icons are drawn in a single colour rather
 * than in the platforms' own branding, which would fight the palette.
 */
export const SOCIAL = {
  instagram: 'https://www.instagram.com/kyrrd.pics',
  pinterest: 'https://www.pinterest.com/kyrrdpics/',
};

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 20c-.4-1.6 0-3.4.3-4.6l1-4.2" />
      <path d="M8.6 10.4c0-2 1.6-3.6 3.9-3.6 2.1 0 3.5 1.3 3.5 3.2 0 2.4-1.3 4.2-3.1 4.2-1 0-1.7-.8-1.5-1.8" />
    </svg>
  );
}

/** Icons only, for the footer. */
export function SocialIcons() {
  return (
    <span className="soc">
      <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="kyrrð on Instagram">
        <InstagramIcon />
      </a>
      <a href={SOCIAL.pinterest} target="_blank" rel="noopener noreferrer" aria-label="kyrrð on Pinterest">
        <PinterestIcon />
      </a>
    </span>
  );
}

/** Named buttons, for the card at the end of a field note. */
export function SocialFollow() {
  return (
    <div className="soc-follow">
      <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer">
        <InstagramIcon />
        Instagram
      </a>
      <a href={SOCIAL.pinterest} target="_blank" rel="noopener noreferrer">
        <PinterestIcon />
        Pinterest
      </a>
    </div>
  );
}
