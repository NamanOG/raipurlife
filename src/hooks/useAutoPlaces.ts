import { useEffect, useMemo, useState } from "react";

type AutoCategory = "tourism" | "food" | "shopping";

type OverpassElement = {
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
};

export interface AutoPlace {
  name: string;
  description: string;
  location: string;
  image: string;
  category: string;
  rating: number;
  hours?: string;
  price?: string;
  tags?: string[];
}

const RAIPUR_BBOX = "21.18,81.55,21.32,81.75";
const CACHE_TTL_MS = 12 * 60 * 60 * 1000;

const IMAGE_POOL: Record<AutoCategory, string[]> = {
  tourism: ["/places/sarovar.jpg", "/places/museum.jpeg", "/places/purkhauti.jpg", "/places/barnawapara.jpg"],
  food: ["/places/nukkad.jpg", "/places/Traditional.png", "/hero-bg.png", "/places/urban.png"],
  shopping: ["/places/zora.jpg", "/places/urban.png", "/places/Traditional.png", "/hero-bg.png"],
};

const QUERY_BY_CATEGORY: Record<AutoCategory, string> = {
  tourism: `
    [out:json][timeout:25];
    (
      node["tourism"~"attraction|museum|gallery|viewpoint|zoo|theme_park"](${RAIPUR_BBOX});
      way["tourism"~"attraction|museum|gallery|viewpoint|zoo|theme_park"](${RAIPUR_BBOX});
      node["leisure"~"park|garden"](${RAIPUR_BBOX});
      way["leisure"~"park|garden"](${RAIPUR_BBOX});
    );
    out center 60;
  `,
  food: `
    [out:json][timeout:25];
    (
      node["amenity"~"restaurant|cafe|fast_food|food_court"](${RAIPUR_BBOX});
      way["amenity"~"restaurant|cafe|fast_food|food_court"](${RAIPUR_BBOX});
    );
    out center 80;
  `,
  shopping: `
    [out:json][timeout:25];
    (
      node["shop"](${RAIPUR_BBOX});
      way["shop"](${RAIPUR_BBOX});
      node["amenity"="marketplace"](${RAIPUR_BBOX});
      way["amenity"="marketplace"](${RAIPUR_BBOX});
    );
    out center 80;
  `,
};

const toTitleCase = (value: string) =>
  value
    .split(/[ _-]/g)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");

const seededRating = (seed: string) => {
  let hash = 0;

  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }

  const normalized = Math.abs(hash % 8);
  return Number((4.1 + normalized * 0.1).toFixed(1));
};

const getLocationLabel = (tags: Record<string, string>) => {
  return (
    tags["addr:suburb"] ||
    tags["addr:street"] ||
    tags["addr:city"] ||
    tags["addr:district"] ||
    "Raipur"
  );
};

const buildDescription = (category: AutoCategory, tags: Record<string, string>) => {
  if (category === "tourism") {
    const type = tags.tourism || tags.leisure || "Attraction";
    return `${toTitleCase(type)} spot in Raipur with local interest and visitor activity.`;
  }

  if (category === "food") {
    const cuisine = tags.cuisine?.split(";").map(toTitleCase).join(", ");
    if (cuisine) {
      return `${cuisine} serving place frequently listed in local map data.`;
    }
    return "Popular food stop listed in open map data for Raipur.";
  }

  const type = tags.shop || tags.amenity || "Market";
  return `${toTitleCase(type)} destination in Raipur for regular shopping visits.`;
};

const buildTags = (category: AutoCategory, tags: Record<string, string>) => {
  if (category === "food") {
    const cuisineTags = (tags.cuisine || "")
      .split(";")
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 2)
      .map(toTitleCase);

    return cuisineTags.length > 0 ? cuisineTags : ["Local Spot", "Community Listed"];
  }

  return undefined;
};

const mapElementsToPlaces = (category: AutoCategory, elements: OverpassElement[]) => {
  const unique = new Map<string, AutoPlace>();

  elements.forEach((element, index) => {
    const tags = element.tags || {};
    const name = tags.name?.trim();

    if (!name || unique.has(name.toLowerCase())) {
      return;
    }

    const image = IMAGE_POOL[category][index % IMAGE_POOL[category].length];
    const location = getLocationLabel(tags);

    unique.set(name.toLowerCase(), {
      name,
      description: buildDescription(category, tags),
      location,
      image,
      category: toTitleCase(tags.tourism || tags.leisure || tags.shop || tags.amenity || category),
      rating: seededRating(name),
      hours: tags.opening_hours ? tags.opening_hours : "Check locally",
      price: category === "food" ? "₹120 - ₹400" : undefined,
      tags: buildTags(category, tags),
    });
  });

  return Array.from(unique.values()).slice(0, 8);
};

const getCacheKey = (category: AutoCategory) => `raipur-auto-places-${category}-v1`;

export const useAutoPlaces = (category: AutoCategory, fallback: AutoPlace[]) => {
  const [places, setPlaces] = useState<AutoPlace[]>(fallback);
  const [isLoading, setIsLoading] = useState(false);
  const [source, setSource] = useState<"osm" | "curated">("curated");

  useEffect(() => {
    const controller = new AbortController();
    const cacheKey = getCacheKey(category);

    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as {
          timestamp: number;
          places: AutoPlace[];
        };

        if (Date.now() - parsed.timestamp < CACHE_TTL_MS && parsed.places.length > 0) {
          setPlaces(parsed.places);
          setSource("osm");
          return () => controller.abort();
        }
      } catch {
        localStorage.removeItem(cacheKey);
      }
    }

    const loadPlaces = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("https://overpass-api.de/api/interpreter", {
          method: "POST",
          body: QUERY_BY_CATEGORY[category],
          signal: controller.signal,
        });

        const json = (await response.json()) as { elements?: OverpassElement[] };
        const mapped = mapElementsToPlaces(category, json.elements || []);

        if (mapped.length > 0) {
          setPlaces(mapped);
          setSource("osm");
          localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), places: mapped }));
        } else {
          setPlaces(fallback);
          setSource("curated");
        }
      } catch {
        setPlaces(fallback);
        setSource("curated");
      } finally {
        setIsLoading(false);
      }
    };

    void loadPlaces();

    return () => controller.abort();
  }, [category, fallback]);

  const isLive = useMemo(() => source === "osm", [source]);

  return {
    places,
    isLoading,
    source,
    isLive,
  };
};
