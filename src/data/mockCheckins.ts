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
    restaurantName: '鯛めし専門店 魚虎',
    location: '東京都渋谷区神宮前',
    rating: 'loved',
    dishes: ['鯛めし御膳', '刺身盛り合わせ'],
    note: '新鮮な鯛がとても美味しかった。出汁をかけて食べる茶漬け風も絶品。',
    timestamp: daysAgo(0, 13),
  },
  {
    id: '2',
    restaurantName: 'カフェ・ド・フロール',
    location: '東京都港区南青山',
    rating: 'ok',
    dishes: ['クロワッサン', 'カフェラテ'],
    timestamp: daysAgo(0, 9),
  },
  {
    id: '3',
    restaurantName: '麺屋 一燈',
    location: '東京都新宿区西新宿',
    rating: 'loved',
    dishes: ['特製つけ麺', '味玉'],
    note: '濃厚な魚介スープが最高。並んでも食べる価値あり。',
    photos: ['https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop'],
    timestamp: daysAgo(1, 12),
  },
  {
    id: '4',
    restaurantName: 'トラットリア・ダ・ナポリ',
    location: '東京都目黒区自由が丘',
    rating: 'loved',
    dishes: ['マルゲリータ', 'カルボナーラ', 'ティラミス'],
    note: '本格的なナポリピッツァ。生地がもちもちで美味しい。',
    timestamp: daysAgo(1, 19),
  },
  {
    id: '5',
    restaurantName: 'スシロー 新宿店',
    location: '東京都新宿区歌舞伎町',
    rating: 'not',
    dishes: ['まぐろ', 'サーモン', 'えび天'],
    note: '混雑していてネタが新鮮じゃなかった。',
    timestamp: daysAgo(2, 20),
  },
  {
    id: '6',
    restaurantName: '茶寮 都路里',
    location: '京都府京都市東山区',
    rating: 'loved',
    dishes: ['抹茶パフェ', '京わらび餅'],
    note: '京都旅行の締めくくりに。抹茶が濃厚で最高だった。',
    photos: ['https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop'],
    timestamp: daysAgo(3, 15),
  },
  {
    id: '7',
    restaurantName: 'ビストロ・ジャポン',
    location: '東京都中央区銀座',
    rating: 'ok',
    dishes: ['和牛ステーキ', 'フォアグラ'],
    timestamp: daysAgo(5, 19),
  },
  {
    id: '8',
    restaurantName: '天ぷら 近藤',
    location: '東京都中央区銀座',
    rating: 'loved',
    dishes: ['天ぷらコース', '車海老', 'さつまいも'],
    note: '人生で最高の天ぷら。さつまいもが甘くて絶品。',
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
