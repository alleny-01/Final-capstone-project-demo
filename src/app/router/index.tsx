import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import LandingPage from "@/features/products/pages/LandingPage";
import ProductsPage from "@/features/products/pages/ProductsPage";
import CheckoutPage from "@/features/checkout/pages/CheckoutPage";
import ConfirmationPage from "@/features/checkout/pages/ConfirmationPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "confirmation",
        element: <ConfirmationPage />,
      },
    ],
  },
]);
