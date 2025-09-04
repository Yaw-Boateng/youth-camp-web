import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

// NOTE: This component is self-contained. For a real app, you would have separate files
// for hooks and context, but for this single-file demonstration, we'll assume they
// are available.

// Main App component to encapsulate the login form
export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // State to track password visibility
  const [showPassword, setShowPassword] = useState(false);


  


  const { login } = useAuth();
  const navigate = useNavigate();

 

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);

      await login(email, password); // ✅ Firebase login
      navigate('/dashboard');       // ✅ Go to dashboard after login
    } catch (error) {
      setError('Invalid credentials. Please contact your camp administrator.');
    } finally {
      setLoading(false);
    }
  }

  

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-indigo-950 via-blue-900 to-sky-900 overflow-hidden font-[Inter] antialiased">
      <script src="https://cdn.tailwindcss.com"></script>
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-800 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-indigo-800 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-sky-800 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      
      <div className="relative max-w-sm sm:max-w-md w-full space-y-8 z-10 p-4 sm:p-8">
        <div className="text-center">
          {/* Replaced the commented-out SVG with a key icon for a more complete look */}
          <div className="mx-auto h-24 w-24 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-6 shadow-2xl transition-all duration-300 hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M15.232 5.232l3.536 3.536M15.232 5.232a5.5 5.5 0 010 7.778l-3.232 3.232a5.5 5.5 0 01-7.778 0 5.5 5.5 0 010-7.778l3.232-3.232a5.5 5.5 0 017.778 0z" />
              <path d="M12.414 12.414l1.414 1.414m-1.414-1.414l-1.414-1.414m2.828 2.828l1.414 1.414m-1.414-1.414l-1.414-1.414m2.828-2.828l1.414 1.414M16 16l-3 3" />
            </svg>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">Youth Camp 2025</h2>
          <p className="mt-2 text-sm sm:text-base text-gray-200 drop-shadow-md">
            Branch Representative Portal
          </p>
          <p className="text-xs text-gray-300 mt-1 drop-shadow-sm">
            September 24th - 28th, 2025
          </p>
        </div>

        <form 
          className="space-y-6 p-6 sm:p-8 rounded-3xl shadow-2xl backdrop-blur-xl bg-white/10 border border-white/20 transform transition-all duration-500 hover:scale-[1.01]"
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="bg-red-500/80 border border-red-400 text-white px-4 py-3 rounded-xl text-sm transition-all duration-300 text-center backdrop-blur-md">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700/50 focus:border-blue-700 transition-all duration-300 text-white placeholder-gray-400"
                placeholder="Enter your email"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                // Dynamically change the input type based on the showPassword state
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700/50 focus:border-blue-700 transition-all duration-300 text-white placeholder-gray-400"
                placeholder="Enter your password"
              />
              {/* Button to toggle password visibility */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 top-6 flex items-center pr-3 text-gray-400 hover:text-white transition-colors duration-200"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-8 10-8 10 8 10 8-3 8-10 8-10-8-10-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-10-8-10-8a18.04 18.04 0 015.07-5.32M1.49 6.04L2.91 4.62M18.51 18.51l1.42 1.42M12 4c.66 0 1.25.12 1.8.34M12 14a2 2 0 100-4 2 2 0 000 4z" />
                    <line x1="2" y1="2" x2="22" y2="22" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-3 px-4 rounded-xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 focus:outline-none focus:ring-4 focus:ring-blue-700/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform active:scale-95 cursor-pointer"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Sign In'
            )}
          </button>

          <div className="text-center">
            <p className="text-xs text-gray-300 drop-shadow-sm">
              Don't have credentials? Contact your camp administrator 
            </p>
            <p className='text-xs text-gray-300 drop-shadow-sm'> Back To <Link to="/home" className='underline '>Home</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}
