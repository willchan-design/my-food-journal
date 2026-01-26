import { useState, useRef } from 'react';
import { Search, MapPin, Camera, X, Heart, Meh, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

type Rating = 'loved' | 'ok' | 'not_for_me';

interface AddPlaceFormData {
  name: string;
  address: string;
  city: string;
  cuisine: string;
  rating: Rating;
  photo: string | null;
  notes: string;
}

interface AddPlaceFormProps {
  onSubmit: (data: AddPlaceFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const cuisineOptions = [
  'Ramen', 'Sushi', 'Italian', 'French', 'Chinese', 'Korean', 
  'Thai', 'Indian', 'Mexican', 'American', 'Mediterranean', 
  'Cafe', 'Bakery', 'Dessert', 'Bar', 'Other'
];

const ratingOptions: { value: Rating; label: string; icon: React.ReactNode; className: string }[] = [
  { 
    value: 'loved', 
    label: 'Loved it', 
    icon: <Heart className="w-4 h-4" />,
    className: 'border-rating-loved/50 bg-rating-loved/10 text-rating-loved hover:bg-rating-loved/20 data-[selected=true]:bg-rating-loved data-[selected=true]:text-white data-[selected=true]:border-rating-loved'
  },
  { 
    value: 'ok', 
    label: 'It was ok', 
    icon: <Meh className="w-4 h-4" />,
    className: 'border-rating-ok/50 bg-rating-ok/10 text-rating-ok hover:bg-rating-ok/20 data-[selected=true]:bg-rating-ok data-[selected=true]:text-white data-[selected=true]:border-rating-ok'
  },
  { 
    value: 'not_for_me', 
    label: 'Not for me', 
    icon: <ThumbsDown className="w-4 h-4" />,
    className: 'border-rating-not/50 bg-rating-not/10 text-rating-not hover:bg-rating-not/20 data-[selected=true]:bg-rating-not data-[selected=true]:text-white data-[selected=true]:border-rating-not'
  },
];

// Mock location suggestions for demo
const mockLocationSuggestions = [
  { name: 'Ichiran Ramen', address: '1-22-7 Jinnan, Shibuya', city: 'Tokyo' },
  { name: 'Tsuta Ramen', address: '1-14-1 Sugamo, Toshima', city: 'Tokyo' },
  { name: 'Afuri', address: '1-1-7 Ebisu, Shibuya', city: 'Tokyo' },
  { name: 'Nakiryu', address: '2-34-4 Minamiōtsuka, Toshima', city: 'Tokyo' },
];

export const AddPlaceForm = ({ onSubmit, onCancel, isSubmitting }: AddPlaceFormProps) => {
  const [formData, setFormData] = useState<AddPlaceFormData>({
    name: '',
    address: '',
    city: '',
    cuisine: '',
    rating: 'loved',
    photo: null,
    notes: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredSuggestions = mockLocationSuggestions.filter(
    loc => loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           loc.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setFormData(prev => ({ ...prev, name: value }));
    setShowSuggestions(value.length > 0);
  };

  const handleSelectSuggestion = (suggestion: typeof mockLocationSuggestions[0]) => {
    setFormData(prev => ({
      ...prev,
      name: suggestion.name,
      address: suggestion.address,
      city: suggestion.city,
    }));
    setSearchQuery(suggestion.name);
    setShowSuggestions(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setFormData(prev => ({ ...prev, photo: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isValid = formData.name && formData.address && formData.city && formData.cuisine;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Location Search */}
      <div className="space-y-2">
        <Label htmlFor="location-search">Search Location</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="location-search"
            placeholder="Search for a restaurant or place..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => searchQuery && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="pl-10"
          />
          
          {/* Suggestions dropdown */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-50 overflow-hidden">
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  className="w-full px-4 py-3 text-left hover:bg-muted transition-colors flex items-start gap-3"
                  onClick={() => handleSelectSuggestion(suggestion)}
                >
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">{suggestion.name}</p>
                    <p className="text-xs text-muted-foreground">{suggestion.address}, {suggestion.city}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Address & City */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            placeholder="Street address"
            value={formData.address}
            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
          />
        </div>
      </div>

      {/* Cuisine Type */}
      <div className="space-y-2">
        <Label htmlFor="cuisine">Cuisine Type</Label>
        <Select
          value={formData.cuisine}
          onValueChange={(value) => setFormData(prev => ({ ...prev, cuisine: value }))}
        >
          <SelectTrigger id="cuisine">
            <SelectValue placeholder="Select cuisine type" />
          </SelectTrigger>
          <SelectContent>
            {cuisineOptions.map(cuisine => (
              <SelectItem key={cuisine} value={cuisine}>
                {cuisine}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Rating Selection */}
      <div className="space-y-3">
        <Label>How was it?</Label>
        <div className="flex gap-2">
          {ratingOptions.map(option => (
            <button
              key={option.value}
              type="button"
              data-selected={formData.rating === option.value}
              onClick={() => setFormData(prev => ({ ...prev, rating: option.value }))}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border-2 transition-all text-sm font-medium',
                option.className
              )}
            >
              {option.icon}
              <span className="hidden sm:inline">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Photo Upload */}
      <div className="space-y-3">
        <Label>Photo (optional)</Label>
        {formData.photo ? (
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src={formData.photo} 
              alt="Place preview" 
              className="w-full h-48 object-cover"
            />
            <button
              type="button"
              onClick={handleRemovePhoto}
              className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-32 border-2 border-dashed border-muted-foreground/30 rounded-lg flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-muted-foreground/50 hover:bg-muted/30 transition-colors"
          >
            <Camera className="w-6 h-6" />
            <span className="text-sm">Add a photo</span>
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea
          id="notes"
          placeholder="What did you like? Any recommendations?"
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          rows={3}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button 
          type="button" 
          variant="outline" 
          className="flex-1"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="flex-1"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Place'}
        </Button>
      </div>
    </form>
  );
};
