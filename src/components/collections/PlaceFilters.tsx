import { useState, useMemo } from 'react';
import { Search, X, Heart, Meh, ThumbsDown, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Place } from '@/data/mockPlaces';

type Rating = 'loved' | 'ok' | 'not_for_me';

export interface PlaceFiltersState {
  searchQuery: string;
  ratings: Rating[];
  cuisines: string[];
}

interface PlaceFiltersProps {
  places: Place[];
  filters: PlaceFiltersState;
  onFiltersChange: (filters: PlaceFiltersState) => void;
}

const ratingOptions: { value: Rating; label: string; icon: React.ReactNode; activeClass: string }[] = [
  { 
    value: 'loved', 
    label: 'Loved', 
    icon: <Heart className="w-3.5 h-3.5" />,
    activeClass: 'bg-rating-loved text-white border-rating-loved'
  },
  { 
    value: 'ok', 
    label: 'Ok', 
    icon: <Meh className="w-3.5 h-3.5" />,
    activeClass: 'bg-rating-ok text-white border-rating-ok'
  },
  { 
    value: 'not_for_me', 
    label: 'Not for me', 
    icon: <ThumbsDown className="w-3.5 h-3.5" />,
    activeClass: 'bg-rating-not text-white border-rating-not'
  },
];

export const PlaceFilters = ({ places, filters, onFiltersChange }: PlaceFiltersProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get unique cuisines from places
  const availableCuisines = useMemo(() => {
    const cuisines = new Set(places.map(p => p.cuisine));
    return Array.from(cuisines).sort();
  }, [places]);

  const activeFilterCount = filters.ratings.length + filters.cuisines.length;

  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, searchQuery: value });
  };

  const toggleRating = (rating: Rating) => {
    const newRatings = filters.ratings.includes(rating)
      ? filters.ratings.filter(r => r !== rating)
      : [...filters.ratings, rating];
    onFiltersChange({ ...filters, ratings: newRatings });
  };

  const toggleCuisine = (cuisine: string) => {
    const newCuisines = filters.cuisines.includes(cuisine)
      ? filters.cuisines.filter(c => c !== cuisine)
      : [...filters.cuisines, cuisine];
    onFiltersChange({ ...filters, cuisines: newCuisines });
  };

  const clearFilters = () => {
    onFiltersChange({ searchQuery: '', ratings: [], cuisines: [] });
  };

  const hasActiveFilters = filters.searchQuery || activeFilterCount > 0;

  return (
    <div className="space-y-3">
      {/* Search and Filter Row */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search places..."
            value={filters.searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 pr-10 bg-muted/50 border-0"
          />
          {filters.searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-muted rounded-full"
            >
              <X className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          )}
        </div>

        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="icon"
              className={cn(
                'relative shrink-0',
                activeFilterCount > 0 && 'border-primary text-primary'
              )}
            >
              <Filter className="w-4 h-4" />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-medium rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-72 p-4">
            <div className="space-y-4">
              {/* Rating Filters */}
              <div>
                <p className="text-sm font-medium mb-2">Rating</p>
                <div className="flex flex-wrap gap-2">
                  {ratingOptions.map(option => {
                    const isActive = filters.ratings.includes(option.value);
                    return (
                      <button
                        key={option.value}
                        onClick={() => toggleRating(option.value)}
                        className={cn(
                          'flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm transition-colors',
                          isActive
                            ? option.activeClass
                            : 'border-border bg-background hover:bg-muted'
                        )}
                      >
                        {option.icon}
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cuisine Filters */}
              {availableCuisines.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Cuisine</p>
                  <div className="flex flex-wrap gap-2">
                    {availableCuisines.map(cuisine => {
                      const isActive = filters.cuisines.includes(cuisine);
                      return (
                        <button
                          key={cuisine}
                          onClick={() => toggleCuisine(cuisine)}
                          className={cn(
                            'px-3 py-1.5 rounded-full border text-sm transition-colors',
                            isActive
                              ? 'border-primary bg-primary text-primary-foreground'
                              : 'border-border bg-background hover:bg-muted'
                          )}
                        >
                          {cuisine}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Clear All */}
              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-muted-foreground"
                  onClick={clearFilters}
                >
                  Clear all filters
                </Button>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Active Filter Pills */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 items-center">
          {filters.ratings.map(rating => {
            const option = ratingOptions.find(o => o.value === rating)!;
            return (
              <span
                key={rating}
                className={cn(
                  'flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium',
                  option.activeClass
                )}
              >
                {option.icon}
                {option.label}
                <button 
                  onClick={() => toggleRating(rating)}
                  className="ml-0.5 hover:opacity-70"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          })}
          {filters.cuisines.map(cuisine => (
            <span
              key={cuisine}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground"
            >
              {cuisine}
              <button 
                onClick={() => toggleCuisine(cuisine)}
                className="ml-0.5 hover:opacity-70"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// Helper function to filter places
export const filterPlaces = (places: Place[], filters: PlaceFiltersState): Place[] => {
  return places.filter(place => {
    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesSearch = 
        place.name.toLowerCase().includes(query) ||
        place.address.toLowerCase().includes(query) ||
        place.cuisine.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Rating filter
    if (filters.ratings.length > 0 && !filters.ratings.includes(place.rating)) {
      return false;
    }

    // Cuisine filter
    if (filters.cuisines.length > 0 && !filters.cuisines.includes(place.cuisine)) {
      return false;
    }

    return true;
  });
};
