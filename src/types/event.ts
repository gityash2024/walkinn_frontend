// src/types/event.ts

export type TicketType = 'single' | 'couple' | 'multi';

export interface TicketTier {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  maxPerBooking: number;
  type: TicketType;
  available: number;
}

export interface EventVenue {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  capacity: number;
  amenities: string[];
}

export interface EventOrganizer {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'agent';
}

export type EventStatus = 'draft' | 'published' | 'cancelled' | 'completed';
export type EventType = 'online' | 'offline' | 'hybrid';
export type EventCategory = 
  | 'music' 
  | 'sports' 
  | 'arts' 
  | 'technology' 
  | 'food' 
  | 'business' 
  | 'education' 
  | 'other';

export interface Event {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: EventCategory;
  type: EventType;
  status: EventStatus;
  startDate: string;
  endDate: string;
  registrationStartDate: string;
  registrationEndDate: string;
  thumbnail: string;
  images: string[];
  venue: EventVenue;
  organizer: EventOrganizer;
  ticketTiers: TicketTier[];
  minTickets: number;
  maxTickets: number;
  totalTickets: number;
  soldTickets: number;
  availableTickets: number;
  price: {
    min: number;
    max: number;
  };
  tags: string[];
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EventFilters {
  search: string;
  category: EventCategory | '';
  type: EventType | '';
  status: EventStatus | '';
  dateRange: {
    start: string;
    end: string;
  } | null;
  priceRange: {
    min: number;
    max: number;
  } | null;
}

export interface EventSortOptions {
  field: 'title' | 'date' | 'price' | 'availability';
  direction: 'asc' | 'desc';
}

export interface EventFormData extends Omit<Event, 
  'id' | 'createdAt' | 'updatedAt' | 'soldTickets' | 'availableTickets'
> {
  // Additional form-specific fields can be added here
}