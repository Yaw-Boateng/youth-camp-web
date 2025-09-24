import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);

      await login(email, password); // ✅ Firebase login
      navigate('/dashboard');       // ✅ Redirect after login
    } catch (error) {
      setError('Invalid credentials. Please contact your camp administrator.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-indigo-950 via-blue-900 to-sky-900 overflow-hidden font-[Inter] antialiased">
      {/* Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-800 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-indigo-800 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-sky-800 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

      <div className="relative max-w-sm sm:max-w-md w-full space-y-8 z-10 p-4 sm:p-8">
        <div className="text-center">
          {/* Logo placeholder */}
          <div className="mx-auto h-24 w-24 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
            <img src="public\GAYM_LOGO.PNG" alt="Logo" className="h-16 w-16 object-contain" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Youth Camp 2025</h2>
          <p className="mt-2 text-sm sm:text-base text-gray-200">
            Branch Representative Portal
          </p>
          <p className="text-xs text-gray-300 mt-1">September 24th - 28th, 2025</p>
        </div>

        <form 
          className="space-y-6 p-6 sm:p-8 rounded-3xl shadow-2xl backdrop-blur-xl bg-white/10 border border-white/20"
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="bg-red-500/80 text-white px-4 py-3 rounded-xl text-sm text-center">
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
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400"
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
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 top-6 flex items-center pr-3 text-gray-400 hover:text-white"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M2 12s3-8 10-8 10 8 10 8-3 8-10 8-10-8-10-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-10-8-10-8a18.04 18.04 0 015.07-5.32M12 14a2 2 0 100-4 2 2 0 000 4z" />
                    <line x1="2" y1="2" x2="22" y2="22" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-3 px-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 disabled:opacity-50"
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
            <p className="text-xs text-gray-300">
              Don't have credentials? Contact your camp administrator 
            </p>
            <p className='text-xs text-gray-300'>
              Back To <Link to="/landing-page" className='underline'>Home</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
