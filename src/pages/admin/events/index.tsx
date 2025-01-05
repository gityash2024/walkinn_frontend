// src/pages/admin/events/index.tsx

import React, { useState } from 'react';
import { Event, EventFilters, EventSortOptions } from '@/types/event';
import { Card } from '@/components/ui/card';
import EventCard from '@/components/events/EventCard';
import EventForm from '@/components/events/EventForm';
import {
  Search,
  Filter,
  Plus,
  Download,
  SortAsc,
  SortDesc,
  Grid,
  List,
  Trash2,
  Edit,
  Power
} from 'lucide-react';
import NoEvents from '@/components/events/NoEvents';

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



const AdminEventList = () => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<EventFilters>({
    search: '',
    category: '',
    type: '',
    status: '',
    dateRange: null,
    priceRange: null
  });
  const [sortOptions, setSortOptions] = useState<EventSortOptions>({
    field: 'date',
    direction: 'desc'
  });

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setIsFormOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsFormOpen(true);
  };

  const handleDeleteEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsDeleteModalOpen(true);
  };

  const handlePublishEvent = async (event: Event) => {
    try {
      // API call to publish/unpublish event
      const updatedEvent = { ...event, isPublished: !event.isPublished };
      // Update local state
      setEvents(events.map(e => e.id === event.id ? updatedEvent : e));
    } catch (error) {
      console.error('Failed to update event status:', error);
    }
  };

  const handleFormSubmit = async (values: any) => {
    try {
      if (selectedEvent) {
        // Update existing event
        const updatedEvent = { ...selectedEvent, ...values };
        setEvents(events.map(e => e.id === selectedEvent.id ? updatedEvent : e));
      } else {
        // Create new event
        const newEvent = {
          id: Date.now().toString(),
          ...values,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setEvents([newEvent, ...events]);
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to save event:', error);
    }
  };

  const handleExportData = () => {
    // Implement export functionality
  };

  const renderFilters = () => (
    <Card className="p-4 bg-white bg-opacity-10 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>
        </div>

        <div>
          <select
            className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="">All Categories</option>
            <option value="music">Music</option>
            <option value="sports">Sports</option>
            <option value="arts">Arts</option>
            {/* Add more categories */}
          </select>
        </div>

        <div>
          <select
            className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">All Types</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <div>
          <select
            className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
    </Card>
  );

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-white">Events Management</h1>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          className="p-2 bg-white bg-opacity-10 rounded-lg"
        >
          {viewMode === 'grid' ? (
            <List className="w-5 h-5 text-white" />
          ) : (
            <Grid className="w-5 h-5 text-white" />
          )}
        </button>

        <button
          onClick={handleExportData}
          className="flex items-center px-4 py-2 bg-white bg-opacity-10 rounded-lg text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </button>

        <button
          onClick={handleCreateEvent}
          className="flex items-center px-4 py-2 bg-[#fa383e] rounded-lg text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </button>
      </div>
    </div>
  );

  const renderEvents = () => {
    if (events.length === 0) {
      return <NoEvents />;
    }
    if (viewMode === 'grid') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              role="admin"
              onView={(event) => {/* Implement view logic */}}
              onEdit={handleEditEvent}
              onDelete={handleDeleteEvent}
              onPublish={handlePublishEvent}
            />
          ))}
        </div>
      );
    }

    return (
      <Card className="bg-white bg-opacity-10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-4 text-gray-400">Title</th>
                <th className="text-left p-4 text-gray-400">Date</th>
                <th className="text-left p-4 text-gray-400">Type</th>
                <th className="text-left p-4 text-gray-400">Status</th>
                <th className="text-left p-4 text-gray-400">Tickets</th>
                <th className="text-left p-4 text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b border-gray-700">
                  <td className="p-4 text-white">{event.title}</td>
                  <td className="p-4 text-white">
                    {new Date(event.startDate).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-white capitalize">{event.type}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        event.status === 'published'
                          ? 'bg-green-900 text-green-300'
                          : event.status === 'draft'
                          ? 'bg-gray-900 text-gray-300'
                          : 'bg-red-900 text-red-300'
                      }`}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td className="p-4 text-white">
                    {event.soldTickets}/{event.totalTickets}
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditEvent(event)}
                        className="p-1 hover:bg-white hover:bg-opacity-10 rounded"
                      >
                        <Edit className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event)}
                        className="p-1 hover:bg-white hover:bg-opacity-10 rounded"
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => handlePublishEvent(event)}
                        className="p-1 hover:bg-white hover:bg-opacity-10 rounded"
                      >
                        <Power
                          className={`w-4 h-4 ${
                            event.isPublished ? 'text-green-400' : 'text-gray-400'
                          }`}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {renderHeader()}
      {renderFilters()}
      {renderEvents()}

      {/* Event Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-auto">
            <EventForm
              initialValues={selectedEvent || {}}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsFormOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <Card className="w-full max-w-md bg-white bg-opacity-10 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Delete Event</h2>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete "{selectedEvent?.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-opacity-90"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setEvents(events.filter(e => e.id !== selectedEvent?.id));
                  setIsDeleteModalOpen(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-opacity-90"
              >
                Delete
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminEventList;