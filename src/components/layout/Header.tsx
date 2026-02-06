import { Link, useLocation } from "react-router-dom";
import { APP_NAME } from "@/lib/constants/config";
import CartIcon from "@/features/cart/components/CartIcon";
import { Zap } from "lucide-react";

export default function Header() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="bg-red-600 p-2 rounded-lg group-hover:bg-red-700 transition-colors">
              <Zap className="w-5 h-5 text-white" fill="white" />
            </div>
            <span className="text-xl font-bold text-gray-900">{APP_NAME}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/products"
              className={`font-medium transition-colors relative ${
                isActive("/products")
                  ? "text-red-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Products
              {isActive("/products") && (
                <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-red-600" />
              )}
            </Link>
            <Link
              to="/"
              className={`font-medium transition-colors relative ${
                isActive("/") && !isActive("/products")
                  ? "text-red-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              About
              {isActive("/") && !isActive("/products") && (
                <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-red-600" />
              )}
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <CartIcon />
          </div>
        </div>
      </div>
    </header>
  );
}
