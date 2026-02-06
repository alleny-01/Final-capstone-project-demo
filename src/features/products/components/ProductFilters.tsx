import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select-new";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X, Filter } from "lucide-react";

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
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-11"
          />
        </div>

        {/* Category Filter */}
        <Select
          value={category || "all"}
          onValueChange={(val) => onCategoryChange(val === "all" ? null : val)}
        >
          <SelectTrigger className="w-full sm:w-56 h-11">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <SelectValue placeholder="All Categories" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear Filters Button */}
        {hasFilters && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            size="lg"
            className="h-11"
          >
            <X className="w-4 h-4 mr-2" />
            Clear
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {hasFilters && (
        <div className="flex flex-wrap gap-2">
          {search && (
            <Badge
              variant="default"
              className="flex items-center gap-1.5 px-3 py-1.5"
            >
              <span className="text-xs">Search:</span>
              <span className="font-medium">{search}</span>
              <button
                onClick={() => onSearchChange("")}
                className="ml-1 hover:bg-black/10 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {category && (
            <Badge
              variant="default"
              className="flex items-center gap-1.5 px-3 py-1.5"
            >
              <span className="text-xs">Category:</span>
              <span className="font-medium">{category}</span>
              <button
                onClick={() => onCategoryChange(null)}
                className="ml-1 hover:bg-black/10 rounded-full p-0.5 transition-colors"
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
