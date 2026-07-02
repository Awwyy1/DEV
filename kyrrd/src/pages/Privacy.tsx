import { useSeo } from '../seo';

export default function Privacy() {
  useSeo('Privacy — kyrrð', 'How kyrrð handles your data.');
  return (
    <div className="wrap section article">
      <div className="d-label">Privacy</div>
      <h1 className="d-h1" style={{ margin: '10px 0 18px' }}>
        Privacy
      </h1>
      <div className="article-body">
        <p className="lede">kyrrð is built to need as little of your data as possible.</p>
        <p>
          You can browse the archive and the journal without an account and without giving us any
          personal details. When you personalize a card, the photo you choose and the words you write
          stay in your browser to build the preview. They are not uploaded to or stored on our
          servers.
        </p>
        <p>
          We may use privacy-friendly, aggregate analytics to understand which pages are read, without
          tracking you across the web and without selling any data. If we ever add accounts, payments,
          or email delivery, we will update this page to explain exactly what is collected and why,
          before those features go live.
        </p>
        <p>If you have a question about your data, write to hello@kyrrd.pics.</p>
      </div>
    </div>
  );
}
