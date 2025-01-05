// src/components/contact/ContactList.tsx

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Search, Mail, Phone, User, Calendar, CheckCircle, XCircle, MessageSquare } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'pending' | 'resolved';
  createdAt: string;
}

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    subject: 'Event Booking Issue',
    message: 'I am unable to book tickets for the upcoming music festival...',
    status: 'pending',
    createdAt: '2024-03-15T10:30:00'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1987654320',
    subject: 'Refund Request',
    message: 'I would like to request a refund for my ticket purchase...',
    status: 'resolved',
    createdAt: '2024-03-14T15:45:00'
  }
];

const ContactList = () => {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'resolved'>('all');

  const handleStatusChange = (contactId: string, newStatus: 'pending' | 'resolved') => {
    setContacts(contacts.map(contact =>
      contact.id === contactId ? { ...contact, status: newStatus } : contact
    ));
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || contact.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="mt-5 container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-4">Contact Messages</h1>
        <div className="flex space-x-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'pending' | 'resolved')}
          >
            <option value="all">All Messages</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredContacts.map(contact => (
          <Card key={contact.id} className="p-6 bg-white bg-opacity-10">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-white font-medium">{contact.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">{contact.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">{contact.phone}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  contact.status === 'resolved'
                    ? 'bg-green-900 text-green-300'
                    : 'bg-yellow-900 text-yellow-300'
                }`}>
                  {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-white font-medium mb-2">{contact.subject}</h3>
              <p className="text-gray-300">{contact.message}</p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-gray-700 pt-4">
              <div className="flex items-center space-x-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  {new Date(contact.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedContact(contact)}
                  className="p-2 hover:bg-white hover:bg-opacity-10 rounded"
                >
                  <MessageSquare className="w-5 h-5 text-blue-400" />
                </button>
                <button
                  onClick={() => handleStatusChange(contact.id, 
                    contact.status === 'pending' ? 'resolved' : 'pending'
                  )}
                  className="p-2 hover:bg-white hover:bg-opacity-10 rounded"
                >
                  {contact.status === 'pending' ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Message Details Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl bg-white bg-opacity-10 p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-white">Message Details</h2>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-gray-400 hover:text-white"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-1">From</label>
                <p className="text-white">{selectedContact.name}</p>
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Subject</label>
                <p className="text-white">{selectedContact.subject}</p>
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Message</label>
                <p className="text-white">{selectedContact.message}</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ContactList;