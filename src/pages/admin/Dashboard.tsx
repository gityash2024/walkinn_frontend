// src/pages/admin/Dashboard.tsx

import React from 'react';
import styled from 'styled-components';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

const TablesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

// Stats Card Component
const StatCard = ({ title, value, icon, trend }: any) => (
  <GlassCard className="p-6 transform hover:scale-105 transition-all duration-200">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <h3 className="text-white text-2xl font-bold mt-2">{value}</h3>
        <p className={`text-sm mt-2 ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
        </p>
      </div>
      <div className="text-[#fa383e] text-3xl">{icon}</div>
    </div>
  </GlassCard>
);

const AdminDashboard = () => {
  // Mock data for demonstration
  const statsData = [
    { title: 'Total Users', value: '2,549', trend: 12.5, icon: '👥' },
    { title: 'Total Events', value: '456', trend: 8.2, icon: '📅' },
    { title: 'Revenue', value: '$125,490', trend: 15.8, icon: '💰' },
    { title: 'Active Tickets', value: '1,287', trend: -2.4, icon: '🎟️' }
  ];

  const userData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    // Add more mock data...
  ];

  const agentData = [
    { id: 1, name: 'Agent 1', performance: '92%', tasks: 45 },
    { id: 2, name: 'Agent 2', performance: '88%', tasks: 38 },
    // Add more mock data...
  ];

  return (
    <DashboardContainer>
      <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <StatsGrid>
        {statsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </StatsGrid>

      {/* Tables Grid */}
      <TablesGrid>
        {/* Users Table */}
        <GlassCard>
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">Recent Users</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-700">
                    <th className="py-3 text-left">Name</th>
                    <th className="py-3 text-left">Email</th>
                    <th className="py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map(user => (
                    <tr key={user.id} className="border-b border-gray-700">
                      <td className="py-3">{user.name}</td>
                      <td className="py-3">{user.email}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === 'Active' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </GlassCard>

        {/* Agents Table */}
        <GlassCard>
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">Agent Performance</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-700">
                    <th className="py-3 text-left">Agent</th>
                    <th className="py-3 text-left">Performance</th>
                    <th className="py-3 text-left">Tasks</th>
                  </tr>
                </thead>
                <tbody>
                  {agentData.map(agent => (
                    <tr key={agent.id} className="border-b border-gray-700">
                      <td className="py-3">{agent.name}</td>
                      <td className="py-3">{agent.performance}</td>
                      <td className="py-3">{agent.tasks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </GlassCard>
      </TablesGrid>

      {/* Scanner Activity Chart */}
      <GlassCard>
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-4">Scanner Activity</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Mon', scans: 65 },
                { name: 'Tue', scans: 59 },
                { name: 'Wed', scans: 80 },
                { name: 'Thu', scans: 81 },
                { name: 'Fri', scans: 56 },
                { name: 'Sat', scans: 95 },
                { name: 'Sun', scans: 40 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Legend />
                <Bar dataKey="scans" fill="#fa383e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </GlassCard>

      {/* Footer */}
      <footer className="mt-8 text-center text-gray-400">
        <p>© 2024 Event Management System. All rights reserved.</p>
      </footer>
    </DashboardContainer>
  );
};

export default AdminDashboard;