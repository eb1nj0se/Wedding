export interface RSVPData {
  id: string;
  fullName: string;
  attendance: 'attending' | 'declining';
  guestCount: number;
  message?: string;
  submittedAt: string;
}

export interface TimelineEvent {
  time: string;
  title: string;
  location: string;
  description: string;
  iconName: 'sparkles' | 'ring' | 'glass' | 'utensils' | 'music' | 'moon';
  attireNote?: string;
}

export interface StoryChapter {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  imageUrl: string;
}

export interface GuestWish {
  id: string;
  author: string;
  relation: string;
  message: string;
  timestamp: string;
  likes: number;
}
