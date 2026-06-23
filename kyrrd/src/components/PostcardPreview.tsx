export type StyleId = 'editorial' | 'polaroid' | 'minimal' | 'cinematic' | 'vintage';

export interface CardPhoto {
  url: string;
  location: string;
}

interface PostcardPreviewProps {
  photo: CardPhoto;
  message: string;
  sender: string;
  styleId: StyleId;
}

function Pin() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      style={{ flex: '0 0 auto' }}
    >
      <path d="M12 21s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12z" />
      <circle cx="12" cy="9.2" r="2.4" />
    </svg>
  );
}

/**
 * The postcard canvas is a fixed 1080x1350 (4:5). The editor scales it down
 * visually with a CSS transform so it fits on screen.
 */
export default function PostcardPreview({ photo, message, sender, styleId }: PostcardPreviewProps) {
  return (
    <div className={`pc pc--${styleId}`}>
      {styleId === 'editorial' && (
        <>
          <img src={photo.url} alt="" className="pc-ed__img" />
          <div className="pc-ed__grad" />
          <div className="pc-ed__body">
            <p className="pc-ed__msg">{message || 'Your beautiful message goes here'}</p>
            <div className="pc-ed__meta">
              <span className="pc-ed__loc">
                <Pin /> {photo.location}
              </span>
              <span>{sender ? `From ${sender}` : ''}</span>
            </div>
          </div>
        </>
      )}

      {styleId === 'polaroid' && (
        <div className="pc-pol">
          <div className="pc-pol__imgwrap">
            <img src={photo.url} alt="" />
          </div>
          <div className="pc-pol__cap">
            <p className="pc-pol__msg">{message || 'Thinking of you...'}</p>
            <p className="pc-pol__meta">
              {photo.location} {sender ? `— ${sender}` : ''}
            </p>
          </div>
        </div>
      )}

      {styleId === 'minimal' && (
        <div className="pc-min">
          <div className="pc-min__imgwrap">
            <img src={photo.url} alt="" />
          </div>
          <div className="pc-min__content">
            <p className="pc-min__msg">{message || 'A minimalist greeting.'}</p>
            <div className="pc-min__meta">
              <p className="pc-min__loc">{photo.location}</p>
              <p className="pc-min__sender">{sender ? `xoxo, ${sender}` : ''}</p>
            </div>
          </div>
        </div>
      )}

      {styleId === 'cinematic' && (
        <div className="pc-cin">
          <div className="pc-cin__imgwrap">
            <img src={photo.url} alt="" />
          </div>
          <div className="pc-cin__msg">
            <p>"{message || 'It feels like a movie here.'}"</p>
          </div>
          <div className="pc-cin__bar">
            <span>REC // 00:00:00:00</span>
            <span>
              {photo.location} {sender ? `— ${sender}` : ''}
            </span>
          </div>
        </div>
      )}

      {styleId === 'vintage' && (
        <div className="pc-vin">
          <div className="pc-vin__frame" />
          <div className="pc-vin__imgwrap">
            <img src={photo.url} alt="" />
            <div className="pc-vin__tint" />
            <div className="pc-vin__cap">
              <p className="pc-vin__msg">{message || 'Greetings from far away...'}</p>
              <div className="pc-vin__meta">
                <span>{photo.location}</span>
                <span className="pc-vin__sender">{sender}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
