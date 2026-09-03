/** GI-Desk media — Unsplash placeholders until real photos are supplied. */
const U = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const media = {
  logo: "/brand/logo.jpg",
  hero: {
    home: [
      U("1594608661623-aa0bd3a69d98"), // women community group
      U("1488521787991-ed7bbaae773c"), // support / holding hands
      U("1531206715517-5c0ba140b2b8"), // community meeting
      U("1573497019940-1c28c88b4f3e"), // counseling / support
      U("1503676260728-1c00da094a0b"), // education / classroom Africa
    ],
    about: U("1531206715517-5c0ba140b2b8"),
    services: U("1573497019940-1c28c88b4f3e"),
    projects: U("1594608661623-aa0bd3a69d98"),
    blog: U("1488521787991-ed7bbaae773c"),
    contact: U("1503676260728-1c00da094a0b"),
    getInvolved: U("1594608661623-aa0bd3a69d98"),
    careers: U("1531206715517-5c0ba140b2b8"),
    donate: U("1488521787991-ed7bbaae773c"),
  },
  about: {
    community: U("1594608661623-aa0bd3a69d98"),
    care: U("1573497019940-1c28c88b4f3e"),
  },
  testimonialCategories: {
    survivors: U("1573497019940-1c28c88b4f3e"),
    community: U("1594608661623-aa0bd3a69d98"),
    volunteers: U("1531206715517-5c0ba140b2b8"),
    partners: U("1488521787991-ed7bbaae773c"),
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
