export interface OrderData {
  id: number;
  offer_id: number;
  name: string;
  description: string;
  price: number;
  discount_price: number | null;
  type: string;
  is_special: boolean;
  img_url: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  is_completed: boolean;
  city: string;
  street: string;
  house_number: number;
}

export interface OrderDetails {
  street: string | undefined;
  city: string | undefined;
  house_number: number | undefined;
  cardNumber: number | undefined;
  expDate: string | undefined;
  cvc: number | undefined;
  tip: number | undefined;
  isValid: boolean | undefined;
}
