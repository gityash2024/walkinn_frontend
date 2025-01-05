//src/pages/user/events/[id].tsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Event, TicketTier } from '@/types/event';
import { Card } from '@/components/ui/card';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Tag,
  Share2,
  Heart,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Info
} from 'lucide-react';

interface TicketSelection {
  tierId: string;
  quantity: number;
}

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [selectedTickets, setSelectedTickets] = useState<TicketSelection[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [agentSelection, setAgentSelection] = useState<string>('');
  const [bookingStep, setBookingStep] = useState(1);

  useEffect(() => {
    // Fetch event details
    // For now using mock data
    setEvent({
      // Mock event data
    } as Event);
  }, [id]);

  if (!event) return <div>Loading...</div>;

  const handleTicketQuantityChange = (tierId: string, quantity: number) => {
    setSelectedTickets(prev => {
      const existing = prev.find(t => t.tierId === tierId);
      if (existing) {
        return prev.map(t => 
          t.tierId === tierId ? { ...t, quantity } : t
        );
      }
      return [...prev, { tierId, quantity }];
    });
  };

  const getTotalAmount = () => {
    return selectedTickets.reduce((total, selection) => {
      const tier = event.ticketTiers.find(t => t.id === selection.tierId);
      return total + (tier?.price || 0) * selection.quantity;
    }, 0);
  };

  const handleBookNow = () => {
    setIsBookingModalOpen(true);
  };

  const renderImageGallery = () => (
    <div className="relative h-96 mb-8">
      <img
        src={event.images[currentImageIndex] || '/api/placeholder/800/400'}
        alt={event.title}
        className="w-full h-full object-cover rounded-lg"
      />
      
      {event.images.length > 1 && (
        <>
          <button
            onClick={() => setCurrentImageIndex(prev => 
              prev === 0 ? event.images.length - 1 : prev - 1
            )}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 rounded-full"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() => setCurrentImageIndex(prev => 
              prev === event.images.length - 1 ? 0 : prev + 1
            )}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 rounded-full"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {event.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  currentImageIndex === index ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );

  const renderEventInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-8">
        <Card className="p-6 bg-white bg-opacity-10">
          <h1 className="text-3xl font-bold text-white mb-4">{event.title}</h1>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-300">
              <Calendar className="w-5 h-5 mr-2" />
              {new Date(event.startDate).toLocaleDateString()}
            </div>
            <div className="flex items-center text-gray-300">
              <Clock className="w-5 h-5 mr-2" />
              {new Date(event.startDate).toLocaleTimeString()}
            </div>
            <div className="flex items-center text-gray-300">
              <MapPin className="w-5 h-5 mr-2" />
              {event.venue.name}
            </div>
            <div className="flex items-center text-gray-300">
              <Users className="w-5 h-5 mr-2" />
              {event.availableTickets} tickets left
            </div>
          </div>
          <div className="prose prose-invert">
            <p className="text-gray-300">{event.description}</p>
          </div>
        </Card>

        <Card className="p-6 bg-white bg-opacity-10">
          <h2 className="text-xl font-bold text-white mb-4">Event Details</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-white font-semibold mb-2">Date and Time</h3>
              <p className="text-gray-300">
                {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Location</h3>
              <p className="text-gray-300">{event.venue.address}</p>
              <p className="text-gray-300">{event.venue.city}, {event.venue.state}</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Organizer</h3>
              <p className="text-gray-300">{event.organizer.name}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white bg-opacity-10">
          <h2 className="text-xl font-bold text-white mb-4">Terms & Conditions</h2>
          <div className="space-y-2 text-gray-300">
            <p>• Tickets are non-refundable</p>
            <p>• Valid ID required for entry</p>
            <p>• No photography or recording allowed</p>
            <p>• Age restrictions may apply</p>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="p-6 bg-white bg-opacity-10 sticky top-4">
          <h2 className="text-xl font-bold text-white mb-4">Select Tickets</h2>
          {event.ticketTiers.map(tier => (
            <div key={tier.id} className="mb-4 p-4 border border-gray-700 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-white font-semibold">{tier.name}</h3>
                  <p className="text-gray-400 text-sm">{tier.description}</p>
                </div>
                <span className="text-white font-bold">${tier.price}</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-400 text-sm">
                  {tier.available} available
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      const current = selectedTickets.find(t => t.tierId === tier.id)?.quantity || 0;
                      handleTicketQuantityChange(tier.id, Math.max(0, current - 1));
                    }}
                    className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full text-white"
                    disabled={!selectedTickets.find(t => t.tierId === tier.id)?.quantity}
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-white">
                    {selectedTickets.find(t => t.tierId === tier.id)?.quantity || 0}
                  </span>
                  <button
                    onClick={() => {
                      const current = selectedTickets.find(t => t.tierId === tier.id)?.quantity || 0;
                      handleTicketQuantityChange(tier.id, Math.min(tier.maxPerBooking, current + 1));
                    }}
                    className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full text-white"
                    disabled={
                      (selectedTickets.find(t => t.tierId === tier.id)?.quantity || 0) >= tier.maxPerBooking ||
                      (selectedTickets.find(t => t.tierId === tier.id)?.quantity || 0) >= tier.available
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}

          {getTotalAmount() > 0 && (
            <>
              <div className="flex justify-between items-center my-4 text-white">
                <span className="font-bold">Total Amount:</span>
                <span className="font-bold">${getTotalAmount()}</span>
              </div>
              <button
                onClick={handleBookNow}
                className="w-full py-3 bg-[#fa383e] text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Book Now
              </button>
            </>
          )}
        </Card>

        <Card className="p-6 bg-white bg-opacity-10">
          <h2 className="text-xl font-bold text-white mb-4">Share</h2>
          <div className="flex space-x-4">
            <button className="p-2 bg-gray-700 rounded-full">
              <Share2 className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 bg-gray-700 rounded-full">
              <Heart className="w-5 h-5 text-white" />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderBookingModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <Card className="w-full max-w-2xl bg-white bg-opacity-10 p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Complete Your Booking</h2>
        
        {bookingStep === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-semibold mb-4">Selected Tickets</h3>
              {selectedTickets.map(selection => {
                const tier = event.ticketTiers.find(t => t.id === selection.tierId);
                return (
                  <div key={selection.tierId} className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">
                      {tier?.name} x {selection.quantity}
                    </span>
                    <span className="text-white">${(tier?.price || 0) * selection.quantity}</span>
                  </div>
                );
              })}
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">Select Agent (Optional)</h3>
              <select
                className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                value={agentSelection}
                onChange={(e) => setAgentSelection(e.target.value)}
              >
                <option value="">No Agent</option>
                <option value="agent1">Agent 1</option>
                <option value="agent2">Agent 2</option>
              </select>
            </div>

            <button
              onClick={() => setBookingStep(2)}
              className="w-full py-3 bg-[#fa383e] text-white rounded-lg hover:bg-opacity-90"
            >
              Continue
            </button>
          </div>
        )}

        {bookingStep === 2 && (
          // Implement attendee details form and payment integration
          <div>
            {/* Add form for attendee details */}
            {/* Add payment integration */}
          </div>
        )}

        <button
          onClick={() => {
            setIsBookingModalOpen(false);
            setBookingStep(1);
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
      </Card>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {renderImageGallery()}
      {renderEventInfo()}
      {isBookingModalOpen && renderBookingModal()}
    </div>
  );
};

export default EventDetails;