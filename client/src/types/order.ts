export interface OrderData {
  user_id: number;
  offer_id: number;
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
