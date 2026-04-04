import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase, isSupabaseConfigured, shouldUseLocalFallbacks } from "@/lib/supabase";
import { sendAdminAlert } from "@/lib/adminAlerts";
import {
  CommunityReview,
  ContactMessage,
  ContactMessageStatus,
  NewCommunityReview,
  ReviewCategory,
  ReviewStatus,
} from "@/types/community";

const STORAGE_KEY = "raipur-life-community-reviews";

const normalizeText = (value: string | undefined) =>
  (value || "").trim().toLowerCase().replace(/\s+/g, " ");

const seededReviews: CommunityReview[] = [
  {
    id: "seed-1",
    place: "Nukkad Chai",
    address: "Station Road, Raipur",
    category: "food",
    message: "Amazing chai and snacks. Perfect for evening hangouts with friends. Must-try their special Irani chai.",
    visitDate: "2026-03-28",
    visitType: "friends",
    budgetRange: "Under Rs 200",
    bestTimeToVisit: "Evening",
    quickTip: "Try ginger chai with samosa combo.",
    wouldRecommend: true,
    rating: 4.6,
    authorName: "Naman",
    isAnonymous: false,
    image: "/places/nukkad.jpg",
    status: "approved",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "seed-2",
    place: "Jungle Safari, Barnawapara",
    address: "Barnawapara Wildlife Sanctuary Road",
    category: "tourism",
    message: "Great wildlife experience. Saw deer, peacocks, and many birds. Best to visit early morning.",
    visitDate: "2026-03-23",
    visitType: "family",
    budgetRange: "Rs 500-Rs 1200",
    bestTimeToVisit: "Early Morning",
    quickTip: "Carry sunscreen and water.",
    wouldRecommend: true,
    rating: 4.7,
    authorName: "Naini",
    isAnonymous: false,
    image: "/places/barnawapara.jpg",
    status: "approved",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "seed-3",
    place: "Ambuja City Mall",
    address: "GE Road, Raipur",
    category: "shopping",
    message: "Wide range of local and international brands, clean spaces, and enough food options for full family outings.",
    visitDate: "2026-03-26",
    visitType: "family",
    budgetRange: "Rs 1200-Rs 3000",
    bestTimeToVisit: "Late Afternoon",
    quickTip: "Weekday evenings are less crowded.",
    wouldRecommend: true,
    rating: 4.4,
    authorName: "Manoj",
    isAnonymous: false,
    image: "/places/urban.png",
    status: "approved",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "seed-4",
    place: "Raipur Carnival",
    address: "Central Parade Ground, Raipur",
    category: "events",
    message: "The city vibe was electric, performances were great, and food stalls had lots of options.",
    visitDate: "2026-03-24",
    visitType: "friends",
    budgetRange: "Rs 300-Rs 900",
    bestTimeToVisit: "Evening",
    quickTip: "Reach before the main performance slot.",
    wouldRecommend: true,
    rating: 4.8,
    authorName: "Anant",
    isAnonymous: false,
    image: "/hero-bg.png",
    status: "approved",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "seed-5",
    place: "Pandri Market",
    address: "Pandri Main Market, Raipur",
    category: "shopping",
    message: "Great range of budget shopping options and plenty of variety if you have time to explore lanes.",
    visitDate: "2026-03-27",
    visitType: "friends",
    budgetRange: "Rs 500-Rs 1800",
    bestTimeToVisit: "Evening",
    quickTip: "Bargaining works better in interior lanes.",
    wouldRecommend: true,
    rating: 4.3,
    authorName: "Ishita",
    isAnonymous: false,
    image: "/places/morning_raipur.jpg",
    status: "approved",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "seed-6",
    place: "Mahant Ghasidas Museum",
    address: "Gandhi Chowk, Raipur",
    category: "tourism",
    message: "Excellent museum for understanding local heritage. Quiet galleries and informative displays.",
    visitDate: "2026-03-21",
    visitType: "solo",
    budgetRange: "Under Rs 300",
    bestTimeToVisit: "Morning",
    quickTip: "Allocate at least 90 minutes for full galleries.",
    wouldRecommend: true,
    rating: 4.5,
    authorName: "Ritika",
    isAnonymous: false,
    image: "/places/museum.jpeg",
    status: "approved",
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "seed-7",
    place: "Poha Corner, Sadar Bazaar",
    address: "Sadar Bazaar Road, Raipur",
    category: "food",
    message: "Super quick breakfast stop. Poha is fresh and jalebi balance is on point.",
    visitDate: "2026-03-30",
    visitType: "work",
    budgetRange: "Under Rs 150",
    bestTimeToVisit: "Morning",
    quickTip: "Go before 9 AM for freshest batch.",
    wouldRecommend: true,
    rating: 4.4,
    authorName: "Aarav",
    isAnonymous: false,
    image: "/hero-bg.png",
    status: "approved",
    createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "seed-8",
    place: "Marine Drive Evening Walk",
    address: "Telibandha Marine Drive, Raipur",
    category: "events",
    message: "Weekend cultural stalls and music made this stretch feel lively and safe for families.",
    visitDate: "2026-03-29",
    visitType: "couple",
    budgetRange: "Under Rs 500",
    bestTimeToVisit: "Sunset",
    quickTip: "Parking fills up quickly after 7 PM.",
    wouldRecommend: true,
    rating: 4.6,
    authorName: "Dev",
    isAnonymous: false,
    image: "/places/marine_drive.jpg",
    status: "approved",
    createdAt: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "seed-9",
    place: "Ghadi Chowk Street Bites",
    address: "Ghadi Chowk, Raipur",
    category: "food",
    message: "Great late-evening snack stretch with quick service and good crowd energy.",
    visitDate: "2026-03-20",
    visitType: "friends",
    budgetRange: "Under Rs 300",
    bestTimeToVisit: "Evening",
    quickTip: "Go after 7 PM for full stall lineup.",
    wouldRecommend: true,
    rating: 4.3,
    authorName: "Rohan",
    isAnonymous: false,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=80",
    status: "approved",
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "seed-10",
    place: "Magneto Mall",
    address: "GE Road, Raipur",
    category: "shopping",
    message: "Good mix of brands and food court options. Works well for family evenings.",
    visitDate: "2026-03-18",
    visitType: "family",
    budgetRange: "Rs 1000-Rs 3500",
    bestTimeToVisit: "Late Afternoon",
    quickTip: "Weekend parking fills up quickly.",
    wouldRecommend: true,
    rating: 4.2,
    authorName: "Neha",
    isAnonymous: false,
    image: "/places/magneto.png",
    status: "approved",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "seed-11",
    place: "Naya Raipur Musical Fountain",
    address: "Atal Nagar, Raipur",
    category: "tourism",
    message: "Beautiful evening light-and-water show with family-friendly surroundings.",
    visitDate: "2026-03-17",
    visitType: "family",
    budgetRange: "Under Rs 400",
    bestTimeToVisit: "Sunset",
    quickTip: "Reach 20 minutes early for front seating.",
    wouldRecommend: true,
    rating: 4.4,
    authorName: "Priya",
    isAnonymous: false,
    image: "https://images.unsplash.com/photo-1526481280695-3c46980f8f4d?auto=format&fit=crop&w=1400&q=80",
    status: "approved",
    createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "seed-12",
    place: "City Weekend Art Market",
    address: "Telibandha, Raipur",
    category: "events",
    message: "Handmade crafts, local food counters, and live acoustic sets in one place.",
    visitDate: "2026-03-16",
    visitType: "couple",
    budgetRange: "Rs 300-Rs 900",
    bestTimeToVisit: "Evening",
    quickTip: "Most stalls accept UPI only.",
    wouldRecommend: true,
    rating: 4.5,
    authorName: "Kavya",
    isAnonymous: false,
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80",
    status: "approved",
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "seed-13",
    place: "Raipur Kitchen",
    address: "Raipur",
    category: "food",
    message: "Great for a polished dinner card, with reliable food, nice ambience, and a premium city-dining feel.",
    visitDate: "2026-03-15",
    visitType: "couple",
    budgetRange: "Rs 700-Rs 1800",
    bestTimeToVisit: "Dinner",
    quickTip: "Reserve on weekends for quicker seating.",
    wouldRecommend: true,
    rating: 4.9,
    authorName: "Aditi",
    isAnonymous: false,
    image: "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1400",
    status: "approved",
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "seed-14",
    place: "Cafe Oriza",
    address: "Raipur",
    category: "food",
    message: "A solid modern cafe pick for casual meals, date nights, and a slightly upscale vibe.",
    visitDate: "2026-03-14",
    visitType: "friends",
    budgetRange: "Rs 400-Rs 1200",
    bestTimeToVisit: "Evening",
    quickTip: "Try non-peak hours for quieter seating.",
    wouldRecommend: true,
    rating: 4.9,
    authorName: "Mahi",
    isAnonymous: false,
    image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1400",
    status: "approved",
    createdAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "seed-15",
    place: "Danganiya Bazaar",
    address: "Danganiya, Raipur",
    category: "shopping",
    message: "Good local-market option if you want a crowded everyday bazaar vibe instead of a mall experience.",
    visitDate: "2026-03-13",
    visitType: "family",
    budgetRange: "Rs 300-Rs 1500",
    bestTimeToVisit: "Evening",
    quickTip: "Carry cash and UPI both for smaller vendors.",
    wouldRecommend: true,
    rating: 3.8,
    authorName: "Raj",
    isAnonymous: false,
    image: "https://images.pexels.com/photos/346734/pexels-photo-346734.jpeg?auto=compress&cs=tinysrgb&w=1400",
    status: "approved",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "seed-16",
    place: "Katora Talab Market",
    address: "Katora Talab, Raipur",
    category: "shopping",
    message: "Nice market-style card for neighborhood shopping, casual browsing, and a more local city experience.",
    visitDate: "2026-03-12",
    visitType: "solo",
    budgetRange: "Rs 250-Rs 1200",
    bestTimeToVisit: "Late Afternoon",
    quickTip: "Best for quick weekday market rounds.",
    wouldRecommend: true,
    rating: 3.8,
    authorName: "Nikhil",
    isAnonymous: false,
    image: "https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=1400",
    status: "approved",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const getReviewCompletenessScore = (review: CommunityReview) => {
  let score = 0;
  if (review.address) score += 1;
  if (review.visitDate) score += 1;
  if (review.visitType) score += 1;
  if (review.budgetRange) score += 1;
  if (review.bestTimeToVisit) score += 1;
  if (review.quickTip) score += 1;
  if (review.image) score += 1;
  return score;
};

const dedupeReviews = (list: CommunityReview[]) => {
  const byKey = new Map<string, CommunityReview>();

  for (const review of list) {
    const key = `${normalizeText(review.place)}|${review.category}|${normalizeText(review.message)}|${normalizeText(review.authorName)}`;
    const existing = byKey.get(key);

    if (!existing) {
      byKey.set(key, review);
      continue;
    }

    const existingScore = getReviewCompletenessScore(existing);
    const candidateScore = getReviewCompletenessScore(review);

    if (candidateScore > existingScore) {
      byKey.set(key, review);
      continue;
    }

    if (candidateScore === existingScore) {
      const existingTime = new Date(existing.createdAt).getTime();
      const candidateTime = new Date(review.createdAt).getTime();
      if (candidateTime > existingTime) {
        byKey.set(key, review);
      }
    }
  }

  return Array.from(byKey.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

const getStoredReviews = (): CommunityReview[] => {
  if (typeof window === "undefined") {
    return seededReviews;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return seededReviews;
    }

    const parsed = JSON.parse(raw) as Array<Partial<CommunityReview>>;
    const normalized = parsed.map((review) => ({
      id: review.id || makeId(),
      place: review.place || "Unknown Place",
      address: review.address || "",
      category: (review.category as ReviewCategory) || "food",
      message: review.message || "",
      visitDate: review.visitDate,
      visitType: review.visitType,
      budgetRange: review.budgetRange,
      bestTimeToVisit: review.bestTimeToVisit,
      quickTip: review.quickTip,
      wouldRecommend: review.wouldRecommend ?? true,
      rating: normalizeRating(review.rating),
      authorName: review.authorName || "Anonymous",
      isAnonymous: Boolean(review.isAnonymous),
      image: review.image,
      status: normalizeStatus(review.status || "approved"),
      createdAt: review.createdAt || new Date().toISOString(),
    }));

    return dedupeReviews(normalized.length > 0 ? normalized : seededReviews);
  } catch {
    return dedupeReviews(seededReviews);
  }
};

const makeId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

type DbReviewRow = {
  id: string;
  place: string;
  address: string | null;
  category: ReviewCategory;
  message: string;
  visit_date: string | null;
  visit_type: "solo" | "friends" | "family" | "couple" | "work" | null;
  budget_range: string | null;
  best_time_to_visit: string | null;
  quick_tip: string | null;
  would_recommend: boolean;
  rating: number;
  author_name: string;
  is_anonymous: boolean;
  image_url: string | null;
  status: ReviewStatus;
  created_at: string;
};

type ModerateReviewArgs = {
  review_id: string;
  new_status: ReviewStatus;
  moderator_code: string;
};

type GetReviewsForModerationArgs = {
  moderator_code: string;
  review_status?: ReviewStatus | null;
};

type DeleteReviewArgs = {
  review_id: string;
  moderator_code: string;
};

type DbContactMessageRow = {
  id: string;
  name: string;
  email: string;
  message: string;
  status: ContactMessageStatus;
  created_at: string;
};

type UpdateContactMessageStatusArgs = {
  message_id: string;
  new_status: ContactMessageStatus;
  moderator_code: string;
};

const normalizeStatus = (status: unknown): ReviewStatus => {
  if (status === "approved" || status === "rejected") {
    return status;
  }

  return "pending";
};

const normalizeRating = (rating: unknown): number => {
  const value = Number(rating);
  if (Number.isNaN(value)) {
    return 5;
  }

  return Math.min(5, Math.max(1, Number(value.toFixed(1))));
};

const mapDbReviewToCommunityReview = (row: DbReviewRow): CommunityReview => ({
  id: row.id,
  place: row.place,
  address: row.address || "",
  category: row.category,
  message: row.message,
  visitDate: row.visit_date || undefined,
  visitType: row.visit_type || undefined,
  budgetRange: row.budget_range || undefined,
  bestTimeToVisit: row.best_time_to_visit || undefined,
  quickTip: row.quick_tip || undefined,
  wouldRecommend: row.would_recommend ?? true,
  rating: normalizeRating(row.rating),
  authorName: row.author_name,
  isAnonymous: row.is_anonymous,
  image: row.image_url || undefined,
  status: normalizeStatus(row.status),
  createdAt: row.created_at,
});

const mapDbContactMessageToContactMessage = (row: DbContactMessageRow): ContactMessage => ({
  id: row.id,
  name: row.name,
  email: row.email,
  message: row.message,
  status: row.status,
  createdAt: row.created_at,
});

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const uploadImageToSupabase = async (file: File) => {
  if (!supabase) {
    return undefined;
  }

  const extension = file.name.split(".").pop() || "jpg";
  const path = `community/${makeId()}.${extension}`;

  const { error } = await supabase.storage
    .from("review-images")
    .upload(path, file, { upsert: false });

  if (error) {
    return undefined;
  }

  const { data } = supabase.storage.from("review-images").getPublicUrl(path);
  return data.publicUrl;
};

export const useCommunityReviews = () => {
  const [reviews, setReviews] = useState<CommunityReview[]>(() => getStoredReviews());
  const [pendingReviewsRemote, setPendingReviewsRemote] = useState<CommunityReview[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadReviewsForModeration = useCallback(async (
    moderatorCode: string,
    reviewStatus?: ReviewStatus
  ) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.rpc("get_reviews_for_moderation", {
        moderator_code: moderatorCode.trim(),
        review_status: reviewStatus ?? null,
      } as GetReviewsForModerationArgs);

      if (error || !data) {
        return null;
      }

      return (data as DbReviewRow[]).map(mapDbReviewToCommunityReview);
    }

    if (!shouldUseLocalFallbacks) {
      return null;
    }

    return getStoredReviews().filter((review) =>
      reviewStatus ? review.status === reviewStatus : true
    );
  }, []);

  const loadContactMessages = useCallback(async (moderatorCode: string) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.rpc("get_contact_messages", {
        moderator_code: moderatorCode.trim(),
      });

      if (error || !data) {
        return null;
      }

      return (data as DbContactMessageRow[]).map(mapDbContactMessageToContactMessage);
    }

    if (!shouldUseLocalFallbacks || typeof window === "undefined") {
      return null;
    }

    try {
      const raw = window.localStorage.getItem("raipur-contact-messages");
      const parsed = raw ? (JSON.parse(raw) as Array<Partial<ContactMessage>>) : [];
      return parsed.map((entry) => ({
        id: entry.id || makeId(),
        name: entry.name || "Unknown",
        email: entry.email || "",
        message: entry.message || "",
        status: (entry.status as ContactMessageStatus) || "new",
        createdAt: entry.createdAt || new Date().toISOString(),
      }));
    } catch {
      return [];
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      return;
    }

    const loadApprovedReviews = async () => {
      setIsLoading(true);

      const { data, error } = await supabase
        .from("community_reviews")
        .select("id, place, address, category, message, visit_date, visit_type, budget_range, best_time_to_visit, quick_tip, would_recommend, rating, author_name, is_anonymous, image_url, status, created_at")
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      if (!error && data) {
        const mapped = dedupeReviews((data as DbReviewRow[]).map(mapDbReviewToCommunityReview));
        setReviews(mapped);
      }

      setIsLoading(false);
    };

    void loadApprovedReviews();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    }
  }, [reviews]);

  const addReview = async (newReview: NewCommunityReview) => {
    const normalizedPlace = newReview.place.trim();
    const normalizedAddress = newReview.address?.trim() || "";
    const normalizedMessage = newReview.message.trim();
    const normalizedBudget = newReview.budgetRange?.trim() || "";
    const normalizedBestTime = newReview.bestTimeToVisit?.trim() || "";
    const normalizedTip = newReview.quickTip?.trim() || "";
    const normalizedAuthor = newReview.isAnonymous
      ? "Anonymous"
      : (newReview.authorName?.trim() || "Anonymous");

    let image: string | undefined;

    if (newReview.imageFile) {
      if (isSupabaseConfigured && supabase) {
        image = await uploadImageToSupabase(newReview.imageFile);
      } else if (shouldUseLocalFallbacks) {
        image = await readFileAsDataUrl(newReview.imageFile);
      }
    } else if (newReview.imageUrl?.trim()) {
      image = newReview.imageUrl.trim();
    } else {
      image = "/hero-bg.png";
    }

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from("community_reviews")
        .insert({
          place: normalizedPlace,
          address: normalizedAddress || null,
          category: newReview.category,
          message: normalizedMessage,
          visit_date: newReview.visitDate || null,
          visit_type: newReview.visitType || null,
          budget_range: normalizedBudget || null,
          best_time_to_visit: normalizedBestTime || null,
          quick_tip: normalizedTip || null,
          would_recommend: newReview.wouldRecommend ?? true,
          rating: normalizeRating(newReview.rating),
          author_name: normalizedAuthor,
          is_anonymous: newReview.isAnonymous,
          image_url: image || null,
          status: "pending",
        });

      if (!error) {
        const review: CommunityReview = {
          id: makeId(),
          place: normalizedPlace,
          address: normalizedAddress,
          category: newReview.category,
          message: normalizedMessage,
          visitDate: newReview.visitDate,
          visitType: newReview.visitType,
          budgetRange: normalizedBudget,
          bestTimeToVisit: normalizedBestTime,
          quickTip: normalizedTip,
          wouldRecommend: newReview.wouldRecommend ?? true,
          rating: normalizeRating(newReview.rating),
          authorName: normalizedAuthor,
          isAnonymous: newReview.isAnonymous,
          image,
          status: "pending",
          createdAt: new Date().toISOString(),
        };

        setReviews((current) => dedupeReviews([review, ...current]));

        void sendAdminAlert({
          type: "review",
          payload: {
            place: review.place,
            category: review.category,
            authorName: review.authorName,
            rating: review.rating,
            message: review.message,
          },
        });

        return review;
      }

      if (error?.message) {
        throw new Error(`Review could not be submitted: ${error.message}`);
      }

      throw new Error("Review could not be submitted right now.");
    }

    if (!shouldUseLocalFallbacks) {
      throw new Error("Community reviews are temporarily unavailable.");
    }

    const review: CommunityReview = {
      id: makeId(),
      place: normalizedPlace,
      address: normalizedAddress,
      category: newReview.category,
      message: normalizedMessage,
      visitDate: newReview.visitDate,
      visitType: newReview.visitType,
      budgetRange: normalizedBudget,
      bestTimeToVisit: normalizedBestTime,
      quickTip: normalizedTip,
      wouldRecommend: newReview.wouldRecommend ?? true,
      rating: normalizeRating(newReview.rating),
      authorName: normalizedAuthor,
      isAnonymous: newReview.isAnonymous,
      image,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setReviews((current) => dedupeReviews([review, ...current]));
    return review;
  };

  const getReviewsByCategory = (category: ReviewCategory) =>
    reviews.filter(
      (review) => review.category === category && review.status === "approved"
    );

  const latestReviews = useMemo(
    () => reviews.filter((review) => review.status === "approved").slice(0, 8),
    [reviews]
  );

  const pendingReviewsLocal = useMemo(
    () => reviews.filter((review) => review.status === "pending"),
    [reviews]
  );

  const pendingReviews = isSupabaseConfigured
    ? pendingReviewsRemote
    : shouldUseLocalFallbacks
      ? pendingReviewsLocal
      : [];

  const unlockModeration = async (moderatorCode: string) => {
    const normalizedCode = moderatorCode.trim();

    if (!normalizedCode) {
      return shouldUseLocalFallbacks;
    }

    if (isSupabaseConfigured && supabase) {
      const moderationReviews = await loadReviewsForModeration(normalizedCode, "pending");
      if (!moderationReviews) {
        return false;
      }

      setPendingReviewsRemote(moderationReviews);
      return true;
    }

    return shouldUseLocalFallbacks;
  };

  const updateReviewStatus = async (
    reviewId: string,
    status: ReviewStatus,
    moderatorCode?: string
  ) => {
    if (isSupabaseConfigured && supabase) {
      if (!moderatorCode?.trim()) {
        return null;
      }

      const { data, error } = await supabase.rpc("moderate_review", {
        review_id: reviewId,
        new_status: status,
        moderator_code: moderatorCode.trim(),
      } as ModerateReviewArgs);

      if (!error && data) {
        const mapped = mapDbReviewToCommunityReview(data as DbReviewRow);
        setPendingReviewsRemote((current) => current.filter((review) => review.id !== reviewId));

        if (mapped.status === "approved") {
          setReviews((current) => {
            const withoutExisting = current.filter((review) => review.id !== mapped.id);
            return [mapped, ...withoutExisting];
          });
        }

        return mapped;
      }

      return null;
    }

    if (shouldUseLocalFallbacks) {
      setReviews((current) =>
        current.map((review) =>
          review.id === reviewId ? { ...review, status: normalizeStatus(status) } : review
        )
      );
    }

    return null;
  };

  const deleteReview = async (reviewId: string, moderatorCode?: string) => {
    if (isSupabaseConfigured && supabase) {
      if (!moderatorCode?.trim()) {
        return false;
      }

      const { error } = await supabase.rpc("delete_review", {
        review_id: reviewId,
        moderator_code: moderatorCode.trim(),
      } as DeleteReviewArgs);

      if (error) {
        return false;
      }

      setPendingReviewsRemote((current) => current.filter((review) => review.id !== reviewId));
      setReviews((current) => current.filter((review) => review.id !== reviewId));
      return true;
    }

    if (!shouldUseLocalFallbacks) {
      return false;
    }

    setPendingReviewsRemote((current) => current.filter((review) => review.id !== reviewId));
    setReviews((current) => current.filter((review) => review.id !== reviewId));
    return true;
  };

  const updateContactMessageStatus = async (
    messageId: string,
    status: ContactMessageStatus,
    moderatorCode?: string
  ) => {
    if (isSupabaseConfigured && supabase) {
      if (!moderatorCode?.trim()) {
        return null;
      }

      const { data, error } = await supabase.rpc("update_contact_message_status", {
        message_id: messageId,
        new_status: status,
        moderator_code: moderatorCode.trim(),
      } as UpdateContactMessageStatusArgs);

      if (error || !data) {
        return null;
      }

      return mapDbContactMessageToContactMessage(data as DbContactMessageRow);
    }

    if (!shouldUseLocalFallbacks || typeof window === "undefined") {
      return null;
    }

    try {
      const key = "raipur-contact-messages";
      const existing = JSON.parse(window.localStorage.getItem(key) || "[]") as Array<Record<string, string>>;
      const updated = existing.map((entry) =>
        entry.id === messageId ? { ...entry, status } : entry
      );
      window.localStorage.setItem(key, JSON.stringify(updated));
      const nextEntry = updated.find((entry) => entry.id === messageId);
      if (!nextEntry) {
        return null;
      }

      return {
        id: nextEntry.id,
        name: nextEntry.name,
        email: nextEntry.email,
        message: nextEntry.message,
        status: (nextEntry.status as ContactMessageStatus) || status,
        createdAt: nextEntry.createdAt,
      };
    } catch {
      return null;
    }
  };

  const approveReview = async (reviewId: string, moderatorCode?: string) =>
    updateReviewStatus(reviewId, "approved", moderatorCode);

  const rejectReview = async (reviewId: string, moderatorCode?: string) =>
    updateReviewStatus(reviewId, "rejected", moderatorCode);

  return {
    reviews,
    latestReviews,
    pendingReviews,
    isLoading,
    isRemoteEnabled: isSupabaseConfigured,
    canUseLocalFallbacks: shouldUseLocalFallbacks,
    addReview,
    loadReviewsForModeration,
    loadContactMessages,
    unlockModeration,
    approveReview,
    rejectReview,
    deleteReview,
    updateContactMessageStatus,
    getReviewsByCategory,
  };
};

export const formatReviewTimeAgo = (dateString: string) => {
  const time = new Date(dateString).getTime();
  const now = Date.now();
  const diffMs = now - time;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diffMs < hour) {
    return `${Math.max(1, Math.floor(diffMs / minute))}m ago`;
  }

  if (diffMs < day) {
    return `${Math.floor(diffMs / hour)}h ago`;
  }

  return `${Math.floor(diffMs / day)}d ago`;
};
