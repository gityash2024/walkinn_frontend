// src/components/payments/PaymentList.tsx
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const PaymentList = () => {
  const payments = [
    { id: 1, customer: 'John Doe', amount: 150, status: 'Completed', date: '2024-01-15' },
    { id: 2, customer: 'Jane Smith', amount: 200, status: 'Pending', date: '2024-01-16' },
    { id: 3, customer: 'Bob Brown', amount: 250, status: 'Completed', date: '2024-01-17' },
    { id: 4, customer: 'Alice Green', amount: 300, status: 'Failed', date: '2024-01-18' },
    { id: 5, customer: 'Michael Blue', amount: 350, status: 'Completed', date: '2024-01-19' },
    { id: 6, customer: 'Sandra White', amount: 400, status: 'Pending', date: '2024-01-20' },
    { id: 7, customer: 'Chris Black', amount: 450, status: 'Completed', date: '2024-01-21' },
    { id: 8, customer: 'Patricia Yellow', amount: 500, status: 'Failed', date: '2024-01-22' },
    { id: 9, customer: 'David Red', amount: 550, status: 'Completed', date: '2024-01-23' },
    { id: 10, customer: 'Angela Violet', amount: 600, status: 'Pending', date: '2024-01-24' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Payments</h1>
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-white">Payment History</h3>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {payments.map((payment) => (
                  <tr key={payment.id} className="text-white">
                    <td className="px-6 py-4 whitespace-nowrap">#{payment.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{payment.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${payment.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        payment.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                        payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{payment.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Payment Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2 text-white">Total Revenue</h3>
            <p className="text-3xl font-bold text-white">$15,750</p>
            <p className="text-green-600 text-sm mt-2">↑ 12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2 text-white">Pending Payments</h3>
            <p className="text-3xl font-bold text-white">$2,430</p>
            <p className="text-yellow-600 text-sm mt-2">5 payments pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2 text-white">Successful Rate</h3>
            <p className="text-3xl font-bold text-white">95.8%</p>
            <p className="text-green-600 text-sm mt-2">↑ 2% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="mt-6">
        <CardHeader>
          <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: 'TRX001', customer: 'Alice Johnson', amount: 75, time: '2 minutes ago', status: 'Success' },
              { id: 'TRX002', customer: 'Bob Smith', amount: 120, time: '15 minutes ago', status: 'Pending' },
              { id: 'TRX003', customer: 'Carol White', amount: 200, time: '1 hour ago', status: 'Success' },
            ].map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.status === 'Success' ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    <span className={`text-lg ${
                      transaction.status === 'Success' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      ${transaction.amount}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">{transaction.customer}</p>
                    <p className="text-sm text-gray-500">{transaction.time}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  transaction.status === 'Success' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {transaction.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentList;
