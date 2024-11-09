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
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    photo?: string;
    category: string;
  }


 