import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/features/cart/utils/cart-calculations";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { type OrderDetails } from "../types/checkout.types";

export default function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state?.orderDetails as OrderDetails;

  useEffect(() => {
    if (!orderDetails) {
      navigate("/");
    }
  }, [orderDetails, navigate]);

  if (!orderDetails) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 animate-fade-in">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been successfully
            processed.
          </p>
        </div>

        <Card className="mb-6 animate-fade-in-up animate-delay-100">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Transaction Reference</p>
              <p className="font-mono text-lg font-semibold">
                {orderDetails.reference}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium">{orderDetails.email}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Items Ordered</h3>
              <div className="space-y-2">
                {orderDetails.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-2 border-b"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        {formatCurrency(item.price)} × {item.quantity}
                      </p>
                    </div>
                    <span className="font-medium">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatCurrency(orderDetails.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">VAT (7.5%)</span>
                <span>{formatCurrency(orderDetails.vat)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total Paid</span>
                <span className="text-primary">
                  {formatCurrency(orderDetails.total)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center animate-fade-in-up animate-delay-200">
          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="w-full sm:w-auto"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600 animate-fade-in-up animate-delay-300">
          <p>
            A confirmation email has been sent to{" "}
            <strong>{orderDetails.email}</strong>
          </p>
          <p className="mt-2">
            Please save your transaction reference for future reference.
          </p>
        </div>
      </div>
    </div>
  );
}
