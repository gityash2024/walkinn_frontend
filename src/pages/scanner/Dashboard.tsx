// src/pages/scanner/Dashboard.tsx

import React from 'react';
import styled from 'styled-components';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
  padding: 2rem;
`;

const GlassCard = styled(Card)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

// Stats Card Component
const StatCard = ({ title, value, icon, trend }: any) => (
  <GlassCard className="p-6 transform hover:scale-105 transition-all duration-200">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <h3 className="text-white text-2xl font-bold mt-2">{value}</h3>
        <p className={`text-sm mt-2 ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% from last hour
        </p>
      </div>
      <div className="text-[#fa383e] text-3xl">{icon}</div>
    </div>
  </GlassCard>
);

const ScannerDashboard = () => {
  // Mock data for demonstration
  const statsData = [
    { title: "Today's Scans", value: '145', trend: 12.5, icon: '🎟️' },
    { title: 'Valid Tickets', value: '142', trend: 8.2, icon: '✅' },
    { title: 'Invalid Attempts', value: '3', trend: -15.8, icon: '❌' },
    { title: 'Avg Scan Time', value: '2.3s', trend: -5.4, icon: '⚡' }
  ];

  const recentScans = [
    { id: 1, ticketId: 'TIK001', status: 'Valid', time: '2 mins ago', event: 'Summer Music Festival' },
    { id: 2, ticketId: 'TIK002', status: 'Invalid', time: '5 mins ago', event: 'Tech Conference' },
    // Add more mock data...
  ];

  return (
    <DashboardContainer>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Scanner Dashboard</h1>
        
        {/* Quick Actions */}
        <div className="mb-8">
          <GlassCard className="p-6">
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#fa383e] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all">
                Start Scanning
              </button>
              <button className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all">
                View History
              </button>
              <button className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all">
                Generate Report
              </button>
            </div>
          </GlassCard>
        </div>

        {/* Stats Cards */}
        <StatsGrid>
          {statsData.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </StatsGrid>

        {/* Recent Scans Table */}
        <GlassCard className="mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-6">Recent Scans</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-700">
                    <th className="py-3 text-left">Ticket ID</th>
                    <th className="py-3 text-left">Event</th>
                    <th className="py-3 text-left">Status</th>
                    <th className="py-3 text-left">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentScans.map(scan => (
                    <tr key={scan.id} className="border-b border-gray-700">
                      <td className="py-3">{scan.ticketId}</td>
                      <td className="py-3">{scan.event}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          scan.status === 'Valid' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                        }`}>
                          {scan.status}
                        </span>
                      </td>
                      <td className="py-3">{scan.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </GlassCard>

        {/* Scanning Activity Chart */}
        <GlassCard className="mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-6">Scanning Activity</h2>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { time: '9 AM', scans: 25 },
                    { time: '10 AM', scans: 45 },
                    { time: '11 AM', scans: 35 },
                    { time: '12 PM', scans: 30 },
                    { time: '1 PM', scans: 55 },
                    { time: '2 PM', scans: 40 },
                    { time: '3 PM', scans: 45 }
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="scans" 
                    stroke="#fa383e" 
                    strokeWidth={2}
                    dot={{ fill: '#fa383e' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </GlassCard>

        {/* Active Events */}
        <GlassCard className="mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-6">Active Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  id: 1,
                  name: 'Summer Music Festival',
                  location: 'Main Stage',
                  time: '2:00 PM - 11:00 PM',
                  scanned: 450,
                  total: 500
                },
                {
                  id: 2,
                  name: 'Tech Conference',
                  location: 'Hall A',
                  time: '9:00 AM - 6:00 PM',
                  scanned: 280,
                  total: 300
                }
              ].map(event => (
                <GlassCard key={event.id} className="p-4 bg-white bg-opacity-5">
                  <h3 className="text-white font-bold mb-2">{event.name}</h3>
                  <p className="text-gray-400 text-sm mb-1">{event.location}</p>
                  <p className="text-gray-400 text-sm mb-3">{event.time}</p>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                    <div 
                      className="bg-[#fa383e] h-2 rounded-full"
                      style={{ width: `${(event.scanned / event.total) * 100}%` }}
                    />
                  </div>
                  <p className="text-gray-400 text-sm">
                    {event.scanned}/{event.total} tickets scanned
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Footer */}
        <footer className="mt-8 text-center text-gray-400">
          <p>© 2024 Event Management System. All rights reserved.</p>
        </footer>
      </div>
    </DashboardContainer>
  );
};

export default ScannerDashboard;