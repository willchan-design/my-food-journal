export interface Collaborator {
  id: string;
  avatar: string;
  name: string;
}

export interface Collection {
  id: string;
  title: string;
  description?: string;
  city: string;
  places: number;
  saves: number;
  is_subscribed: boolean;
  visibility: 'public' | 'private';
  updated_at: Date;
  is_collaborative: boolean;
  collaborators: Collaborator[];
  coverImage?: string;
}

export const mockCollections: Collection[] = [
  {
    id: "1",
    title: "My Favorite Brunch Spots",
    description: "Weekend brunch destinations with amazing coffee",
    city: "Tokyo",
    places: 12,
    saves: 89,
    is_subscribed: false,
    visibility: "public",
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    is_collaborative: false,
    collaborators: [],
  },
  {
    id: "2",
    title: "Best Ramen in Town with Friends and Food Enthusiasts Community",
    description: "Top-tier ramen spots curated by the team",
    city: "Shanghai",
    places: 8,
    saves: 156,
    is_subscribed: false,
    visibility: "public",
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    is_collaborative: true,
    collaborators: [
      { id: "u1", avatar: "https://i.pravatar.cc/100?u=1", name: "Alice" },
      { id: "u2", avatar: "https://i.pravatar.cc/100?u=2", name: "Bob" },
      { id: "u3", avatar: "https://i.pravatar.cc/100?u=3", name: "Carol" },
      { id: "u4", avatar: "https://i.pravatar.cc/100?u=4", name: "Dave" },
    ],
  },
  {
    id: "3",
    title: "Hidden Gems",
    description: "Secret spots only locals know about",
    city: "Osaka",
    places: 5,
    saves: 42,
    is_subscribed: true,
    visibility: "private",
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    is_collaborative: false,
    collaborators: [],
  },
  {
    id: "4",
    title: "Coffee & Desserts Tour",
    description: "Best cafes for coffee lovers",
    city: "Kyoto",
    places: 15,
    saves: 203,
    is_subscribed: true,
    visibility: "public",
    updated_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    is_collaborative: true,
    collaborators: [
      { id: "u5", avatar: "https://i.pravatar.cc/100?u=5", name: "Emma" },
      { id: "u6", avatar: "https://i.pravatar.cc/100?u=6", name: "Frank" },
    ],
  },
  {
    id: "5",
    title: "Date Night Restaurants",
    city: "Tokyo",
    places: 7,
    saves: 128,
    is_subscribed: false,
    visibility: "public",
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    is_collaborative: true,
    collaborators: [
      { id: "u7", avatar: "https://i.pravatar.cc/100?u=7", name: "Grace" },
      { id: "u8", avatar: "https://i.pravatar.cc/100?u=8", name: "Henry" },
      { id: "u9", avatar: "https://i.pravatar.cc/100?u=9", name: "Ivy" },
      { id: "u10", avatar: "https://i.pravatar.cc/100?u=10", name: "Jack" },
      { id: "u11", avatar: "https://i.pravatar.cc/100?u=11", name: "Kate" },
      { id: "u12", avatar: "https://i.pravatar.cc/100?u=12", name: "Leo" },
    ],
  },
];
