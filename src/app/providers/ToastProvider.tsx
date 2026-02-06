import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          background: "#ffffff",
          color: "#0f172a",
          padding: "16px",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
          boxShadow:
            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          fontFamily: "Nunito Sans, ui-sans-serif, system-ui, sans-serif",
          fontSize: "14px",
          maxWidth: "420px",
        },
        success: {
          duration: 3000,
          iconTheme: {
            primary: "#22c55e",
            secondary: "#ffffff",
          },
          style: {
            border: "1px solid #86efac",
            background: "#f0fdf4",
          },
        },
        error: {
          duration: 5000,
          iconTheme: {
            primary: "#dc2626",
            secondary: "#ffffff",
          },
          style: {
            border: "1px solid #fca5a5",
            background: "#fef2f2",
          },
        },
        loading: {
          iconTheme: {
            primary: "#dc2626",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
}
