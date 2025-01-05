// src/components/events/EventCard.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Event } from '@/types/event';
import { Card } from '@/components/ui/card';
import { formatDate, formatCurrency } from '@/lib/utils';
import {
  Calendar,
  MapPin,
  Clock,
  Tag,
  Edit,
  Trash2,
  Eye,
  Power,
  MoreVertical
} from 'lucide-react';

interface EventCardProps {
  event: Event;
  role: 'admin' | 'agent' | 'user' | 'scanner';
  onView?: (event: Event) => void;
  onEdit?: (event: Event) => void;
  onDelete?: (event: Event) => void;
  onPublish?: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  role,
  onView,
  onEdit,
  onDelete,
  onPublish,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (role === 'user') {
      navigate(`/events/${event.id}`);
    } else if (onView) {
      onView(event);
    }
  };

  const renderStatus = () => {
    const statusColors = {
      draft: 'bg-gray-500',
      published: 'bg-green-500',
      cancelled: 'bg-red-500',
      completed: 'bg-blue-500',
    };

    return (
      <span 
        className={`px-2 py-1 rounded-full text-xs text-white ${statusColors[event.status]}`}
      >
        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
      </span>
    );
  };

  const renderActions = () => {
    if (role === 'user') return null;

    return (
      <div className="absolute top-2 right-2 flex space-x-2">
        {role === 'admin' && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(event);
              }}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full"
            >
              <Edit className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(event);
              }}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full"
            >
              <Trash2 className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPublish?.(event);
              }}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full"
            >
              <Power className={`w-4 h-4 ${event.isPublished ? 'text-green-400' : 'text-gray-400'}`} />
            </button>
          </>
        )}
        {role === 'agent' && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(event);
            }}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full"
          >
            <Edit className="w-4 h-4 text-white" />
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onView?.(event);
          }}
          className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full"
        >
          <Eye className="w-4 h-4 text-white" />
        </button>
      </div>
    );
  };

  return (
    <Card 
      className="relative overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-200"
      onClick={handleCardClick}
    >
      <div className="relative h-48">
        <img 
          src={event.thumbnail || '/api/placeholder/400/300'} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        {renderActions()}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-white">{event.title}</h3>
          {renderStatus()}
        </div>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {event.shortDescription}
        </p>
        <div className="space-y-2">
          <div className="flex items-center text-gray-400 text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDate(event.startDate)}
          </div>
          <div className="flex items-center text-gray-400 text-sm">
            <MapPin className="w-4 h-4 mr-2" />
            {event.venue.name}
          </div>
          <div className="flex items-center text-gray-400 text-sm">
            <Tag className="w-4 h-4 mr-2" />
            {formatCurrency(event.price.min)} - {formatCurrency(event.price.max)}
          </div>
        </div>
        {event.availableTickets <= 20 && (
          <div className="mt-4 text-red-400 text-sm">
            Only {event.availableTickets} tickets left!
          </div>
        )}
      </div>
    </Card>
  );
};

export default EventCard;