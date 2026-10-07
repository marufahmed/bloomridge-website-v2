// English lives at the root, Bangla under /bn/. Components work out the
// language from the URL, so no page has to pass it down.

export type Lang = 'en' | 'bn';

export const langOf = (path: string): Lang => (path === '/bn' || path.startsWith('/bn/') ? 'bn' : 'en');

// English and Bangla pages that are the same page in two languages. Each pair
// gets reciprocal hreflang tags and the header's language switch goes straight
// to the twin instead of the other language's home page.
const pairs: [string, string][] = [
  ['/', '/bn/'],
  ['/faq/', '/bn/faq/'],
  ['/resources/', '/bn/resources/'],
  ['/speech-therapy-dhaka/', '/bn/speech-therapy-dhaka/'],
  ['/occupational-therapy-dhaka/', '/bn/occupational-therapy-dhaka/'],
  ['/special-education-dhaka/', '/bn/special-education-dhaka/'],
  ['/social-skills-group-dhaka/', '/bn/social-skills-group-dhaka/'],
  ['/autism-support-dhaka/', '/bn/autism-support-dhaka/'],
  ['/resources/speech-delay-signs-by-age/', '/bn/resources/speech-delay-signs-by-age/'],
  ['/resources/school-readiness-checklist/', '/bn/resources/school-readiness-checklist/'],
  ['/resources/occupational-therapy-for-children-explained/', '/bn/resources/occupational-therapy-explained/'],
  ['/resources/choosing-a-therapy-centre-in-dhaka/', '/bn/resources/choosing-a-therapy-centre/'],
];

export function twinOf(path: string): { en?: string; bn?: string } {
  const p = pairs.find(([en, bn]) => en === path || bn === path);
  return p ? { en: p[0], bn: p[1] } : langOf(path) === 'bn' ? { bn: path } : { en: path };
}

export const ui = {
  en: {
    nav: [
      ['/early-intervention/', 'Early intervention'],
      ['/school-readiness/', 'School readiness'],
      ['/therapies/', 'Therapies'],
      ['/how-we-work/', 'How we work'],
      ['/fees/', 'Fees'],
      ['/resources/', 'Resources'],
      ['/faq/', 'FAQ'],
    ],
    cta: 'Book an assessment',
    ctaHref: '/contact/',
    switchLabel: 'বাংলা',
    switchTitle: 'এই পাতা বাংলায় পড়ুন',
    menu: 'Menu',
    skip: 'Skip to content',
  },
  bn: {
    nav: [
      ['/bn/', 'হোম'],
      ['/bn/speech-therapy-dhaka/', 'স্পিচ থেরাপি'],
      ['/bn/occupational-therapy-dhaka/', 'অকুপেশনাল থেরাপি'],
      ['/bn/special-education-dhaka/', 'বিশেষ শিক্ষা'],
      ['/bn/autism-support-dhaka/', 'অটিজম সহায়তা'],
      ['/bn/resources/', 'গাইড'],
      ['/bn/faq/', 'প্রশ্নোত্তর'],
    ],
    cta: 'যোগাযোগ করুন',
    ctaHref: '/bn/#contact',
    switchLabel: 'English',
    switchTitle: 'Read this page in English',
    menu: 'মেনু',
    skip: 'মূল অংশে যান',
  },
} as const;
