/** GI-Desk media — Unsplash placeholders until real photos are supplied. */
const U = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const media = {
  logo: "/brand/logo.jpg",
  hero: {
    home: [
      U("1696483150935-2f719f1dfa6a"), // Muslim women community gathering — Tanzania coast
      U("1779357807569-18d3df9df645"), // Women in colorful kitenge at community meeting
      U("1515658323406-25d61c141a6e"), // East African women (Samburu beaded jewellery), gathering
      U("1607868894064-2b6e7ed1b324"), // Two Black African women in African fabric — support/care
      U("1509099863731-ef4bff19e808"), // African girl and women celebrating in community
    ],
    about: U("1528654787581-6cad22f4da3c"),    // Maasai women in red/blue shukas — Tanzania
    services: U("1611432580340-af48bd7549ed"), // Two smiling Black women — support/friendship
    projects: U("1553775927-a071d5a6a39a"),    // Three African women on a rural road — empowerment
    blog: U("1744973149087-179e3ed54eae"),     // Two Black women at a seminar/session
    contact: U("1696483150935-2f719f1dfa6a"),  // Muslim women community — Tanzania coast
    getInvolved: U("1779357807569-18d3df9df645"), // Women community meeting in kitenge
    careers: U("1515658323406-25d61c141a6e"),  // Samburu/Maasai women group — community action
    donate: U("1607868894064-2b6e7ed1b324"),   // Two women supporting each other — sunset
  },
  about: {
    community: U("1779357807569-18d3df9df645"), // Women community gathering
    care: U("1744973149087-179e3ed54eae"),      // Women in a session/seminar
  },
  testimonialCategories: {
    survivors: U("1607868894064-2b6e7ed1b324"), // Two women — care and support
    community: U("1509099863731-ef4bff19e808"), // Community celebration with women and children
    volunteers: U("1611432580340-af48bd7549ed"), // Two smiling Black women
    partners: U("1528654787581-6cad22f4da3c"),  // Maasai women group — Tanzania
  },
  placeholder: "/placeholder/hero.svg",
} as const;

export function isPasadaCdn(url: string) {
  void url;
  return false;
}

export function isLogoImage(url: string) {
  return url.includes("logo.jpg") || url.includes("/brand/logo");
}

export function testimonialCategoryImage(slug: string) {
  const map = media.testimonialCategories;
  return map[slug as keyof typeof map] ?? media.hero.services;
}
