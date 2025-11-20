
import { Place, Category } from "@/types";

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

export const formatReviewCount = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

export const getCategoryIcon = (categoryName: string): string => {
  const iconMap: Record<string, string> = {
    restaurants: "utensils",
    cafes: "coffee", 
    shopping: "shopping-bag",
    tourism: "map-pin",
    healthcare: "heart",
    education: "book"
  };
  
  return iconMap[categoryName.toLowerCase()] || "map-pin";
};

export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength).trim() + "...";
};

export const getTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return date.toLocaleDateString();
};

export const searchPlaces = (places: Place[], query: string): Place[] => {
  const lowercaseQuery = query.toLowerCase();
  return places.filter(place => 
    place.name.toLowerCase().includes(lowercaseQuery) ||
    place.category.toLowerCase().includes(lowercaseQuery) ||
    place.description.toLowerCase().includes(lowercaseQuery) ||
    place.location.toLowerCase().includes(lowercaseQuery)
  );
};

export const filterByCategory = (places: Place[], category: string): Place[] => {
  if (!category || category === "all") return places;
  return places.filter(place => 
    place.category.toLowerCase() === category.toLowerCase()
  );
};

export const sortPlaces = (places: Place[], sortBy: "rating" | "reviews" | "name"): Place[] => {
  return [...places].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "reviews": 
        return b.reviews - a.reviews;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });
};
