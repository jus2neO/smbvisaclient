export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12 transition-colors text-center">
      <div className="flex flex-col items-center gap-6">
        <img src="https://i.postimg.cc/d1RpQnwF/smb-logo-v3.png" alt="SMB Logo" className="h-16 mb-4 filter brightness-0 invert opacity-90 inline" onError={(e) => {e.target.src='smb-logo-v3.png'}} />
        <div className="flex gap-8 text-2xl mb-4">
          <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-facebook"></i></a>
          <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-instagram"></i></a>
          <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-youtube"></i></a>
        </div>
        <div className="border-t border-white/5 pt-8 w-full max-w-lg">
          <p className="text-gray-500 dark:text-gray-600 text-sm">© 2025 SMB International. All rights reserved.</p>
          <p className="mt-4 text-[#b45309] dark:text-amber-600 italic uppercase tracking-[0.3em] font-black text-xs">"Improving Lives of Many"</p>
        </div>
      </div>
    </footer>
  );
}
