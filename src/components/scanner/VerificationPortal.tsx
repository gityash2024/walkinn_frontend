// src/components/scanner/VerificationPortal.tsx
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const VerificationPortal = () => {
  const [verificationResult, setVerificationResult] = useState<null | {
    status: 'valid' | 'invalid';
    message: string;
    ticketDetails?: {
      id: string;
      event: string;
      customer: string;
      purchaseDate: string;
      validUntil: string;
      type: string;
      price: number;
    };
  }>(null);

  const handleVerification = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock verification result
    setVerificationResult({
      status: 'valid',
      message: 'Ticket verification successful',
      ticketDetails: {
        id: 'TIK001',
        event: 'Summer Music Festival',
        customer: 'John Doe',
        purchaseDate: '2024-01-15',
        validUntil: '2024-07-15',
        type: 'VIP Pass',
        price: 150
      }
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Ticket Verification Portal</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verification Form */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Verify Ticket</h3>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerification} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ticket ID
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter ticket ID"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Event Name
                </label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select event</option>
                  <option value="1">Summer Music Festival</option>
                  <option value="2">Tech Conference</option>
                  <option value="3">Art Exhibition</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Verify Ticket
              </button>
            </form>

            {/* Verification Result */}
            {verificationResult && (
              <div className={`mt-6 p-4 rounded-lg ${
                verificationResult.status === 'valid' ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <p className={`text-lg font-semibold ${
                  verificationResult.status === 'valid' ? 'text-green-700' : 'text-red-700'
                }`}>
                  {verificationResult.message}
                </p>
                {verificationResult.ticketDetails && (
                  <div className="mt-4 space-y-2">
                    <div className="grid grid-cols-2 gap-4">
                      <p className="text-sm">
                        <span className="font-medium">Ticket ID:</span><br />
                        {verificationResult.ticketDetails.id}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Event:</span><br />
                        {verificationResult.ticketDetails.event}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Customer:</span><br />
                        {verificationResult.ticketDetails.customer}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Purchase Date:</span><br />
                        {verificationResult.ticketDetails.purchaseDate}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Valid Until:</span><br />
                        {verificationResult.ticketDetails.validUntil}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Ticket Type:</span><br />
                        {verificationResult.ticketDetails.type}
                      </p>
                    </div>
                    <div className="mt-4">
                      <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                        Print Verification Report
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Verification Guidelines */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Verification Guidelines</h3>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Check if the ticket ID matches the event database
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Verify the ticket hasn't been used before
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Confirm the event date and time are valid
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Ensure the ticket type matches the event access level
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Common Issues</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: 'Invalid Ticket ID',
                    description: 'Double-check the ticket ID format and ensure all characters are entered correctly.'
                  },
                  {
                    title: 'Already Used Ticket',
                    description: 'If a ticket shows as already used, check the scan history for details.'
                  },
                  {
                    title: 'Wrong Event',
                    description: 'Verify that the ticket is being scanned at the correct event venue.'
                  }
                ].map((issue, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-red-600">{issue.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{issue.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VerificationPortal;