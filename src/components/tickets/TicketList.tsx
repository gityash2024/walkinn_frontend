// src/components/tickets/TicketList.tsx

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  Tag,
  User,
  MapPin,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface TicketStatus {
  id: string;
  status: 'valid' | 'used' | 'cancelled' | 'expired';
  code: string;
  event: {
    name: string;
    date: string;
    time: string;
    venue: string;
  };
  type: string;
  price: number;
  purchaseDate: string;
  user?: {
    name: string;
    email: string;
  };
}

interface TicketListProps {
  userRole: 'admin' | 'user';
}

const mockTickets: TicketStatus[] = [
  {
    id: '1',
    status: 'valid',
    code: 'TIK001',
    event: {
      name: 'Summer Music Festival',
      date: '2024-07-15',
      time: '14:00',
      venue: 'Central Park Arena'
    },
    type: 'VIP Pass',
    price: 299.99,
    purchaseDate: '2024-03-01T10:30:00',
    user: {
      name: 'John Doe',
      email: 'john@example.com'
    }
  },
  {
    id: '2',
    status: 'used',
    code: 'TIK002',
    event: {
      name: 'Tech Conference 2024',
      date: '2024-08-20',
      time: '09:00',
      venue: 'Convention Center'
    },
    type: 'Regular Entry',
    price: 149.99,
    purchaseDate: '2024-02-15T15:45:00',
    user: {
      name: 'Jane Smith',
      email: 'jane@example.com'
    }
  }
];

const TicketList: React.FC<TicketListProps> = ({ userRole }) => {
  const [tickets, setTickets] = useState<TicketStatus[]>(mockTickets);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedTicket, setSelectedTicket] = useState<TicketStatus | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid':
        return 'bg-green-900 text-green-300';
      case 'used':
        return 'bg-blue-900 text-blue-300';
      case 'cancelled':
        return 'bg-red-900 text-red-300';
      case 'expired':
        return 'bg-gray-900 text-gray-300';
      default:
        return 'bg-gray-900 text-gray-300';
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">
          {userRole === 'admin' ? 'All Tickets' : 'My Tickets'}
        </h1>
        {userRole === 'admin' && (
          <button
            onClick={() => {/* Export functionality */}}
            className="flex items-center px-4 py-2 bg-[#fa383e] rounded-lg text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        )}
      </div>

      <Card className="p-4 bg-white bg-opacity-10 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="valid">Valid</option>
            <option value="used">Used</option>
            <option value="cancelled">Cancelled</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {filteredTickets.map(ticket => (
          <Card
            key={ticket.id}
            className="p-6 bg-white bg-opacity-10 hover:bg-opacity-20 transition-all cursor-pointer"
            onClick={() => setSelectedTicket(ticket)}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">{ticket.event.name}</h3>
                <div className="flex items-center space-x-4 text-gray-300">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(ticket.event.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {ticket.event.time}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {ticket.event.venue}
                  </span>
                </div>
                {userRole === 'admin' && ticket.user && (
                  <div className="flex items-center space-x-2 text-gray-300">
                    <User className="w-4 h-4" />
                    <span>{ticket.user.name}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(ticket.status)}`}>
                  {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                </span>
                <span className="text-lg font-bold text-white">
                  ${ticket.price.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-gray-700 pt-4">
              <div className="flex items-center space-x-4 text-gray-400">
                <span className="flex items-center">
                  <Tag className="w-4 h-4 mr-1" />
                  {ticket.type}
                </span>
                <span>Code: {ticket.code}</span>
              </div>
              {userRole === 'admin' && (
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-white hover:bg-opacity-10 rounded">
                    {ticket.status === 'valid' ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl bg-white bg-opacity-10 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Ticket Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-1">Event</label>
                <p className="text-white">{selectedTicket.event.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1">Date</label>
                  <p className="text-white">
                    {new Date(selectedTicket.event.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Time</label>
                  <p className="text-white">{selectedTicket.event.time}</p>
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Venue</label>
                <p className="text-white">{selectedTicket.event.venue}</p>
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Ticket Type</label>
                <p className="text-white">{selectedTicket.type}</p>
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Status</label>
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                  getStatusColor(selectedTicket.status)
                }`}>
                  {selectedTicket.status.charAt(0).toUpperCase() + selectedTicket.status.slice(1)}
                </span>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedTicket(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-opacity-90"
              >
                Close
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TicketList;