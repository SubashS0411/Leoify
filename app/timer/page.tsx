'use client';

import { BottomNav } from '@/components/BottomNav';
import { ChevronLeft, Info, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TimerPage() {
  const router = useRouter();

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden flex-1 pb-20 relative">
      <header className="flex items-center px-4 pt-12 pb-2 justify-between sticky top-0 z-10 bg-background-light dark:bg-background-dark">
        <button onClick={() => router.back()} className="text-text-light dark:text-text-dark flex w-12 h-12 items-center justify-start hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors pl-2">
          <ChevronLeft size={28} />
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] text-center">Safety Timer Active</h2>
          <div className="flex items-center gap-1 mt-0.5">
             {/* hiking icon approximation */}
            <span className="text-xs font-medium text-text-light/60 dark:text-white/60">🚶 Jungle Trekking</span>
          </div>
        </div>
        <div className="flex w-12 items-center justify-end cursor-pointer">
          <Link href="/home" className="text-text-light/40 dark:text-white/40 text-sm font-bold leading-normal tracking-[0.015em] hover:text-danger transition-colors">Cancel</Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-start px-6 pt-4 overflow-y-auto">
        <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center mt-4 mb-8">
          {/* SVG Circle Progress */}
          <svg className="w-full h-full transform -rotate-90 block max-w-full max-h-[250px] mx-auto" viewBox="0 0 36 36">
            <path className="fill-none stroke-[#cfe7d9] dark:stroke-[#2a4031] stroke-[2.5]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
            <path className="fill-none stroke-[2.5] stroke-linecap-round stroke-primary stroke-dasharray-[113] stroke-dashoffset-[20] transition-all duration-1000 ease-out" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <p className="text-text-light/50 dark:text-white/50 text-sm font-medium mb-1 tracking-wider uppercase">Remaining</p>
            <h1 className="text-5xl font-black tracking-tight mb-6 tabular-nums">01:59:30</h1>
            <button className="relative group overflow-hidden w-full max-w-[200px] h-14 rounded-full bg-primary flex items-center justify-center shadow-[0_4px_14px_0_rgba(19,236,106,0.39)] hover:shadow-[0_6px_20px_rgba(19,236,106,0.23)] hover:scale-[1.02] transition-all duration-200 active:scale-95">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <div className="flex items-center gap-2 relative z-10 text-background-dark font-bold text-lg tracking-wide">
                <CheckCircle2 size={24} className="fill-current text-white/40" />
                <span>CHECK-IN</span>
              </div>
            </button>
          </div>
        </div>

        <div className="w-full max-w-md bg-surface-light dark:bg-surface-dark border border-primary/20 rounded-xl p-4 flex items-start gap-3 shadow-sm mb-6">
          <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full shrink-0 text-primary mt-0.5">
            <Info size={16} className="fill-current text-primary-dark/20" />
          </div>
          <div>
            <p className="text-sm font-semibold mb-1">Safety Monitor Active</p>
            <p className="text-text-light/70 dark:text-white/70 text-xs leading-relaxed">
              Failure to check-in when the timer expires will trigger a <span className="text-danger font-bold">Level 2 Alert</span> to local authorities.
            </p>
          </div>
        </div>

        <div className="w-full max-w-md space-y-3">
          <div className="flex justify-between items-center px-1">
            <span className="text-sm font-medium text-text-light/80 dark:text-white/80">Extend Duration</span>
            <span className="text-primary text-sm font-bold">2 Hours</span>
          </div>
          <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-black/5 dark:border-white/5">
            <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-full">
              <div className="absolute h-full bg-primary rounded-full w-[33%]"></div>
              <div className="absolute left-[33%] top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-primary rounded-full shadow cursor-pointer hover:scale-110 transition-transform"></div>
            </div>
            <div className="flex justify-between mt-3 text-xs text-text-light/40 dark:text-white/40 font-medium">
              <span>1h</span>
              <span>2h</span>
              <span>4h</span>
              <span>8h</span>
            </div>
          </div>
        </div>
      </main>

      <Link href="/sos" className="fixed right-6 bottom-24 z-50 w-16 h-16 bg-danger rounded-full shadow-lg shadow-danger/40 flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all animate-pulse">
        <span className="text-[18px] font-bold tracking-widest leading-none">SOS</span>
      </Link>

      <BottomNav />
    </div>
  );
}
