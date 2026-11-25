export interface CoupleInfo {
  bride: {
    name: string;
    fullName: string;
    parents: string;
    grandparents: string;
    residence: string;
    image?: string;
  };
  groom: {
    name: string;
    fullName: string;
    parents: string;
    grandparents: string;
    residence: string;
    image?: string;
  };
  quote: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  description: string;
  iconName: 'ring' | 'heart' | 'party' | 'sparkles';
  isMainEvent?: boolean;
}

export interface GalleryImage {
  id: string;
  title?: string;
  category: 'invitation' | 'pre-wedding' | 'tradition' | 'ceremony' | 'moments' | 'attire' | 'heritage' | 'couple' | 'celebration' | 'rituals';
  url: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  caption: string;
}

export interface RSVPResponse {
  name: string;
  emailOrPhone: string;
  attending: 'yes' | 'no' | 'maybe';
  guestCount: number;
  dietaryOrNotes?: string;
  wishes?: string;
  submittedAt: string;
}

export interface BlessingMessage {
  id: string;
  author: string;
  relation?: string;
  message: string;
  date: string;
}

export interface WeddingConfig {
  couple: CoupleInfo;
  weddingDate: {
    formatted: string; // e.g. "Sunday, 25 October 2026"
    shortDate: string; // e.g. "25 October 2026"
    isoDateTime: string; // "2026-10-25T11:44:00+05:30"
    muhurtham: string; // "11:44 AM – 12:06 PM"
    dayOfWeek: string; // "Sunday"
  };
  venue: {
    name: string; // "M Convention Centre"
    location: string; // "Vallikode, Pathanamthitta"
    fullAddress: string;
    mapsUrl: string;
    embedMapUrl: string;
    qrCodeImage?: string;
  };
  familyWishes: {
    parentsBride: string;
    parentsGroom: string;
    bestWishesFrom: string;
    blessingQuote: string;
  };
  events: EventItem[];
  reception?: {
    title: string;
    hostedBy: string;
    date: string;
    dayOfWeek: string;
    time: string;
    venueName: string;
    venueLocation: string;
  };
  gallery: GalleryImage[];
  initialBlessings: BlessingMessage[];
  music: {
    title: string;
    artist: string;
    src: string;
  };
  video?: {
    enabled: boolean;
    src?: string;
    poster?: string;
  };
}
