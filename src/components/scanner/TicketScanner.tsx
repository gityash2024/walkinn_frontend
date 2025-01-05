// src/components/scanner/TicketScanner.tsx
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const TicketScanner = () => {
  const [scanResult, setScanResult] = useState<null | {
    status: 'valid' | 'invalid';
    message: string;
    ticketInfo?: {
      id: string;
      event: string;
      customer: string;
      date: string;
    };
  }>(null);

  const [scanHistory] = useState([
    {
      id: 'TIK001',
      status: 'valid',
      time: '2 minutes ago',
      event: 'Summer Music Festival'
    },
    {
      id: 'TIK002',
      status: 'invalid',
      time: '5 minutes ago',
      event: 'Tech Conference'
    }
  ]);

  const handleScanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock scan result
    setScanResult({
      status: 'valid',
      message: 'Ticket verified successfully',
      ticketInfo: {
        id: 'TIK003',
        event: 'Summer Music Festival',
        customer: 'John Doe',
        date: '2024-07-15'
      }
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Ticket Scanner</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scanner Interface */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Scan Ticket</h3>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleScanSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ticket ID or QR Code
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter ticket ID or scan QR code"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Scan Ticket
              </button>
            </form>

            {/* Scan Result */}
            {scanResult && (
              <div className={`mt-6 p-4 rounded-lg ${
                scanResult.status === 'valid' ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <p className={`text-lg font-semibold ${
                  scanResult.status === 'valid' ? 'text-green-700' : 'text-red-700'
                }`}>
                  {scanResult.message}
                </p>
                {scanResult.ticketInfo && (
                  <div className="mt-4 space-y-2">
                    <p><span className="font-medium">Ticket ID:</span> {scanResult.ticketInfo.id}</p>
                    <p><span className="font-medium">Event:</span> {scanResult.ticketInfo.event}</p>
                    <p><span className="font-medium">Customer:</span> {scanResult.ticketInfo.customer}</p>
                    <p><span className="font-medium">Date:</span> {scanResult.ticketInfo.date}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Scan History */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Recent Scans</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scanHistory.map((scan) => (
                <div key={scan.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Ticket #{scan.id}</p>
                    <p className="text-sm text-gray-500">{scan.event}</p>
                    <p className="text-xs text-gray-400">{scan.time}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    scan.status === 'valid' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {scan.status === 'valid' ? 'Valid' : 'Invalid'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scanner Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Total Scans</h3>
            <p className="text-3xl font-bold">1,234</p>
            <p className="text-green-600 text-sm mt-2">↑ 8% from last hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Valid Tickets</h3>
            <p className="text-3xl font-bold">1,180</p>
            <p className="text-green-600 text-sm mt-2">95.6% success rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Invalid Tickets</h3>
            <p className="text-3xl font-bold">54</p>
            <p className="text-red-600 text-sm mt-2">4.4% failure rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Active Events</h3>
            <p className="text-3xl font-bold">3</p>
            <p className="text-blue-600 text-sm mt-2">Currently scanning</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Events */}
      <Card className="mt-6">
        <CardHeader>
          <h3 className="text-lg font-semibold">Active Events</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                id: 1,
                name: 'Summer Music Festival',
                location: 'Main Stage',
                scanned: 450,
                total: 500
              },
              {
                id: 2,
                name: 'Tech Conference',
                location: 'Hall A',
                scanned: 280,
                total: 300
              },
              {
                id: 3,
                name: 'Art Exhibition',
                location: 'Gallery 1',
                scanned: 150,
                total: 200
              }
            ].map((event) => (
              <Card key={event.id} className="bg-gray-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold">{event.name}</h4>
                  <p className="text-sm text-gray-500">{event.location}</p>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{Math.round((event.scanned / event.total) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(event.scanned / event.total) * 100}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {event.scanned} / {event.total} tickets scanned
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketScanner;