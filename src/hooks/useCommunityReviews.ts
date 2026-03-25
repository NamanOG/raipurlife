import { useEffect, useMemo, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  CommunityReview,
  NewCommunityReview,
  ReviewCategory,
  ReviewStatus,
} from "@/types/community";

const STORAGE_KEY = "raipur-life-community-reviews";

const seededReviews: CommunityReview[] = [
  {
    id: "seed-1",
    place: "Nukkad Chai",
    category: "food",
    message: "Amazing chai and snacks. Perfect for evening hangouts with friends. Must-try their special Irani chai.",
    authorName: "Naman",
    isAnonymous: false,
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "approved",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "seed-2",
    place: "Jungle Safari, Barnawapara",
    category: "tourism",
    message: "Great wildlife experience. Saw deer, peacocks, and many birds. Best to visit early morning.",
    authorName: "Naini",
    isAnonymous: false,
    image: "https://images.unsplash.com/photo-1549366021-9f761d040a94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "approved",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "seed-3",
    place: "Ambuja City Mall",
    category: "shopping",
    message: "Wide range of local and international brands, clean spaces, and enough food options for full family outings.",
    authorName: "Manoj",
    isAnonymous: false,
    image: "https://images.unsplash.com/photo-1555529902-5261145633bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "approved",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "seed-4",
    place: "Raipur Carnival",
    category: "events",
    message: "The city vibe was electric, performances were great, and food stalls had lots of options.",
    authorName: "Anant",
    isAnonymous: false,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "approved",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

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
      category: (review.category as ReviewCategory) || "food",
      message: review.message || "",
      authorName: review.authorName || "Anonymous",
      isAnonymous: Boolean(review.isAnonymous),
      image: review.image,
      status: normalizeStatus(review.status || "approved"),
      createdAt: review.createdAt || new Date().toISOString(),
    }));

    return normalized.length > 0 ? normalized : seededReviews;
  } catch {
    return seededReviews;
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
  category: ReviewCategory;
  message: string;
  author_name: string;
  is_anonymous: boolean;
  image_url: string | null;
  status: ReviewStatus;
  created_at: string;
};

const normalizeStatus = (status: unknown): ReviewStatus => {
  if (status === "approved" || status === "rejected") {
    return status;
  }

  return "pending";
};

const mapDbReviewToCommunityReview = (row: DbReviewRow): CommunityReview => ({
  id: row.id,
  place: row.place,
  category: row.category,
  message: row.message,
  authorName: row.author_name,
  isAnonymous: row.is_anonymous,
  image: row.image_url || undefined,
  status: normalizeStatus(row.status),
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      return;
    }

    let active = true;

    const loadReviews = async () => {
      setIsLoading(true);

      const { data, error } = await supabase
        .from("community_reviews")
        .select("id, place, category, message, author_name, is_anonymous, image_url, status, created_at")
        .order("created_at", { ascending: false });

      if (!active) {
        return;
      }

      if (error || !data) {
        setIsLoading(false);
        return;
      }

      const mapped = (data as DbReviewRow[]).map(mapDbReviewToCommunityReview);
      setReviews(mapped);
      setIsLoading(false);
    };

    void loadReviews();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    }
  }, [reviews]);

  const addReview = async (newReview: NewCommunityReview) => {
    const normalizedPlace = newReview.place.trim();
    const normalizedMessage = newReview.message.trim();
    const normalizedAuthor = newReview.isAnonymous
      ? "Anonymous"
      : (newReview.authorName?.trim() || "Anonymous");

    let image: string | undefined;

    if (newReview.imageFile) {
      if (isSupabaseConfigured && supabase) {
        image = await uploadImageToSupabase(newReview.imageFile);
      } else {
        image = await readFileAsDataUrl(newReview.imageFile);
      }
    } else if (newReview.imageUrl?.trim()) {
      image = newReview.imageUrl.trim();
    } else {
      image = "/hero-bg.png";
    }

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("community_reviews")
        .insert({
          place: normalizedPlace,
          category: newReview.category,
          message: normalizedMessage,
          author_name: normalizedAuthor,
          is_anonymous: newReview.isAnonymous,
          image_url: image || null,
          status: "pending",
        })
        .select("id, place, category, message, author_name, is_anonymous, image_url, status, created_at")
        .single();

      if (!error && data) {
        const review = mapDbReviewToCommunityReview(data as DbReviewRow);
        setReviews((current) => [review, ...current]);
        return review;
      }
    }

    const review: CommunityReview = {
      id: makeId(),
      place: normalizedPlace,
      category: newReview.category,
      message: normalizedMessage,
      authorName: normalizedAuthor,
      isAnonymous: newReview.isAnonymous,
      image,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setReviews((current) => [review, ...current]);
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

  const pendingReviews = useMemo(
    () => reviews.filter((review) => review.status === "pending"),
    [reviews]
  );

  const updateReviewStatus = async (reviewId: string, status: ReviewStatus) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("community_reviews")
        .update({ status })
        .eq("id", reviewId)
        .select("id, place, category, message, author_name, is_anonymous, image_url, status, created_at")
        .single();

      if (!error && data) {
        const mapped = mapDbReviewToCommunityReview(data as DbReviewRow);
        setReviews((current) =>
          current.map((review) => (review.id === reviewId ? mapped : review))
        );
        return mapped;
      }
    }

    setReviews((current) =>
      current.map((review) =>
        review.id === reviewId ? { ...review, status: normalizeStatus(status) } : review
      )
    );

    return null;
  };

  const approveReview = async (reviewId: string) =>
    updateReviewStatus(reviewId, "approved");

  const rejectReview = async (reviewId: string) =>
    updateReviewStatus(reviewId, "rejected");

  return {
    reviews,
    latestReviews,
    pendingReviews,
    isLoading,
    isRemoteEnabled: isSupabaseConfigured,
    addReview,
    approveReview,
    rejectReview,
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
