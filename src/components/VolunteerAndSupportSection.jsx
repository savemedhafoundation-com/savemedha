import React from 'react';

import { Heart } from 'lucide-react';

const VolunteerAndSupportSection = () => {
  const cancerStats = [
    { type: 'Blood Cancer', percentage: 96 },
    { type: 'Lungs Cancer', percentage: 84 },
    { type: 'Breast Cancer', percentage: 80 },
    { type: 'Colon Cancer', percentage: 77 }
  ];

  const CircularProgress = ({ percentage }) => {
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const angle = (percentage / 100) * 270; // 270 degrees for semi-circle effect
    const strokeDashoffset = circumference - (angle / 360) * circumference;
    
    return (
      <div className="relative w-20 h-20 flex items-center justify-center">
        <svg className="transform -rotate-[135deg]" width="80" height="80" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="#374151"
            strokeWidth="6"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="#7CB342"
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-white">{percentage}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-white">
      {/* Volunteer Section */}
      <div className="relative bg-gray-50 py-12 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left Side - Logo and Hands Image Placeholder */}
            <div className="flex flex-col items-center lg:items-start space-y-6">
              {/* Logo Placeholder - Empty box for image */}
              <div className="w-40 h-40 bg-white border-4 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-400 text-sm text-center px-4">Logo Image<br/>Placeholder</span>
              </div>

              {/* Colorful Hands Image Placeholder - Empty box for image */}
              <div className="w-64 h-64 bg-white border-4 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-center px-4">Colorful Hands<br/>Image Placeholder</span>
              </div>
            </div>

            {/* Center/Right Side - Text Content */}
            <div className="flex flex-col">
              <div className="text-center lg:text-left mb-8">
                <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-2 leading-tight">
                  BECOME A VOLUNTEER!
                </h1>
                <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#7CB342' }}>
                  JOIN OUR TEAM
                </h2>
                <p className="text-gray-700 text-base mb-1">
                  We don't fight the body, we empower it. <span className="italic font-semibold" style={{ color: '#7CB342' }}>Natural Immunotherapy</span>
                </p>
                <p className="text-gray-700 text-base mb-8">
                  that helps the body to defeat cancer from within.
                </p>
                
                {/* Stylized JOIN US Text */}
                <div className="mb-6">
                  <div className="text-7xl font-black text-gray-900 leading-none" style={{ 
                    fontFamily: 'Impact, Arial Black, sans-serif',
                    WebkitTextStroke: '2px black',
                    textShadow: '3px 3px 0px rgba(255,255,255,0.8)'
                  }}>
                    JOIN US
                  </div>
                </div>

                {/* JOIN NOW Button */}
                <button className="text-white font-bold text-lg px-16 py-3 rounded transition-all hover:opacity-90" style={{ backgroundColor: '#7CB342' }}>
                  JOIN NOW
                </button>
              </div>

              {/* Team Hands Image Placeholder (Top Right) - Empty box for image */}
              <div className="w-full h-48 bg-white border-4 border-dashed border-gray-300 rounded-lg flex items-center justify-center mt-4">
                <span className="text-gray-400 text-center px-4">Team Hands Together<br/>Image Placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support Our Cause Section */}
      <div className="py-12 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Title and Statistics */}
            <div>
              {/* Green Line Accent */}
              <div className="w-12 h-1 mb-4" style={{ backgroundColor: '#7CB342' }}></div>
              
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-3 leading-tight">
                SUPPORT OUR CAUSE
              </h2>
              <p className="text-lg font-bold tracking-widest mb-8" style={{ color: '#7CB342' }}>
                WE FIGHT AGAINST CANCER
              </p>

              {/* Cancer Statistics Box */}
              <div className="bg-gray-900 rounded-lg p-8 mb-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {cancerStats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <CircularProgress percentage={stat.percentage} />
                      <p className="text-white text-xs mt-2 text-center leading-tight">{stat.type}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description Text */}
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                Fighting cancer the natural way — through{' '}
                <span className="italic font-semibold" style={{ color: '#7CB342' }}>Natural Immunotherapy</span>{' '}
                that rebuilds your body's defense and restores lasting health.
              </p>

              {/* Decorative Cell Illustration Placeholder - Empty box for image */}
              <div className="w-32 h-32 bg-white border-4 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-400 text-xs text-center px-2">Cell Image</span>
              </div>
            </div>

            {/* Right Side - Charity Jar and Donate */}
            <div className="flex flex-col items-center justify-center space-y-8">
              {/* Charity Jar Image Placeholder - Empty box for image */}
              <div className="relative w-full max-w-md">
                <div className="w-full h-96 bg-white border-4 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-center px-4">Charity Jar with Coins<br/>Image Placeholder</span>
                </div>
              </div>

              {/* Dotted Pattern Decoration */}
              <div className="absolute top-0 right-0 mr-8 mt-8 hidden xl:block">
                <div className="grid grid-cols-6 gap-1.5">
                  {[...Array(24)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full opacity-40"></div>
                  ))}
                </div>
              </div>

              {/* Heart Icon Circle and Donate Button */}
              <div className="flex flex-col items-center space-y-6">
                <div className="w-36 h-36 rounded-full flex items-center justify-center shadow-xl" style={{ backgroundColor: '#7CB342' }}>
                  <Heart className="w-20 h-20 text-white fill-white" />
                </div>
                
                <button className="text-white font-bold text-2xl px-20 py-4 rounded shadow-lg transition-all hover:opacity-90" style={{ backgroundColor: '#7CB342' }}>
                  DONATE NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerAndSupportSection;