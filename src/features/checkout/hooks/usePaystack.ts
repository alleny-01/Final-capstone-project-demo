import { usePaystackPayment } from "react-paystack";
import { useCartStore } from "@/features/cart/stores/useCartStore";
import { useNavigate } from "react-router-dom";
import { type CheckoutFormData } from "../schemas/checkout.schema";
import { useState } from "react";

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

interface PaystackReference {
  reference: string;
  trans?: string;
  status?: string;
  message?: string;
  transaction?: string;
  trxref?: string;
}

export function usePaystack() {
  const { getTotal, clearCart, items } = useCartStore();
  const navigate = useNavigate();
  const [paymentConfig, setPaymentConfig] = useState({
    reference: "",
    email: "",
    amount: 0,
    publicKey: PAYSTACK_PUBLIC_KEY || "",
  });

  const onSuccess = (reference: PaystackReference) => {
    const orderDetails = {
      reference: reference.reference,
      email: paymentConfig.email,
      amount: paymentConfig.amount / 100, // Convert back from kobo
      items: items.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
      subtotal: useCartStore.getState().getSubtotal(),
      vat: useCartStore.getState().getVAT(),
      total: getTotal(),
    };

    clearCart();

    navigate("/confirmation", {
      state: { orderDetails },
    });
  };

  const onClose = () => {
    console.log("Payment modal closed");
  };

  const initializePayment = usePaystackPayment(paymentConfig);

  const processPayment = (formData: CheckoutFormData) => {
    const total = getTotal();
    const amountInKobo = Math.round(total * 100);

    setPaymentConfig({
      reference: new Date().getTime().toString(),
      email: formData.email,
      amount: amountInKobo,
      publicKey: PAYSTACK_PUBLIC_KEY || "",
    });

    setTimeout(() => {
      initializePayment({ onSuccess, onClose });
    }, 100);
  };

  return {
    processPayment,
    isPaystackConfigured: !!PAYSTACK_PUBLIC_KEY,
  };
}
