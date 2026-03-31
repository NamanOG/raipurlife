import { useEffect, useMemo, useState } from "react";
import { supabase, isSupabaseConfigured, shouldUseLocalFallbacks } from "@/lib/supabase";
import {
  CommunityReview,
  ContactMessage,
  ContactMessageStatus,
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
    image: "/places/zora.jpg",
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
    image: "/places/barnawapara.jpg",
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
    image: "/places/zora.jpg",
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
    image: "/hero-bg.png",
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

  const loadReviewsForModeration = async (
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
  };

  const loadContactMessages = async (moderatorCode: string) => {
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
  };

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      return;
    }

    const loadApprovedReviews = async () => {
      setIsLoading(true);

      const { data, error } = await supabase
        .from("community_reviews")
        .select("id, place, category, message, author_name, is_anonymous, image_url, status, created_at")
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      if (!error && data) {
        const mapped = (data as DbReviewRow[]).map(mapDbReviewToCommunityReview);
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
    const normalizedMessage = newReview.message.trim();
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

      throw new Error("Review could not be submitted right now.");
    }

    if (!shouldUseLocalFallbacks) {
      throw new Error("Community reviews are temporarily unavailable.");
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
