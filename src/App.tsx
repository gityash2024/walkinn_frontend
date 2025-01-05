import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from './store';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AuthGuard from './guards/AuthGuard';
import Sidebar from './components/common/Navigation/Sidebar';

// Dashboard Pages
import AdminDashboard from './pages/admin/Dashboard';
import UserDashboard from './pages/user/Dashboard';
import AgentDashboard from './pages/agent/Dashboard';
import ScannerDashboard from './pages/scanner/Dashboard';

// Event Pages
import AdminEventList from './pages/admin/events';
import AgentEventList from './pages/agent/events';
import UserEventList from './pages/user/events';
import UserEventDetails from './pages/user/events/[eventId]';
import ScannerEventList from './pages/scanner/events';

// Core Admin Components
import AgentList from './components/agents/AgentList';
import Analytics from './components/analytics/EventAnalytics';
import UserList from './components/users/UserList';
import PaymentList from './components/payments/PaymentList';
import BookingList from './components/bookings/BookingList';
import TicketList from './components/tickets/TicketList';
import ContactList from './components/contact/ContactList';

// Scanner Components
import TicketScanner from './components/scanner/TicketScanner';
import VerificationPortal from './components/scanner/VerificationPortal';

function App() {
  const userRole = useSelector((state: RootState) => state.auth.role);

  const getDashboardComponent = () => {
    switch (userRole) {
      case 'admin':
        return <AdminDashboard />;
      case 'user':
        return <UserDashboard />;
      case 'agent':
        return <AgentDashboard />;
      case 'scanner':
        return <ScannerDashboard />;
      default:
        return <Navigate to="/login" />;
    }
  };

  const getEventsComponent = () => {
    switch (userRole) {
      case 'admin':
        return <AdminEventList />;
      case 'agent':
        return <AgentEventList />;
      case 'scanner':
        return <ScannerEventList />;
      case 'user':
        return <UserEventList />;
      default:
        return <Navigate to="/login" />;
    }
  };

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/*"
          element={
            <AuthGuard>
              <div className="flex min-h-screen bg-gray-900">
                <Sidebar />
                <div className="flex-1">
                  <Routes>
                    {/* Common routes */}
                    <Route path="/" element={getDashboardComponent()} />
                    <Route path="/events" element={getEventsComponent()} />

                    {/* Admin routes */}
                    {userRole === 'admin' && (
                      <>
                        <Route path="/agents" element={<AgentList />} />
                        <Route path="/users" element={<UserList />} />
                        <Route path="/tickets" element={<TicketList userRole="admin" />} />
                        <Route path="/bookings" element={<BookingList userRole="admin" />} />
                        <Route path="/payments" element={<PaymentList />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/contact" element={<ContactList />} />
                      </>
                    )}

                    {/* User routes */}
                    {userRole === 'user' && (
                      <>
                        <Route path="/events/:eventId" element={<UserEventDetails />} />
                        <Route path="/tickets" element={<TicketList userRole="user" />} />
                        <Route path="/bookings" element={<BookingList userRole="user" />} />
                      </>
                    )}

                    {/* Agent routes */}
                    {userRole === 'agent' && (
                      <>
                        <Route path="/scanner" element={<TicketScanner />} />
                        <Route path="/verification" element={<VerificationPortal />} />
                      </>
                    )}

                    {/* Scanner routes */}
                    {userRole === 'scanner' && (
                      <Route path="/scan" element={<TicketScanner isScannerRole={true} />} />
                    )}

                    {/* Catch-all redirect */}
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </div>
              </div>
            </AuthGuard>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;