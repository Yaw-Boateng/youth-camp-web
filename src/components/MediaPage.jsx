import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import FreeRouteNavbar from "./FreeRouteNavbar";
import { PlayIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

// Helper function to simulate fetching data from a Firebase function
const fetchMediaData = async () => {
  // Mock data for demonstration, same as before
  return {
    sessions: [
      {
        date: "September 24, 2025",
        dayName: "Day 1",
        morning: {
          sermon: {
            id: "sermon1",
            title: "The Vision of Paul",
            speaker: "Pastor John Doe",
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          },
          galleryLink: "https://drive.google.com/drive/folders/ABCDEF12345",
          reelLink: "https://drive.google.com/file/d/1a2b3c4d5e6f/view?usp=sharing",
        },
        evening: {
          sermon: {
            id: "sermon2",
            title: "A New Creation",
            speaker: "Sister Jane Doe",
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          },
          galleryLink: "https://drive.google.com/drive/folders/GHIJKL67890",
          reelLink: "https://drive.google.com/file/d/7g8h9i0j1k2l/view?usp=sharing",
        },
      },
      {
        date: "September 25, 2025",
        dayName: "Day 2",
        morning: {
          sermon: {
            id: "sermon3",
            title: "Discipleship in Action",
            speaker: "Evangelist Mark",
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
          },
          galleryLink: "https://drive.google.com/drive/folders/MNOPQR11223",
          reelLink: "https://drive.google.com/file/d/3m4n5o6p7q8r/view?usp=sharing",
        },
        evening: {
          sermon: {
            id: "sermon4",
            title: "Following the Call",
            speaker: "Pastor Elizabeth",
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
          },
          galleryLink: "https://drive.google.com/drive/folders/STUVWX44556",
          reelLink: "https://drive.google.com/file/d/9s0t1u2v3w4x/view?usp=sharing",
        },
      },
      {
        date: "September 26, 2025",
        dayName: "Day 3",
        morning: {
          sermon: {
            id: "sermon5",
            title: "Serving with Joy",
            speaker: "Brother Andrew",
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
          },
          galleryLink: "https://drive.google.com/drive/folders/1yzab4c5d6e7",
          reelLink: "https://drive.google.com/file/d/5y6z7a8b9c0d/view?usp=sharing",
        },
        evening: {
          sermon: {
            id: "sermon6",
            title: "Rooted in Faith",
            speaker: "Sister Martha",
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
          },
          galleryLink: "https://drive.google.com/drive/folders/2fghij8k9l0m",
          reelLink: "https://drive.google.com/file/d/1e2f3g4h5i6j/view?usp=sharing",
        },
      },
      {
        date: "September 27, 2025",
        dayName: "Day 4",
        morning: {
          sermon: {
            id: "sermon7",
            title: "The Heart of a Worshipper",
            speaker: "Pastor Michael",
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
          },
          galleryLink: "https://drive.google.com/drive/folders/3nopqr1stuvw",
          reelLink: "https://drive.google.com/file/d/7k8l9m0n1o2p/view?usp=sharing",
        },
        evening: {
          sermon: {
            id: "sermon8",
            title: "Building Community",
            speaker: "Brother Peter",
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
          },
          galleryLink: "https://drive.google.com/drive/folders/4xya1b2c3d4e",
          reelLink: "https://drive.google.com/file/d/3q4r5s6t7u8v/view?usp=sharing",
        },
      },
      {
        date: "September 28, 2025",
        dayName: "Day 5",
        morning: {
          sermon: {
            id: "sermon9",
            title: "Empowered for Service",
            speaker: "Sister Sarah",
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
          },
          galleryLink: "https://drive.google.com/drive/folders/5fghij6k7l8m",
          reelLink: "https://drive.google.com/file/d/9w0x1y2z3a4b/view?usp=sharing",
        },
        evening: {
          sermon: {
            id: "sermon10",
            title: "Final Charge",
            speaker: "Pastor David",
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
          },
          galleryLink: "https://drive.google.com/drive/folders/6nopqr9stuvw",
          reelLink: "https://drive.google.com/file/d/5c6d7e8f9g0h/view?usp=sharing",
        },
      },
    ],
  };
};

// Reusable component for the sermon player and media links
const SermonSessionBlock = ({ title, sermon, galleryLink, reelLink }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex flex-col h-full p-6 bg-gray-200/50 rounded-2xl border border-gray-200 transition-all duration-300 hover:border-gray-400">
      <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-700">{title}</h3>
      <div className="flex-grow">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800 mb-1">{sermon.title}</h4>
          <p className="text-sm text-gray-500 mb-3">{sermon.speaker}</p>
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={handlePlayPause}
              className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-3 transition-colors duration-200"
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
                </svg>
              ) : (
                <PlayIcon className="w-5 h-5" />
              )}
            </button>
            <audio
              ref={audioRef}
              src={sermon.audioUrl}
              onEnded={() => setIsPlaying(false)}
              className="w-full h-8"
            />
            <a href={sermon.audioUrl} download className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
              <ArrowDownTrayIcon className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        <a
          href={galleryLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg shadow-sm border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
        >
          <img src="https://cdn-icons-png.flaticon.com/512/3553/3553106.png" alt="Gallery Icon" className="h-6 w-6" />
          <span className="font-semibold">View Photos</span>
        </a>
        <a
          href={reelLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg shadow-sm border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
        >
          <img src="https://cdn-icons-png.flaticon.com/512/4118/4118817.png" alt="Reel Icon" className="h-6 w-6" />
          <span className="font-semibold">Watch Reel</span>
        </a>
      </div>
    </div>
  );
};

// Main Media Page component
const MediaPage = () => {
  const [mediaData, setMediaData] = useState({ sessions: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await fetchMediaData();
      setMediaData(data);
      setLoading(false);
    };
    getData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-xl">Loading youth camp media...</p>
      </div>
    );
  }

  return (
    <div className="font-['Nimbus_Sans_L'] w-full antialiased overflow-x-hidden bg-gray-100 text-gray-800">
      <script src="https://cdn.tailwindcss.com"></script>
      <FreeRouteNavbar />

      <div className="container mx-auto px-4 md:px-8 py-8 md:py-8">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-tight">
            Youth Camp 2025 Media 📸
          </h1>
          <p className="text-lg md:text-xl text-gray-500 mt-4 max-w-3xl mx-auto">
            Relive every moment from Youth Camp 2025. Explore sermons, photo galleries, and reels from each morning and evening session.
          </p>
        </header>

        {mediaData.sessions.map((day) => (
          <section key={day.dayName} className="mb-20">
            {/* Day Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <div className="flex items-end gap-2">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter">{day.dayName}</h2>
                <span className="text-lg md:text-xl text-gray-500"> — {day.date}</span>
              </div>
              <div className="flex items-center gap-4 text-sm font-semibold text-gray-600 mt-4 md:mt-0">
                <a href={day.morning.reelLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                  <PlayIcon className="w-4 h-4" /> Watch Reel
                </a>
                <a href={day.morning.galleryLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                  <ArrowDownTrayIcon className="w-4 h-4" /> Download All
                </a>
              </div>
            </div>

            {/* Morning & Evening Sessions - Stacked on mobile, side-by-side on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <SermonSessionBlock
                title="Morning Session"
                sermon={day.morning.sermon}
                galleryLink={day.morning.galleryLink}
                reelLink={day.morning.reelLink}
              />
              <SermonSessionBlock
                title="Evening Session"
                sermon={day.evening.sermon}
                galleryLink={day.evening.galleryLink}
                reelLink={day.evening.reelLink}
              />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default MediaPage;