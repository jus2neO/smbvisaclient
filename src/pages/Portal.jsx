import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

// Data Models
const countriesList = [
    { name: "Australia", flag: "🇦🇺" }, { name: "Canada", flag: "🇨🇦" },
    { name: "Denmark", flag: "🇩🇰" }, { name: "France", flag: "🇫🇷" },
    { name: "Germany", flag: "🇩🇪" }, { name: "Ireland", flag: "🇮🇪" },
    { name: "New Zealand", flag: "🇳🇿" }, { name: "Norway", flag: "🇳🇴" },
    { name: "Poland", flag: "🇵🇱" }, { name: "Singapore", flag: "🇸🇬" },
    { name: "Spain", flag: "🇪🇸" }, { name: "UAE", flag: "🇦🇪" },
    { name: "United Kingdom", flag: "🇬🇧" }, { name: "United States", flag: "🇺🇸" }
];

const questionBank = {
    canada: {
        step3: [
            { id: "ca_age", text: "1. What is your current age?", opts: [{l: "18 - 35 years old (Max Points)", v: 30}, {l: "36 - 45 years old", v: 15}, {l: "46 years old and above", v: 5}] },
            { id: "ca_edu", text: "2. What is your highest level of education?", opts: [{l: "Master's / Ph.D.", v: 30}, {l: "Bachelor's Degree / Two or more certificates", v: 20}, {l: "High School Diploma / Undergraduate", v: 10}] },
            { id: "ca_exp", text: "3. How many years of skilled work experience do you have?", opts: [{l: "3 or more years", v: 25}, {l: "1 - 2 years", v: 15}, {l: "Less than 1 year", v: 5}] }
        ],
        step4: [
            { id: "ca_eng", text: "4. What is your English or French language proficiency?", opts: [{l: "CLB 9 or higher (Advanced/Fluent)", v: 25}, {l: "CLB 7-8 (Intermediate)", v: 15}, {l: "No test taken yet", v: 0}] },
            { id: "ca_job", text: "5. Do you have a valid job offer in Canada or a Provincial Nomination?", opts: [{l: "Yes, I have an approved job offer/nomination", v: 15}, {l: "No, applying independently", v: 0}] }
        ]
    },
    uk: {
        step3: [
            { id: "uk_spon", text: "1. Do you have a valid Certificate of Sponsorship (Job Offer) from a UK employer?", opts: [{l: "Yes, I have a sponsorship", v: 40}, {l: "No, but I am actively applying for jobs", v: 10}, {l: "No, I plan to study instead", v: 20}] },
            { id: "uk_sal", text: "2. Does your prospective salary meet the UK threshold (£38,700/yr)?", opts: [{l: "Yes, it meets/exceeds the threshold", v: 20}, {l: "No / I am not sure", v: 0}, {l: "N/A (Student Visa route)", v: 15}] },
            { id: "uk_fund", text: "3. Do you have sufficient personal savings to support yourself?", opts: [{l: "Yes, I meet the financial requirement", v: 15}, {l: "My sponsor will certify my maintenance", v: 15}, {l: "No savings yet / Need financing", v: 0}] }
        ],
        step4: [
            { id: "uk_eng", text: "4. Have you passed an approved English language test (e.g., IELTS UKVI)?", opts: [{l: "Yes, B1 level or higher", v: 20}, {l: "I have a degree taught in English", v: 20}, {l: "No test taken yet", v: 0}] },
            { id: "uk_rec", text: "5. Do you have any previous UK visa refusals?", opts: [{l: "None (Clean Record)", v: 10}, {l: "Yes, I have a previous refusal", v: 0}] }
        ]
    },
    aus: {
        step3: [
            { id: "au_age", text: "1. What is your current age?", opts: [{l: "18 - 32 years old (Max Points)", v: 30}, {l: "33 - 39 years old", v: 20}, {l: "40 - 44 years old", v: 10}, {l: "45+ years old", v: 0}] },
            { id: "au_skill", text: "2. Have you completed a formal Skills Assessment for your occupation?", opts: [{l: "Yes, positively assessed", v: 30}, {l: "No, but my occupation is on the skills list", v: 15}, {l: "No, planning to study first", v: 20}] },
            { id: "au_exp", text: "3. How many years of overseas skilled employment do you have?", opts: [{l: "8+ years", v: 15}, {l: "3-7 years", v: 10}, {l: "Less than 3 years", v: 0}] }
        ],
        step4: [
            { id: "au_eng", text: "4. What is your English proficiency level?", opts: [{l: "Superior (IELTS 8.0+)", v: 20}, {l: "Proficient (IELTS 7.0+)", v: 10}, {l: "Competent / None yet", v: 0}] },
            { id: "au_state", text: "5. Do you have state or territory nomination?", opts: [{l: "Yes (Subclass 190/491)", v: 10}, {l: "No / Applying independently (Subclass 189)", v: 0}] }
        ]
    },
    general: {
        step3: [
            { id: "gen_age", text: "1. What is your current age?", opts: [{l: "18 - 30 years old", v: 30}, {l: "31 - 35 years old", v: 20}, {l: "36 years old and above", v: 10}] },
            { id: "gen_edu", text: "2. What is the highest level of education you have attained?", opts: [{l: "Master's / Bachelor's Degree", v: 30}, {l: "Advanced Diploma / Associate Degree", v: 20}, {l: "High School Graduate / Undergraduate", v: 10}] },
            { id: "gen_fin", text: "3. How would you finance your visa application?", opts: [{l: "I have access to my own funds (Liquid Assets)", v: 30}, {l: "Family member sponsorship", v: 15}, {l: "Looking for financing", v: 0}] }
        ],
        step4: [
            { id: "gen_eng", text: "4. What English as a second language exams have you taken?", opts: [{l: "IELTS / TOEFL / PTE Academic / OET", v: 20}, {l: "None of the above (Willing to review)", v: 0}] },
            { id: "gen_rec", text: "5. Do you have any unlawful visa records?", opts: [{l: "None (Clean Record)", v: 10}, {l: "Yes, I have previous refusals/records", v: 0}] }
        ]
    }
};

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const availableTimeSlots = ["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"];

export default function Portal() {
  const { isDark, toggleTheme } = useTheme();
  const [searchParams] = useSearchParams();
  
  // Views: 'login', 'register', 'dashboard', 'booking'
  const [currentView, setCurrentView] = useState('login');
  
  // Assessment State
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
      fname: '', lname: '', middleName: '', positionApplied: '',
      email: '', phone: '', landline: '', facebook: '',
      birthMonth: '', birthDay: '', birthYear: '',
      gender: 'Male', heightCm: '', weightKg: '',
      province: '', cityMunicipality: '', completeAddress: '',
      referral: 'Social Media', terms: false, password: ''
  });
  
  // Education state
  const [educationList, setEducationList] = useState([]);
  const [currentEdu, setCurrentEdu] = useState({ level: '', school: '', course: '', dateFrom: '', dateTo: '' });
  
  // Work History state
  const [workHistoryList, setWorkHistoryList] = useState([]);
  const [currentWork, setCurrentWork] = useState({ company: '', position: '', description: '', country: 'Philippines', dateFrom: '', dateTo: '' });
  const [emailError, setEmailError] = useState('');
  const [selectedCountryObj, setSelectedCountryObj] = useState(null);
  const [answers, setAnswers] = useState({});
  const [scoreData, setScoreData] = useState({ score: 0, trackingId: '' });
  
  // Dashboard & Booking State
  const [displayedScore, setDisplayedScore] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Initialize view based on URL param
  useEffect(() => {
    if (searchParams.get('mode') === 'register') {
      setCurrentView('register');
      setStep(0);
    }
  }, [searchParams]);

  // Score counter animation
  useEffect(() => {
    if (currentView === 'dashboard') {
      let current = 0;
      const interval = setInterval(() => {
        if (current >= scoreData.score) {
          clearInterval(interval);
          setDisplayedScore(scoreData.score);
        } else {
          current += 2;
          setDisplayedScore(current);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [currentView, scoreData.score]);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [id]: type === 'checkbox' ? checked : value }));
    
    if (id === 'email') {
      if (!value) { setEmailError(''); return; }
      if (!value.includes('@')) setEmailError("Please include an '@'.");
      else if (value.split('@')[1].indexOf('.') === -1) setEmailError("Enter a valid domain.");
      else if (/\s/.test(value)) setEmailError("Cannot contain spaces.");
      else setEmailError('');
    }
  };

  const handleAnswerSelect = (qId, value) => {
    setAnswers(prev => ({ ...prev, [qId]: parseInt(value) }));
  };

  const validateStep1 = () => {
    if (!formData.fname || !formData.lname || !formData.positionApplied || !formData.terms || emailError || !formData.email || !formData.phone) {
        alert('Please fill all required fields (*) correctly and agree to the Terms & Conditions.');
        return false;
    }
    return true;
  };

  const handleEduChange = (e) => {
    const { name, value } = e.target;
    setCurrentEdu(prev => ({ ...prev, [name]: value }));
  };

  const addEducation = () => {
    if (!currentEdu.level || !currentEdu.school) { alert('Please fill in Education Level and School Name.'); return; }
    setEducationList(prev => [...prev, currentEdu]);
    setCurrentEdu({ level: '', school: '', course: '', dateFrom: '', dateTo: '' });
  };

  const removeEducation = (idx) => setEducationList(prev => prev.filter((_, i) => i !== idx));

  const handleWorkChange = (e) => {
    const { name, value } = e.target;
    setCurrentWork(prev => ({ ...prev, [name]: value }));
  };

  const addWork = () => {
    if (!currentWork.company || !currentWork.position) { alert('Please fill in Company Name and Position.'); return; }
    setWorkHistoryList(prev => [...prev, currentWork]);
    setCurrentWork({ company: '', position: '', description: '', country: 'Philippines', dateFrom: '', dateTo: '' });
  };

  const removeWork = (idx) => setWorkHistoryList(prev => prev.filter((_, i) => i !== idx));

  const handleNextStep = (targetStep) => {
    if (targetStep === 2 && !validateStep1()) return;
    if (targetStep === 3 && !selectedCountryObj) { alert("Please select a target destination."); return; }
    
    setStep(targetStep);
    window.scrollTo(0,0);
  };

  const submitAssessment = () => {
    const qData = getQuestionData();
    const requiredAnswers = qData.step3.length + qData.step4.length;
    
    if (Object.keys(answers).length < requiredAnswers) {
        alert("Please select an answer for all assessment questions before submitting.");
        return;
    }
    if (!formData.password) {
        alert("Please create a password to save your profile.");
        return;
    }

    let total = Object.values(answers).reduce((sum, val) => sum + val, 0);
    total += 20; // Baseline bump
    if (total > 100) total = 100;

    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setScoreData({ score: total, trackingId: `SMB-${randomCode}` });
    
    setStep(5);
    window.scrollTo(0,0);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        alert("This connects to the database. For demo, we will log you in to a mock profile.");
        
        const inputValue = e.target.querySelector('input').value;
        const generatedId = `SMB-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        const finalId = (inputValue && inputValue.toUpperCase().startsWith('SMB-')) ? inputValue.toUpperCase() : generatedId;

        setSelectedCountryObj({ name: "United Kingdom", flag: "🇬🇧" });
        setScoreData({ score: 85, trackingId: finalId });
        setFormData(prev => ({ ...prev, fname: "Jane", lname: "Doe" }));
        
        setCurrentView('dashboard');
        window.scrollTo(0,0);
    }, 800);
  };

  const getQuestionData = () => {
      let type = 'general';
      const c = selectedCountryObj?.name;
      if (c === 'Canada') type = 'canada';
      else if (c === 'United Kingdom' || c === 'Ireland') type = 'uk';
      else if (['Australia', 'New Zealand'].includes(c)) type = 'aus';
      return questionBank[type];
  };

  // Calendar Logic
  const generateCalendarDays = () => {
      const firstDay = new Date(currentYear, currentMonth, 1).getDay();
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const today = new Date();
      today.setHours(0,0,0,0);

      const days = [];
      for (let i = 0; i < firstDay; i++) days.push(null);
      
      for (let i = 1; i <= daysInMonth; i++) {
          const date = new Date(currentYear, currentMonth, i);
          const isPast = date < today;
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;
          days.push({ day: i, date, isDisabled: isPast || isWeekend });
      }
      return days;
  };

  const handleDateSelect = (dateObj) => {
    setSelectedDate(dateObj.date);
    setSelectedTime(null);
  };

  const confirmBooking = () => {
    setShowSuccessModal(true);
  };

  // Shared generic classes
  const cardClass = "bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm mb-6";
  const textClass = "font-bold text-gray-800 dark:text-gray-200 mb-4";

  return (
    <div className="py-6 md:py-10 px-4 bg-gray-50 dark:bg-slate-950 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      {/* Top Bar */}
      <div className="max-w-5xl mx-auto mb-8 flex items-center pt-4">
          <Link to="/" className="text-gray-500 dark:text-gray-400 font-bold hover:text-[#0b1136] dark:hover:text-blue-400 transition ml-auto"><i className="fas fa-arrow-left"></i> Back to Main Site</Link>
      </div>

      <div id="portal-card" className="max-w-5xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700 transition-colors duration-300">
          
          {/* LOGIN VIEW */}
          {currentView === 'login' && (
            <div className="p-8 md:p-16 max-w-lg mx-auto w-full">
              <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-blue-50 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 text-[#0b1136] dark:text-blue-400 text-3xl">
                      <i className="fas fa-user-lock"></i>
                  </div>
                  <h2 className="text-3xl font-black text-[#0b1136] dark:text-white">Client Login</h2>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">Access your saved visa application profile</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Tracking ID or Email</label>
                      <input type="text" required className="form-input" placeholder="SMB-XXXXXX or Email" />
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Password</label>
                      <input type="password" required className="form-input" placeholder="••••••••" />
                  </div>
                  <button type="submit" className="w-full bg-[#0b1136] hover:bg-blue-900 text-white py-3.5 rounded-xl font-bold transition shadow-lg mt-4">
                      Secure Login
                  </button>
                  <div className="text-center mt-6">
                      <p className="text-sm text-gray-600 dark:text-gray-400">No account yet? <br/> 
                          <button type="button" onClick={() => { setCurrentView('register'); setStep(0); }} className="text-[#b45309] dark:text-amber-500 font-bold hover:underline mt-2">Take the Free Risk Assessment</button>
                      </p>
                  </div>
              </form>
            </div>
          )}

          {/* ASSESSMENT / REGISTRATION VIEW */}
          {currentView === 'register' && (
            <div>
              <div className="bg-[#0b1136] dark:bg-slate-900 text-white p-6 md:p-8 text-center border-b-4 border-[#b45309] dark:border-amber-500">
                  <h2 className="text-2xl md:text-3xl font-black tracking-wide">Visa Eligibility Assessment</h2>
                  <p className="text-blue-200 mt-2 text-sm max-w-2xl mx-auto">Find out if you qualify for immigration pathways in minutes.</p>
              </div>

              {/* Progress Bar */}
              {(step > 0 && step < 5) && (
                <div className="px-8 py-6 flex justify-center items-center max-w-3xl mx-auto border-b border-gray-100 dark:border-slate-700">
                    <div className="flex items-center w-full">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center flex-grow last:flex-grow-0">
                                <div className="flex flex-col items-center">
                                    <div className={`step-indicator ${step > i ? 'completed' : step === i ? 'active' : ''}`}>
                                        {step > i ? <i className="fas fa-check text-xs"></i> : i}
                                    </div>
                                    <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 mt-2 font-bold uppercase tracking-wider hidden sm:block">
                                        {i === 1 ? 'Info' : i === 2 ? 'Country' : i === 3 ? 'Specifics' : 'General'}
                                    </span>
                                </div>
                                {i < 4 && <div className={`step-line ${step > i ? 'active' : ''}`}></div>}
                            </div>
                        ))}
                    </div>
                </div>
              )}

              <div className="p-6 md:p-12">
                  {/* STEP 0: Intro */}
                  {step === 0 && (
                    <div className="text-center py-10 animate-[fadeIn_0.4s_ease-in-out]">
                        <div className="w-24 h-24 bg-orange-50 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6 text-[#b45309] dark:text-amber-500 text-4xl">
                            <i className="fas fa-plane-departure"></i>
                        </div>
                        <h3 className="text-3xl font-black text-[#0b1136] dark:text-white mb-4">Ready to build your future?</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed text-lg">
                            This comprehensive questionnaire will analyze your current situation and capabilities to calculate your personalized <b>Points-Based Visa Eligibility Score</b>.
                        </p>
                        <button onClick={() => setStep(1)} className="bg-[#0b1136] hover:bg-blue-900 text-white px-12 py-4 rounded-full font-black tracking-widest uppercase transition shadow-lg shadow-blue-900/20">
                            Start Assessment
                        </button>
                        <div className="mt-10 pt-8 border-t border-gray-100 dark:border-slate-700">
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Already took the assessment?</p>
                            <button onClick={() => setCurrentView('login')} className="text-sm border-2 border-[#0b1136] dark:border-blue-400 text-[#0b1136] dark:text-blue-400 px-8 py-2.5 rounded-full font-bold hover:bg-blue-50 dark:hover:bg-slate-700 transition">
                                <i className="fas fa-sign-in-alt mr-2"></i> Client Login
                            </button>
                        </div>
                    </div>
                  )}

                  {/* STEP 1: Personal Info */}
                  {step === 1 && (
                    <div className="animate-[fadeIn_0.4s_ease-in-out] space-y-10">
                        <h3 className="text-2xl font-black text-center text-[#0b1136] dark:text-white">Tell us about yourself</h3>

                        {/* --- Position Applied --- */}
                        <div>
                          <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">*Position Applied:</label>
                          <textarea id="positionApplied" rows={3} className="form-input resize-none" placeholder="Enter the position(s) you want to apply for..." value={formData.positionApplied} onChange={handleInputChange}/>
                          <p className="text-xs text-gray-400 mt-1">Please enter at least (1) position you want to apply for; this will serve as our basis to send you job alerts and also to recommend you positions to apply based on our job openings.</p>
                        </div>

                        {/* --- Name Row --- */}
                        <div className="grid md:grid-cols-3 gap-6">
                          <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">*Last Name:</label>
                            <input type="text" id="lname" className="form-input" placeholder="Last Name" value={formData.lname} onChange={handleInputChange}/>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">*First Name:</label>
                            <input type="text" id="fname" className="form-input" placeholder="First Name" value={formData.fname} onChange={handleInputChange}/>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">*Middle Name:</label>
                            <input type="text" id="middleName" className="form-input" placeholder="Middle Name" value={formData.middleName} onChange={handleInputChange}/>
                          </div>
                        </div>

                        {/* --- Birth Date & Gender --- */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">*Birth Date:</label>
                            <div className="flex gap-2">
                              <select id="birthMonth" className="form-input" value={formData.birthMonth} onChange={handleInputChange}>
                                <option value="">Please select</option>
                                {["January","February","March","April","May","June","July","August","September","October","November","December"].map((m,i) => <option key={m} value={String(i+1).padStart(2,'0')}>{m}</option>)}
                              </select>
                              <input type="text" id="birthDay" className="form-input w-20 text-center" placeholder="DD" maxLength={2} value={formData.birthDay} onChange={handleInputChange}/>
                              <input type="text" id="birthYear" className="form-input w-24 text-center" placeholder="YYYY" maxLength={4} value={formData.birthYear} onChange={handleInputChange}/>
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Gender:</label>
                            <div className="flex items-center gap-6 pt-1">
                              {['Male','Female'].map(g => (
                                <label key={g} className="flex items-center gap-2 cursor-pointer">
                                  <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={() => setFormData(prev => ({...prev, gender: g}))} className="w-4 h-4 accent-[#0b1136]"/>
                                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{g}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* --- Height/Weight & Mobile/Landline --- */}
                        <div className="grid md:grid-cols-3 gap-6">
                          <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Height & Weight:</label>
                            <div className="flex gap-2">
                              <input type="text" id="heightCm" className="form-input" placeholder="Height (cm)" value={formData.heightCm} onChange={handleInputChange}/>
                              <input type="text" id="weightKg" className="form-input" placeholder="Weight (kg)" value={formData.weightKg} onChange={handleInputChange}/>
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">*Mobile No.:</label>
                            <input type="tel" id="phone" className="form-input" placeholder="Mobile No." value={formData.phone} onChange={(e) => { e.target.value = e.target.value.replace(/[^0-9+]/g, ''); handleInputChange(e); }}/>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Landline No.:</label>
                            <input type="tel" id="landline" className="form-input" placeholder="Landline No." value={formData.landline} onChange={handleInputChange}/>
                          </div>
                        </div>

                        {/* --- Email & Facebook --- */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">*Email Address:</label>
                            <input type="email" id="email" className="form-input" placeholder="Email Address" style={{borderColor: emailError ? '#ef4444' : (formData.email ? '#10b981' : '')}} value={formData.email} onChange={handleInputChange}/>
                            {emailError && <p className="text-xs text-red-500 font-bold mt-1">{emailError}</p>}
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Facebook Account:</label>
                            <input type="text" id="facebook" className="form-input" placeholder="Facebook profile URL or name" value={formData.facebook} onChange={handleInputChange}/>
                          </div>
                        </div>

                        {/* --- Province / City / Address --- */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">*Province:</label>
                            <select id="province" className="form-input" value={formData.province} onChange={handleInputChange}>
                              <option value="">Please select</option>
                              {["Abra","Agusan del Norte","Agusan del Sur","Aklan","Albay","Antique","Apayao","Aurora","Basilan","Bataan","Batanes","Batangas","Benguet","Biliran","Bohol","Bukidnon","Bulacan","Cagayan","Camarines Norte","Camarines Sur","Camiguin","Capiz","Catanduanes","Cavite","Cebu","Compostela Valley","Cotabato","Davao del Norte","Davao del Sur","Davao Occidental","Davao Oriental","Dinagat Islands","Eastern Samar","Guimaras","Ifugao","Ilocos Norte","Ilocos Sur","Iloilo","Isabela","Kalinga","La Union","Laguna","Lanao del Norte","Lanao del Sur","Leyte","Maguindanao","Marinduque","Masbate","Metro Manila","Misamis Occidental","Misamis Oriental","Mountain Province","Negros Occidental","Negros Oriental","Northern Samar","Nueva Ecija","Nueva Vizcaya","Occidental Mindoro","Oriental Mindoro","Palawan","Pampanga","Pangasinan","Quezon","Quirino","Rizal","Romblon","Samar","Sarangani","Siquijor","Sorsogon","South Cotabato","Southern Leyte","Sultan Kudarat","Sulu","Surigao del Norte","Surigao del Sur","Tarlac","Tawi-Tawi","Zambales","Zamboanga del Norte","Zamboanga del Sur","Zamboanga Sibugay"].map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">*City / Municipality:</label>
                            <input type="text" id="cityMunicipality" className="form-input" placeholder="Please select" value={formData.cityMunicipality} onChange={handleInputChange}/>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">*Complete Address:</label>
                          <input type="text" id="completeAddress" className="form-input" placeholder="No. / Street / Barangay" value={formData.completeAddress} onChange={handleInputChange}/>
                        </div>

                        {/* --- File Uploads --- */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Upload your Resume/Biodata:</label>
                            <label className="flex items-center gap-3 cursor-pointer border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl px-4 py-3 hover:border-[#0b1136] dark:hover:border-blue-400 transition">
                              <i className="fas fa-file-upload text-[#0b1136] dark:text-blue-400 text-lg"></i>
                              <span className="text-sm text-gray-500 dark:text-gray-400">Choose File</span>
                              <input type="file" accept=".pdf,.doc,.docx" className="hidden"/>
                            </label>
                            <p className="text-xs text-gray-400 mt-1">(Allowed File Type: PDF and MS Word only)</p>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Upload latest Photo:</label>
                            <label className="flex items-center gap-3 cursor-pointer border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl px-4 py-3 hover:border-[#b45309] dark:hover:border-amber-500 transition">
                              <i className="fas fa-image text-[#b45309] dark:text-amber-500 text-lg"></i>
                              <span className="text-sm text-gray-500 dark:text-gray-400">Choose File</span>
                              <input type="file" accept="image/*" className="hidden"/>
                            </label>
                            <p className="text-xs text-gray-400 mt-1">(taken recently within 3 months)</p>
                          </div>
                        </div>

                        {/* --- Education --- */}
                        <div>
                          <h4 className="text-lg font-black text-[#0b1136] dark:text-white mb-4 flex items-center gap-2"><i className="fas fa-graduation-cap text-[#b45309]"></i> Education</h4>
                          {educationList.length > 0 && (
                            <div className="space-y-2 mb-4">
                              {educationList.map((edu, i) => (
                                <div key={i} className="flex items-center justify-between bg-blue-50 dark:bg-slate-700 px-4 py-3 rounded-xl border border-blue-100 dark:border-slate-600">
                                  <div>
                                    <p className="font-bold text-sm text-[#0b1136] dark:text-white">{edu.school} <span className="font-normal text-gray-500">— {edu.level}</span></p>
                                    {edu.course && <p className="text-xs text-gray-500 dark:text-gray-400">{edu.course}</p>}
                                  </div>
                                  <button onClick={() => removeEducation(i)} className="text-red-400 hover:text-red-600 ml-4"><i className="fas fa-trash-alt"></i></button>
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="bg-gray-50 dark:bg-slate-800 p-5 rounded-2xl border border-gray-200 dark:border-slate-700 space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Level:</label>
                                <select name="level" className="form-input" value={currentEdu.level} onChange={handleEduChange}>
                                  <option value="">Please select</option>
                                  {["Elementary","High School","Senior High School","Vocational / Tech-Voc","Associate Degree","Bachelor's Degree","Master's Degree","Doctorate / Ph.D."].map(l => <option key={l} value={l}>{l}</option>)}
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Name of School:</label>
                                <input type="text" name="school" className="form-input" placeholder="School name" value={currentEdu.school} onChange={handleEduChange}/>
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Course:</label>
                              <input type="text" name="course" className="form-input" placeholder="Course / Strand" value={currentEdu.course} onChange={handleEduChange}/>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-end">
                              <div>
                                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Date From:</label>
                                <input type="text" name="dateFrom" className="form-input" placeholder="MM/DD/YYYY" value={currentEdu.dateFrom} onChange={handleEduChange}/>
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Date To:</label>
                                <input type="text" name="dateTo" className="form-input" placeholder="MM/DD/YYYY" value={currentEdu.dateTo} onChange={handleEduChange}/>
                              </div>
                              <div>
                                <button onClick={addEducation} className="w-full bg-[#0b1136] hover:bg-blue-900 text-white py-2.5 px-4 rounded-xl font-bold text-sm transition shadow-md">
                                  <i className="fas fa-plus mr-2"></i>Add education
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* --- Work History --- */}
                        <div>
                          <h4 className="text-lg font-black text-[#0b1136] dark:text-white mb-4 flex items-center gap-2"><i className="fas fa-briefcase text-[#b45309]"></i> Work History</h4>
                          {workHistoryList.length > 0 && (
                            <div className="space-y-2 mb-4">
                              {workHistoryList.map((w, i) => (
                                <div key={i} className="flex items-center justify-between bg-amber-50 dark:bg-slate-700 px-4 py-3 rounded-xl border border-amber-100 dark:border-slate-600">
                                  <div>
                                    <p className="font-bold text-sm text-[#0b1136] dark:text-white">{w.company} <span className="font-normal text-gray-500">— {w.position}</span></p>
                                    {w.country && <p className="text-xs text-gray-500 dark:text-gray-400">{w.country}</p>}
                                  </div>
                                  <button onClick={() => removeWork(i)} className="text-red-400 hover:text-red-600 ml-4"><i className="fas fa-trash-alt"></i></button>
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="bg-gray-50 dark:bg-slate-800 p-5 rounded-2xl border border-gray-200 dark:border-slate-700 space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Company Name:</label>
                                <input type="text" name="company" className="form-input" placeholder="Company Name" value={currentWork.company} onChange={handleWorkChange}/>
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Position:</label>
                                <input type="text" name="position" className="form-input" placeholder="Position / Job Title" value={currentWork.position} onChange={handleWorkChange}/>
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Job Description:</label>
                              <textarea name="description" rows={3} className="form-input resize-none" placeholder="Brief description of responsibilities..." value={currentWork.description} onChange={handleWorkChange}/>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
                              <div>
                                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Country:</label>
                                <input type="text" name="country" className="form-input" value={currentWork.country} onChange={handleWorkChange}/>
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Date From:</label>
                                <input type="text" name="dateFrom" className="form-input" placeholder="MM/DD/YYYY" value={currentWork.dateFrom} onChange={handleWorkChange}/>
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Date To:</label>
                                <input type="text" name="dateTo" className="form-input" placeholder="MM/DD/YYYY" value={currentWork.dateTo} onChange={handleWorkChange}/>
                              </div>
                              <div>
                                <button onClick={addWork} className="w-full bg-[#b45309] hover:bg-amber-700 text-white py-2.5 px-4 rounded-xl font-bold text-sm transition shadow-md">
                                  <i className="fas fa-plus mr-2"></i>Add work history
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* --- How did you find us & Terms --- */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">How did you find us?</label>
                            <select id="referral" className="form-input" value={formData.referral} onChange={handleInputChange}>
                              <option>Social Media</option><option>Friend/Relative</option><option>Google Search</option><option>Event</option>
                            </select>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 dark:border-slate-700">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" id="terms" className="w-5 h-5 text-[#0b1136] rounded border-gray-300 focus:ring-[#0b1136]" checked={formData.terms} onChange={handleInputChange}/>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">I agree to the <Link to="/terms" target="_blank" className="text-[#0b1136] dark:text-blue-400 hover:underline">Terms & Conditions</Link> and Data Privacy Policy. *</span>
                          </label>
                        </div>

                        <div className="flex justify-between items-center">
                          <button onClick={() => setStep(0)} className="text-sm font-bold text-gray-500 hover:text-[#0b1136] dark:hover:text-blue-400 px-6 py-2 transition"><i className="fas fa-arrow-left mr-2"></i> BACK</button>
                          <button onClick={() => handleNextStep(2)} className="bg-[#0b1136] hover:bg-blue-900 text-white px-8 py-3 rounded-full font-bold transition shadow-md">NEXT STEP <i className="fas fa-arrow-right ml-2"></i></button>
                        </div>
                    </div>
                  )}

                  {/* STEP 2: Country Selection */}
                  {step === 2 && (
                    <div className="animate-[fadeIn_0.4s_ease-in-out]">
                        <h3 className="text-2xl font-black text-center text-[#0b1136] dark:text-white mb-2">Select your destination</h3>
                        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">Where are you planning to migrate, study, or work?</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {countriesList.map((c, i) => (
                                <div key={i} onClick={() => setSelectedCountryObj(c)} className={`country-select-card py-6 px-2 flex flex-col items-center justify-center ${selectedCountryObj?.name === c.name ? 'selected' : ''}`}>
                                    <div className="text-4xl mb-3 drop-shadow-sm">{c.flag}</div>
                                    <p className="font-bold text-xs text-center text-gray-800 dark:text-gray-200">{c.name}</p>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-10 flex justify-between items-center pt-6 border-t border-gray-100 dark:border-slate-700">
                            <button onClick={() => handleNextStep(1)} className="text-sm font-bold text-gray-500 hover:text-[#0b1136] dark:hover:text-blue-400 px-6 py-2 transition"><i className="fas fa-arrow-left mr-2"></i> BACK</button>
                            <button onClick={() => handleNextStep(3)} className="bg-[#0b1136] hover:bg-blue-900 text-white px-8 py-3 rounded-full font-bold transition shadow-md">NEXT STEP <i className="fas fa-arrow-right ml-2"></i></button>
                        </div>
                    </div>
                  )}

                  {/* STEP 3: Dynamic Country Questions */}
                  {step === 3 && selectedCountryObj && (
                    <div className="animate-[fadeIn_0.4s_ease-in-out]">
                        <h3 className="text-2xl font-black text-center text-[#0b1136] dark:text-white mb-2">Great choice, {formData.fname || 'there'}!</h3>
                        <p className="text-center text-gray-500 dark:text-gray-400 mb-8 text-sm">We'll ask specific questions based on <b className="text-[#0b1136] dark:text-blue-400">{selectedCountryObj.name}'s</b> immigration criteria.</p>
                        
                        <div className="space-y-6">
                            {getQuestionData().step3.map(q => (
                                <div key={q.id} className={cardClass}>
                                    <p className={textClass}>{q.text}</p>
                                    {q.opts.map((opt, i) => (
                                        <label key={i} className="block">
                                            <input type="radio" name={q.id} value={opt.v} className="hidden" checked={answers[q.id] === opt.v} onChange={(e) => handleAnswerSelect(q.id, e.target.value)} />
                                            <span className="radio-card">{opt.l}</span>
                                        </label>
                                    ))}
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-10 flex justify-between items-center pt-6 border-t border-gray-100 dark:border-slate-700">
                            <button onClick={() => handleNextStep(2)} className="text-sm font-bold text-gray-500 hover:text-[#0b1136] dark:hover:text-blue-400 px-6 py-2 transition"><i className="fas fa-arrow-left mr-2"></i> BACK</button>
                            <button onClick={() => handleNextStep(4)} className="bg-[#0b1136] hover:bg-blue-900 text-white px-8 py-3 rounded-full font-bold transition shadow-md">NEXT STEP <i className="fas fa-arrow-right ml-2"></i></button>
                        </div>
                    </div>
                  )}

                  {/* STEP 4: General Questions & Finish */}
                  {step === 4 && (
                    <div className="animate-[fadeIn_0.4s_ease-in-out]">
                        <h3 className="text-2xl font-black text-center text-[#0b1136] dark:text-white mb-8">Finalizing your profile</h3>
                        
                        <div className="space-y-6">
                            {getQuestionData().step4.map(q => (
                                <div key={q.id} className={cardClass}>
                                    <p className={textClass}>{q.text}</p>
                                    {q.opts.map((opt, i) => (
                                        <label key={i} className="block">
                                            <input type="radio" name={q.id} value={opt.v} className="hidden" checked={answers[q.id] === opt.v} onChange={(e) => handleAnswerSelect(q.id, e.target.value)} />
                                            <span className="radio-card">{opt.l}</span>
                                        </label>
                                    ))}
                                </div>
                            ))}
                        </div>

                        <div className="bg-blue-50 dark:bg-slate-700/50 p-6 md:p-8 rounded-2xl border border-blue-100 dark:border-slate-600 mt-8">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-[#0b1136] rounded-full text-white flex items-center justify-center flex-shrink-0"><i className="fas fa-lock"></i></div>
                                <div className="w-full">
                                    <p className="font-black text-[#0b1136] dark:text-white mb-1">Create Account Password</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Set a password to securely access your score and track your application later.</p>
                                    <input type="password" id="password" className="form-input max-w-md" placeholder="Enter secure password" value={formData.password} onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 flex justify-between items-center pt-6 border-t border-gray-100 dark:border-slate-700">
                            <button onClick={() => handleNextStep(3)} className="text-sm font-bold text-gray-500 hover:text-[#0b1136] dark:hover:text-blue-400 px-6 py-2 transition"><i className="fas fa-arrow-left mr-2"></i> BACK</button>
                            <button onClick={submitAssessment} className="bg-[#b45309] hover:bg-amber-700 text-white px-10 py-4 rounded-full font-black tracking-widest uppercase transition shadow-xl">SUBMIT ASSESSMENT</button>
                        </div>
                    </div>
                  )}

                  {/* STEP 5: Success */}
                  {step === 5 && (
                    <div className="text-center py-10 md:py-16 animate-[fadeIn_0.4s_ease-in-out]">
                        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="fas fa-check text-5xl text-green-500"></i>
                        </div>
                        <h3 className="text-3xl font-black text-[#0b1136] dark:text-white mb-4">Assessment Complete!</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto text-lg">Your responses have been analyzed. Your unique applicant profile and Eligibility Score are ready.</p>
                        
                        <button onClick={() => {setCurrentView('dashboard'); window.scrollTo(0,0);}} className="bg-[#0b1136] hover:bg-blue-900 text-white px-12 py-4 rounded-full font-black uppercase tracking-widest transition shadow-lg animate-pulse">
                            View My Score
                        </button>
                    </div>
                  )}

              </div>
            </div>
          )}

          {/* DASHBOARD VIEW */}
          {currentView === 'dashboard' && (
            <div className="p-6 md:p-12">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                  <div>
                      <h2 className="text-3xl font-black text-[#0b1136] dark:text-white">My Dashboard</h2>
                      <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">Application Overview & Results</p>
                  </div>
                  <button onClick={() => { setCurrentView('login'); setFormData({fname:'', lname:'', email:'', password:''}); setStep(0); }} className="text-sm font-bold border border-red-200 text-red-500 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:border-red-500/20 px-4 py-2 rounded-lg transition">Secure Logout</button>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                  {/* User Card */}
                  <div className="bg-white dark:bg-slate-700 rounded-3xl p-8 shadow-sm border-t-8 border-[#b45309] flex flex-col items-center justify-center text-center">
                      <div className="w-24 h-24 bg-blue-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-3xl font-black text-[#0b1136] dark:text-blue-400 mb-4">
                          {(formData.fname.charAt(0) + formData.lname.charAt(0)).toUpperCase() || "JD"}
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1">
                          {formData.fname} {formData.lname}
                      </h3>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-8">Registered Client</p>
                      
                      <div className="bg-[#0b1136] dark:bg-slate-800 w-full p-5 rounded-2xl border border-gray-100 dark:border-slate-600">
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-1 font-bold uppercase tracking-widest">Tracking ID</p>
                          <p className="text-xl md:text-2xl font-mono font-black text-white">{scoreData.trackingId}</p>
                      </div>
                  </div>

                  {/* Score Card */}
                  <div className="lg:col-span-2 bg-[#0b1136] rounded-3xl p-8 md:p-10 shadow-xl text-white relative overflow-hidden">
                      <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 pointer-events-none"></div>
                      <div className="absolute left-0 bottom-0 w-48 h-48 bg-[#b45309]/10 rounded-full -ml-20 -mb-20 pointer-events-none"></div>
                      
                      <h3 className="text-xs md:text-sm font-bold text-blue-300 uppercase tracking-widest mb-6 relative z-10">System Assessment Result</h3>
                      
                      <div className="flex items-end gap-4 md:gap-6 mb-8 relative z-10">
                          <div className="text-7xl md:text-8xl font-black text-[#b45309] leading-none">{displayedScore}</div>
                          <div className="pb-2 text-lg md:text-xl font-medium text-blue-200 uppercase tracking-wider">/ 100 Points</div>
                      </div>

                      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 relative z-10">
                          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3 gap-2">
                              <span className="font-bold text-lg">Status: 
                                  <span className={`uppercase tracking-wide ml-2 ${scoreData.score >= 80 ? 'text-green-400' : scoreData.score >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
                                      {scoreData.score >= 80 ? 'Highly Eligible' : scoreData.score >= 50 ? 'Needs Review' : 'Consultation Required'}
                                  </span>
                              </span>
                              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg w-fit">
                                  <span className="text-2xl">{selectedCountryObj?.flag}</span>
                                  <span className="font-bold">{selectedCountryObj?.name}</span>
                              </div>
                          </div>
                          <p className="text-sm text-blue-100 leading-relaxed">
                              {scoreData.score >= 80 
                                ? `Based on your responses, you have a very strong profile for ${selectedCountryObj?.name}. Please book an appointment to formalize your path with our legal team.`
                                : scoreData.score >= 50 
                                  ? `You have potential for ${selectedCountryObj?.name}, but we need to address a few areas to maximize your chances. Book a consultation to explore alternatives.`
                                  : `Based on current points, direct entry to ${selectedCountryObj?.name} might be challenging. However, there are alternative pathways (like study-to-work). Let's discuss your options.`}
                          </p>
                      </div>
                      
                      <button onClick={() => { setCurrentView('booking'); window.scrollTo(0,0); }} className="mt-8 w-full bg-white hover:bg-gray-100 text-[#0b1136] py-4 rounded-xl font-black uppercase tracking-widest shadow-lg transition relative z-10 text-sm md:text-base">
                          <i className="fas fa-calendar-alt mr-2"></i> Book Formal Consultation
                      </button>
                  </div>
              </div>
            </div>
          )}

          {/* BOOKING VIEW */}
          {currentView === 'booking' && (
            <div className="p-6 md:p-12 relative">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                  <div>
                      <button onClick={() => setCurrentView('dashboard')} className="text-[#0b1136] dark:text-blue-400 font-bold mb-2 hover:underline flex items-center gap-1"><i className="fas fa-arrow-left"></i> Back to Dashboard</button>
                      <h2 className="text-3xl font-black text-[#0b1136] dark:text-white">Schedule Consultation</h2>
                      <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">Select an available date and time for your legal review.</p>
                  </div>
              </div>

              <div className="bg-white dark:bg-slate-700 rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100 dark:border-slate-600 max-w-4xl mx-auto">
                  <div className="grid md:grid-cols-2 gap-10">
                      
                      {/* Calendar Section */}
                      <div>
                          <div className="flex justify-between items-center mb-6">
                              <button onClick={() => {
                                  let newM = currentMonth - 1; let newY = currentYear;
                                  if (newM < 0) { newM = 11; newY--; }
                                  setCurrentMonth(newM); setCurrentYear(newY);
                              }} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-600 flex items-center justify-center text-gray-600 dark:text-gray-200 hover:bg-[#0b1136] hover:text-white transition"><i className="fas fa-chevron-left"></i></button>
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{months[currentMonth]} {currentYear}</h3>
                              <button onClick={() => {
                                  let newM = currentMonth + 1; let newY = currentYear;
                                  if (newM > 11) { newM = 0; newY++; }
                                  setCurrentMonth(newM); setCurrentYear(newY);
                              }} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-600 flex items-center justify-center text-gray-600 dark:text-gray-200 hover:bg-[#0b1136] hover:text-white transition"><i className="fas fa-chevron-right"></i></button>
                          </div>
                          <div className="grid grid-cols-7 gap-1 text-center mb-2">
                              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d} className="text-xs font-bold text-gray-400">{d}</div>)}
                          </div>
                          <div className="grid grid-cols-7 gap-1 text-center">
                              {generateCalendarDays().map((d, i) => {
                                  if (!d) return <div key={`empty-${i}`}></div>;
                                  const isSelected = selectedDate && d.date.getTime() === selectedDate.getTime();
                                  return (
                                      <button 
                                          key={i} 
                                          disabled={d.isDisabled}
                                          onClick={() => handleDateSelect(d)}
                                          className={`w-8 h-8 md:w-10 md:h-10 mx-auto rounded-full flex items-center justify-center text-sm font-medium transition
                                            ${d.isDisabled ? "text-gray-400 dark:text-gray-600 cursor-not-allowed" : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-slate-600 cursor-pointer"}
                                            ${isSelected ? "bg-[#0b1136] text-white dark:bg-blue-500 dark:text-white shadow-md" : ""}
                                          `}
                                      >
                                          {d.day}
                                      </button>
                                  )
                              })}
                          </div>
                      </div>

                      {/* Time Slots & Confirmation */}
                      <div className="flex flex-col border-t md:border-t-0 md:border-l border-gray-100 dark:border-slate-600 pt-8 md:pt-0 md:pl-10">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Available Time Slots</h3>
                          <div className="grid grid-cols-2 gap-3 mb-8">
                              {!selectedDate ? (
                                  <p className="text-sm text-gray-500 col-span-2 italic">Please select a date on the calendar first.</p>
                              ) : (
                                  availableTimeSlots.map(time => (
                                      <button 
                                          key={time}
                                          onClick={() => setSelectedTime(time)}
                                          className={`py-2 px-4 rounded-lg border text-sm font-bold transition
                                            ${selectedTime === time ? "bg-[#0b1136] text-white border-[#0b1136] dark:bg-blue-500 dark:border-blue-500" : "border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 hover:border-[#0b1136] dark:hover:border-blue-400"}
                                          `}
                                      >
                                          {time}
                                      </button>
                                  ))
                              )}
                          </div>
                          
                          <div className="mt-auto">
                              <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-xl border border-gray-200 dark:border-slate-600 mb-6">
                                  <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold mb-1">Selected Schedule</p>
                                  <p className="font-bold text-[#0b1136] dark:text-blue-400">
                                      {selectedDate && selectedTime ? `${months[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()} at ${selectedTime}` : "None selected"}
                                  </p>
                              </div>
                              <button 
                                  onClick={confirmBooking} 
                                  disabled={!selectedDate || !selectedTime}
                                  className={`w-full bg-[#b45309] hover:bg-amber-700 text-white py-4 rounded-xl font-black uppercase tracking-widest shadow-lg transition ${(!selectedDate || !selectedTime) ? 'opacity-50 cursor-not-allowed' : ''}`}
                              >
                                  Confirm Appointment
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
              
              {/* BOOKING SUCCESS MODAL */}
              {showSuccessModal && (
                <div className="fixed inset-0 bg-[#0b1136]/80 backdrop-blur-sm z-50 flex items-center justify-center px-4">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 max-w-md w-full text-center shadow-2xl animate-[fadeIn_0.3s_ease-out]">
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="fas fa-check text-4xl text-green-500"></i>
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Booking Confirmed!</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">Your formal consultation has been scheduled for:</p>
                        <div className="bg-blue-50 dark:bg-slate-700 p-4 rounded-xl border border-blue-100 dark:border-slate-600 mb-8 inline-block w-full">
                            <p className="font-bold text-[#0b1136] dark:text-blue-400 text-lg">
                                {months[selectedDate.getMonth()]} {selectedDate.getDate()}, {selectedDate.getFullYear()} @ {selectedTime}
                            </p>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">We have sent a calendar invitation and a secure meeting link to your email address.</p>
                        <button onClick={() => { setShowSuccessModal(false); setCurrentView('dashboard'); }} className="w-full bg-[#0b1136] hover:bg-blue-900 text-white py-3 rounded-xl font-bold transition shadow-md">
                            Return to Dashboard
                        </button>
                    </div>
                </div>
              )}
            </div>
          )}

      </div>
    </div>
  );
}
