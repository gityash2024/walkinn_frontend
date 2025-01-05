import React, { useState } from 'react';
import { Ban, Eye, Check } from 'lucide-react';

const UserList = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active', phone: '+1 234-567-8900', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Active', phone: '+1 234-567-8901', joinDate: '2024-01-16' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'User', status: 'Blocked', phone: '+1 234-567-8902', joinDate: '2024-01-17' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Manager', status: 'Active', phone: '+1 234-567-8903', joinDate: '2024-01-18' },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', role: 'User', status: 'Blocked', phone: '+1 234-567-8904', joinDate: '2024-01-19' },
    { id: 6, name: 'Emma Davis', email: 'emma@example.com', role: 'Admin', status: 'Active', phone: '+1 234-567-8905', joinDate: '2024-01-20' }
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          status: user.status === 'Active' ? 'Blocked' : 'Active'
        };
      }
      return user;
    }));
  };

  const viewUserDetails = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Users</h1>
      <div className="bg-slate-900 border border-gray-800 rounded-lg">
        <div className="p-4 border-b border-gray-800">
          <h3 className="text-lg font-semibold text-white">User Management</h3>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {users.map((user) => (
                  <tr key={user.id} className="text-white">
                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => viewUserDetails(user)}
                          className="p-2 rounded-full hover:bg-gray-800 text-white hover:text-blue-400 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => toggleUserStatus(user.id)}
                          className={`p-2 rounded-full hover:bg-gray-800 transition-colors ${
                            user.status === 'Active'
                              ? 'text-white hover:text-red-400'
                              : 'text-white hover:text-green-400'
                          }`}
                        >
                          {user.status === 'Active' ? (
                            <Ban className="h-4 w-4" />
                          ) : (
                            <Check className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isViewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-slate-900 text-white p-6 rounded-lg max-w-2xl w-full m-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">User Details</h2>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            {selectedUser && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Name</p>
                  <p className="text-white">{selectedUser.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Role</p>
                  <p className="text-white">{selectedUser.role}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Status</p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      selectedUser.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {selectedUser.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="text-white">{selectedUser.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Join Date</p>
                  <p className="text-white">{selectedUser.joinDate}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;