import { Link } from "react-router-dom";
import { APP_NAME } from "@/lib/constants/config";
import {
  Zap,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-red-600 p-2 rounded-lg">
                <Zap className="w-5 h-5 text-white" fill="white" />
              </div>
              <span className="text-xl font-bold text-white">{APP_NAME}</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Your trusted destination for premium quality products. Fast
              delivery, exceptional service.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm hover:text-red-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-sm hover:text-red-500 transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm hover:text-red-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm hover:text-red-500 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm hover:text-red-500 transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm hover:text-red-500 transition-colors"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm hover:text-red-500 transition-colors"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm hover:text-red-500 transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-red-500" />
                <span className="text-sm">
                  123 Commerce Street, Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-red-500" />
                <a
                  href="tel:+2341234567890"
                  className="text-sm hover:text-red-500 transition-colors"
                >
                  +234 123 456 7890
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-red-500" />
                <a
                  href="mailto:support@quickserve.com"
                  className="text-sm hover:text-red-500 transition-colors"
                >
                  support@quickserve.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2026 {APP_NAME}. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to="/"
                className="text-sm text-gray-400 hover:text-red-500 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/"
                className="text-sm text-gray-400 hover:text-red-500 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/"
                className="text-sm text-gray-400 hover:text-red-500 transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
