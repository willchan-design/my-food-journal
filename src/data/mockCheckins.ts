export type Rating = 'loved' | 'ok' | 'not';

export interface CheckIn {
  id: string;
  restaurantName: string;
  location: string;
  rating: Rating;
  dishes: string[];
  note?: string;
  photos?: string[];
  timestamp: Date;
}

// Helper to create dates relative to today
const daysAgo = (days: number, hours = 12) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(hours, 0, 0, 0);
  return date;
};

export const mockCheckins: CheckIn[] = [
  {
    id: '1',
    restaurantName: 'Tai Meshi Uotora',
    location: 'Jingumae, Shibuya, Tokyo',
    rating: 'loved',
    dishes: ['Sea Bream Rice Set', 'Sashimi Platter'],
    note: 'The fresh sea bream was absolutely delicious. The ochazuke style with dashi was exquisite.',
    timestamp: daysAgo(0, 13),
  },
  {
    id: '2',
    restaurantName: 'Café de Flore',
    location: 'Minami-Aoyama, Minato, Tokyo',
    rating: 'ok',
    dishes: ['Croissant', 'Café Latte'],
    timestamp: daysAgo(0, 9),
  },
  {
    id: '3',
    restaurantName: 'Menya Itto',
    location: 'Nishi-Shinjuku, Shinjuku, Tokyo',
    rating: 'loved',
    dishes: ['Special Tsukemen', 'Seasoned Egg'],
    note: 'The rich seafood broth was amazing. Worth the wait in line.',
    photos: ['https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop'],
    timestamp: daysAgo(1, 12),
  },
  {
    id: '4',
    restaurantName: 'Trattoria Da Napoli',
    location: 'Jiyugaoka, Meguro, Tokyo',
    rating: 'loved',
    dishes: ['Margherita', 'Carbonara', 'Tiramisu'],
    note: 'Authentic Neapolitan pizza. The dough was chewy and delicious.',
    timestamp: daysAgo(1, 19),
  },
  {
    id: '5',
    restaurantName: 'Sushiro Shinjuku',
    location: 'Kabukicho, Shinjuku, Tokyo',
    rating: 'not',
    dishes: ['Tuna', 'Salmon', 'Shrimp Tempura'],
    note: 'Too crowded and the fish wasn\'t fresh.',
    timestamp: daysAgo(2, 20),
  },
  {
    id: '6',
    restaurantName: 'Saryo Tsujiri',
    location: 'Higashiyama, Kyoto',
    rating: 'loved',
    dishes: ['Matcha Parfait', 'Warabi Mochi'],
    note: 'Perfect ending to the Kyoto trip. The matcha was rich and heavenly.',
    photos: ['https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop'],
    timestamp: daysAgo(3, 15),
  },
  {
    id: '7',
    restaurantName: 'Bistro Japon',
    location: 'Ginza, Chuo, Tokyo',
    rating: 'ok',
    dishes: ['Wagyu Steak', 'Foie Gras'],
    timestamp: daysAgo(5, 19),
  },
  {
    id: '8',
    restaurantName: 'Tempura Kondo',
    location: 'Ginza, Chuo, Tokyo',
    rating: 'loved',
    dishes: ['Tempura Course', 'Prawn', 'Sweet Potato'],
    note: 'The best tempura of my life. The sweet potato was sweet and divine.',
    timestamp: daysAgo(7, 12),
  },
];

// Group checkins by date
export const groupCheckinsByDate = (checkins: CheckIn[]) => {
  const groups: { [key: string]: CheckIn[] } = {};
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  checkins.forEach(checkin => {
    const checkinDate = new Date(checkin.timestamp);
    checkinDate.setHours(0, 0, 0, 0);
    
    let key: string;
    if (checkinDate.getTime() === today.getTime()) {
      key = 'Today';
    } else if (checkinDate.getTime() === yesterday.getTime()) {
      key = 'Yesterday';
    } else {
      key = checkinDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    }
    
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(checkin);
  });
  
  // Sort each group by time (newest first)
  Object.keys(groups).forEach(key => {
    groups[key].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  });
  
  return groups;
};
