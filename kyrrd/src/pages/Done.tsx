import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useOrder, type Order } from '../order';

const W = 1080;
const H = 1350;

function drawCover(ctx: CanvasRenderingContext2D, src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const ir = img.width / img.height;
      const cr = W / H;
      let sw: number, sh: number, sx: number, sy: number;
      if (ir > cr) {
        sh = img.height;
        sw = sh * cr;
        sx = (img.width - sw) / 2;
        sy = 0;
      } else {
        sw = img.width;
        sh = sw / cr;
        sx = 0;
        sy = (img.height - sh) / 2;
      }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);
      resolve();
    };
    img.onerror = () => resolve();
    img.src = src;
  });
}

async function renderCard(canvas: HTMLCanvasElement, order: Order) {
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // base image / gradient
  if (order.image) {
    await drawCover(ctx, order.image);
  } else {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#ffffff');
    g.addColorStop(0.55, '#e8eef0');
    g.addColorStop(0.8, '#c9d4d8');
    g.addColorStop(1, '#9fb0b6');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  try {
    await (document as unknown as { fonts?: { ready: Promise<unknown> } }).fonts?.ready;
  } catch {
    /* noop */
  }

  ctx.fillStyle = '#0b0b0c';
  const t = order.inscription || '';
  if (order.preset === 'Title') {
    ctx.textAlign = order.align === 'Left' ? 'left' : order.align === 'Right' ? 'right' : 'center';
    const x = order.align === 'Left' ? 80 : order.align === 'Right' ? W - 80 : W / 2;
    ctx.font = '500 88px "Space Grotesk", sans-serif';
    ctx.fillText(t, x, H / 2);
  } else if (order.preset === 'Field Plate') {
    ctx.textAlign = 'left';
    ctx.font = '400 26px "Inter", sans-serif';
    ctx.fillText(`${order.coords ? order.coords + ' · ' : ''}${order.date}`.toUpperCase(), 80, H - 90);
  } else if (order.preset === 'Margin Note') {
    ctx.textAlign = 'right';
    ctx.font = 'italic 400 36px "Inter", sans-serif';
    ctx.fillText(t, W - 80, H / 2);
  } else {
    // Dedication
    ctx.textAlign = 'center';
    ctx.font = '500 30px "Inter", sans-serif';
    ctx.fillText(`—   ${t.toUpperCase()}   —`, W / 2, H - 110);
  }

  // ð watermark
  ctx.textAlign = 'right';
  ctx.font = '500 40px "Space Grotesk", sans-serif';
  ctx.fillStyle = 'rgba(11,11,12,0.55)';
  ctx.fillText('ð', W - 44, H - 48);
}

export default function Done() {
  const { order } = useOrder();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (order && canvasRef.current) renderCard(canvasRef.current, order);
  }, [order]);

  if (!order) {
    return (
      <div className="wrap section" style={{ maxWidth: 720 }}>
        <div className="d-h2">Nothing to download yet.</div>
        <p className="d-body" style={{ color: 'var(--steel-d)', margin: '10px 0 20px' }}>
          Choose a photograph and sign it first.
        </p>
        <Link to="/archive" className="btn btn-primary">
          Choose a photograph
        </Link>
      </div>
    );
  }

  const download = () => {
    const c = canvasRef.current;
    if (!c) return;
    c.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `kyrrd-${order.title.toLowerCase().replace(/\s+/g, '-')}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  return (
    <div className="wrap section" style={{ maxWidth: 760 }}>
      <div className="d-label">Payment received · test mode</div>
      <h1 className="d-h1" style={{ margin: '8px 0 8px' }}>
        Your card is ready.
      </h1>
      <p className="d-body" style={{ color: 'var(--steel-d)', maxWidth: '54ch' }}>
        This is a test checkout — no real charge was made. Your signed card is below: download it now
        {order.recipient ? `, and we'd email it to ${order.recipient}` : ''}.
      </p>

      <div style={{ maxWidth: 360, margin: '24px 0', border: '1px solid var(--fog)' }}>
        <canvas ref={canvasRef} style={{ width: '100%', display: 'block' }} />
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button className="btn btn-primary" onClick={download}>
          Download your card
        </button>
        <Link to="/archive" className="btn btn-ghost">
          Make another
        </Link>
      </div>
    </div>
  );
}
