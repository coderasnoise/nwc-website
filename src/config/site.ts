export const REVIEW_NOTICE = 'Draft: pending professional review';
export const REVIEW_NOTICE_TR = 'Taslak: profesyonel inceleme bekliyor';

export const site = {
  // Set to false only at launch (see docs/launch-checklist.md): removes noindex and the draft notice.
  draftMode: true,
  name: 'North Western Clinic',
  url: 'https://northwesternclinic.com',
  doctor: {
    name: 'Dr. Tolga Aksan',
    title: { en: 'Plastic Surgeon', tr: 'Plastik Cerrah' },
  },
  // To be confirmed by the clinic.
  whatsappNumber: '905421548578',
  phoneDisplay: '+90 542 154 85 78',
  email: 'TODO_CONFIRM_EMAIL',
  address: 'Acıbadem, Akasya AVM A2 Kule, Kat:36 Daire: 246, 34660 Üsküdar/İstanbul',
  mapUrl: 'https://maps.app.goo.gl/8krXMKcgznFEqYLK6',
  // unverified: confirm with the clinic before launch.
  stats: { operations: '9000+', years: '16', unverified: true },
  reviewLinks: {
    trustpilot: 'https://www.trustpilot.com/review/northwesternclinic.com',
    google: 'https://maps.app.goo.gl/8krXMKcgznFEqYLK6',
    aggregate: undefined as undefined | { rating: number; count: number },
  },
};
