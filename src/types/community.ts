export type ReviewCategory = "food" | "events" | "shopping" | "tourism";
export type ReviewStatus = "pending" | "approved" | "rejected";
export type ContactMessageStatus = "new" | "in_progress" | "resolved" | "closed";

export interface CommunityReview {
  id: string;
  place: string;
  category: ReviewCategory;
  message: string;
  rating: number;
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
  rating: number;
  authorName?: string;
  isAnonymous: boolean;
  imageUrl?: string;
  imageFile?: File | null;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  status: ContactMessageStatus;
  createdAt: string;
}
