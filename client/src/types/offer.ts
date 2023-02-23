export interface OfferData {
  id: number;
  name: string;
  description: string;
  price: number;
  discount_price: number | null;
  type: string;
  is_special: boolean;
  created_at: string;
  updated_at: string;
  img_url: string;
}
