'use client';

import { useState } from 'react';
import { Mic, ChevronRight } from 'lucide-react';
import { motion, useDragControls } from 'motion/react';
import { useRouter } from 'next/navigation';

export default function SOSPage() {
  const router = useRouter();
  const [slideStatus, setSlideStatus] = useState(0);

  return (
    <div className="relative flex h-full w-full flex-col bg-danger-light dark:bg-danger-dark overflow-hidden flex-1">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] rounded-full bg-red-500/10 dark:bg-red-600/20 blur-[100px]"></div>
        <div 
          className="absolute inset-0 opacity-5 bg-cover bg-center grayscale mix-blend-multiply dark:mix-blend-overlay" 
          style={{backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop')"}} 
        />
      </div>

      <div className="relative z-10 flex flex-col flex-grow items-center justify-between p-6 w-full h-full pb-safe">
        
        <div className="flex-1"></div>

        {/* Central Component */}
        <div className="flex flex-col items-center w-full">
          <div className="relative flex items-center justify-center w-64 h-64 mb-8">
            <div className="absolute inset-0 rounded-full border border-red-500/20 bg-red-500/5 scale-125 dark:border-red-500/10 animate-[pulse_3s_infinite]"></div>
            <div className="absolute inset-8 rounded-full border border-red-500/30 bg-red-500/10 scale-110 dark:border-red-500/20 animate-[pulse_2s_infinite]"></div>
            <div className="absolute inset-16 rounded-full border border-red-500/40 bg-red-500/15 dark:border-red-500/30 animate-[pulse_1s_infinite]"></div>
            
            <motion.div 
               initial={{ scale: 0.8 }}
               animate={{ scale: 1 }}
               transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1 }}
               className="relative z-10 flex items-center justify-center w-28 h-28 bg-red-600 rounded-full shadow-2xl shadow-red-500/40 ring-4 ring-white dark:ring-danger-dark"
            >
              <Mic size={48} className="text-white fill-current" />
              
              <div className="absolute -bottom-3 px-3 py-1 bg-white dark:bg-neutral-800 rounded-full shadow-md flex items-center gap-1.5 border border-red-100 dark:border-neutral-700">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
                <span className="text-[10px] font-bold text-red-600 dark:text-red-400 tracking-wider">LIVE</span>
              </div>
            </motion.div>
          </div>

          <h1 className="text-text-main dark:text-white tracking-tight text-[36px] font-black leading-tight text-center mb-2 drop-shadow-sm">
            SOS ACTIVATED
          </h1>
          
          <div className="max-w-[280px]">
            <p className="text-neutral-600 dark:text-neutral-300 text-lg font-medium leading-normal text-center">
              Notifying nearest authorities. Your location is being live-streamed.
            </p>
          </div>
        </div>

        <div className="flex-1"></div>

        {/* Footer */}
        <div className="w-full pb-8">
          <div className="relative w-full h-[72px] bg-white dark:bg-neutral-800 rounded-xl shadow-lg border-2 border-transparent hover:border-neutral-200 dark:border-neutral-700 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-neutral-400 dark:text-neutral-500 font-bold tracking-widest text-sm pl-8">
                SLIDE TO CANCEL
              </span>
            </div>
            
            <motion.div 
               drag="x"
               dragConstraints={{ left: 0, right: 280 }}
               dragElastic={0}
               dragMomentum={false}
               onDragEnd={(e, info) => {
                 if (info.offset.x > 200) {
                   router.push('/home');
                 } else {
                   setSlideStatus(0);
                 }
               }}
               className="absolute left-1.5 top-1.5 bottom-1.5 min-w-[60px] bg-primary rounded-lg shadow-md flex items-center px-4 gap-2 cursor-grab active:cursor-grabbing z-10 w-fit"
            >
              <ChevronRight size={24} className="text-black shrink-0" />
              <span className="text-black text-sm font-bold leading-normal tracking-wide whitespace-nowrap pr-2">
                I AM SAFE
              </span>
            </motion.div>
          </div>
          
          <p className="text-center text-xs text-neutral-400 dark:text-neutral-500 mt-4 font-medium">
            Please keep the app open while help is on the way.
          </p>
        </div>
      </div>
    </div>
  );
}
