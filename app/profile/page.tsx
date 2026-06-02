'use client';

import { ArrowLeft, User, Navigation, Plus, Clock, MapPin, CheckCircle, Search, Sheet, Mail, Loader2, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { initAuth, googleSignIn, logout, getAccessToken } from '@/lib/auth';
import type { User as FirebaseUser } from 'firebase/auth';

export default function ProfilePage() {
  const router = useRouter();
  
  const [needsAuth, setNeedsAuth] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isEmailing, setIsEmailing] = useState(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setUser(user);
        setToken(token);
        setNeedsAuth(false);
      },
      () => {
        setUser(null);
        setToken(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setToken(result.accessToken);
        setUser(result.user);
        setNeedsAuth(false);
      }
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const completedTrips = [
    { id: '1', title: 'Weekend in Seattle', date: 'Oct 12 - Oct 14, 2025', incidents: 0 },
    { id: '2', title: 'Hike at Mount Rainier', date: 'Sep 5, 2025', incidents: 1, incidentType: 'Caution Alert' },
    { id: '3', title: 'Business Trip NY', date: 'Aug 20 - Aug 25, 2025', incidents: 0 },
  ];

  const handleExportToSheets = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to export your ${completedTrips.length} completed trips to a new Google Sheet?`
    );
    if (!confirmed) return;

    setIsExporting(true);
    try {
      const currentToken = await getAccessToken();
      if (!currentToken) throw new Error('No access token');
      
      const res = await fetch('/api/sheets/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentToken}`
        },
        body: JSON.stringify({ trips: completedTrips })
      });
      
      if (!res.ok) throw new Error('API Error: ' + await res.text());
      const data = await res.json();
      window.alert(`Successfully exported trips! Spreadsheet ID: ${data.spreadsheetId}`);
    } catch (err) {
      console.error(err);
      window.alert('Failed to export to Google Sheets.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleEmailReport = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to send a trip summary email from your Gmail account?`
    );
    if (!confirmed) return;

    setIsEmailing(true);
    try {
      const currentToken = await getAccessToken();
      if (!currentToken) throw new Error('No access token');
      
      const res = await fetch('/api/gmail/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentToken}`
        },
        body: JSON.stringify({ 
          subject: 'My Trip Summary',
          body: `I have completed ${completedTrips.length} trips recently!`,
          to: user?.email // sending to self for testing
        })
      });
      
      if (!res.ok) throw new Error('API Error: ' + await res.text());
      window.alert('Successfully sent email report!');
    } catch (err) {
      console.error(err);
      window.alert('Failed to send email.');
    } finally {
      setIsEmailing(false);
    }
  };

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
          {user ? (
            <img src={user.photoURL || ''} alt="Profile" className="w-16 h-16 rounded-full border-2 border-slate-200" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold text-xl uppercase">
              User
            </div>
          )}
          <div className="flex flex-col flex-1">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {user ? user.displayName : 'Guest User'}
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              {user ? user.email : 'Not signed in'}
            </p>
          </div>
          {user && (
            <button onClick={logout} className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors">
              <LogOut size={20} />
            </button>
          )}
        </div>

        {needsAuth ? (
          <div className="bg-blue-50/50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-5 mb-8 flex flex-col gap-4">
            <h3 className="font-bold text-blue-900 dark:text-blue-100">Connect Google Workspace</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">Sign in to export trips to Sheets and send summary emails via Gmail.</p>
            <button 
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="gsi-material-button w-full flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-300 py-2.5 rounded-lg font-medium shadow-sm hover:bg-slate-50 disabled:opacity-70 transition-colors"
            >
              {isLoggingIn ? <Loader2 className="animate-spin" size={20} /> : (
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
              )}
              <span>Sign in with Google</span>
            </button>
          </div>
        ) : user && (
          <div className="flex gap-3 mb-8">
            <button 
              onClick={handleExportToSheets}
              disabled={isExporting}
              className="flex-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 rounded-xl py-3 flex flex-col items-center justify-center gap-2 hover:bg-green-100 disabled:opacity-50 transition-colors"
            >
              {isExporting ? <Loader2 className="animate-spin" size={24} /> : <Sheet size={24} />}
              <span className="text-xs font-bold">Export to Sheets</span>
            </button>
            <button 
              onClick={handleEmailReport}
              disabled={isEmailing}
              className="flex-1 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-xl py-3 flex flex-col items-center justify-center gap-2 hover:bg-red-100 disabled:opacity-50 transition-colors"
            >
              {isEmailing ? <Loader2 className="animate-spin" size={24} /> : <Mail size={24} />}
              <span className="text-xs font-bold">Email Summary</span>
            </button>
          </div>
        )}

        <div className="flex items-center justify-between mb-4 mt-2">
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
