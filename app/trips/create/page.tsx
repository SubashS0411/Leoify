'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { ArrowLeft, UserPlus, Phone, Calendar, Search, MapPin, CheckCircle, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CreateTripFlow() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); 
  
  // Trip State
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  
  // Mock contacts
  const contacts = [
    { id: '1', name: 'Mom', phone: '(555) 123-4567', relationship: 'Parent' },
    { id: '2', name: 'John Doe', phone: '(555) 987-6543', relationship: 'Spouse' },
    { id: '3', name: 'Alice Smith', phone: '(555) 555-5555', relationship: 'Friend' },
  ];

  const nextStep = () => {
    if (step < 3) {
      setDirection(1);
      setStep((prev) => prev + 1);
    } else {
      // Complete trip creation
      // Would save to Firestore here:
      // await addDoc(collection(db, 'trips'), {...})
      router.push('/profile');
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setDirection(-1);
      setStep((prev) => prev - 1);
    } else {
      router.back();
    }
  };
  
  const toggleContact = (id: string) => {
    setSelectedContacts(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      z: 1,
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      z: 0,
      x: dir < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <div className="flex-1 flex flex-col h-full w-full bg-background-light dark:bg-background-dark pb-safe">
      <header className="px-4 flex items-center justify-between h-16 shrink-0 relative z-10 border-b border-slate-200 dark:border-slate-800">
        <button onClick={prevStep} className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <ArrowLeft size={24} className="text-slate-700 dark:text-slate-300" />
        </button>
        <span className="font-bold text-lg text-slate-800 dark:text-white">
          {step === 1 && "Trip Details"}
          {step === 2 && "Emergency Contacts"}
          {step === 3 && "Review"}
        </span>
        <div className="w-10"></div>
      </header>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 relative z-10">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: '33%' }}
          animate={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
            className="absolute inset-0 p-6 overflow-y-auto"
          >
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Where are you heading?</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Give your trip a name to easily identify it later.</p>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Trip Title / Destination</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="e.g., Solo trip to Yosemite"
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary shadow-sm transition-all"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col gap-2 flex-1">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Start Date</label>
                    <div className="relative">
                       <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                       <input 
                         type="date" 
                         className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                         value={startDate}
                         onChange={(e) => setStartDate(e.target.value)}
                       />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">End Date</label>
                    <div className="relative">
                       <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                       <input 
                         type="date" 
                         className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                         value={endDate}
                         onChange={(e) => setEndDate(e.target.value)}
                       />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Emergency Contacts */}
            {step === 2 && (
              <div className="flex flex-col gap-6">
                 <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Emergency Contacts</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Who should we notify if you trigger an SOS?</p>
                </div>

                <div className="flex flex-col gap-3 mt-2">
                  {contacts.map((contact) => {
                    const isSelected = selectedContacts.includes(contact.id);
                    return (
                      <div 
                        key={contact.id} 
                        onClick={() => toggleContact(contact.id)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                          isSelected ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isSelected ? 'bg-primary text-black' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                            <Phone size={18} />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-800 dark:text-white text-base">{contact.name}</span>
                            <span className="text-xs text-slate-500 uppercase">{contact.relationship} • {contact.phone}</span>
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-primary bg-primary' : 'border-slate-300 dark:border-slate-700'}`}>
                           {isSelected && <CheckCircle size={16} className="text-black" />}
                        </div>
                      </div>
                    );
                  })}

                  <button className="flex items-center justify-center gap-2 py-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-slate-500 hover:text-primary hover:border-primary transition-colors hover:bg-primary/5 font-semibold text-sm mt-2">
                    <UserPlus size={18} />
                    Add New Contact
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Review Trip</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Everything looks good?</p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                     <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-full">
                       <MapPin size={24} className="text-primary" />
                     </div>
                     <div className="flex flex-col flex-1">
                        <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Destination</span>
                        <span className="text-lg font-bold text-slate-800 dark:text-white leading-tight mt-1">{title || 'Unnamed Trip'}</span>
                        <span className="text-sm text-slate-500 mt-1">{startDate} to {endDate || 'undefined'}</span>
                     </div>
                  </div>
                  
                  <div className="h-px w-full bg-slate-200 dark:bg-slate-800 my-2"></div>

                  {/* Planned Path & Map Representation */}
                  <div className="flex flex-col gap-3">
                    <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Planned Path Preview</span>
                    <div className="relative bg-slate-50 dark:bg-slate-950/60 rounded-xl p-4 border border-slate-100 dark:border-slate-800/80 overflow-hidden">
                      {/* Stylized background grid pattern */}
                      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1.5px,transparent_1.5px)] [background-size:16px_16px] opacity-40"></div>
                      
                      <div className="relative z-10 flex flex-col gap-4">
                        {/* Interactive Visual Map Line */}
                        <div className="flex items-center justify-between relative px-2 py-4">
                          {/* Main background dashed path */}
                          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 border-t-2 border-dashed border-slate-300 dark:border-slate-700"></div>
                          {/* Animated primary progress line path */}
                          <motion.div 
                            className="absolute left-6 top-1/2 -translate-y-1/2 h-0.5 bg-primary origin-left"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                          />
                          
                          {/* Start Point */}
                          <div className="flex flex-col items-center relative z-10">
                            <motion.div 
                              className="w-8 h-8 bg-white dark:bg-slate-800 rounded-full border-2 border-primary flex items-center justify-center shadow-sm"
                              whileHover={{ scale: 1.1 }}
                            >
                              <div className="w-3 h-3 bg-primary rounded-full animate-ping absolute"></div>
                              <div className="w-3 h-3 bg-primary rounded-full relative z-20"></div>
                            </motion.div>
                            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-1 whitespace-nowrap">Current PING</span>
                          </div>

                          {/* Planned Route Progress Indicator (Center Checkpoint) */}
                          <div className="flex flex-col items-center relative z-10">
                            <motion.div 
                              className="w-7 h-7 bg-white dark:bg-slate-800 rounded-full border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center shadow-sm"
                              initial={{ borderColor: 'rgba(203, 213, 225, 1)' }}
                              animate={{ borderColor: '#13ec6a' }}
                              transition={{ delay: 0.7, duration: 0.5 }}
                            >
                              <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M5 13l4 4L19 7"></path></svg>
                            </motion.div>
                            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-1 whitespace-nowrap">Checkpoint</span>
                          </div>

                          {/* End Destination node */}
                          <div className="flex flex-col items-center relative z-10">
                            <motion.div 
                              className="w-8 h-8 bg-white dark:bg-slate-800 rounded-full border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center shadow-md animate-pulse"
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1, borderColor: '#13ec6a' }}
                              transition={{ type: 'spring', delay: 1.2 }}
                            >
                              <MapPin size={15} className="text-primary fill-primary/10" />
                            </motion.div>
                            <span className="text-[10px] font-bold text-slate-800 dark:text-white mt-1 whitespace-nowrap max-w-[80px] overflow-hidden text-ellipsis">{title || 'Destination'}</span>
                          </div>
                        </div>

                        {/* Interactive mini elevation map visual */}
                        <div className="h-12 flex items-end justify-between px-2 gap-1 overflow-hidden pointer-events-none relative pt-2">
                          <div className="absolute top-0 left-2 text-[9px] font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1">
                             Simulated Elevation Tracking
                          </div>
                          {[20, 25, 45, 60, 30, 25, 40, 55, 75, 90, 60, 40, 30, 50, 70, 85, 35, 10].map((height, idx) => (
                            <motion.div 
                              key={idx}
                              className="bg-primary/20 rounded-t w-full"
                              initial={{ height: 0 }}
                              animate={{ height: `${height}%` }}
                              transition={{ delay: 0.05 * idx, duration: 0.4 }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="h-px w-full bg-slate-200 dark:bg-slate-800 my-2"></div>

                  <div className="flex flex-col gap-3">
                    <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Selected Contacts</span>
                    {selectedContacts.length === 0 ? (
                      <span className="text-sm text-amber-600 flex items-center gap-1"><ShieldAlert size={16}/> No contacts selected for this trip!</span>
                    ) : (
                      <div className="flex flex-col gap-2">
                        {contacts.filter(c => selectedContacts.includes(c.id)).map(c => (
                          <div key={c.id} className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                            • {c.name} <span className="text-slate-400 font-normal">({c.relationship})</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-6 shrink-0 z-20">
        <button 
          onClick={nextStep}
          disabled={step === 1 && (!title || !startDate)}
          className="w-full bg-primary disabled:opacity-50 hover:bg-[#0fa64d] text-block font-bold py-4 rounded-xl shadow-md active:scale-[0.98] transition-all"
        >
          {step === 3 ? 'Create Trip' : 'Continue'}
        </button>
      </div>
    </div>
  );
}
