// src/components/agents/AgentList.tsx

import React, { useState } from 'react';
import { Agent, AgentFilters } from '@/types';
import { Card } from '@/components/ui/card';
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  UserX,
  Edit,
  Eye,
  Star,
  Clock,
  Activity
} from 'lucide-react';

const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    status: 'active',
    role: 'agent',
    avatar: '/api/placeholder/100/100',
    events: ['1', '2', '3'],
    createdAt: '2024-01-01T00:00:00',
    updatedAt: '2024-01-01T00:00:00',
    totalEvents: 45,
    totalScans: 1250,
    lastActive: '2024-03-15T14:30:00',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zipCode: '10001'
    },
    documents: [
      {
        id: 'd1',
        type: 'ID',
        url: '/docs/id.pdf',
        verified: true
      }
    ],
    ratings: {
      average: 4.8,
      total: 156
    },
    performance: {
      scanAccuracy: 98.5,
      responseTime: 2.3,
      completedEvents: 42
    }
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1234567891',
    status: 'inactive',
    role: 'agent',
    avatar: '/api/placeholder/100/100',
    events: ['4', '5'],
    createdAt: '2024-02-01T00:00:00',
    updatedAt: '2024-02-01T00:00:00',
    totalEvents: 30,
    totalScans: 900,
    lastActive: '2024-03-10T09:00:00',
    address: {
      street: '456 Elm St',
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      zipCode: '90001'
    },
    documents: [
      {
        id: 'd2',
        type: 'License',
        url: '/docs/license.pdf',
        verified: false
      }
    ],
    ratings: {
      average: 4.5,
      total: 100
    },
    performance: {
      scanAccuracy: 97.0,
      responseTime: 3.0,
      completedEvents: 25
    }
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+1234567892',
    status: 'active',
    role: 'agent',
    avatar: '/api/placeholder/100/100',
    events: ['6', '7', '8'],
    createdAt: '2024-03-01T00:00:00',
    updatedAt: '2024-03-01T00:00:00',
    totalEvents: 60,
    totalScans: 1500,
    lastActive: '2024-03-20T15:45:00',
    address: {
      street: '789 Pine St',
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
      zipCode: '60601'
    },
    documents: [
      {
        id: 'd3',
        type: 'Passport',
        url: '/docs/passport.pdf',
        verified: true
      }
    ],
    ratings: {
      average: 4.9,
      total: 200
    },
    performance: {
      scanAccuracy: 99.0,
      responseTime: 1.8,
      completedEvents: 55
    }
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@example.com',
    phone: '+1234567893',
    status: 'active',
    role: 'agent',
    avatar: '/api/placeholder/100/100',
    events: ['9', '10', '11'],
    createdAt: '2024-04-01T00:00:00',
    updatedAt: '2024-04-01T00:00:00',
    totalEvents: 25,
    totalScans: 600,
    lastActive: '2024-03-25T16:30:00',
    address: {
      street: '321 Oak St',
      city: 'Houston',
      state: 'TX',
      country: 'USA',
      zipCode: '77001'
    },
    documents: [
      {
        id: 'd4',
        type: 'ID',
        url: '/docs/id2.pdf',
        verified: true
      }
    ],
    ratings: {
      average: 4.6,
      total: 120
    },
    performance: {
      scanAccuracy: 96.5,
      responseTime: 2.9,
      completedEvents: 20
    }
  },
  {
    id: '5',
    name: 'William Brown',
    email: 'william@example.com',
    phone: '+1234567894',
    status: 'inactive',
    role: 'agent',
    avatar: '/api/placeholder/100/100',
    events: ['12', '13'],
    createdAt: '2024-05-01T00:00:00',
    updatedAt: '2024-05-01T00:00:00',
    totalEvents: 40,
    totalScans: 1100,
    lastActive: '2024-03-05T11:00:00',
    address: {
      street: '654 Maple St',
      city: 'Phoenix',
      state: 'AZ',
      country: 'USA',
      zipCode: '85001'
    },
    documents: [
      {
        id: 'd5',
        type: 'License',
        url: '/docs/license2.pdf',
        verified: false
      }
    ],
    ratings: {
      average: 4.4,
      total: 90
    },
    performance: {
      scanAccuracy: 95.0,
      responseTime: 3.5,
      completedEvents: 35
    }
  },
  {
    id: '6',
    name: 'Sophia Martinez',
    email: 'sophia@example.com',
    phone: '+1234567895',
    status: 'active',
    role: 'agent',
    avatar: '/api/placeholder/100/100',
    events: ['14', '15', '16'],
    createdAt: '2024-06-01T00:00:00',
    updatedAt: '2024-06-01T00:00:00',
    totalEvents: 35,
    totalScans: 800,
    lastActive: '2024-03-12T13:15:00',
    address: {
      street: '987 Birch St',
      city: 'Philadelphia',
      state: 'PA',
      country: 'USA',
      zipCode: '19101'
    },
    documents: [
      {
        id: 'd6',
        type: 'ID',
        url: '/docs/id3.pdf',
        verified: true
      }
    ],
    ratings: {
      average: 4.7,
      total: 130
    },
    performance: {
      scanAccuracy: 97.8,
      responseTime: 2.7,
      completedEvents: 30
    }
  },
  {
    id: '7',
    name: 'James Wilson',
    email: 'james@example.com',
    phone: '+1234567896',
    status: 'inactive',
    role: 'agent',
    avatar: '/api/placeholder/100/100',
    events: ['17', '18'],
    createdAt: '2024-07-01T00:00:00',
    updatedAt: '2024-07-01T00:00:00',
    totalEvents: 20,
    totalScans: 500,
    lastActive: '2024-03-01T10:00:00',
    address: {
      street: '111 Cedar St',
      city: 'San Antonio',
      state: 'TX',
      country: 'USA',
      zipCode: '78201'
    },
    documents: [
      {
        id: 'd7',
        type: 'Passport',
        url: '/docs/passport2.pdf',
        verified: false
      }
    ],
    ratings: {
      average: 4.3,
      total: 80
    },
    performance: {
      scanAccuracy: 94.5,
      responseTime: 3.8,
      completedEvents: 18
    }
  },
  {
    id: '8',
    name: 'Olivia Clark',
    email: 'olivia@example.com',
    phone: '+1234567897',
    status: 'active',
    role: 'agent',
    avatar: '/api/placeholder/100/100',
    events: ['19', '20', '21'],
    createdAt: '2024-08-01T00:00:00',
    updatedAt: '2024-08-01T00:00:00',
    totalEvents: 50,
    totalScans: 1300,
    lastActive: '2024-03-18T14:45:00',
    address: {
      street: '222 Spruce St',
      city: 'San Diego',
      state: 'CA',
      country: 'USA',
      zipCode: '92101'
    },
    documents: [
      {
        id: 'd8',
        type: 'ID',
        url: '/docs/id4.pdf',
        verified: true
      }
    ],
    ratings: {
      average: 4.9,
      total: 150
    },
    performance: {
      scanAccuracy: 98.2,
      responseTime: 2.1,
      completedEvents: 45
    }
  },
  {
    id: '9',
    name: 'Ethan Lewis',
    email: 'ethan@example.com',
    phone: '+1234567898',
    status: 'inactive',
    role: 'agent',
    avatar: '/api/placeholder/100/100',
    events: ['22', '23'],
    createdAt: '2024-09-01T00:00:00',
    updatedAt: '2024-09-01T00:00:00',
    totalEvents: 55,
    totalScans: 1400,
    lastActive: '2024-03-22T12:00:00',
    address: {
      street: '333 Willow St',
      city: 'Dallas',
      state: 'TX',
      country: 'USA',
      zipCode: '75201'
    },
    documents: [
      {
        id: 'd9',
        type: 'License',
        url: '/docs/license3.pdf',
        verified: false
      }
    ],
    ratings: {
      average: 4.2,
      total: 110
    },
    performance: {
      scanAccuracy: 93.5,
      responseTime: 4.0,
      completedEvents: 50
    }
  },
  {
    id: '10',
    name: 'Isabella White',
    email: 'isabella@example.com',
    phone: '+1234567899',
    status: 'active',
    role: 'agent',
    avatar: '/api/placeholder/100/100',
    events: ['24', '25', '26'],
    createdAt: '2024-10-01T00:00:00',
    updatedAt: '2024-10-01T00:00:00',
    totalEvents: 65,
    totalScans: 1600,
    lastActive: '2024-03-28T17:00:00',
    address: {
      street: '444 Ash St',
      city: 'Austin',
      state: 'TX',
      country: 'USA',
      zipCode: '73301'
    },
    documents: [
      {
        id: 'd10',
        type: 'Passport',
        url: '/docs/passport3.pdf',
        verified: true
      }
    ],
    ratings: {
      average: 5.0,
      total: 210
    },
    performance: {
      scanAccuracy: 99.5,
      responseTime: 1.5,
      completedEvents: 60
    }
  }
];


const AgentList = () => {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [filters, setFilters] = useState<AgentFilters>({
    search: '',
    status: '',
    dateRange: null,
    performance: ''
  });

  const handleStatusChange = async (agentId: string, status: 'active' | 'blocked') => {
    setAgents(agents.map(agent =>
      agent.id === agentId ? { ...agent, status } : agent
    ));
  };

  const renderFilters = () => (
    <Card className="p-4 bg-white bg-opacity-10 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search agents..."
            className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>

        <select
          className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>

        <select
          className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
          value={filters.performance}
          onChange={(e) => setFilters({ ...filters, performance: e.target.value })}
        >
          <option value="">All Performance</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <button
          onClick={() => setFilters({
            search: '',
            status: '',
            dateRange: null,
            performance: ''
          })}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-opacity-90"
        >
          Reset Filters
        </button>
      </div>
    </Card>
  );

  const renderHeader = () => (
    <div className="mt-5 mr-5 flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-white">Agents Management</h1>
      <button
        onClick={() => {
          setSelectedAgent(null);
          setIsFormOpen(true);
        }}
        className="flex items-center px-4 py-2 bg-[#fa383e] rounded-lg text-white"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Agent
      </button>
    </div>
  );

  const renderAgentCard = (agent: Agent) => (
    <Card key={agent.id} className="bg-white bg-opacity-10 p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-gray-600 overflow-hidden">
            <img
              src={agent.avatar || '/api/placeholder/100/100'}
              alt={agent.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{agent.name}</h3>
            <p className="text-gray-400">{agent.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setSelectedAgent(agent);
              setIsDetailsOpen(true);
            }}
            className="p-2 hover:bg-white hover:bg-opacity-10 rounded"
          >
            <Eye className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => {
              setSelectedAgent(agent);
              setIsFormOpen(true);
            }}
            className="p-2 hover:bg-white hover:bg-opacity-10 rounded"
          >
            <Edit className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => handleStatusChange(agent.id, agent.status === 'active' ? 'blocked' : 'active')}
            className="p-2 hover:bg-white hover:bg-opacity-10 rounded"
          >
            <UserX className={`w-5 h-5 ${agent.status === 'blocked' ? 'text-red-500' : 'text-white'}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div>
          <p className="text-gray-400 text-sm">Events</p>
          <p className="text-white font-bold">{agent.totalEvents}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Total Scans</p>
          <p className="text-white font-bold">{agent.totalScans}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Rating</p>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            <p className="text-white font-bold">{agent.ratings.average}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Performance</span>
          <span className="flex items-center">
            <Activity className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-white">{agent.performance.scanAccuracy}% Accuracy</span>
          </span>
        </div>
        <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${agent.performance.scanAccuracy}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-gray-400">Last Active</span>
        <span className="flex items-center text-gray-300">
          <Clock className="w-4 h-4 mr-1" />
          {new Date(agent.lastActive).toLocaleString()}
        </span>
      </div>
    </Card>
  );

  return (
    <div>
      {renderHeader()}
      {renderFilters()}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map(renderAgentCard)}
      </div>

      {/* Agent Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <Card className="w-full max-w-2xl bg-white bg-opacity-10 p-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              {selectedAgent ? 'Edit Agent' : 'Add Agent'}
            </h2>
            {/* Add AgentForm component here */}
          </Card>
        </div>
      )}

      {/* Agent Details Modal */}
      {isDetailsOpen && selectedAgent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <Card className="w-full max-w-4xl bg-white bg-opacity-10 p-6 max-h-[90vh] overflow-y-auto">
            {/* Add AgentDetails component here */}
          </Card>
        </div>
      )}
    </div>
  );
};

export default AgentList;