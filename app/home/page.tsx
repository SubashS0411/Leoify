'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, ShieldAlert, Wifi, BatteryMedium, MapPin, Sun, Users, Bell, Menu, User, ChevronRight, Share2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BottomNav } from '@/components/BottomNav';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [isCaution, setIsCaution] = useState(false);
  const router = useRouter();

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative pb-20">
      <header className={cn(
        "flex items-center justify-between px-6 pt-12 pb-4 z-20 transition-colors duration-500",
        isCaution ? "bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md" : "bg-transparent absolute top-0 w-full"
      )}>
        <div className="flex items-center gap-2">
          {isCaution ? (
            <button className="flex items-center justify-center size-10 rounded-full bg-black/5 dark:bg-white/5" onClick={() => setIsCaution(!isCaution)}>
               <Menu size={24} />
            </button>
          ) : (
            <button className="flex items-center justify-center size-10 rounded-full bg-primary/10 dark:bg-primary/20 text-primary-dark dark:text-primary" onClick={() => setIsCaution(!isCaution)}>
               <ShieldCheck size={20} className="fill-current text-white/50" />
            </button>
          )}
          <h2 className="text-xl font-bold tracking-tight">{isCaution ? 'Home' : 'Leofiy'}</h2>
        </div>
        
        <div className="flex items-center gap-3">
          {isCaution ? (
            <Link href="/profile" className="flex items-center justify-center size-10 rounded-full bg-black/5 dark:bg-white/5">
              <User size={20} />
            </Link>
          ) : (
            <div className="flex items-center gap-3 bg-white dark:bg-black/20 px-3 py-1.5 rounded-full shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-1">
                <Wifi size={16} className="text-green-600 dark:text-green-400" />
              </div>
              <div className="w-px h-3 bg-gray-200 dark:bg-gray-700"></div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold">98%</span>
                <BatteryMedium size={18} className="text-green-600 dark:text-green-400" />
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto w-full relative z-10 flex flex-col pt-12">
        <AnimatePresence mode="wait">
          {!isCaution ? (
            <motion.div 
              key="safe"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex flex-col w-full px-6"
            >
              <div className="flex-1 flex flex-col items-center justify-center py-8 min-h-[300px]">
                <div className="relative mb-8 group cursor-pointer" onClick={() => setIsCaution(true)}>
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl transform scale-150 animate-pulse"></div>
                  <div className="relative w-40 h-40 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg transition-transform duration-500 hover:scale-105 border-4 border-primary/10">
                    <ShieldCheck size={80} className="text-primary fill-primary/20" />
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold tracking-tight text-center mb-2">STATUS: PROTECTED</h1>
                <div className="flex items-center flex-row gap-2 bg-primary/10 px-3 py-1 rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <p className="text-primary-dark dark:text-primary text-sm font-medium">Monitoring active</p>
                </div>
              </div>

              <div className="w-full mb-6">
                <div className="relative overflow-hidden rounded-2xl shadow-sm bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 group transition-all hover:shadow-md">
                  <div className="absolute inset-0 h-32 w-full">
                     <Image src="https://images.unsplash.com/photo-1627883658933-28eb583d7fc8?q=80&w=800&auto=format&fit=crop" alt="Mountains" fill className="object-cover" />
                     <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60"></div>
                  </div>
                  <div className="relative pt-20 px-5 pb-5">
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-white/90 text-sm font-medium mb-1 drop-shadow-md">
                          <MapPin size={16} />
                          <span>You are in a Safe Zone</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white drop-shadow-lg">Downtown Manali</h3>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex gap-4">
                      <div className="flex-1">
                        <p className="text-xs text-text-muted dark:text-gray-400 font-medium uppercase tracking-wider mb-1">Local Emergency</p>
                        <p className="text-lg font-bold">112</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-text-muted dark:text-gray-400 font-medium uppercase tracking-wider mb-1">Risk Level</p>
                        <div className="flex items-center gap-1">
                          <span className="size-2 rounded-full bg-primary"></span>
                          <p className="text-lg font-bold text-primary-dark dark:text-primary">Low</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col gap-2">
                  <div className="bg-blue-50 dark:bg-blue-900/20 w-8 h-8 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Sun size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted dark:text-gray-400">Weather</p>
                    <p className="font-semibold">Clear, 18°C</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col gap-2">
                  <div className="bg-primary/10 w-8 h-8 rounded-lg flex items-center justify-center text-primary-dark dark:text-primary">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted dark:text-gray-400">Crowd Density</p>
                    <p className="font-semibold">Moderate</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="caution"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col w-full"
            >
              <div className="flex flex-col items-center justify-center pt-2 pb-6 px-4">
                <div className="relative mb-6 cursor-pointer" onClick={() => setIsCaution(false)}>
                  <div className="absolute inset-0 bg-caution/20 rounded-full blur-xl transform scale-150"></div>
                  <div className="relative flex items-center justify-center w-32 h-32 rounded-full bg-caution-bg dark:bg-amber-900/40 border-4 border-caution text-caution shadow-lg">
                    <ShieldAlert size={64} className="fill-caution text-white dark:text-amber-900/40" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-caution text-white p-2 flex items-center justify-center rounded-full border-4 border-background-light dark:border-background-dark">
                    <AlertCircle size={20} className="fill-current text-white/20" />
                  </div>
                </div>
                
                <div className="flex flex-col items-center justify-center space-y-2 max-w-xs mx-auto">
                  <p className="text-caution font-bold text-2xl leading-tight tracking-tight text-center uppercase">Status: Caution</p>
                  <p className="text-gray-600 dark:text-gray-300 text-base font-normal leading-normal text-center">You are entering a Low-Network Zone. Offline SOS is active.</p>
                </div>
              </div>

              <div className="flex flex-row gap-3 px-4 justify-center flex-wrap mb-6">
                <div className="flex h-9 items-center justify-center gap-x-2 rounded-full bg-caution-bg dark:bg-amber-900/30 border border-caution/20 px-4 shadow-sm">
                  <Wifi size={16} className="text-caution" />
                  <p className="text-sm font-semibold leading-normal">Signal: Low</p>
                </div>
                <div className="flex h-9 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 shadow-sm">
                  <BatteryMedium size={16} />
                  <p className="text-sm font-semibold leading-normal">Battery: 65%</p>
                </div>
              </div>

              <div className="px-4 mb-6">
                <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-caution/30">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-caution/10 to-transparent rounded-bl-full z-0"></div>
                  <div className="relative z-10 p-5 flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Share2 size={20} className="text-caution" />
                          <p className="text-base font-bold leading-tight">Share Live Location</p>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-relaxed">
                          Let your contacts know where you are before you lose signal completely.
                        </p>
                      </div>
                      <div className="w-16 h-16 shrink-0 relative rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                        <Image src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=200&auto=format&fit=crop" alt="Map snippet" fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                           <MapPin className="text-danger fill-current" size={24} />
                        </div>
                      </div>
                    </div>
                    <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 bg-caution text-white hover:bg-amber-600 transition-colors text-sm font-bold tracking-wide shadow-md">
                      Share Now
                    </button>
                  </div>
                </div>
              </div>

              <div className="px-4 pb-8">
                <h3 className="text-lg font-bold mb-3 px-1">Upcoming</h3>
                <div className="flex items-center gap-4 rounded-2xl bg-white dark:bg-gray-800 p-4 shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition" onClick={() => router.push('/timer')}>
                  <div className="flex flex-col items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl shrink-0">
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Nov</span>
                    <span className="text-lg font-bold">12</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold truncate">Hike to Summit Point</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm truncate">08:00 AM • Mountain Trail</p>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <button 
        onClick={() => router.push('/sos')}
        className="fixed bottom-24 right-5 z-[60] w-16 h-16 bg-danger text-white rounded-full shadow-[0_4px_12px_rgba(220,38,38,0.4)] hover:shadow-[0_6px_16px_rgba(220,38,38,0.5)] flex items-center justify-center active:scale-95 transition-all">
        <Bell size={32} className={cn(!isCaution ? "animate-[wiggle_1s_ease-in-out_infinite]" : "animate-pulse")} />
      </button>

      <BottomNav />
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes wiggle {
            0%, 100% { transform: rotate(-3deg); }
            50% { transform: rotate(3deg); }
        }
      `}} />
    </div>
  );
}
