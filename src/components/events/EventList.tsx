// src/components/events/EventList.tsx
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const EventList = () => {
  const events = [
    {
      id: 1,
      title: 'Summer Music Festival',
      date: '2024-07-15',
      location: 'Central Park',
      status: 'Upcoming'
    },
    // Add more mock events
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <h3 className="text-lg font-semibold">{event.title}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Date: {event.date}</p>
              <p className="text-gray-600">Location: {event.location}</p>
              <p className="text-gray-600">Status: {event.status}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventList;