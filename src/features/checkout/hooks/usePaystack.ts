// Import necessary dependencies for Paystack payment integration
import { usePaystackPayment } from "react-paystack";
import { useCartStore } from "@/features/cart/stores/useCartStore";
import { useNavigate } from "react-router-dom";
import { type CheckoutFormData } from "../schemas/checkout.schema";
import { useState } from "react";

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

// Define the structure of Paystack payment response
interface PaystackReference {
  reference: string;
  trans?: string;
  status?: string;
  message?: string;
  transaction?: string;
  trxref?: string;
}

// Custom hook for handling Paystack payment integration
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
    // Create order details for confirmation page
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

    // Clear cart
    clearCart();

    // Navigate to confirmation page with order details
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
