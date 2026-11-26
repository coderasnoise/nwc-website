import type { Lang } from '../i18n';

export type Block = { h?: string; p?: string };
export type InfoPage = {
  id: string;
  draft: boolean;
  slug: Record<Lang, string>;
  title: Record<Lang, string>;
  description: Record<Lang, string>;
  body: Record<Lang, Block[]>;
  placeholderGallery?: boolean;
  reviewLinks?: boolean;
};

export const INFO_PAGES: InfoPage[] = [
  {
    id: 'results', draft: true, placeholderGallery: true,
    slug: { en: 'results', tr: 'sonuclar' },
    title: { en: 'Results', tr: 'Sonuçlar' },
    description: { en: 'Before and after results from Dr. Tolga Aksan.', tr: 'Dr. Tolga Aksan’ın öncesi ve sonrası sonuçları.' },
    body: {
      en: [{ p: 'Results vary from person to person and are not guaranteed. Photos are published only with the patient’s written consent.' }, { p: 'The images below are placeholders until real, consented photos are added.' }],
      tr: [{ p: 'Sonuçlar kişiden kişiye değişir ve garanti edilmez. Fotoğraflar yalnızca hastanın yazılı onayıyla yayınlanır.' }, { p: 'Aşağıdaki görseller, gerçek ve onaylı fotoğraflar eklenene kadar yer tutucudur.' }],
    },
  },
  {
    id: 'journey', draft: false,
    slug: { en: 'journey', tr: 'yolculuk' },
    title: { en: 'Your patient journey', tr: 'Hasta süreciniz' },
    description: { en: 'How it works: from a free WhatsApp consultation to recovery.', tr: 'Süreç nasıl işler: ücretsiz WhatsApp konsültasyonundan iyileşmeye.' },
    body: {
      en: [
        { h: '1. Message us on WhatsApp' }, { p: 'Tell us what you have in mind and send a few photos if you like. The online consultation is free.' },
        { h: '2. Your personal plan' }, { p: 'Dr. Aksan reviews your case and prepares a personal surgery plan and quote, sent to you on WhatsApp.' },
        { h: '3. Travel and surgery' }, { p: 'Once you decide to go ahead, we help you plan your trip to Istanbul.' },
        { h: '4. Recovery and follow-up' }, { p: 'Aftercare and check-ups are planned with you before you leave.' },
      ],
      tr: [
        { h: '1. WhatsApp’tan yazın' }, { p: 'Aklınızdakini yazın, isterseniz birkaç fotoğraf gönderin. Online konsültasyon ücretsizdir.' },
        { h: '2. Kişisel planınız' }, { p: 'Dr. Aksan durumunuzu değerlendirir, kişiye özel ameliyat planı ve teklifi WhatsApp’tan iletir.' },
        { h: '3. Seyahat ve ameliyat' }, { p: 'Devam etmeye karar verdiğinizde İstanbul seyahatinizi planlamanıza yardımcı oluruz.' },
        { h: '4. İyileşme ve takip' }, { p: 'Bakım ve kontroller ayrılmadan önce sizinle planlanır.' },
      ],
    },
  },
  {
    id: 'reviews', draft: false, reviewLinks: true,
    slug: { en: 'reviews', tr: 'yorumlar' },
    title: { en: 'Patient reviews', tr: 'Hasta yorumları' },
    description: { en: 'Independent reviews of North Western Clinic on Trustpilot and Google.', tr: 'North Western Clinic hakkında Trustpilot ve Google’daki bağımsız yorumlar.' },
    body: {
      en: [{ p: 'Read what patients write about their experience on independent review platforms.' }],
      tr: [{ p: 'Hastaların deneyimlerini bağımsız yorum platformlarında okuyabilirsiniz.' }],
    },
  },
  {
    id: 'team', draft: true,
    slug: { en: 'team', tr: 'ekip' },
    title: { en: 'Our team', tr: 'Ekibimiz' },
    description: { en: 'The doctors and patient care team of North Western Clinic.', tr: 'North Western Clinic doktorları ve hasta iletişim ekibi.' },
    body: {
      en: [{ h: 'Dr. Tolga Aksan' }, { p: 'Plastic surgeon and co-founder.' }, { h: 'Other doctors and patient care coordinators' }, { p: 'To be completed by the clinic.' }],
      tr: [{ h: 'Dr. Tolga Aksan' }, { p: 'Plastik cerrah ve kurucu ortak.' }, { h: 'Diğer doktorlar ve hasta danışmanları' }, { p: 'Klinik tarafından tamamlanacak.' }],
    },
  },
  {
    id: 'clinic', draft: false,
    slug: { en: 'clinic', tr: 'klinik' },
    title: { en: 'The clinic', tr: 'Klinik' },
    description: { en: 'North Western Clinic in Üsküdar, Istanbul: address and contact.', tr: 'Üsküdar, İstanbul’daki North Western Clinic: adres ve iletişim.' },
    body: {
      en: [{ p: 'North Western Clinic is in Acıbadem, Üsküdar, on the Asian side of Istanbul.' }, { p: 'Address: Acıbadem, Akasya AVM A2 Kule, Kat:36 Daire: 246, 34660 Üsküdar/İstanbul.' }, { p: 'The fastest way to reach us is WhatsApp.' }],
      tr: [{ p: 'North Western Clinic, İstanbul’un Anadolu yakasında, Üsküdar Acıbadem’dedir.' }, { p: 'Adres: Acıbadem, Akasya AVM A2 Kule, Kat:36 Daire: 246, 34660 Üsküdar/İstanbul.' }, { p: 'Bize ulaşmanın en hızlı yolu WhatsApp’tır.' }],
    },
  },
  {
    id: 'privacy', draft: true,
    slug: { en: 'privacy', tr: 'gizlilik' },
    title: { en: 'Privacy', tr: 'Gizlilik' },
    description: { en: 'How this website handles your data.', tr: 'Bu web sitesi verilerinizi nasıl ele alır.' },
    body: {
      en: [{ h: 'What this site collects' }, { p: 'This website has no forms and does not store personal data itself. If you message us on WhatsApp, that conversation is handled in WhatsApp under its own terms.' }, { h: 'Medical information' }, { p: 'Please share medical details only in the private consultation.' }],
      tr: [{ h: 'Bu site neleri toplar' }, { p: 'Bu web sitesinde form yoktur ve kişisel veri saklamaz. WhatsApp’tan yazarsanız görüşme WhatsApp’ın kendi koşullarıyla yürür.' }, { h: 'Sağlık bilgileri' }, { p: 'Sağlık bilgilerinizi lütfen yalnızca özel konsültasyonda paylaşın.' }],
    },
  },
  {
    id: 'terms', draft: true,
    slug: { en: 'terms', tr: 'kosullar' },
    title: { en: 'Terms and medical disclaimer', tr: 'Koşullar ve tıbbi sorumluluk reddi' },
    description: { en: 'Terms of use and medical disclaimer.', tr: 'Kullanım koşulları ve tıbbi sorumluluk reddi.' },
    body: {
      en: [{ p: 'The content on this website is general information and is not medical advice. Every surgery has risks, and results vary. A decision about treatment is made only after a personal consultation with the surgeon.' }],
      tr: [{ p: 'Bu web sitesindeki içerik genel bilgidir ve tıbbi tavsiye değildir. Her ameliyatın riskleri vardır ve sonuçlar değişir. Tedavi kararı yalnızca cerrahla yapılan kişisel konsültasyondan sonra verilir.' }],
    },
  },
];

export const infoPagePath = (page: InfoPage, lang: Lang) =>
  lang === 'en' ? `/${page.slug.en}/` : `/tr/${page.slug.tr}/`;
