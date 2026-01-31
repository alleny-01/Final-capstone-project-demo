import { type Product } from "../types/product.types";

// Dummy data for development
const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Electronics",
    stock: 15,
    description: "High-quality wireless headphones with noise cancellation",
  },
  {
    id: "2",
    name: "Organic Cotton T-Shirt",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "Clothing",
    stock: 32,
    description: "Comfortable organic cotton t-shirt in various colors",
  },
  {
    id: "3",
    name: "Stainless Steel Water Bottle",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    category: "Home & Garden",
    stock: 8,
    description:
      "Insulated stainless steel water bottle, keeps drinks cold for 24h",
  },
  {
    id: "4",
    name: "Smartphone Case",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop",
    category: "Electronics",
    stock: 45,
    description: "Protective smartphone case with shock absorption",
  },
  {
    id: "5",
    name: "Running Shoes",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: "Sports",
    stock: 0, // Out of stock
    description: "Lightweight running shoes with excellent cushioning",
  },
  {
    id: "6",
    name: "Coffee Mug",
    price: 14.99,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop",
    category: "Home & Garden",
    stock: 22,
    description: "Ceramic coffee mug with ergonomic handle",
  },
  {
    id: "7",
    name: "Laptop Backpack",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    category: "Accessories",
    stock: 18,
    description: "Durable laptop backpack with multiple compartments",
  },
  {
    id: "8",
    name: "Yoga Mat",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
    category: "Sports",
    stock: 12,
    description: "Non-slip yoga mat with excellent grip and cushioning",
  },
  {
    id: "9",
    name: "Desk Lamp",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    category: "Home & Garden",
    stock: 7,
    description: "Adjustable LED desk lamp with touch controls",
  },
  {
    id: "10",
    name: "Wireless Mouse",
    price: 25.99,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    category: "Electronics",
    stock: 28,
    description: "Ergonomic wireless mouse with precision tracking",
  },
  {
    id: "11",
    name: "Sunglasses",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    category: "Accessories",
    stock: 16,
    description: "UV protection sunglasses with polarized lenses",
  },
  {
    id: "12",
    name: "Hoodie",
    price: 54.99,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    category: "Clothing",
    stock: 9,
    description: "Comfortable cotton blend hoodie with kangaroo pocket",
  },
];

export const fetchProducts = async (): Promise<Product[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return dummyProducts;
};
