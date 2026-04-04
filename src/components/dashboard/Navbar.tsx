// FILE: components/dashboard/Navbar.tsx
"use client";

import { UserButton } from "@clerk/clerk-react";

interface NavbarProps {
  email: string;
}

export function Navbar({ email }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 h-16 w-full bg-white/90 backdrop-blur-md border-b border-blue-100">
      <div className="max-w-[1200px] mx-auto h-full px-6 flex items-center justify-between">
        <div className="text-blue-700 font-bold text-xl tracking-tight">
          <span className="mr-2">✦</span>Resumate
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-slate-600 text-sm">
            {email}
          </span>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
}
