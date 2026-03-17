import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-slate-900/95 backdrop-blur-md shadow-md sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo(0,0)}>
             <Link to="/">
                 <img src="https://i.postimg.cc/d1RpQnwF/smb-logo-v3.png" alt="SMB Logo" className="h-[56px] w-auto object-contain dark:brightness-0 dark:invert transition-all" onError={(e) => {e.target.src='smb-logo-v3.png'}} />
             </Link>
          </div>
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/#about" className="text-gray-600 dark:text-gray-300 hover:text-smb-blue dark:hover:text-blue-400 font-semibold transition cursor-pointer">About Us</Link>
            <Link to="/#services" className="text-gray-600 dark:text-gray-300 hover:text-smb-blue dark:hover:text-blue-400 font-semibold transition cursor-pointer">Services</Link>
            <Link to="/#gallery" className="text-gray-600 dark:text-gray-300 hover:text-smb-blue dark:hover:text-blue-400 font-semibold transition cursor-pointer">Gallery</Link>
            <Link to="/faq" className="text-gray-600 dark:text-gray-300 hover:text-smb-blue dark:hover:text-blue-400 font-semibold transition cursor-pointer">FAQ</Link>
            <Link to="/#contact" className="text-gray-600 dark:text-gray-300 hover:text-smb-blue dark:hover:text-blue-400 font-semibold transition cursor-pointer">Contact</Link>
            
            <button onClick={toggleTheme} className="ml-4 text-gray-500 dark:text-gray-400 hover:text-smb-blue dark:hover:text-blue-400 bg-gray-50 dark:bg-slate-800 p-2.5 rounded-full shadow-sm border border-gray-200 dark:border-slate-700 transition">
              <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'} text-lg w-5 h-5 flex items-center justify-center`}></i>
            </button>

            <Link to="/portal" className="bg-[#0b1136] dark:bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-800 dark:hover:bg-blue-700 transition shadow-lg flex items-center gap-2 font-semibold ml-2">
              <i className="fas fa-user-circle"></i> Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
