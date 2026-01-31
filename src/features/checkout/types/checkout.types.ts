/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface PaystackConfig {
  email: string;
  amount: number;
  publicKey: string;
  text?: string;
  onSuccess: (reference: any) => void;
  onClose: () => void;
}

export interface OrderDetails {
  reference: string;
  email: string;
  amount: number;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  vat: number;
  total: number;
}
