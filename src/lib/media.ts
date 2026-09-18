const U = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const media = {
  logo: "/brand/logo.jpg",
  hero: {
    // Homepage slideshow — 4 real GI-Desk photos uploaded by client
    home: [
      "/images/hero-woman-window.png",   // African woman at window — survivor resilience
      "/images/hero-hands-eyes.png",     // Hands covering eyes — silenced voices
      "/images/hero-family-1.webp",      // Tanzanian mother with daughters — community
      "/images/hero-family-2.webp",      // Family warmth — hope and healing
    ],
    about:      U("1779357807569-18d3df9df645"), // Women in kitenge at community meeting
    services:   U("1607868894064-2b6e7ed1b324"), // Two African women — support session
    projects:   U("1612365245810-0d73ad771b2d"), // African women in kitenge — community dialogue
    blog:       U("1774870292182-d59afbebf09e"), // East African Muslim girls at school
    contact:    U("1696483150935-2f719f1dfa6a"), // Muslim women community — Tanzania coast
    getInvolved:U("1544476613-98c049cad9d7"),    // Women raising hands — join us
    careers:    U("1553775927-a071d5a6a39a"),    // Three African women on rural road
    donate:     U("1602306115889-fe8d26d2439a"), // Woman at community rally — give
    testimonials:U("1509099863731-ef4bff19e808"),// African women in community celebration
  },
  about: {
    community: U("1528654787581-6cad22f4da3c"), // Women community care — about section banner
    care:      U("1611432580340-af48bd7549ed"),
  },
  // Fallback images for service cards (used when Sanity has no image — cycles by index)
  serviceFallbacks: [
    U("1607868894064-2b6e7ed1b324"), // Two African women — support session
    U("1602306115889-fe8d26d2439a"), // Woman speaking — advocacy
    U("1779357807569-18d3df9df645"), // Women in kitenge — community
    U("1544476613-98c049cad9d7"),    // Women raising hands — empowerment
    U("1612365245810-0d73ad771b2d"), // African women dialogue — prevention
    U("1553775927-a071d5a6a39a"),    // Three women on road — outreach
    U("1509099863731-ef4bff19e808"), // Community celebration — unity
    U("1696483150935-2f719f1dfa6a"), // Muslim women — coastal Tanzania
    U("1528654787581-6cad22f4da3c"), // Women community — care
    U("1774870292182-d59afbebf09e"), // School girls — education
  ],
  testimonialCategories: {
    survivors:  U("1607868894064-2b6e7ed1b324"),
    community:  U("1509099863731-ef4bff19e808"),
    volunteers: U("1602306115889-fe8d26d2439a"),
    partners:   U("1528654787581-6cad22f4da3c"),
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
