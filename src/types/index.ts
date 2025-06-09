
export interface Place {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  location: string;
  priceRange?: string;
  features?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  description: string;
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

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  placeName: string;
  helpful: number;
}

export interface QuickAction {
  icon: any;
  title: string;
  description: string;
  color: string;
  action?: () => void;
}
