export type ReviewCategory = "food" | "events" | "shopping" | "tourism";
export type ReviewStatus = "pending" | "approved" | "rejected";

export interface CommunityReview {
  id: string;
  place: string;
  category: ReviewCategory;
  message: string;
  authorName: string;
  isAnonymous: boolean;
  image?: string;
  status: ReviewStatus;
  createdAt: string;
}

export interface NewCommunityReview {
  place: string;
  category: ReviewCategory;
  message: string;
  authorName?: string;
  isAnonymous: boolean;
  imageUrl?: string;
  imageFile?: File | null;
}
