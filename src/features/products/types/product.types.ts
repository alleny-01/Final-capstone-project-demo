export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  compareAtPrice: number | null;
  sku: string | null;
  barcode: string | null;
  quantity: number;
  category: string | null;
  tags: string | null;
  images: string;
  featured: boolean;
  published: boolean;
  isDefault: boolean | null;
  owner: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ProductsResponse {
  data: Product[];
  meta: PaginationMeta;
}
