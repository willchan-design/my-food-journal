export interface Place {
  id: string;
  name: string;
  address: string;
  city: string;
  rating: 'loved' | 'ok' | 'not_for_me';
  cuisine: string;
  photo?: string;
  lat: number;
  lng: number;
  addedBy: {
    id: string;
    name: string;
    avatar: string;
  };
  addedAt: Date;
  notes?: string;
}

export interface CollectionWithPlaces {
  id: string;
  title: string;
  description?: string;
  city: string;
  visibility: 'public' | 'private';
  is_collaborative: boolean;
  collaborators: { id: string; avatar: string; name: string }[];
  places: Place[];
}

export const mockCollectionWithPlaces: Record<string, CollectionWithPlaces> = {
  "1": {
    id: "1",
    title: "Tokyo Hidden Gems",
    description: "My favorite spots discovered during my trip to Tokyo",
    city: "Tokyo",
    visibility: "public",
    is_collaborative: false,
    collaborators: [],
    places: [
      {
        id: "p1",
        name: "Tsuta Ramen",
        address: "1-14-1 Sugamo, Toshima",
        city: "Tokyo",
        rating: "loved",
        cuisine: "Ramen",
        photo: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400",
        lat: 35.7333,
        lng: 139.7394,
        addedBy: { id: "me", name: "You", avatar: "https://i.pravatar.cc/100?u=me" },
        addedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        notes: "Amazing truffle shoyu ramen"
      },
      {
        id: "p2",
        name: "Afuri",
        address: "1-1-7 Ebisu, Shibuya",
        city: "Tokyo",
        rating: "loved",
        cuisine: "Ramen",
        photo: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=400",
        lat: 35.6467,
        lng: 139.7100,
        addedBy: { id: "me", name: "You", avatar: "https://i.pravatar.cc/100?u=me" },
        addedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        id: "p3",
        name: "Kikanbo",
        address: "2-10-9 Kajicho, Chiyoda",
        city: "Tokyo",
        rating: "ok",
        cuisine: "Ramen",
        lat: 35.6917,
        lng: 139.7750,
        addedBy: { id: "me", name: "You", avatar: "https://i.pravatar.cc/100?u=me" },
        addedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        notes: "Very spicy, not for everyone"
      },
    ]
  },
  "2": {
    id: "2",
    title: "Best Ramen in Town",
    description: "Top-tier ramen spots curated by the team",
    city: "Shanghai",
    visibility: "public",
    is_collaborative: true,
    collaborators: [
      { id: "u1", avatar: "https://i.pravatar.cc/100?u=1", name: "Alice" },
      { id: "u2", avatar: "https://i.pravatar.cc/100?u=2", name: "Bob" },
      { id: "u3", avatar: "https://i.pravatar.cc/100?u=3", name: "Carol" },
    ],
    places: [
      {
        id: "p4",
        name: "Ippudo Shanghai",
        address: "IAPM Mall, 999 Middle Huaihai Road",
        city: "Shanghai",
        rating: "loved",
        cuisine: "Ramen",
        photo: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400",
        lat: 31.2194,
        lng: 121.4596,
        addedBy: { id: "u1", name: "Alice", avatar: "https://i.pravatar.cc/100?u=1" },
        addedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        id: "p5",
        name: "Nagi Ramen",
        address: "L3-310, K11 Art Mall",
        city: "Shanghai",
        rating: "loved",
        cuisine: "Ramen",
        photo: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=400",
        lat: 31.2350,
        lng: 121.4750,
        addedBy: { id: "u2", name: "Bob", avatar: "https://i.pravatar.cc/100?u=2" },
        addedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        notes: "Green king is the best flavor"
      },
      {
        id: "p6",
        name: "Ramen Champion",
        address: "B1, Raffles City",
        city: "Shanghai",
        rating: "ok",
        cuisine: "Ramen",
        lat: 31.2400,
        lng: 121.4700,
        addedBy: { id: "u3", name: "Carol", avatar: "https://i.pravatar.cc/100?u=3" },
        addedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
      {
        id: "p7",
        name: "Menya Musashi",
        address: "L6, Grand Gateway",
        city: "Shanghai",
        rating: "loved",
        cuisine: "Ramen",
        photo: "https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=400",
        lat: 31.1950,
        lng: 121.4350,
        addedBy: { id: "u1", name: "Alice", avatar: "https://i.pravatar.cc/100?u=1" },
        addedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      },
    ]
  },
  "3": {
    id: "3",
    title: "Brunch Spots",
    description: "Perfect weekend brunch locations",
    city: "Shanghai",
    visibility: "private",
    is_collaborative: false,
    collaborators: [],
    places: [
      {
        id: "p8",
        name: "Pain Chaud",
        address: "115 Xinle Road",
        city: "Shanghai",
        rating: "loved",
        cuisine: "French",
        photo: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400",
        lat: 31.2150,
        lng: 121.4550,
        addedBy: { id: "me", name: "You", avatar: "https://i.pravatar.cc/100?u=me" },
        addedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        notes: "Best croissants in town!"
      },
    ]
  }
};
