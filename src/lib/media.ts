/** GI-Desk media — Unsplash placeholders until real photos are supplied.
 *  All images verified: Black African women/girls, no white people.
 *  Themes match GBV survivor support, community advocacy, and education. */
const U = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const media = {
  logo: "/brand/logo.jpg",
  hero: {
    home: [
      U("1696483150935-2f719f1dfa6a"), // Muslim women community — Tanzania coast
      U("1544476613-98c049cad9d7"),    // African women raising hands at community meeting
      U("1602306115889-fe8d26d2439a"), // Woman raising her voice at community rally
      U("1607868894064-2b6e7ed1b324"), // Two African women in fabric — care and solidarity
      U("1528654787581-6cad22f4da3c"), // Maasai women group in red/blue shukas — Tanzania
    ],
    about: U("1779357807569-18d3df9df645"),    // Women in colorful kitenge at community meeting
    services: U("1744973149087-179e3ed54eae"), // Two Black women at a support session/seminar
    projects: U("1612365245810-0d73ad771b2d"), // African women in kitenge — community dialogue
    blog: U("1774870292182-d59afbebf09e"),     // East African Muslim girls at school — education
    contact: U("1696483150935-2f719f1dfa6a"),  // Muslim women community — Tanzania coast
    getInvolved: U("1544476613-98c049cad9d7"), // Women raising hands — join the movement
    careers: U("1515658323406-25d61c141a6e"),  // Samburu women community gathering — East Africa
    donate: U("1553775927-a071d5a6a39a"),      // Three African women on rural road — the reality
  },
  about: {
    community: U("1779357807569-18d3df9df645"), // Women community gathering in kitenge
    care: U("1611432580340-af48bd7549ed"),       // Two smiling Black women — friendship/support
  },
  testimonialCategories: {
    survivors: U("1607868894064-2b6e7ed1b324"), // Two women — solidarity and care
    community: U("1509099863731-ef4bff19e808"), // African girl and women in community celebration
    volunteers: U("1602306115889-fe8d26d2439a"), // Woman speaking up — advocate/volunteer spirit
    partners: U("1528654787581-6cad22f4da3c"),  // Maasai women group — community partners
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
