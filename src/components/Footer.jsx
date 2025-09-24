import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        {/* Logo and Copyright Column */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h3 className="text-2xl font-bold text-white tracking-wide">
            Youth Empowerment
          </h3>
          <p className="text-sm leading-relaxed max-w-xs">
            Empowering the next generation through purpose, development, and social responsibility.
          </p>
          <div className="text-sm mt-4">
            <p>&copy; {new Date().getFullYear()} Youth Empowerment. All Rights Reserved.</p>
          </div>
        </div>

        {/* Contact Info Column */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h3 className="text-white font-bold text-xl mb-2">Contact Us</h3>
          <p className="hover:text-white transition-colors duration-300">
            Email: <a href="mailto:youthempowerment@email.com">youthempowerment@email.com</a>
          </p>
          <p>Phone: +809 9099 7239</p>
        </div>

        {/* Social Media Column */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h3 className="text-white font-bold text-xl mb-2">Follow Us</h3>
          <div className="flex space-x-6 text-gray-500">
            <a href="https://web.facebook.com/GACHQ" target='_blank' aria-label="Facebook" className="hover:text-blue-500 transition-colors duration-300">
              <FaFacebook size={28} />
            </a>
            <a href="https://www.instagram.com/gac.youth.ministry?igsh=eDBpOW4xbmdwa29m" target='_blank' aria-label="Instagram" className="hover:text-pink-500 transition-colors duration-300">
              <FaInstagram size={28} />
            </a>
            <a href="https://vm.tiktok.com/ZMAfB8xVL/" target='_blank' aria-label="TikTok" className="hover:text-gray-200 transition-colors duration-300">
              <FaTiktok size={28} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}