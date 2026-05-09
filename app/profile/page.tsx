'use client';

import { ArrowLeft, User, Navigation, Plus, Clock, MapPin, CheckCircle, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();

  const completedTrips = [
    { id: '1', title: 'Weekend in Seattle', date: 'Oct 12 - Oct 14, 2025', incidents: 0 },
    { id: '2', title: 'Hike at Mount Rainier', date: 'Sep 5, 2025', incidents: 1, incidentType: 'Caution Alert' },
    { id: '3', title: 'Business Trip NY', date: 'Aug 20 - Aug 25, 2025', incidents: 0 },
  ];

  return (
    <div className="flex-1 flex flex-col h-full w-full bg-background-light dark:bg-slate-950 pb-safe">
      <header className="px-4 flex items-center justify-between h-16 shrink-0 border-b border-slate-200 dark:border-slate-800">
        <button onClick={() => router.push('/')} className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <ArrowLeft size={24} className="text-slate-700 dark:text-slate-300" />
        </button>
        <span className="font-bold text-lg text-slate-800 dark:text-white">Profile</span>
        <button className="p-2 -mr-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <User size={24} className="text-slate-700 dark:text-slate-300" />
        </button>
      </header>

      <div className="p-6 overflow-y-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold text-xl uppercase">
            User
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Traveler</h1>
            <p className="text-slate-500 dark:text-slate-400">user@example.com</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 mt-8">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Completed Trips</h2>
          <span className="text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500">{completedTrips.length} Total</span>
        </div>

        <div className="flex flex-col gap-3">
          {completedTrips.map(trip => (
            <div key={trip.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 flex flex-col gap-2 shadow-sm relative overflow-hidden">
              {trip.incidents === 0 ? (
                 <div className="absolute top-0 right-0 w-12 h-12 flex items-start justify-end p-3">
                    <CheckCircle size={16} className="text-primary opacity-50" />
                 </div>
              ) : null}
              
              <div className="font-bold text-slate-800 dark:text-white text-base pr-8">{trip.title}</div>
              
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                <Clock size={14} />
                <span>{trip.date}</span>
              </div>
              
              {trip.incidents > 0 && (
                <div className="mt-2 text-xs font-semibold px-2 py-1 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-500 w-fit">
                  {trip.incidentType} Logged
                </div>
              )}
            </div>
          ))}
        </div>
        
        <Link href="/trips/create" className="mt-6 flex items-center justify-center gap-2 w-full py-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-500 hover:text-primary hover:border-primary transition-colors font-bold">
          <Plus size={18} />
          Create New Trip
        </Link>
      </div>
    </div>
  );
}
