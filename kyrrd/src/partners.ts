/* ============================================================
   B2B partners (hotels, etc.). The hotel's QR points to
   /hotel/<slug>; the same <slug> co-brands the editor via
   /create/<plate>?partner=<slug>.
   Add a hotel = add one line here.
   ============================================================ */
export interface Partner {
  slug: string;
  name: string;
  kind?: string; // e.g. 'City Hotel', 'Museum'
}

export const PARTNERS: Record<string, Partner> = {
  ion: { slug: 'ion', name: 'ION City Hotel', kind: 'City Hotel' },
  edition: { slug: 'edition', name: 'The Reykjavík EDITION', kind: 'Hotel' },
  sand: { slug: 'sand', name: 'Sand Hotel', kind: 'Hotel' },
};

export const findPartner = (key?: string | null): Partner | undefined =>
  key ? PARTNERS[key] : undefined;
