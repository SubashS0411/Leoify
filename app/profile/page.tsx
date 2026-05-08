'use client';

import { BottomNav } from '@/components/BottomNav';
import { ArrowLeft, Edit2, ChevronRight, User as UserIcon, Building2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark pb-20 relative overflow-hidden">
      <div className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 pt-12 pb-2 border-b border-gray-200 dark:border-gray-800">
        <button onClick={() => router.back()} className="flex w-10 h-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">Profile & Settings</h2>
      </div>

      <div className="flex-1 overflow-y-auto pb-4">
        {/* Profile Header */}
        <div className="flex flex-col items-center pt-6 pb-8 px-4">
          <div className="relative group cursor-pointer">
            <div className="relative rounded-full h-28 w-28 shadow-lg ring-4 ring-white dark:ring-surface-dark transition-transform group-hover:scale-105 overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop" 
                alt="Alex Wanderer"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-primary text-black rounded-full p-1.5 shadow-md flex items-center justify-center h-8 w-8">
              <Edit2 size={16} />
            </div>
          </div>
          <div className="mt-4 text-center">
            <h1 className="text-2xl font-bold tracking-tight">Alex Wanderer</h1>
            <div className="flex items-center justify-center gap-1.5 mt-1 bg-surface-light dark:bg-surface-dark px-3 py-1 rounded-full shadow-sm w-max mx-auto">
              <span className="text-lg">🇺🇸</span>
              <span className="text-sm font-medium text-subtext-light dark:text-subtext-dark">United States</span>
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div className="px-4 mb-8">
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-sm font-bold text-subtext-light dark:text-subtext-dark tracking-wider uppercase opacity-70">Medical Information</h3>
            <button className="text-primary text-sm font-medium hover:text-primary/80 transition-colors">Edit</button>
          </div>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-4 bg-primary/10 dark:bg-primary/5 rounded-xl p-4 flex flex-col items-center justify-center border border-primary/20 relative overflow-hidden group min-h-[100px]">
              <div className="absolute -right-4 -top-4 bg-primary/10 w-16 h-16 rounded-full group-hover:scale-110 transition-transform"></div>
              <div className="text-primary mb-1">
                {/* Custom blood drop icon representation */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/><path d="M12 12v4"/><path d="M10 14h4"/></svg>
              </div>
              <p className="text-xs font-medium opacity-70">Blood Type</p>
              <p className="text-2xl font-bold mt-0.5">O+</p>
            </div>
            <div className="col-span-8 bg-surface-light dark:bg-surface-dark rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-center min-h-[100px]">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                </div>
                <div>
                  <p className="text-xs font-medium opacity-60">Allergies</p>
                  <p className="text-balance font-semibold mt-0.5 leading-tight">Penicillin, Peanuts</p>
                </div>
              </div>
            </div>
            <div className="col-span-12 bg-surface-light dark:bg-surface-dark rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="14" x="3" y="6" rx="2"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M12 10v4"/><path d="M10 12h4"/></svg>
                </div>
                <div>
                  <p className="text-xs font-medium opacity-60">Chronic Conditions</p>
                  <p className="text-base font-semibold mt-0.5">Asthma</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Emergency Settings */}
        <div className="px-4 mb-8">
          <h3 className="text-sm font-bold text-subtext-light dark:text-subtext-dark tracking-wider uppercase mb-3 px-1 opacity-70">Emergency Settings</h3>
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-semibold">SOS Voice Trigger</span>
                  <span className="text-xs opacity-60">Phrase: &quot;Help Leofiy&quot;</span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-semibold">Dead-Man&apos;s Switch</span>
                  <span className="text-xs opacity-60">Check-in every 30 mins</span>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="px-4 mb-4">
          <h3 className="text-sm font-bold text-subtext-light dark:text-subtext-dark tracking-wider uppercase mb-3 px-1 opacity-70">Emergency Contacts</h3>
          <div className="flex flex-col gap-3">
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop" fill alt="Mom" className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-bold">Mom</p>
                  <p className="text-xs opacity-60">Emergency • +1 555-0192</p>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                <Edit2 size={16} />
              </button>
            </div>

            <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Building2 size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold">Local Embassy</p>
                  <p className="text-xs opacity-60">Official • Paris, France</p>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                <Edit2 size={16} />
              </button>
            </div>

            <button className="w-full mt-2 py-3 border-2 border-dashed border-primary/40 rounded-xl flex items-center justify-center gap-2 text-primary hover:bg-primary/5 hover:border-primary transition-all group">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
              <span className="font-semibold text-sm">Add New Contact</span>
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
