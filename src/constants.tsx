import { Category, Province } from "./types";
import { 
  ShoppingBag, 
  Sprout, 
  Car, 
  Hammer, 
  Droplets, 
  Tractor, 
  Store 
} from "lucide-react";

export const PROVINCES: Province[] = [
  "Harare", "Bulawayo", "Manicaland", "Mashonaland Central", 
  "Mashonaland East", "Mashonaland West", "Masvingo", 
  "Matabeleland North", "Matabeleland South", "Midlands"
];

export const CATEGORIES: Category[] = [
  {
    id: "classifieds",
    name: "Classifieds",
    description: "Electronics, furniture & more",
    icon: "ShoppingBag",
    color: "var(--color-cat-classifieds)",
    listingCount: 4200
  },
  {
    id: "produce",
    name: "Fresh Produce",
    description: "Farm fresh straight to you",
    icon: "Sprout",
    color: "var(--color-cat-produce)",
    listingCount: 1560
  },
  {
    id: "cars",
    name: "Car Sales",
    description: "Quality vehicles & parts",
    icon: "Car",
    color: "var(--color-cat-cars)",
    listingCount: 840
  },
  {
    id: "services",
    name: "Services",
    description: "Trusted local tradespeople",
    icon: "Hammer",
    color: "var(--color-cat-services)",
    listingCount: 1200
  },
  {
    id: "water",
    name: "Borehole & Water",
    description: "Drilling & solar solutions",
    icon: "Droplets",
    color: "var(--color-cat-borehole)",
    listingCount: 320
  },
  {
    id: "agriculture",
    name: "Agriculture",
    description: "Farming tools & inputs",
    icon: "Tractor",
    color: "var(--color-cat-agri)",
    listingCount: 950
  },
  {
    id: "business",
    name: "Businesses",
    description: "Small businesses & SMEs",
    icon: "Store",
    color: "var(--color-cat-business)",
    listingCount: 670
  }
];
