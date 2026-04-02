import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const destinations = [
  // ... (destinations array remains the same)
  { name: "Finland", img: "https://images.unsplash.com/photo-1516132006923-6cf348e5dee2?auto=format&fit=crop&q=80&w=800", services: "Study Visa • Business Visa • Visit Visa • Marriage Visa • Migrate" },
  { name: "Belgium", img: "https://images.unsplash.com/photo-1559113513-d5e09c78b9dd?auto=format&fit=crop&q=80&w=800", services: "Study Visa • Business Visa • Visit Visa • Marriage Visa" },
  { name: "Austria", img: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&q=80&w=800", services: "Study Visa • Business Visa • Visit Visa • Migrate" },
  { name: "Ireland", img: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&q=80&w=800", services: "Study Visa" },
  { name: "France", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800", services: "Study Visa • Business Visa • Migrate" },
  { name: "Spain", img: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&q=80&w=800", services: "Study Visa • Visit Visa • Migrate" },
  { name: "Netherlands", img: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&q=80&w=800", services: "Study Visa • Business Visa • Visit Visa" },
  { name: "United Kingdom", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800", services: "Study Visa • Business Visa • Visit Visa • Marriage Visa • Migrate" },
  { name: "New Zealand", img: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&q=80&w=800", services: "Study Visa • Business Visa • Visit Visa • Marriage Visa" },
  { name: "Australia", img: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800", services: "Study Visa • Business Visa • Visit Visa • Migrate" },
  { name: "Canada", img: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=80&w=800", services: "Study Visa • Business Visa • Visit Visa • Migrate" },
  { name: "Germany", img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800", services: "Study Visa • Business Visa • Migrate" },
  { name: "Denmark", img: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&q=80&w=800", services: "Study Visa • Visit Visa • Migrate" },
  { name: "Italy", img: "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?auto=format&fit=crop&q=80&w=800", services: "Internship Program • Business Visa • Visit Visa" },
  { name: "Sweden", img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800", services: "Study Visa • Migrate" }
];

export default function Home() {
  const location = useLocation();
  
  // Handling hash links
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Delay slightly to ensure content is rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-gradient h-[600px] flex items-center justify-center text-center text-white px-4">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Fulfilling Lives</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">Your trusted partner in global migration, education, and career opportunities.</p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg border border-white/30">Study Visa</span>
            <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg border border-white/30">Work Visa</span>
            <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg border border-white/30">Marriage Visa</span>
            <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg border border-white/30">Permanent Residency</span>
          </div>
          <Link to="/portal?mode=register" className="bg-[#b45309] hover:bg-amber-700 text-white px-8 py-4 rounded-full font-bold text-lg transition shadow-xl inline-block mt-4">
            Take Eligibility Assessment
          </Link>
        </div>
      </section>

      {/* CEO Section */}
      <section id="about" className="py-20 bg-white dark:bg-slate-800 overflow-hidden transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-[#b45309] font-bold tracking-widest uppercase mb-2">Message from the Leadership</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-[#0b1136] dark:text-white mb-6">Improving Lives of Many</h3>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 italic leading-relaxed text-lg">
                <p>“Driven by the aspiration of helping Filipinos, let me share our commitment with you. Utilizing career counseling and expert documentation, we inspire and guide individuals towards visa acquisition.”</p>
                <p>“We aim to be globally recognized, offering study internships, scholarships, and training programs that enhance employment prospects with world-class skills. We value the significance of this life-changing investment.”</p>
                <p>“We pride-ourselves on providing unparalleled opportunities, maintaining high standards, and forming solid partnerships. Join us, and let's improve and build lives together!”</p>
              </div>
              <div className="mt-8">
                <p className="font-bold text-xl text-[#0b1136] dark:text-blue-400">Shiela Mae Bullar</p>
                <p className="text-[#b45309] font-medium uppercase tracking-wider">Founder & CEO</p>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="ceo-image-container">
                <img src="https://i.postimg.cc/s2gv4H0r/IMG-20250114-WA0014.jpg" alt="Shiela Mae Bullar" className="ceo-img shadow-2xl" onError={(e) => {e.target.src='image_f06d62.jpg'}} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-[#0b1136] dark:text-white mb-4">Our Specialized Services</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">Expert guidance and personalized solutions for your global aspirations.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service cards */}
            <div className="service-card bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all border-b-4 border-smb-gold dark:border-amber-600 group">
              <div className="overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80&w=800" alt="Couple" className="service-card-img" />
                <div className="absolute inset-0 bg-[#0b1136]/20 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-blue-50 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto -mt-12 relative z-10 mb-4 border-2 border-white dark:border-slate-800">
                  <i className="fas fa-user-friends text-[#0b1136] dark:text-blue-400"></i>
                </div>
                <h3 className="font-bold text-lg mb-2 text-[#0b1136] dark:text-white">Spousal/Fiancé</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Dedicated support for family reunification and partner visas across Europe and North America.</p>
              </div>
            </div>
            <div className="service-card bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all border-b-4 border-smb-gold dark:border-amber-600 group">
              <div className="overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" alt="Students studying" className="service-card-img" />
                <div className="absolute inset-0 bg-[#0b1136]/20 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-blue-50 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto -mt-12 relative z-10 mb-4 border-2 border-white dark:border-slate-800">
                  <i className="fas fa-graduation-cap text-[#0b1136] dark:text-blue-400"></i>
                </div>
                <h3 className="font-bold text-lg mb-2 text-[#0b1136] dark:text-white">Student Visa</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Partnered with top international schools to provide world-class education and career options.</p>
              </div>
            </div>
            <div className="service-card bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all border-b-4 border-smb-gold dark:border-amber-600 group">
              <div className="overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" alt="Business" className="service-card-img" />
                <div className="absolute inset-0 bg-[#0b1136]/20 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-blue-50 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto -mt-12 relative z-10 mb-4 border-2 border-white dark:border-slate-800">
                  <i className="fas fa-briefcase text-[#0b1136] dark:text-blue-400"></i>
                </div>
                <h3 className="font-bold text-lg mb-2 text-[#0b1136] dark:text-white">Business/Migrate</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Expert documentation for skilled migration, permanent residency, and business ventures.</p>
              </div>
            </div>
            <div className="service-card bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all border-b-4 border-smb-gold dark:border-amber-600 group">
              <div className="overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800" alt="Tourist" className="service-card-img" />
                <div className="absolute inset-0 bg-[#0b1136]/20 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-blue-50 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto -mt-12 relative z-10 mb-4 border-2 border-white dark:border-slate-800">
                  <i className="fas fa-plane text-[#0b1136] dark:text-blue-400"></i>
                </div>
                <h3 className="font-bold text-lg mb-2 text-[#0b1136] dark:text-white">Visit/Tourist</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Hassle-free visa assistance for your global travels and international exploration.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destination Gallery Section */}
      <section id="gallery" className="py-20 bg-white dark:bg-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-[#0b1136] dark:text-white mb-4">Our Global Reach</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">Explore where we can help you build your future.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {destinations.map((dest, i) => (
              <div key={i} className="destination-card relative overflow-hidden rounded-xl h-72 group cursor-pointer shadow-lg border border-transparent dark:border-slate-700">
                <img src={dest.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={dest.name}/>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="country-label text-white text-2xl font-bold tracking-widest uppercase drop-shadow-md">{dest.name}</span>
                </div>
                <div className="hover-overlay absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <p className="details-text text-white text-sm font-medium leading-relaxed">{dest.services}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Contact Section */}
      <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden border-t border-gray-200 dark:border-slate-800 transition-colors">
        <div className="absolute top-0 right-0 w-64 h-64 bg-smb-gold/5 dark:bg-amber-500/5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-smb-blue/5 dark:bg-blue-500/5 rounded-full -ml-48 -mb-48"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0b1136] dark:text-white mb-4 tracking-tight">GET IN TOUCH</h2>
            <div className="w-24 h-1.5 bg-smb-gold mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* International HQ */}
            <div className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700 flex flex-col h-full transition-colors">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-blue-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center text-[#0b1136] dark:text-blue-400 text-2xl"><i className="fas fa-globe"></i></div>
                <div><h3 className="text-2xl font-bold text-[#0b1136] dark:text-white">International HQ</h3><p className="text-smb-gold dark:text-amber-500 font-medium">Global Operations</p></div>
              </div>
              <div className="space-y-6 flex-grow">
                <div className="flex items-start gap-4"><i className="fas fa-map-marker-alt text-smb-gold dark:text-amber-500 mt-1.5"></i><p className="text-lg text-gray-700 dark:text-gray-300 leading-tight">London, United Kingdom</p></div>
                <div className="flex items-center gap-4"><i className="fas fa-envelope text-smb-gold dark:text-amber-500"></i><a href="mailto:admin@smbvisa.com" className="text-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline decoration-2 underline-offset-4">admin@smbvisa.com</a></div>
                <div className="pt-6 border-t border-gray-100 dark:border-slate-700">
                  <h4 className="text-sm font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-4">Support Offices</h4>
                  <div className="grid grid-cols-2 gap-y-3">
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium"><span className="w-1.5 h-1.5 bg-smb-gold rounded-full"></span> Canada</div>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium"><span className="w-1.5 h-1.5 bg-smb-gold rounded-full"></span> UK</div>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium"><span className="w-1.5 h-1.5 bg-smb-gold rounded-full"></span> Dubai</div>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium"><span className="w-1.5 h-1.5 bg-smb-gold rounded-full"></span> Europe</div>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium"><span className="w-1.5 h-1.5 bg-smb-gold rounded-full"></span> SE Asia</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Philippines HQ */}
            <div className="bg-[#0b1136] dark:bg-blue-900 p-8 md:p-10 rounded-3xl shadow-xl text-white flex flex-col h-full transition-colors">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-smb-gold dark:text-amber-500 text-2xl"><i className="fas fa-flag"></i></div>
                <div><h3 className="text-2xl font-bold">Philippines HQ</h3><p className="text-blue-200 font-medium">Regional Operations</p></div>
              </div>
              <div className="space-y-6 flex-grow">
                <div className="flex items-start gap-4"><i className="fas fa-map-marker-alt text-smb-gold dark:text-amber-500 mt-1.5"></i><div><p className="text-lg leading-tight mb-1">Ortigas Center, Pasig Metro Manila</p><p className="text-lg leading-tight">Bacolod City</p></div></div>
                <div className="flex items-start gap-4"><i className="fas fa-phone-alt text-smb-gold dark:text-amber-500 mt-1.5"></i><div className="text-2xl font-bold tracking-tight"><p>+63 938 931 4030</p><p>+63 992 969 9308</p></div></div>
                <div className="pt-6 border-t border-white/10">
                  <h4 className="text-sm font-bold text-blue-300 uppercase tracking-widest mb-4">Regional Reach</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 text-sm font-medium text-blue-100">
                    <span>• NCR</span><span>• Baguio</span><span>• Pampanga</span><span>• Bulacan</span><span>• Cebu</span><span>• Iloilo</span><span>• CDO</span><span>• Davao</span><span>• Palawan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
