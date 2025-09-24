import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import RegistrationForm from './components/RegistrationForm';
import News from './components/News';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Home from './components/Home';
import MediaPage from './components/MediaPage';
import Gallery from './components/Gallery';
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/AdminDashboard';


function App() {
  return (
    <AuthProvider>
      <ToastContainer 
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/news" element={<News />} />
            <Route path="/landing-page" element={<LandingPage />} />
            <Route path="/media" element={<MediaPage />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/" element={<Navigate to="/landing-page" />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <RegistrationForm />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="/news"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <News />
                </ProtectedRoute>
              }
            /> */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;