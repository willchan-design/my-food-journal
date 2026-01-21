export interface Collaborator {
  id: string;
  name: string;
  avatar: string;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  isPublic: boolean;
  hasCollaborators: boolean;
  placeCount: number;
  saveCount: number;
  updatedAt: Date;
  collaborators: Collaborator[];
  city: string;
}

export const mockCollections: Collection[] = [
  {
    id: '1',
    title: 'Date Night Spots',
    description: 'Romantic restaurants for special occasions with amazing ambiance and service',
    isPublic: false,
    hasCollaborators: false,
    placeCount: 12,
    saveCount: 0,
    updatedAt: new Date('2024-01-15'),
    collaborators: [],
    city: 'Shanghai',
  },
  {
    id: '2',
    title: 'Best Ramen',
    description: 'Top-tier ramen spots curated by the team',
    isPublic: true,
    hasCollaborators: true,
    placeCount: 8,
    saveCount: 156,
    updatedAt: new Date('2024-01-10'),
    collaborators: [
      { id: 'c1', name: 'Alex', avatar: 'https://i.pravatar.cc/100?img=1' },
      { id: 'c2', name: 'Sarah', avatar: 'https://i.pravatar.cc/100?img=2' },
      { id: 'c3', name: 'Mike', avatar: 'https://i.pravatar.cc/100?img=3' },
      { id: 'c4', name: 'Emma', avatar: 'https://i.pravatar.cc/100?img=4' },
    ],
    city: 'Shanghai',
  },
  {
    id: '3',
    title: 'Weekend Brunch Favorites',
    description: 'Perfect spots for lazy weekend mornings',
    isPublic: false,
    hasCollaborators: false,
    placeCount: 5,
    saveCount: 0,
    updatedAt: new Date('2024-01-08'),
    collaborators: [],
    city: 'Shanghai',
  },
  {
    id: '4',
    title: 'Coffee & Remote Work Spots Collection',
    description: 'Best cafes for remote work with good wifi and comfortable seating',
    isPublic: true,
    hasCollaborators: true,
    placeCount: 7,
    saveCount: 89,
    updatedAt: new Date('2024-02-01'),
    collaborators: [
      { id: 'c5', name: 'Tom', avatar: 'https://i.pravatar.cc/100?img=5' },
    ],
    city: 'Tokyo',
  },
  {
    id: '5',
    title: 'The Ultimate Guide to Izakayas',
    description: 'A comprehensive collection of traditional izakayas with authentic atmosphere',
    isPublic: true,
    hasCollaborators: true,
    placeCount: 23,
    saveCount: 312,
    updatedAt: new Date('2024-02-10'),
    collaborators: [
      { id: 'c6', name: 'Yuki', avatar: 'https://i.pravatar.cc/100?img=6' },
      { id: 'c7', name: 'Ken', avatar: 'https://i.pravatar.cc/100?img=7' },
    ],
    city: 'Tokyo',
  },
  {
    id: '6',
    title: 'Hidden Gems',
    description: 'Secret spots only locals know about',
    isPublic: false,
    hasCollaborators: false,
    placeCount: 15,
    saveCount: 0,
    updatedAt: new Date('2024-02-15'),
    collaborators: [],
    city: 'Tokyo',
  },
];

export const groupCollectionsByCity = (collections: Collection[]) => {
  const grouped: Record<string, Collection[]> = {};
  
  collections.forEach((collection) => {
    if (!grouped[collection.city]) {
      grouped[collection.city] = [];
    }
    grouped[collection.city].push(collection);
  });
  
  return grouped;
};
