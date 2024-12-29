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
            <button onClick={toggleMobileMenu} className="text-gray-700">
            <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <path d="M12 2L2 12h3v8h8v-8h3L12 2z" />
</svg>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex space-x-4">
            {['Home', 'Upload', 'Random Shayari'].map((item) => (
              <Link
                key={item}
                to={item === 'Upload' ? '/upload' : item === 'Random Shayari' ? '/random' : '/'}
                className="text-gray-700 hover:text-purple-600"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu - Visible when isMobileMenuOpen is true */}
      <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-gray-100`}>
        <div className="flex flex-col items-center py-4 space-y-4">
          {['Home', 'Upload', 'Random Shayari'].map((item) => (
            <Link
              key={item}
              to={item === 'Upload' ? '/upload' : item === 'Random Shayari' ? '/random' : '/'}
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
