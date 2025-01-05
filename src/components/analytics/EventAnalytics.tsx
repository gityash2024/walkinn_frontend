// src/components/analytics/EventAnalytics.tsx
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EventAnalytics = () => {
  const monthlyData = [
    { month: 'Jan', events: 20, revenue: 45000 },
    { month: 'Feb', events: 25, revenue: 55000 },
    { month: 'Mar', events: 30, revenue: 65000 },
    { month: 'Apr', events: 35, revenue: 70000 },
    { month: 'May', events: 40, revenue: 75000 },
    { month: 'Jun', events: 45, revenue: 80000 },
    { month: 'Jul', events: 50, revenue: 85000 },
    { month: 'Aug', events: 55, revenue: 90000 },
    { month: 'Sep', events: 60, revenue: 95000 },
    { month: 'Oct', events: 65, revenue: 100000 },
    { month: 'Nov', events: 70, revenue: 105000 },
    { month: 'Dec', events: 75, revenue: 110000 },
  ];

  const yearlyData = [
    { year: '2020', events: 200, revenue: 450000 },
    { year: '2021', events: 250, revenue: 550000 },
    { year: '2022', events: 300, revenue: 650000 },
    { year: '2023', events: 350, revenue: 700000 },
    { year: '2024', events: 400, revenue: 750000 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Analytics</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">Events per Month</h3>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="events" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">Monthly Revenue</h3>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">Events per Year</h3>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="events" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">Yearly Revenue</h3>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventAnalytics;
