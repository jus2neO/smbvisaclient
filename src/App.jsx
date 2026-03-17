import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portal from './pages/Portal';

// Very basic FAQ component since FAQ.html was empty
function FAQ() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-slate-900 text-center transition-colors">
      <h2 className="text-3xl font-black text-smb-blue dark:text-white mb-4">Frequently Asked Questions</h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-2xl">This page is currently under construction. Please check back later for comprehensive answers to common immigration queries.</p>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/portal" element={<Portal />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
