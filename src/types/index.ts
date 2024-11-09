export interface Issue {
  id: string;
  title: string;
  description: string;
  type: 'community' | 'government';
  status: 'pending' | 'solved';
  urgency: 'low' | 'medium' | 'high';
  location: {
    lat: number;
    lng: number;
  };
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'user' | 'admin';
}