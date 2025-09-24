import React from 'react';

export default function HeroSection() {
  return (
    <div className="relative h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
      {/* Background Image with Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: "url('https://images.pexels.com/photos/1424246/pexels-photo-1424246.jpeg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/90 via-blue-900/80 to-sky-900/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation - simple for this example */}
        <nav className="absolute top-8 left-0 w-full flex justify-between items-center p-4">
          <span className="text-xl font-bold">Acts 26:19.</span>
          {/* You can add real navigation links here (e.g., Home, About, Contact) */}
          {/* Example:
          <div className="space-x-4">
            <a href="#" className="text-white hover:text-gray-300">Home</a>
            <a href="#" className="text-white hover:text-gray-300">About</a>
            <a href="#" className="text-white hover:text-gray-300">Contact</a>
          </div>
          */}
        </nav>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-lg leading-tight mt-16">
          “So then, King Agrippa, I was not disobedient<br />   to the vision from heaven..
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-200 drop-shadow-md">
            Youth Camp 2025
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/news"
            className="px-6 py-3 rounded-full text-sm font-semibold text-white border border-white/20 hover:bg-white/10 transition"
          >
            View Announcements
          </a>
          <a
            href="/media"
            className="px-6 py-3 rounded-full text-sm font-semibold text-white bg-blue-700/50 hover:bg-blue-700/80 transition"
          >
            Explore Media
          </a>
        </div>
      </div>
    </div>
  );
}