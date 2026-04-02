import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'About Us', sectionId: 'about', isAnchor: true },
    { name: 'Services', sectionId: 'services', isAnchor: true },
    { name: 'Gallery', sectionId: 'gallery', isAnchor: true },
    { name: 'FAQ', href: '/faq', isAnchor: false },
    { name: 'Contact', sectionId: 'contact', isAnchor: true },
  ];

  const scrollToSection = (sectionId, closeMenu = false) => {
    if (closeMenu) setIsMenuOpen(false);

    const doScroll = () => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    if (location.pathname !== '/') {
      // Navigate home first, then scroll after the page renders
      navigate('/');
      setTimeout(doScroll, 150);
    } else {
      doScroll();
    }
  };

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white dark:bg-slate-900/95 backdrop-blur-md shadow-md sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={handleLogoClick}>
            <Link to="/">
              <img src="https://i.postimg.cc/d1RpQnwF/smb-logo-v3.png" alt="SMB Logo" className="h-[56px] w-auto object-contain dark:brightness-0 dark:invert transition-all" onError={(e) => { e.target.src = 'smb-logo-v3.png' }} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) =>
              link.isAnchor ? (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.sectionId)}
                  className="text-gray-600 dark:text-gray-300 hover:text-smb-blue dark:hover:text-blue-400 font-semibold transition cursor-pointer bg-transparent border-none p-0"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-600 dark:text-gray-300 hover:text-smb-blue dark:hover:text-blue-400 font-semibold transition cursor-pointer"
                >
                  {link.name}
                </Link>
              )
            )}

            <button onClick={toggleTheme} className="ml-4 text-gray-500 dark:text-gray-400 hover:text-smb-blue dark:hover:text-blue-400 bg-gray-50 dark:bg-slate-800 p-2.5 rounded-full shadow-sm border border-gray-200 dark:border-slate-700 transition">
              <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'} text-lg w-5 h-5 flex items-center justify-center`}></i>
            </button>

            <Link to="/portal" className="bg-[#0b1136] dark:bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-800 dark:hover:bg-blue-700 transition shadow-lg flex items-center gap-2 font-semibold ml-2">
              <i className="fas fa-user-circle"></i> Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className="text-gray-500 dark:text-gray-400 p-2">
              <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'} text-xl`}></i>
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 dark:text-gray-300 p-2 focus:outline-none"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 py-4 px-4 space-y-4 shadow-xl">
          {navLinks.map((link) =>
            link.isAnchor ? (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.sectionId, true)}
                className="block w-full text-left text-gray-600 dark:text-gray-300 hover:text-smb-blue dark:hover:text-blue-400 font-semibold py-2 transition bg-transparent border-none"
              >
                {link.name}
              </button>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-600 dark:text-gray-300 hover:text-smb-blue dark:hover:text-blue-400 font-semibold py-2 transition"
              >
                {link.name}
              </Link>
            )
          )}
          <Link
            to="/portal"
            onClick={() => setIsMenuOpen(false)}
            className="w-full bg-[#0b1136] dark:bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-800 dark:hover:bg-blue-700 transition shadow-lg flex items-center justify-center gap-2 font-semibold"
          >
            <i className="fas fa-user-circle"></i> Login
          </Link>
        </div>
      )}
    </nav>
  );
}
