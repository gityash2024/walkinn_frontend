// src/components/agents/AgentDetails.tsx

import React from 'react';
import { Agent } from '@/types';
import { Card } from '@/components/ui/card';
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  Star,
  Activity,
  Clock,
  FileText,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface AgentDetailsProps {
  agent: Agent;
  onClose: () => void;
}

const AgentDetails: React.FC<AgentDetailsProps> = ({ agent, onClose }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gray-600 overflow-hidden">
            <img
              src={agent.avatar || '/api/placeholder/100/100'}
              alt={agent.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{agent.name}</h2>
            <div className="flex items-center space-x-4 text-gray-400 mt-1">
              <span className="flex items-center">
                <Mail className="w-4 h-4 mr-1" />
                {agent.email}
              </span>
              <span className="flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                {agent.phone}
              </span>
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          agent.status === 'active'
            ? 'bg-green-900 text-green-300'
            : 'bg-red-900 text-red-300'
        }`}>
          {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-white bg-opacity-10">
          <h3 className="text-lg font-medium text-white mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Scan Accuracy</span>
                <span className="text-white">{agent.performance.scanAccuracy}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${agent.performance.scanAccuracy}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Response Time</span>
                <span className="text-white">{agent.performance.responseTime}s</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(agent.performance.responseTime / 5) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Completed Events</span>
                <span className="text-white">{agent.performance.completedEvents}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: `${(agent.performance.completedEvents / agent.totalEvents) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white bg-opacity-10">
          <h3 className="text-lg font-medium text-white mb-4">Rating & Reviews</h3>
          <div className="flex items-center space-x-4 mb-6">
            <div className="text-4xl font-bold text-white">{agent.ratings.average}</div>
            <div>
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(agent.ratings.average)
                        ? 'fill-current'
                        : 'stroke-current fill-none'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-400 mt-1">
                Based on {agent.ratings.total} reviews
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-white bg-opacity-10">
        <h3 className="text-lg font-medium text-white mb-4">Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {agent.documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 bg-white bg-opacity-5 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-white">{doc.type}</p>
                  <p className="text-sm text-gray-400">Uploaded document</p>
                </div>
              </div>
              {doc.verified ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-white bg-opacity-10">
        <h3 className="text-lg font-medium text-white mb-4">Recent Events</h3>
        <div className="space-y-4">
          {/* Add event list here */}
        </div>
      </Card>

      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-opacity-90"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AgentDetails;