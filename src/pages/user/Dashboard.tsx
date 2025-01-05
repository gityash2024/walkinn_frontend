// src/pages/user/Dashboard.tsx

import React from 'react';
import styled from 'styled-components';
import { Card } from '@/components/ui/card';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
`;

const GlassCard = styled(Card)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
`;

const Banner = styled.div`
  background: linear-gradient(to right, rgba(250, 56, 62, 0.8), rgba(0, 0, 0, 0.8)),
              url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30');
  background-size: cover;
  background-position: center;
  height: 400px;
  display: flex;
  align-items: center;
  padding: 2rem;
`;

const UserDashboard = () => {
  const categories = [
    { name: 'Music', events: 45 },
    { name: 'Sports', events: 32 },
    { name: 'Arts', events: 28 },
    { name: 'Technology', events: 24 }
  ];

  const featuredEvents = [
    {
      id: 1,
      title: 'Summer Music Festival',
      description: 'Experience the best of summer music with top artists.',
      price: '$99',
      date: '2024-07-15'
    },
    // Add more events...
  ];

  return (
    <DashboardContainer>
      {/* Hero Banner */}
      <Banner>
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-5xl font-bold text-white mb-4">Discover Amazing Events</h1>
          <p className="text-xl text-gray-200 mb-8">Find and book the best events in your city</p>
          <button className="bg-[#fa383e] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-all">
            Explore Events
          </button>
        </div>
      </Banner>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <GlassCard key={category.name} className="p-6 cursor-pointer hover:scale-105 transition-all">
                <h3 className="text-white text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-400">{category.events} Events</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Featured Events */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Featured Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <GlassCard key={event.id} className="overflow-hidden">
                <div className="h-48 bg-gray-700"></div>
                <div className="p-6">
                  <h3 className="text-white text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-400 mb-4">{event.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">{event.price}</span>
                    <button className="bg-[#fa383e] text-white px-4 py-2 rounded-lg hover:bg-opacity-90">
                      Book Now
                    </button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* User Reviews */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">What People Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <GlassCard key={i} className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-700 mr-4"></div>
                  <div>
                    <h4 className="text-white font-bold">User Name</h4>
                    <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
                  </div>
                </div>
                <p className="text-gray-300">
                  "Amazing experience! The event was well organized and exceeded my expectations."
                </p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="grid grid-cols-1 md:grid-cols-4 gap-8 text-white pt-12 border-t border-gray-800">
          <div>
            <h3 className="font-bold mb-4">About Us</h3>
            <p className="text-gray-400">Your premier destination for discovering and booking amazing events.</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Events</a></li>
              <li><a href="#" className="hover:text-white">Categories</a></li>
              <li><a href="#" className="hover:text-white">Featured</a></li>
              <li><a href="#" className="hover:text-white">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>support@eventsystem.com</li>
              <li>+1 234 567 890</li>
              <li>123 Event Street, City</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4 text-gray-400">
              <a href="#" className="hover:text-[#fa383e]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-[#fa383e]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-[#fa383e]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.897 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.897-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </a>
            </div>
          </div>
        </footer>

        {/* FAQ Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
          <div className="grid gap-6">
            {[
              {
                question: "How do I purchase tickets?",
                answer: "You can purchase tickets by selecting an event and clicking the 'Book Now' button. Follow the checkout process to complete your purchase."
              },
              {
                question: "What's your refund policy?",
                answer: "We offer full refunds up to 48 hours before the event. After that, refunds are subject to the event organizer's policy."
              },
              {
                question: "Can I transfer my tickets?",
                answer: "Yes, tickets can be transferred to another person through your account dashboard up until the event starts."
              },
              {
                question: "How do I contact support?",
                answer: "You can reach our support team through email at support@eventsystem.com or call us at +1 234 567 890."
              }
            ].map((faq, index) => (
              <GlassCard key={index} className="p-6">
                <h3 className="text-white text-xl font-bold mb-2">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Copyright Footer */}
        <div className="text-center py-8 text-gray-400 border-t border-gray-800">
          <p>© 2024 Event Management System. All rights reserved.</p>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default UserDashboard;