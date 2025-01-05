// src/components/bookings/BookingList.tsx
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const BookingList = () => {
  const bookings = [
    {
      id: 1,
      eventName: 'Summer Music Festival',
      customer: 'John Doe',
      tickets: 2,
      status: 'Confirmed',
      date: '2024-07-15'
    },
    {
      id: 2,
      eventName: 'Tech Conference',
      customer: 'Jane Smith',
      tickets: 1,
      status: 'Pending',
      date: '2024-08-20'
    },
    {
      id: 3,
      eventName: 'Art Exhibition',
      customer: 'Alice Brown',
      tickets: 3,
      status: 'Confirmed',
      date: '2024-09-05'
    },
    {
      id: 4,
      eventName: 'Food Carnival',
      customer: 'Michael Green',
      tickets: 4,
      status: 'Pending',
      date: '2024-09-15'
    },
    {
      id: 5,
      eventName: 'Winter Sports Gala',
      customer: 'Sarah White',
      tickets: 5,
      status: 'Confirmed',
      date: '2024-10-10'
    },
    {
      id: 6,
      eventName: 'Book Fair',
      customer: 'David Black',
      tickets: 1,
      status: 'Cancelled',
      date: '2024-11-01'
    },
    {
      id: 7,
      eventName: 'Marathon Run',
      customer: 'Emily Red',
      tickets: 2,
      status: 'Confirmed',
      date: '2024-11-20'
    },
    {
      id: 8,
      eventName: 'Charity Auction',
      customer: 'Paul Yellow',
      tickets: 3,
      status: 'Pending',
      date: '2024-12-05'
    },
    {
      id: 9,
      eventName: 'Film Festival',
      customer: 'Laura Pink',
      tickets: 4,
      status: 'Confirmed',
      date: '2024-12-25'
    },
    {
      id: 10,
      eventName: 'Music Awards Night',
      customer: 'Robert Gray',
      tickets: 2,
      status: 'Pending',
      date: '2025-01-10'
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Bookings</h1>

      {/* Booking Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2 text-white">Total Bookings</h3>
            <p className="text-3xl font-bold text-white">1,234</p>
            <p className="text-green-600 text-sm mt-2">↑ 8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2 text-white">Pending Bookings</h3>
            <p className="text-3xl font-bold text-white">45</p>
            <p className="text-yellow-600 text-sm mt-2">Needs attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2 text-white">Today's Bookings</h3>
            <p className="text-3xl font-bold text-white">28</p>
            <p className="text-blue-600 text-sm mt-2">↑ 5 since yesterday</p>
          </CardContent>
        </Card>
      </div>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-white">Recent Bookings</h3>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-white">
                    Booking ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-white">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-white">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-white">
                    Tickets
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-white">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-white">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-white">#{booking.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">{booking.eventName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">{booking.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">{booking.tickets}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        booking.status === 'Confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : booking.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">{booking.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-blue-600 hover:text-blue-800">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="mt-6">
        <CardHeader>
          <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: 1,
                action: 'New Booking',
                description: 'John Doe booked 2 tickets for Summer Music Festival',
                time: '5 minutes ago'
              },
              {
                id: 2,
                action: 'Booking Modified',
                description: 'Jane Smith changed her booking date for Tech Conference',
                time: '1 hour ago'
              },
              {
                id: 3,
                action: 'Booking Cancelled',
                description: 'Mike Johnson cancelled his booking for Art Exhibition',
                time: '2 hours ago'
              },
              {
                id: 4,
                action: 'New Booking',
                description: 'Emily Red booked 3 tickets for Charity Auction',
                time: '4 hours ago'
              },
              {
                id: 5,
                action: 'Booking Confirmed',
                description: 'Paul Yellow confirmed his booking for Film Festival',
                time: '6 hours ago'
              }
            ].map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                <div>
                  <p className="font-semibold text-white">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingList;
