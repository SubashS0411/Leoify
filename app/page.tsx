'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Mic, Lock, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { useFirebase } from '@/components/FirebaseProvider';
import { useRouter } from 'next/navigation';

export default function WelcomePage() {
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(false);
  const { user, signIn, loading } = useFirebase();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex-1 flex w-full h-full justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If user is logged in, they can "Continue to Map"
  const handleSignIn = async () => {
    if (!user) {
      await signIn();
    } else {
      router.push('/map');
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full h-full pb-safe">
      <div className="relative h-80 w-full overflow-hidden rounded-b-3xl shrink-0">
        <Image
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop"
          alt="Hiker looking at mountain landscape view"
          fill
          className="object-cover object-top"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider text-black uppercase bg-primary rounded-full w-fit"
          >
            Safety First
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white text-3xl font-bold leading-tight drop-shadow-sm"
          >
            Travel Fearlessly<br />with Leofiy
          </motion.h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col px-6 pt-6 pb-6 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <p className="text-gray-600 dark:text-gray-300 text-base font-normal leading-relaxed">
            Let&apos;s set up your safety net. We need a few permissions to ensure you are protected everywhere you go.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-4">
          <h3 className="text-gray-900 dark:text-white tracking-tight text-xl font-bold leading-tight">
            Why we need access
          </h3>
        </motion.div>

        {/* Location Permission */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="flex gap-4 py-4 border-b border-gray-100 dark:border-gray-800 items-start">
          <div className="flex items-center justify-center rounded-xl bg-primary/10 dark:bg-primary/20 shrink-0 w-12 h-12 text-primary-dark dark:text-primary">
            <MapPin size={24} />
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1">
            <div className="flex justify-between items-center">
              <p className="text-gray-900 dark:text-white text-base font-semibold">Precision Location</p>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={locationEnabled}
                  onChange={(e) => setLocationEnabled(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
              Required to guide emergency responders to your exact coordinates.
            </p>
          </div>
        </motion.div>

        {/* Mic Permission */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="flex gap-4 py-4 items-start mb-6">
          <div className="flex items-center justify-center rounded-xl bg-primary/10 dark:bg-primary/20 shrink-0 w-12 h-12 text-primary-dark dark:text-primary">
            <Mic size={24} />
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1">
            <div className="flex justify-between items-center">
              <p className="text-gray-900 dark:text-white text-base font-semibold">Voice Activation</p>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={micEnabled}
                  onChange={(e) => setMicEnabled(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
              Required to trigger SOS alerts hands-free if you can&apos;t reach your phone.
            </p>
          </div>
        </motion.div>

        <div className="mt-auto pt-4 flex flex-col gap-3">
          {user ? (
            <Link href="/verify" className="w-full bg-primary hover:bg-[#0fa64d] active:scale-[0.98] transition-all duration-200 text-text-main hover:text-black font-bold text-lg py-4 px-6 rounded-xl shadow-[0_4px_14px_0_rgba(19,236,106,0.39)] flex items-center justify-center gap-2">
              <ShieldCheck size={20} className="fill-current text-white/50" />
              Start New Trip
            </Link>
          ) : (
            <button onClick={handleSignIn} className="w-full bg-primary hover:bg-[#0fa64d] active:scale-[0.98] transition-all duration-200 text-text-main hover:text-black font-bold text-lg py-4 px-6 rounded-xl shadow-[0_4px_14px_0_rgba(19,236,106,0.39)] flex items-center justify-center gap-2">
              <ShieldCheck size={20} className="fill-current text-white/50" />
              Sign in with Google
            </button>
          )}

          <p className="text-center mt-2 text-xs text-gray-400 dark:text-gray-500 flex items-center justify-center gap-1">
            <Lock size={12} />
            Your data is encrypted and private.
          </p>
        </div>
      </div>
    </div>
  );
}
