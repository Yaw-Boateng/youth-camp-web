import React from 'react';

export default function VisionMission() {
  return (
    <section id="vision-mission" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-12 drop-shadow-sm">
          Our Vision & Mission
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105">
            <div className="absolute top-0 left-0 w-full h-full bg-blue-500 opacity-10 rounded-2xl"></div>
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-center md:justify-start text-blue-400">
              <svg className="h-8 w-8 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              Our Vision
            </h3>
            <p className="text-gray-300 text-lg">
              To inspire and equip young individuals to discover purpose and make a positive impact in their communities and the world.
            </p>
          </div>

          {/* Mission Card */}
          <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105">
            <div className="absolute top-0 left-0 w-full h-full bg-blue-500 opacity-10 rounded-2xl"></div>
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-center md:justify-start text-blue-400">
              <svg className="h-8 w-8 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.972 5.972 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              Our Mission
            </h3>
            <p className="text-gray-300 text-lg">
              To provide and support safe, engaging programs and spiritual guidance that foster personal development and social responsibility.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}