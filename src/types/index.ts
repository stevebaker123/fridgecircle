export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  location?: string;
}

export interface FoodItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  expiryDate: string; // ISO date string
  category: FoodCategory;
  imageUrl?: string;
  notes?: string;
  isShared: boolean;
  sharedWith?: string[]; // Array of user IDs
  ownerId: string;
  addedDate: string; // ISO date string
}

export type FoodCategory =
  | 'dairy'
  | 'meat'
  | 'fruit'
  | 'vegetable'
  | 'grain'
  | 'bakery'
  | 'frozen'
  | 'canned'
  | 'beverage'
  | 'condiment'
  | 'snack'
  | 'other';

export interface Friend {
  id: string;
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  imageUrl?: string;
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  matchingIngredients: string[]; // ingredients user already has
  missingIngredients: string[]; // ingredients user needs to buy
}