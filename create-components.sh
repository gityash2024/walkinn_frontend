#!/bin/bash

# Create create-components.sh and paste this content
echo "Creating components structure..."

# Create all directories
mkdir -p src/components/{events,venues,analytics,scanner,tickets,payments}
mkdir -p src/pages/{admin,user,agent}/{events,venues,analytics,scanner,tickets,payments}

# Create all component files
for dir in events venues analytics scanner tickets payments; do
  for file in src/components/$dir/*.tsx; do
    if [ ! -f "$file" ]; then
      echo "Creating $file..."
      echo 'import React from "react";
export const '$(basename "$file" .tsx)' = () => <div>Hello from '$(basename "$file" .tsx)'</div>;' > "$file"
    fi
  done
done

# Create specific files
echo "Creating specific components..."

# Event Components
echo 'import React from "react";
export const EventList = () => <div>Hello from Event List</div>;' > src/components/events/EventList.tsx

echo 'import React from "react";
export const EventCard = () => <div>Hello from Event Card</div>;' > src/components/events/EventCard.tsx

echo 'import React from "react";
export const LiveEvents = () => <div>Hello from Live Events</div>;' > src/components/events/LiveEvents.tsx

echo 'import React from "react";
export const EventForm = () => <div>Hello from Event Creation/Edit Form</div>;' > src/components/events/EventForm.tsx

# Venue Components
echo 'import React from "react";
export const VenueList = () => <div>Hello from Venue List</div>;' > src/components/venues/VenueList.tsx

echo 'import React from "react";
export const VenueDetails = () => <div>Hello from Venue Details</div>;' > src/components/venues/VenueDetails.tsx

# Create Types
mkdir -p src/types
echo "Creating TypeScript types..."
cat > src/types/index.ts << 'EOL'
export interface Event {
  id: string;
  title: string;
  description: string;
  venue: string;
  date: string;
  price: number;
  status: 'upcoming' | 'live' | 'completed';
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  capacity: number;
}

export interface Ticket {
  id: string;
  eventId: string;
  userId: string;
  price: number;
  status: 'active' | 'used' | 'cancelled';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'agent';
}

export interface Payment {
  id: string;
  ticketId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
}
EOL

# Create Sidebar Navigation
mkdir -p src/components/common/Navigation
echo "Creating Sidebar navigation..."
cat > src/components/common/Navigation/Sidebar.tsx << 'EOL'
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const Sidebar = () => {
  const userRole = useSelector((state: RootState) => state.auth.role);

  const adminRoutes = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/events', label: 'Events' },
    { path: '/live-events', label: 'Live Events' },
    { path: '/venues', label: 'Venues' },
    { path: '/analytics', label: 'Analytics' },
    { path: '/users', label: 'Users' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/payments', label: 'Payments' },
  ];

  const userRoutes = [
    { path: '/events', label: 'Events' },
    { path: '/tickets', label: 'My Tickets' },
    { path: '/bookings', label: 'My Bookings' },
  ];

  const agentRoutes = [
    { path: '/scanner', label: 'Ticket Scanner' },
    { path: '/verification', label: 'Verify Tickets' },
    { path: '/events', label: 'Events' },
  ];

  const getRoutes = () => {
    switch (userRole) {
      case 'admin':
        return adminRoutes;
      case 'user':
        return userRoutes;
      case 'agent':
        return agentRoutes;
      default:
        return [];
    }
  };

  return (
    <aside className="bg-black text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">EMS Dashboard</h2>
      </div>
      <nav className="space-y-2">
        {getRoutes().map((route) => (
          <Link
            key={route.path}
            to={route.path}
            className="block py-2 px-4 hover:bg-primary rounded"
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
EOL

# Update App.tsx
echo "Updating App.tsx..."
cat > src/App.tsx << 'EOL'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/common/Navigation/Sidebar';

// Import components
import AdminEvents from './pages/admin/events';
import { LiveEvents } from './components/events/LiveEvents';
import { VenueList } from './components/venues/VenueList';
import { TicketAnalytics } from './components/analytics/TicketAnalytics';
import { TicketScanner } from './components/scanner/TicketScanner';
import { PricingAdjustment } from './components/tickets/PricingAdjustment';
import { PaymentGateway } from './components/payments/PaymentGateway';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <div className="flex min-h-screen bg-white">
        <Sidebar />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/events" element={<AdminEvents />} />
            <Route path="/live-events" element={<LiveEvents />} />
            <Route path="/venues" element={<VenueList />} />
            <Route path="/analytics" element={<TicketAnalytics />} />
            <Route path="/scanner" element={<TicketScanner />} />
            <Route path="/pricing" element={<PricingAdjustment />} />
            <Route path="/payments" element={<PaymentGateway />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
EOL

echo "Setup complete! 🎉"