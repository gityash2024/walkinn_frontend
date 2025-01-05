
export interface Agent {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: 'active' | 'blocked';
    role: 'agent';
    avatar?: string;
    events: string[];
    createdAt: string;
    updatedAt: string;
    totalEvents: number;
    totalScans: number;
    lastActive: string;
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      zipCode: string;
    };
    documents: {
      id: string;
      type: string;
      url: string;
      verified: boolean;
    }[];
    ratings: {
      average: number;
      total: number;
    };
    performance: {
      scanAccuracy: number;
      responseTime: number;
      completedEvents: number;
    };
  }
  
  export interface AgentFormData {
    name: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      zipCode: string;
    };
    documents: {
      type: string;
      url: string;
    }[];
  }
  
  export interface AgentFilters {
    search: string;
    status: string;
    dateRange: {
      start: string;
      end: string;
    } | null;
    performance: string;
  }