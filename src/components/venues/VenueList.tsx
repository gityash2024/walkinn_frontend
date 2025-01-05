// src/components/venues/VenueList.tsx
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const VenueList = () => {
  const venues = [
    {
      id: 1,
      name: 'Grand Arena',
      capacity: 5000,
      location: 'Downtown',
      availability: 'Available'
    },
    // Add more mock venues
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Venues</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <Card key={venue.id}>
            <CardHeader>
              <h3 className="text-lg font-semibold">{venue.name}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Capacity: {venue.capacity}</p>
              <p className="text-gray-600">Location: {venue.location}</p>
              <p className="text-gray-600">Status: {venue.availability}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VenueList;