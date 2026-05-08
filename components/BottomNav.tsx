'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map as MapIcon, Calendar, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white dark:bg-background-dark border-t border-gray-100 dark:border-gray-800 pb-safe pt-2 px-6 z-[100]">
      <div className="flex justify-between items-center h-16">
        <Link href="/home" className={cn("flex flex-col items-center gap-1 w-16 transition-colors", pathname === '/home' ? 'text-primary' : 'text-gray-400 hover:text-text-main dark:hover:text-white')}>
          <Home className={cn("w-6 h-6", pathname === '/home' && "fill-current")} />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link href="/map" className={cn("flex flex-col items-center gap-1 w-16 transition-colors", pathname === '/map' ? 'text-primary' : 'text-gray-400 hover:text-text-main dark:hover:text-white')}>
          <MapIcon className={cn("w-6 h-6", pathname === '/map' && "fill-current")} />
          <span className="text-[10px] font-medium">Map</span>
        </Link>
        <Link href="/timer" className={cn("flex flex-col items-center gap-1 w-16 transition-colors", pathname === '/timer' ? 'text-primary' : 'text-gray-400 hover:text-text-main dark:hover:text-white')}>
          <Calendar className={cn("w-6 h-6", pathname === '/timer' && "fill-current")} />
          <span className="text-[10px] font-medium">Itinerary</span>
        </Link>
        <Link href="/profile" className={cn("flex flex-col items-center gap-1 w-16 transition-colors", pathname === '/profile' ? 'text-primary' : 'text-gray-400 hover:text-text-main dark:hover:text-white')}>
          <div className={cn(pathname === '/profile' && "bg-primary/10 px-4 py-1 rounded-full mb-0.5", "transition-colors duration-200")}>
             <User className={cn("w-6 h-6", pathname === '/profile' && "fill-current text-primary")} />
          </div>
          <span className={cn("text-[10px]", pathname === '/profile' ? "font-bold" : "font-medium")}>Profile</span>
        </Link>
      </div>
    </nav>
  );
}
