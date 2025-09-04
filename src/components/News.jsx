import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import FreeRouteNavbar from "./FreeRouteNavbar";

export default function News() {
  const navigate = useNavigate();

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, this would fetch data from a database like Firestore
    // and use an onSnapshot listener for real-time updates.
    setTimeout(() => {
      setAnnouncements([
        {
          id: 1,
          title: "Registration is Now Open!",
          content:
            "We are excited to announce that registration for Youth Camp 2025 is officially open. Branch representatives can now begin registering participants through this portal.",
          date: "2025-01-10",
          author: "Camp Organizing Team",
          priority: "high",
        },
        {
          id: 2,
          title: "Important Health Guidelines",
          content:
            "All participants must provide emergency contact information. Please ensure that any special medical conditions or dietary requirements are noted during registration.",
          date: "2025-01-08",
          author: "Health & Safety Team",
          priority: "medium",
        },
        {
          id: 3,
          title: "What to Bring - Packing List",
          content:
            "A detailed packing list will be shared with all registered participants closer to the camp date. Basic items include bedding, personal toiletries, Bible, notebook, and weather-appropriate clothing.",
          date: "2025-01-05",
          author: "Camp Organizing Team",
          priority: "low",
        },
        {
          id: 4,
          title: "Transportation Arrangements",
          content:
            "Transportation details for each branch will be coordinated separately. Branch representatives will receive specific instructions for their area 2 weeks before camp.",
          date: "2025-01-03",
          author: "Logistics Team",
          priority: "medium",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getPriorityClasses = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-200 text-red-700 border-red-300";
      case "medium":
        return "bg-yellow-200 text-yellow-700 border-yellow-300";
      case "low":
        return "bg-gray-200 text-gray-700 border-gray-300";
      default:
        return "bg-gray-200 text-gray-700 border-gray-300";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-white font-['Nimbus_Sans_L']">
        <div className="text-center text-gray-900">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading news and updates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white font-['Nimbus_Sans_L'] w-full antialiased overflow-x-hidden">
      <FreeRouteNavbar />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 text-gray-900">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              News & Announcements
            </h1>
            <p className="mt-2 text-gray-600">
              Stay updated with the latest information about Youth Camp 2025
            </p>
          </div>

          {/* Featured Announcement */}
          <div className="bg-gray-100 rounded-2xl p-8 mb-8 text-gray-900 shadow-xl border border-gray-200">
            <div className="flex items-center mb-4 text-blue-500">
              <svg
                className="h-6 w-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
              <span className="text-lg font-semibold">Youth Camp 2025</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">
              September 24th - 28th, 2025
            </h2>
            <p className="text-gray-600">
              Join us for an incredible week of worship, fellowship, and spiritual
              growth. Register your youth today and be part of this transformative
              experience!
            </p>
          </div>

          {/* Announcements List */}
          <div className="space-y-6">
            {announcements.map((announcement) => (
              <article
                key={announcement.id}
                className="bg-gray-100 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-200"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getPriorityClasses(
                            announcement.priority
                          )}`}
                        >
                          {announcement.priority.charAt(0).toUpperCase() +
                            announcement.priority.slice(1)}{" "}
                          Priority
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {announcement.title}
                      </h3>
                      <div className="flex flex-wrap items-center text-sm text-gray-500 mb-3">
                        <div className="flex items-center mr-4">
                          <svg
                            className="h-4 w-4 mr-1 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {new Date(announcement.date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </div>
                        <div className="flex items-center">
                          <svg
                            className="h-4 w-4 mr-1 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          {announcement.author}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed">
                    {announcement.content}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}