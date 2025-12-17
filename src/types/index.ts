// Type Definitions v2.0 - Comprehensive

// ============== USER TYPES ==============
export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  bio?: string;
  createdAt: Date;
  reviewCount: number;
  badges?: Badge[];
  verified?: boolean;
  followers?: number;
  following?: number;
}

export interface UserProfile extends User {
  stats: UserStats;
  recentReviews?: Review[];
}

export interface UserStats {
  reviewsCount: number;
  placesVisited: number;
  helpfulReviews: number;
  followers: number;
  following: number;
}

// ============== PLACE TYPES ==============
export interface Place {
  id: string;
  name: string;
  description: string;
  category: 'food' | 'tourism' | 'shopping' | 'entertainment' | 'sports' | 'other';
  location: string;
  latitude: number;
  longitude: number;
  images: string[];
  phone?: string;
  website?: string;
  openingHours?: OpeningHours;
  rating: number; // average rating
  reviews: number; // total review count
  priceRange?: 'budget' | 'moderate' | 'expensive';
  features?: string[];
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  verified?: boolean;
}

export interface OpeningHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  description: string;
}

// ============== REVIEW TYPES ==============
export interface Review {
  id: string;
  placeId: string;
  userId: string;
  userName?: string; // For display
  userAvatar?: string;
  rating: number; // 1-5
  title?: string;
  comment: string;
  images?: string[];
  helpful: number;
  notHelpful?: number;
  date: string;
  placeName?: string;
  createdAt?: Date;
  updatedAt?: Date;
  commentCount?: number;
}

export interface ReviewFormData {
  rating: number;
  title: string;
  content: string;
  images: string[];
}

export interface Story {
  id: string;
  name: string;
  story: string;
  rating: number;
  category: string;
  time: string;
  avatar?: string;
}

// ============== COMMENT TYPES ==============
export interface Comment {
  id: string;
  reviewId: string;
  userId: string;
  userName?: string;
  userAvatar?: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============== INTERACTION TYPES ==============
export interface Interaction {
  id: string;
  userId: string;
  placeId: string;
  type: 'like' | 'bookmark' | 'visited';
  createdAt: Date;
}

export interface UserInteraction {
  placeId: string;
  liked: boolean;
  bookmarked: boolean;
  visited: boolean;
}

// ============== SEARCH & FILTER TYPES ==============
export interface SearchFilters {
  query?: string;
  category?: Place['category'];
  minRating?: number;
  maxRating?: number;
  priceRange?: Place['priceRange'];
  latitude?: number;
  longitude?: number;
  radius?: number; // in km
  openNow?: boolean;
  sortBy?: 'rating' | 'reviews' | 'newest' | 'distance';
  page?: number;
  limit?: number;
}

// ============== RESPONSE TYPES ==============
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ============== BADGE TYPES ==============
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
}

// ============== NOTIFICATION TYPES ==============
export interface Notification {
  id: string;
  userId: string;
  type: 'review_reply' | 'place_update' | 'user_follow' | 'helpful_vote';
  relatedId: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

// ============== UI COMPONENT TYPES ==============
export interface QuickAction {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
  action?: () => void;
}
