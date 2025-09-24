import gsap from 'gsap';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function FreeRouteNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const menuIconRef = useRef(null);
  const closeIconRef = useRef(null);

  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isMobileMenuOpen) {
      // Animate the mobile menu to slide down and fade in
      gsap.to(mobileMenuRef.current, {
        height: 'auto',
        opacity: 1,
        duration: 0.3,
        ease: 'power2.inOut',
        pointerEvents: 'auto',
      });
      // Animate hamburger icon to close icon
      gsap.to(menuIconRef.current, {
        rotation: 180,
        duration: 0.3,
        onComplete: () => menuIconRef.current.classList.add('hidden'),
      });
      closeIconRef.current.classList.remove('hidden');
      gsap.fromTo(
        closeIconRef.current,
        { rotation: -180 },
        { rotation: 0, duration: 0.3 }
      );
    } else {
      // Animate the mobile menu to slide up and fade out
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
        pointerEvents: 'none',
      });
      // Animate close icon back to hamburger icon
      gsap.to(closeIconRef.current, {
        rotation: 180,
        duration: 0.3,
        onComplete: () => closeIconRef.current.classList.add('hidden'),
      });
      menuIconRef.current.classList.remove('hidden');
      gsap.fromTo(
        menuIconRef.current,
        { rotation: -180 },
        { rotation: 0, duration: 0.3 }
      );
    }
  }, [isMobileMenuOpen]);

  return (
    <div className="font-[Inter] flex flex-col">
      <nav className="relative flex items-center justify-between p-4 bg-white shadow-md">
        {/* Left-aligned logo */}
        <div className="flex items-center">
          <Link to="/landing-page">
            <img src="/GAYM_LOGO.PNG" alt="GAC Youth Logo" className="h-10 md:h-12" />
          </Link>
        </div>

        {/* Right-aligned navigation links (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-4 md:gap-8 nav-links">
          <Link className="font-extrabold text-sm md:text-base text-[#102A73] no-underline hover:text-blue-700 transition-colors duration-300" to="/landing-page">Home</Link>
          <Link className="font-extrabold text-sm md:text-base text-[#102A73] no-underline hover:text-blue-700 transition-colors duration-300" to="/news">Annoucement</Link>
          <Link className="font-extrabold text-sm md:text-base text-[#102A73] no-underline hover:text-blue-700 transition-colors duration-300" to="/media">Media</Link>
          <Link className="font-extrabold text-sm md:text-base text-[#102A73] no-underline hover:text-blue-700 transition-colors duration-300" to="/login">Login</Link>
        </div>

        {/* Mobile menu toggle for smaller screens */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-900 focus:outline-none p-2 rounded-md z-20"
          >
            {/* Hamburger Icon */}
            <svg ref={menuIconRef} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            {/* Close Icon (initially hidden) */}
            <svg ref={closeIconRef} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu (initially hidden and off-screen) */}
        <div ref={mobileMenuRef} id="mobile-menu" className="md:hidden absolute top-[100%] left-0 w-full z-10 bg-white shadow-md rounded-b-lg pointer-events-none" style={{ height: '0', overflow: 'hidden' }}>
          <div className="flex flex-col items-center gap-6 py-8 px-4">
            <Link className="font-extrabold text-xl text-blue-500 no-underline hover:text-blue-700 transition-colors duration-300 mobile-link" to="/landing-page">Home</Link>
            <Link className="font-extrabold text-xl text-blue-500 no-underline hover:text-blue-700 transition-colors duration-300 mobile-link" to="/news">Annoucement</Link>
            <Link className="font-extrabold text-xl text-blue-500 no-underline hover:text-blue-700 transition-colors duration-300 mobile-link" to="/media">Media</Link>
            <Link className="font-extrabold text-xl text-blue-500 no-underline hover:text-blue-700 transition-colors duration-300 mobile-link" to="/login">Login</Link>
          </div>
        </div>
      </nav>
    </div>
  );
};