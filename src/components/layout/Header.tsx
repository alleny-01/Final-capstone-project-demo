import { Link } from "react-router-dom";
import { APP_NAME } from "@/lib/constants/config";
import CartIcon from "@/features/cart/components/CartIcon";

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-primary">
            {APP_NAME}
          </Link>
          <CartIcon />
        </div>
      </div>
    </header>
  );
}
