'use client';

import Link from 'next/link';
import { ShieldAlert, Plus, Map, User, Bell } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark pb-safe">
      <header className="px-6 pt-8 pb-4 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mt-2">SafeTravel</h1>
          <p className="text-slate-500 font-medium">Ready for your next adventure.</p>
        </div>
        <Link 
          href="/profile" 
          className="w-12 h-12 bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors"
        >
          <User size={24} />
        </Link>
      </header>

      <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/trips/create" className="col-span-2">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-primary text-black rounded-3xl p-6 shadow-sm flex flex-col justify-between h-40 border border-transparent hover:border-black/10"
            >
              <div className="bg-black/10 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm">
                 <Plus size={24} />
              </div>
              <div>
                <h3 className="font-bold text-xl">Create New Trip</h3>
                <p className="text-black/70 text-sm font-medium">Plan your journey & setup contacts</p>
              </div>
            </motion.div>
          </Link>

          <Link href="/profile">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm flex flex-col justify-between h-40"
            >
              <div className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                 <Map size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Trip History</h3>
                <p className="text-slate-500 text-xs mt-1">Export to Sheets & Gmail</p>
              </div>
            </motion.div>
          </Link>

          <Link href="/sos">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-3xl p-5 shadow-sm flex flex-col justify-between h-40"
            >
              <div className="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center mb-4 shadow-sm shadow-red-500/40">
                 <ShieldAlert size={20} />
              </div>
              <div>
                <h3 className="font-bold text-red-900 dark:text-red-400">Emergency</h3>
                <p className="text-red-700/70 dark:text-red-400/70 text-xs mt-1">Activate SOS mode</p>
              </div>
            </motion.div>
          </Link>
        </div>
        
        {/* Recent Activity / Status */}
        <div className="mt-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
           <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse blur-[1px]"></div>
              <h3 className="font-bold text-slate-800 dark:text-white">All systems online</h3>
           </div>
           <p className="text-slate-500 text-sm">Your emergency contacts are configured and workspace integrations are active. Ready when you are!</p>
        </div>
      </div>
    </div>
  );
}
