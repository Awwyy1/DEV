/** The little map pin used on the real card's meta line (PostcardPreview).
 *  Shared so page previews can match the export exactly. Sized in em so it
 *  scales with whatever font-size the meta row uses. */
export default function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      style={{ width: '1.29em', height: '1.29em', flex: '0 0 auto' }}
    >
      <path d="M12 21s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12z" />
      <circle cx="12" cy="9.2" r="2.4" />
    </svg>
  );
}
