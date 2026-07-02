import { useSeo } from '../seo';

export default function Terms() {
  useSeo('Terms — kyrrð', 'The terms for using kyrrð.');
  return (
    <div className="wrap section article">
      <div className="d-label">Terms</div>
      <h1 className="d-h1" style={{ margin: '10px 0 18px' }}>
        Terms
      </h1>
      <div className="article-body">
        <p className="lede">A few plain terms for using kyrrð.</p>
        <p>
          kyrrð offers digital photo-cards for personal use. The photographs belong to kyrrð and to
          the photographers we work with. When you make a card you receive a licence to use that image
          for personal, non-commercial purposes, such as sending it to someone or keeping it for
          yourself. You may not resell the photographs, redistribute them, or use them commercially.
        </p>
        <p>
          The words you add to a card are yours, and you are responsible for them. Please do not add
          anything unlawful or anything that infringes on someone else's rights.
        </p>
        <p>
          The service is provided as it is, without warranties, and to the extent the law allows we are
          not liable for indirect or incidental losses. We may update these terms as the project grows,
          and any changes will appear on this page.
        </p>
        <p>Questions are welcome at hello@kyrrd.pics.</p>
      </div>
    </div>
  );
}
