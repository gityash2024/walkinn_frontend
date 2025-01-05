export * from './event';
export * from './agent';

export interface Event {
  id: string;
  title: string;
  description: string;
  venue: string;
  date: string;
  price: number;
  status: 'upcoming' | 'live' | 'completed';
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  capacity: number;
}

export interface Ticket {
  id: string;
  eventId: string;
  userId: string;
  price: number;
  status: 'active' | 'used' | 'cancelled';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'agent';
}

export interface Payment {
  id: string;
  ticketId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
}
