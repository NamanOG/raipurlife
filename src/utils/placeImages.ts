const DEFAULT_IMAGE = "/hero-bg.png";

const PLACE_IMAGE_RULES: Array<{ keywords: string[]; image: string }> = [
  { keywords: ["vivekananda sarovar", "sarovar", "lake"], image: "/places/sarovar.jpg" },
  { keywords: ["mahant ghasidas", "museum", "gallery"], image: "/places/museum.jpeg" },
  { keywords: ["purkhouti", "muktangan", "heritage"], image: "/places/purkhauti.jpg" },
  { keywords: ["barnawapara", "safari", "wildlife", "zoo"], image: "/places/barnawapara.jpg" },
  { keywords: ["dudhadhari", "gurudwara", "temple", "mandir"], image: "/places/dudhadhari.png" },
  { keywords: ["nukkad", "chai", "cafe", "restaurant", "fast food", "food"], image: "/places/nukkad.jpg" },
  { keywords: ["zora mall", "zora"], image: "/places/zora.jpg" },
  { keywords: ["ambuja", "magneto"], image: "/places/zora.jpg" },
  { keywords: ["pandri market", "pandri", "jawahar market", "gol bazaar", "gol bazar"], image: "/places/morning_raipur.jpg" },
  { keywords: ["market", "shopping", "bazaar"], image: "/places/morning_raipur.jpg" },
  { keywords: ["marine drive", "riverfront"], image: "/places/marine_drive.jpg" },
  { keywords: ["park", "garden"], image: "/places/sarovar.jpg" },
];

const CATEGORY_IMAGE_RULES: Array<{ keywords: string[]; image: string }> = [
  { keywords: ["tourism", "attraction", "viewpoint", "water park", "nature", "culture"], image: "/places/purkhauti.jpg" },
  { keywords: ["food", "restaurant", "cafe", "fast_food"], image: "/places/nukkad.jpg" },
  { keywords: ["shopping", "shop", "market", "marketplace"], image: "/places/morning_raipur.jpg" },
  { keywords: ["event", "festival", "music", "celebration"], image: "/places/morning_raipur.jpg" },
];

const CATEGORY_IMAGE_POOLS: Record<string, string[]> = {
  tourism: ["/places/sarovar.jpg", "/places/museum.jpeg", "/places/purkhauti.jpg", "/places/barnawapara.jpg"],
  food: ["/places/nukkad.jpg", "/hero-bg.png", "/places/marine_drive.jpg", "/places/sarovar.jpg"],
  shopping: ["/places/zora.jpg", "/places/morning_raipur.jpg", "/places/marine_drive.jpg", "/places/sarovar.jpg"],
  events: ["/places/morning_raipur.jpg", "/places/marine_drive.jpg", "/places/purkhauti.jpg", "/hero-bg.png"],
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const matchRule = (haystack: string, rules: Array<{ keywords: string[]; image: string }>) => {
  for (const rule of rules) {
    if (rule.keywords.some((keyword) => haystack.includes(keyword))) {
      return rule.image;
    }
  }

  return null;
};

const hashValue = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const getCategoryPoolImage = (searchable: string) => {
  const poolEntry = Object.entries(CATEGORY_IMAGE_POOLS).find(([keyword]) =>
    searchable.includes(keyword)
  );

  if (!poolEntry) {
    return null;
  }

  const [, pool] = poolEntry;
  if (pool.length === 0) {
    return null;
  }

  const index = hashValue(searchable) % pool.length;
  return pool[index];
};

type ResolvePlaceImageInput = {
  name?: string;
  category?: string;
  tags?: string[];
};

export const resolvePlaceImage = ({ name, category, tags = [] }: ResolvePlaceImageInput) => {
  const searchable = normalize([name || "", category || "", ...tags].join(" "));
  if (!searchable) {
    return DEFAULT_IMAGE;
  }

  const specificMatch = matchRule(searchable, PLACE_IMAGE_RULES);
  if (specificMatch) {
    return specificMatch;
  }

  const categoryMatch = matchRule(searchable, CATEGORY_IMAGE_RULES);
  if (categoryMatch) {
    return categoryMatch;
  }

  const categoryPoolMatch = getCategoryPoolImage(searchable);
  if (categoryPoolMatch) {
    return categoryPoolMatch;
  }

  return DEFAULT_IMAGE;
};
