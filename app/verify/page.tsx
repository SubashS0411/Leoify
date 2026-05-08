'use client';

import Link from 'next/link';
import { ArrowLeft, ScanFace, Calendar, UserPlus, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';

export default function VerifyPage() {
  const router = useRouter();

  return (
    <div className="flex-1 flex flex-col w-full h-full">
      <div className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm transition-colors duration-300 pt-12">
        <div className="flex items-center p-4 pb-2 justify-between">
          <button onClick={() => router.back()} className="text-slate-900 dark:text-white flex w-10 h-10 shrink-0 items-center justify-center rounded-full active:bg-slate-200 dark:active:bg-white/10 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">
            Verification
          </h2>
        </div>
        
        <div className="flex flex-col gap-2 px-6 pb-4">
          <div className="flex justify-between items-center">
            <p className="text-slate-900 dark:text-white text-xs font-semibold uppercase tracking-wider">Step 1 of 3</p>
            <p className="text-primary text-xs font-bold">33%</p>
          </div>
          <div className="h-1.5 w-full bg-slate-200 dark:bg-surface-dark rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '33%' }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-primary rounded-full"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col px-6 pb-32 pt-2 overflow-y-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-bold leading-tight mb-2">Let&apos;s get you verified</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            We need to verify your identity to ensure rapid response in emergencies. Your data is encrypted.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8 group">
          <label className="block text-sm font-semibold mb-3 ml-1 text-slate-700 dark:text-slate-300">Identity Document</label>
          <button className="w-full relative overflow-hidden rounded-2xl border-2 border-dashed border-primary/40 bg-surface-light dark:bg-surface-dark hover:bg-primary/5 dark:hover:bg-surface-dark/80 transition-all duration-300 p-8 flex flex-col items-center justify-center gap-4 text-center group-active:scale-[0.98]">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-1">
              <ScanFace size={32} />
            </div>
            <div className="flex flex-col gap-1 z-10">
              <span className="text-base font-bold">Scan Passport or ID</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Tap to open camera</span>
            </div>
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
          <label className="block text-sm font-semibold mb-3 ml-1 text-slate-700 dark:text-slate-300">Trip Timeline</label>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={18} className="text-slate-400" />
              </div>
              <input 
                type="text" 
                placeholder="Start Date" 
                onFocus={(e) => e.target.type = 'date'}
                onBlur={(e) => e.target.type = 'text'}
                className="w-full bg-surface-light dark:bg-surface-dark border-0 rounded-xl py-3.5 pl-10 pr-4 text-sm font-medium ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-shadow appearance-none" 
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={18} className="text-slate-400" />
              </div>
              <input 
                type="text" 
                placeholder="End Date" 
                onFocus={(e) => e.target.type = 'date'}
                onBlur={(e) => e.target.type = 'text'}
                className="w-full bg-surface-light dark:bg-surface-dark border-0 rounded-xl py-3.5 pl-10 pr-4 text-sm font-medium ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-shadow appearance-none" 
              />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-6">
          <div className="flex justify-between items-end mb-3 ml-1">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Emergency Contacts</label>
          </div>
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-colors group">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <UserPlus size={20} />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Add Contact</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Select from phonebook</p>
              </div>
            </div>
            <ArrowRight size={20} className="text-slate-400 group-hover:text-primary transition-colors" />
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex items-center justify-center gap-2 mt-4 opacity-70">
          <Lock size={12} className="text-slate-500 dark:text-slate-400" />
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Your information is securely encrypted.</p>
        </motion.div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-6 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark pt-12 pb-safe">
        <Link href="/home" className="w-full bg-primary hover:bg-primary/90 active:scale-[0.99] text-text-main font-bold text-base py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
          <span>Continue</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
