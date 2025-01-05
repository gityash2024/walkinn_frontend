// src/components/events/NoEvents.tsx

import React from 'react';
import { Calendar } from 'lucide-react';

const NoEvents = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center mb-6">
        <Calendar className="w-16 h-16 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">No Events Found</h3>
      <p className="text-gray-400 text-center max-w-md">
        There are no events available at the moment. Check back later or adjust your filters to see more events.
      </p>
      <svg 
        className="mt-8 w-72 h-72 text-gray-700"
        viewBox="0 0 400 300" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M196.5 36C120.471 36 59 97.471 59 173.5C59 249.529 120.471 311 196.5 311C272.529 311 334 249.529 334 173.5C334 97.471 272.529 36 196.5 36ZM196.5 291C131.505 291 79 238.495 79 173.5C79 108.505 131.505 56 196.5 56C261.495 56 314 108.505 314 173.5C314 238.495 261.495 291 196.5 291Z" 
          fill="currentColor"
          fillOpacity="0.2"
        />
        <path 
          d="M206.5 96H186.5V183.5H274V163.5H206.5V96Z" 
          fill="currentColor"
          fillOpacity="0.3"
        />
        <circle 
          cx="196.5" 
          cy="173.5" 
          r="15" 
          fill="currentColor"
          fillOpacity="0.4"
        />
        {/* Decorative dots */}
        <circle cx="120" cy="100" r="4" fill="currentColor" fillOpacity="0.3" />
        <circle cx="280" cy="220" r="4" fill="currentColor" fillOpacity="0.3" />
        <circle cx="150" cy="250" r="4" fill="currentColor" fillOpacity="0.3" />
        <circle cx="250" cy="120" r="4" fill="currentColor" fillOpacity="0.3" />
      </svg>
    </div>
  );
};

export default NoEvents;