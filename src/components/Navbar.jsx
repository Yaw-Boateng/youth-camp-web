import { Fragment } from "react";
import { Menu, Transition, Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
      toast.success("Logged out successfully.");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  }

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Register Participant", path: "/register" },
    // { name: "News & Updates", path: "/news" },
  ];

  return (
    <Disclosure as="nav" className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              {/* Logo & Title */}
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/dashboard")}>
                  <div className="h-9 w-9 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m0 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                    Youth Camp 2025
                  </span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex md:ml-10 md:space-x-6">
                  {navItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => navigate(item.path)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        location.pathname === item.path
                          ? "text-blue-600 font-semibold bg-blue-50"
                          : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Side Profile Dropdown */}
             <div className="flex items-center space-x-4">
  {/* Mobile Hamburger */}
  <div className="flex md:hidden">
    <Disclosure.Button className="inline-flex items-center justify-center rounded-lg p-2 text-gray-600 hover:text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition duration-300">
      {open ? (
        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
      ) : (
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      )}
    </Disclosure.Button>
  </div>

  {/* Profile Dropdown */}
  <Menu as="div" className="relative ml-3 hidden md:block">
    <div>
      <Menu.Button className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300">
        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500 flex items-center justify-center text-white font-semibold text-lg shadow-lg">
          {currentUser?.email?.charAt(0).toUpperCase()}
        </div>
      </Menu.Button>
    </div>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-200 transform"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="transition ease-in duration-150 transform"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 mt-3 w-64 rounded-2xl shadow-xl bg-white ring-1 ring-black/5 focus:outline-none overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <p className="font-semibold text-gray-800 truncate">{currentUser?.email}</p>
          <p className="text-xs text-gray-400 mt-1">Signed in</p>
        </div>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={handleLogout}
              className={`${
                active ? "bg-blue-50 text-blue-600" : "text-gray-700"
              } flex items-center w-full px-5 py-3 text-sm font-medium transition duration-200`}
            >
              <svg
                className="h-5 w-5 mr-3 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                />
              </svg>
              Sign Out
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Transition>
  </Menu>
</div>

            </div>
          </div>

          {/* Mobile Dropdown */}
          <Disclosure.Panel className="md:hidden bg-white border-t border-gray-200 shadow-md">
            <div className="space-y-1 px-2 pt-3 pb-3">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition ${
                    location.pathname === item.path
                      ? "text-blue-600 bg-blue-50 font-semibold"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition"
              >
                Sign out
              </button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
