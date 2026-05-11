export type Province = 
  | "Harare" 
  | "Bulawayo" 
  | "Manicaland" 
  | "Mashonaland Central" 
  | "Mashonaland East" 
  | "Mashonaland West" 
  | "Masvingo" 
  | "Matabeleland North" 
  | "Matabeleland South" 
  | "Midlands";

export type CategoryType = 
  | "classifieds" 
  | "produce" 
  | "cars" 
  | "services" 
  | "water" 
  | "agriculture" 
  | "business";

export interface Category {
  id: CategoryType;
  name: string;
  description: string;
  icon: string;
  color: string;
  listingCount: number;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  priceUsd: number;
  priceZig?: number;
  category: CategoryType;
  subCategory: string;
  location: {
    province: Province;
    city: string;
    suburb?: string;
  };
  seller: {
    id: string;
    name: string;
    type: "private" | "business" | "farmer" | "dealer";
    verified: boolean;
    whatsapp: string;
  };
  images: string[];
  createdAt: string;
  isFeatured?: boolean;
}
