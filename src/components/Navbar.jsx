import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-purple-600">
            Shayarians
          </Link>

          {/* Hamburger Menu Icon for Mobile */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex space-x-4">
            {['Home', 'Upload', 'Random Shayari', 'Confession'].map((item) => (
              <Link
                key={item}
                to={
                  item === 'Upload'
                    ? '/upload'
                    : item === 'Random Shayari'
                    ? '/random'
                    : item === 'Confession'
                    ? '/confession'
                    : '/'
                }
                className="text-gray-700 hover:text-purple-600"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu - Visible when isMobileMenuOpen is true */}
      <div
        className={`lg:hidden ${
          isMobileMenuOpen ? 'block' : 'hidden'
        } bg-gray-100`}
      >
        <div className="flex flex-col items-center py-4 space-y-4">
          {['Home', 'Upload', 'Random Shayari', 'Confession'].map((item) => (
            <Link
              key={item}
              to={
                item === 'Upload'
                  ? '/upload'
                  : item === 'Random Shayari'
                  ? '/random'
                  : item === 'Confession'
                  ? '/confession'
                  : '/'
              }
              className="text-gray-700 hover:text-purple-600"
              onClick={() => setIsMobileMenuOpen(false)} // Close menu after clicking
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
