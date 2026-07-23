export enum PageView {
  HOME = 'HOME',
  SERVICES = 'SERVICES',
  GUEST_POSTING = 'GUEST_POSTING',
  LINK_INSERTION = 'LINK_INSERTION',
  MAIN_SERVICES = 'MAIN_SERVICES',
  PORTAL = 'PORTAL',
  BOOK_DEMO = 'BOOK_DEMO',
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price?: string;
  icon?: string;
}

export interface WebsiteItem {
  id: string;
  domain: string;
  da: number;
  dr: number;
  traffic: number;
  category: string;
  language: string;
  spamScore: number;
  price: number;
  country: string;
  type: 'Guest Posting' | 'Link Insertion' | 'Both';
}

export interface CartItem {
  id: string;
  website: WebsiteItem;
  targetUrl: string;
  anchorText: string;
  notes: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  status: 'Pending' | 'In Progress' | 'Completed';
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}
