'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center text-center p-6 h-full pb-safe">
      <h1 className="text-3xl font-bold mb-4">Welcome back</h1>
      <Link href="/trips/create" className="bg-primary text-black font-bold py-3 px-6 rounded-xl">
        Create New Trip
      </Link>
    </div>
  );
}
