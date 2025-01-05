// src/pages/agent/Dashboard.tsx

import React from 'react';
import styled from 'styled-components';
import { Card } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

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

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
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
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% from last week
        </p>
      </div>
      <div className="text-[#fa383e] text-3xl">{icon}</div>
    </div>
  </GlassCard>
);

const AgentDashboard = () => {
  const statsData = [
    { title: 'Active Tasks', value: '24', trend: 5.2, icon: '📋' },
    { title: 'Completed Tasks', value: '156', trend: 12.8, icon: '✅' },
    { title: 'Customer Rating', value: '4.8/5', trend: 2.1, icon: '⭐' },
    { title: 'Response Time', value: '15 min', trend: -5.4, icon: '⚡' }
  ];

  const taskTypes = [
    { name: 'Customer Support', value: 45 },
    { name: 'Event Setup', value: 25 },
    { name: 'Ticket Issues', value: 20 },
    { name: 'Other', value: 10 }
  ];

  const COLORS = ['#fa383e', '#f97316', '#0ea5e9', '#8b5cf6'];

  return (
    <DashboardContainer>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Agent Dashboard</h1>

        {/* Quick Actions */}
        <div className="mb-8">
          <GlassCard className="p-6">
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#fa383e] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all">
                View Tasks
              </button>
              <button className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all">
                Customer Support
              </button>
              <button className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all">
                View Reports
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

        <DashboardGrid>
          {/* Active Tasks */}
          <GlassCard className="p-6">
            <h2 className="text-xl font-bold text-white mb-6">Active Tasks</h2>
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  title: 'Customer Support - Ticket Refund',
                  priority: 'High',
                  deadline: '2 hours',
                  type: 'Support'
                },
                {
                  id: 2,
                  title: 'Event Setup Coordination',
                  priority: 'Medium',
                  deadline: '5 hours',
                  type: 'Event'
                },
                {
                  id: 3,
                  title: 'Technical Issue Resolution',
                  priority: 'Low',
                  deadline: '8 hours',
                  type: 'Technical'
                }
              ].map(task => (
                <div key={task.id} className="bg-white bg-opacity-5 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-bold mb-2">{task.title}</h3>
                      <p className="text-gray-400 text-sm">Deadline: {task.deadline}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      task.priority === 'High' ? 'bg-red-900 text-red-300' :
                      task.priority === 'Medium' ? 'bg-yellow-900 text-yellow-300' :
                      'bg-green-900 text-green-300'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-gray-400 text-sm">{task.type}</span>
                    <button className="text-[#fa383e] hover:text-white transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Task Distribution */}
          <GlassCard className="p-6">
            <h2 className="text-xl font-bold text-white mb-6">Task Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskTypes}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {taskTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </DashboardGrid>

        {/* Recent Customer Interactions */}
        <GlassCard className="mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-6">Recent Customer Interactions</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-700">
                    <th className="py-3 text-left">Customer</th>
                    <th className="py-3 text-left">Issue</th>
                    <th className="py-3 text-left">Status</th>
                    <th className="py-3 text-left">Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      id: 1,
                      customer: 'John Doe',
                      issue: 'Ticket Transfer Request',
                      status: 'In Progress',
                      updated: '5 mins ago'
                    },
                    {
                      id: 2,
                      customer: 'Jane Smith',
                      issue: 'Refund Processing',
                      status: 'Pending',
                      updated: '15 mins ago'
                    },
                    {
                      id: 3,
                      customer: 'Mike Johnson',
                      issue: 'Event Information',
                      status: 'Resolved',
                      updated: '1 hour ago'
                    }
                  ].map(interaction => (
                    <tr key={interaction.id} className="border-b border-gray-700">
                      <td className="py-3">{interaction.customer}</td>
                      <td className="py-3">{interaction.issue}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          interaction.status === 'Resolved' ? 'bg-green-900 text-green-300' :
                          interaction.status === 'In Progress' ? 'bg-yellow-900 text-yellow-300' :
                          'bg-blue-900 text-blue-300'
                        }`}>
                          {interaction.status}
                        </span>
                      </td>
                      <td className="py-3">{interaction.updated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </GlassCard>

        {/* Footer */}
        <footer className="mt-8 text-center text-gray-400">
          <p>© 2024 Event Management System. All rights reserved.</p>
        </footer>

        {/* Performance Metrics */}
        <GlassCard className="mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-6">Performance Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Response Time */}
              <div className="space-y-4">
                <h3 className="text-lg text-white">Average Response Time</h3>
                <div className="bg-white bg-opacity-5 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Current</span>
                    <span className="text-white font-bold">15 minutes</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-[#fa383e] h-2 rounded-full" style={{ width: '75%' }} />
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Target: 20 minutes</p>
                </div>
              </div>

              {/* Resolution Rate */}
              <div className="space-y-4">
                <h3 className="text-lg text-white">Resolution Rate</h3>
                <div className="bg-white bg-opacity-5 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Current</span>
                    <span className="text-white font-bold">92%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-[#fa383e] h-2 rounded-full" style={{ width: '92%' }} />
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Target: 90%</p>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Upcoming Events */}
        <GlassCard className="mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-6">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  id: 1,
                  name: 'Summer Music Festival',
                  date: 'Jul 15, 2024',
                  status: 'Assigned',
                  tasks: 5
                },
                {
                  id: 2,
                  name: 'Tech Conference',
                  date: 'Jul 20, 2024',
                  status: 'Pending',
                  tasks: 3
                },
                {
                  id: 3,
                  name: 'Art Exhibition',
                  date: 'Jul 25, 2024',
                  status: 'Ready',
                  tasks: 2
                }
              ].map(event => (
                <GlassCard key={event.id} className="p-4 bg-white bg-opacity-5">
                  <h3 className="text-white font-bold mb-2">{event.name}</h3>
                  <p className="text-gray-400 text-sm mb-2">{event.date}</p>
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      event.status === 'Assigned' ? 'bg-blue-900 text-blue-300' :
                      event.status === 'Ready' ? 'bg-green-900 text-green-300' :
                      'bg-yellow-900 text-yellow-300'
                    }`}>
                      {event.status}
                    </span>
                    <span className="text-gray-400 text-sm">{event.tasks} tasks</span>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Quick Links and Resources */}
        <GlassCard className="mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-6">Quick Resources</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: 'Knowledge Base', icon: '📚' },
                { title: 'Support Scripts', icon: '📝' },
                { title: 'Training Videos', icon: '🎥' },
                { title: 'Help Center', icon: '❓' }
              ].map((resource, index) => (
                <button
                  key={index}
                  className="p-4 bg-white bg-opacity-5 rounded-lg hover:bg-opacity-10 transition-all"
                >
                  <div className="text-2xl mb-2">{resource.icon}</div>
                  <div className="text-white font-medium">{resource.title}</div>
                </button>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </DashboardContainer>
  );
};

export default AgentDashboard;