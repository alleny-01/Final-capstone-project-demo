import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";

interface ProductFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string | null;
  onCategoryChange: (value: string | null) => void;
  categories: string[];
  onClearFilters: () => void;
  hasFilters: boolean;
}

export default function ProductFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  onClearFilters,
  hasFilters,
}: ProductFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <Select
          value={category || "all"}
          onChange={(e) =>
            onCategoryChange(e.target.value === "all" ? null : e.target.value)
          }
          className="w-full sm:w-48"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>

        {/* Clear Filters Button */}
        {hasFilters && (
          <Button variant="outline" onClick={onClearFilters} size="md">
            Clear Filters
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {hasFilters && (
        <div className="flex flex-wrap gap-2">
          {search && (
            <Badge variant="default" className="flex items-center gap-1">
              Search: {search}
              <button
                onClick={() => onSearchChange("")}
                className="ml-1 hover:bg-black/10 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {category && (
            <Badge variant="default" className="flex items-center gap-1">
              Category: {category}
              <button
                onClick={() => onCategoryChange(null)}
                className="ml-1 hover:bg-black/10 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
