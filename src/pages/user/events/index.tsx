//src/pages/user/events/index.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Event, EventFilters } from '@/types/event';
import { Card } from '@/components/ui/card';
import EventCard from '@/components/events/EventCard';
import {
  Search,
  Calendar,
  MapPin,
  Tag,
  Filter,
  SortAsc,
  SortDesc,
  X,
  Sliders
} from 'lucide-react';

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Summer Music Festival 2024',
    description: 'Experience the biggest summer music festival featuring top artists from around the world. Join us for three days of non-stop music, food, and entertainment.',
    shortDescription: 'Three days of music, food, and entertainment.',
    category: 'music',
    type: 'offline',
    status: 'published',
    startDate: '2024-07-15T10:00:00',
    endDate: '2024-07-17T23:00:00',
    registrationStartDate: '2024-05-01T00:00:00',
    registrationEndDate: '2024-07-14T23:59:59',
    thumbnail: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
    images: [
      'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
      'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg'
    ],
    venue: {
      id: 'v1',
      name: 'Central Park Arena',
      address: '123 Park Avenue',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      capacity: 5000,
      amenities: ['Parking', 'Food Court', 'VIP Lounge']
    },
    organizer: {
      id: 'org1',
      name: 'EventMasters Inc',
      email: 'contact@eventmasters.com',
      phone: '+1234567890',
      role: 'admin'
    },
    ticketTiers: [
      {
        id: 't1',
        name: 'Early Bird',
        description: 'Limited early bird tickets',
        price: 149.99,
        quantity: 1000,
        maxPerBooking: 4,
        type: 'single',
        available: 250
      },
      {
        id: 't2',
        name: 'VIP Pass',
        description: 'Full VIP access with exclusive perks',
        price: 299.99,
        quantity: 200,
        maxPerBooking: 2,
        type: 'single',
        available: 50
      }
    ],
    minTickets: 1,
    maxTickets: 4,
    totalTickets: 1200,
    soldTickets: 900,
    availableTickets: 300,
    price: {
      min: 149.99,
      max: 299.99
    },
    tags: ['music', 'festival', 'summer'],
    isFeatured: true,
    isPublished: true,
    createdAt: '2024-01-01T00:00:00',
    updatedAt: '2024-01-01T00:00:00'
  },
  {
    id: '2',
    title: 'Tech Conference 2024',
    description: 'Virtual tech conference featuring industry leaders discussing latest trends in AI, Web3, and Cloud Computing.',
    shortDescription: 'Virtual tech conference with industry leaders.',
    category: 'technology',
    type: 'online',
    status: 'published',
    startDate: '2024-08-20T09:00:00',
    endDate: '2024-08-21T18:00:00',
    registrationStartDate: '2024-06-01T00:00:00',
    registrationEndDate: '2024-08-19T23:59:59',
    thumbnail: 'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg',
    images: [
      'https://images.pexels.com/photos/7688460/pexels-photo-7688460.jpeg'
    ],
    venue: {
      id: 'v2',
      name: 'Virtual Platform',
      address: 'Online Event',
      city: 'Virtual',
      state: 'NA',
      country: 'Global',
      capacity: 10000,
      amenities: ['Virtual Networking', 'Live Q&A']
    },
    organizer: {
      id: 'org2',
      name: 'TechEvents Global',
      email: 'info@techevents.com',
      phone: '+1234567890',
      role: 'admin'
    },
    ticketTiers: [
      {
        id: 't3',
        name: 'Standard Access',
        description: 'Full conference access',
        price: 99.99,
        quantity: 5000,
        maxPerBooking: 5,
        type: 'single',
        available: 3000
      }
    ],
    minTickets: 1,
    maxTickets: 5,
    totalTickets: 5000,
    soldTickets: 2000,
    availableTickets: 3000,
    price: {
      min: 99.99,
      max: 99.99
    },
    tags: ['technology', 'virtual', 'conference'],
    isFeatured: true,
    isPublished: true,
    createdAt: '2024-01-15T00:00:00',
    updatedAt: '2024-01-15T00:00:00'
  },
  {
    id: '3',
    title: 'Food & Wine Festival',
    description: 'A culinary journey featuring top chefs, wine tastings, and cooking demonstrations.',
    shortDescription: 'Culinary festival with top chefs and wine tastings.',
    category: 'food',
    type: 'offline',
    status: 'draft',
    startDate: '2024-09-10T11:00:00',
    endDate: '2024-09-12T22:00:00',
    registrationStartDate: '2024-07-01T00:00:00',
    registrationEndDate: '2024-09-09T23:59:59',
    thumbnail: 'https://images.pexels.com/photos/5638268/pexels-photo-5638268.jpeg',
    images: [
      'https://images.pexels.com/photos/3184195/pexels-photo-3184195.jpeg',
      'https://images.pexels.com/photos/2664149/pexels-photo-2664149.jpeg'
    ],
    venue: {
      id: 'v3',
      name: 'Riverfront Convention Center',
      address: '456 River Road',
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
      capacity: 3000,
      amenities: ['Kitchen Stations', 'Tasting Areas', 'VIP Lounge']
    },
    organizer: {
      id: 'org3',
      name: 'Culinary Events Co',
      email: 'events@culinary.com',
      phone: '+1234567890',
      role: 'agent'
    },
    ticketTiers: [
      {
        id: 't4',
        name: 'General Admission',
        description: 'Access to all tastings and demos',
        price: 79.99,
        quantity: 2000,
        maxPerBooking: 6,
        type: 'single',
        available: 2000
      }
    ],
    minTickets: 1,
    maxTickets: 6,
    totalTickets: 2000,
    soldTickets: 0,
    availableTickets: 2000,
    price: {
      min: 79.99,
      max: 79.99
    },
    tags: ['food', 'wine', 'cooking'],
    isFeatured: false,
    isPublished: false,
    createdAt: '2024-02-01T00:00:00',
    updatedAt: '2024-02-01T00:00:00'
  },
  {
    id: '4',
    title: 'Business Leadership Summit',
    description: 'Hybrid summit bringing together business leaders to discuss future trends and strategies.',
    shortDescription: 'Hybrid business leadership summit.',
    category: 'business',
    type: 'hybrid',
    status: 'published',
    startDate: '2024-10-05T09:00:00',
    endDate: '2024-10-07T17:00:00',
    registrationStartDate: '2024-08-01T00:00:00',
    registrationEndDate: '2024-10-04T23:59:59',
    thumbnail: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
    images: [
      'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg'
    ],
    venue: {
      id: 'v4',
      name: 'Global Business Center',
      address: '789 Business Ave',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      capacity: 1000,
      amenities: ['Conference Rooms', 'Networking Area', 'Virtual Access']
    },
    organizer: {
      id: 'org4',
      name: 'Business Leaders Association',
      email: 'summit@bla.com',
      phone: '+1234567890',
      role: 'admin'
    },
    ticketTiers: [
      {
        id: 't5',
        name: 'In-Person Premium',
        description: 'Full in-person access',
        price: 599.99,
        quantity: 500,
        maxPerBooking: 3,
        type: 'single',
        available: 200
      },
      {
        id: 't6',
        name: 'Virtual Access',
        description: 'Full virtual access',
        price: 299.99,
        quantity: 1000,
        maxPerBooking: 5,
        type: 'single',
        available: 800
      }
    ],
    minTickets: 1,
    maxTickets: 5,
    totalTickets: 1500,
    soldTickets: 500,
    availableTickets: 1000,
    price: {
      min: 299.99,
      max: 599.99
    },
    tags: ['business', 'leadership', 'hybrid'],
    isFeatured: true,
    isPublished: true,
    createdAt: '2024-02-15T00:00:00',
    updatedAt: '2024-02-15T00:00:00'
  },
  {
    id: '5',
    title: 'Sports Tournament Finals',
    description: 'Championship finals featuring top teams competing for the grand trophy.',
    shortDescription: 'Championship finals with top teams.',
    category: 'sports',
    type: 'offline',
    status: 'published',
    startDate: '2024-11-15T14:00:00',
    endDate: '2024-11-15T23:00:00',
    registrationStartDate: '2024-09-01T00:00:00',
    registrationEndDate: '2024-11-14T23:59:59',
    thumbnail: 'https://images.pexels.com/photos/976873/pexels-photo-976873.jpeg',
    images: [
      'https://images.pexels.com/photos/163452/basketball-dunk-scoring-points-163452.jpeg'
    ],
    venue: {
      id: 'v5',
      name: 'Sports Arena',
      address: '321 Stadium Road',
      city: 'Dallas',
      state: 'TX',
      country: 'USA',
      capacity: 15000,
      amenities: ['Parking', 'Concessions', 'VIP Boxes']
    },
    organizer: {
      id: 'org5',
      name: 'Sports Events Pro',
      email: 'info@sportspro.com',
      phone: '+1234567890',
      role: 'admin'
    },
    ticketTiers: [
      {
        id: 't7',
        name: 'Regular Seating',
        description: 'Standard arena seating',
        price: 49.99,
        quantity: 10000,
        maxPerBooking: 8,
        type: 'single',
        available: 5000
      },
      {
        id: 't8',
        name: 'VIP Box',
        description: 'Private box with catering',
        price: 199.99,
        quantity: 100,
        maxPerBooking: 1,
        type: 'single',
        available: 50
      }
    ],
    minTickets: 1,
    maxTickets: 8,
    totalTickets: 10100,
    soldTickets: 6000,
    availableTickets: 4100,
    price: {
      min: 49.99,
      max: 199.99
    },
    tags: ['sports', 'tournament', 'championship'],
    isFeatured: true,
    isPublished: true,
    createdAt: '2024-03-01T00:00:00',
    updatedAt: '2024-03-01T00:00:00'
  }
];

const UserEventList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<EventFilters>({
    search: '',
    category: '',
    type: '',
    status: 'published',
    dateRange: null,
    priceRange: null
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleEventClick = (eventId: string) => {
    navigate(`/events/${eventId}`);
  };

  const handleFilterChange = (field: keyof EventFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const renderFeaturedEvents = () => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">Featured Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events
          .filter(event => event.isFeatured)
          .slice(0, 3)
          .map(event => (
            <EventCard
              key={event.id}
              event={event}
              role="user"
              onView={() => handleEventClick(event.id)}
            />
          ))}
      </div>
    </div>
  );

  const renderFilters = () => (
    <Card className="sticky top-4 p-6 bg-white bg-opacity-10 rounded-lg">
      <h3 className="text-lg font-bold text-white mb-4">Filters</h3>
      
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <label className="block text-gray-300 mb-2">Categories</label>
        <div className="flex flex-wrap gap-2">
          {['music', 'sports', 'arts', 'technology', 'food', 'business'].map(category => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCategories.includes(category)
                  ? 'bg-[#fa383e] text-white'
                  : 'bg-white bg-opacity-10 text-gray-300'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Date Range */}
      <div className="mb-6">
        <label className="block text-gray-300 mb-2">Date Range</label>
        <input
          type="date"
          className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white mb-2"
          onChange={(e) =>
            handleFilterChange('dateRange', {
              ...filters.dateRange,
              start: e.target.value
            })
          }
        />
        <input
          type="date"
          className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
          onChange={(e) =>
            handleFilterChange('dateRange', {
              ...filters.dateRange,
              end: e.target.value
            })
          }
        />
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-gray-300 mb-2">Price Range</label>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            placeholder="Min"
            className="w-1/2 px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
            onChange={(e) =>
              handleFilterChange('priceRange', {
                ...filters.priceRange,
                min: Number(e.target.value)
              })
            }
          />
          <input
            type="number"
            placeholder="Max"
            className="w-1/2 px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
            onChange={(e) =>
              handleFilterChange('priceRange', {
                ...filters.priceRange,
                max: Number(e.target.value)
              })
            }
          />
        </div>
      </div>

      {/* Event Type */}
      <div className="mb-6">
        <label className="block text-gray-300 mb-2">Event Type</label>
        <select
          className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
        >
          <option value="">All Types</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>

      {/* Reset Filters */}
      <button
        onClick={() => {
          setFilters({
            search: '',
            category: '',
            type: '',
            status: 'published',
            dateRange: null,
            priceRange: null
          });
          setSelectedCategories([]);
        }}
        className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-opacity-90"
      >
        Reset Filters
      </button>
    </Card>
  );

  const renderEventGrid = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">All Events</h2>
        <select
          className="px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
          onChange={(e) => {
            // Implement sorting logic
          }}
        >
          <option value="date-desc">Latest First</option>
          <option value="date-asc">Earliest First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events
          .filter(event => event.isPublished)
          .map(event => (
            <EventCard
              key={event.id}
              event={event}
              role="user"
              onView={() => handleEventClick(event.id)}
            />
          ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Mobile Filter Button */}
      <button
        className="md:hidden fixed bottom-4 right-4 z-20 p-4 bg-[#fa383e] rounded-full shadow-lg"
        onClick={() => setIsFilterDrawerOpen(true)}
      >
        <Sliders className="w-6 h-6 text-white" />
      </button>

      {renderFeaturedEvents()}

      <div className="flex gap-8">
        {/* Desktop Filters */}
        <div className="hidden md:block w-80">
          {renderFilters()}
        </div>

        {/* Event Grid */}
        <div className="flex-1">
          {renderEventGrid()}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsFilterDrawerOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-gray-900 p-6 overflow-y-auto">
            <button
              className="absolute top-4 right-4"
              onClick={() => setIsFilterDrawerOpen(false)}
            >
              <X className="w-6 h-6 text-white" />
            </button>
            {renderFilters()}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserEventList;