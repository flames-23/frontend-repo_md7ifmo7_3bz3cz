import React from 'react';
import { Heart, Download, BarChart3, BookOpen } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-black/50 border-b border-white/10">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-cyan-400">
          <Heart className="h-5 w-5" />
          <span className="font-semibold tracking-tight">MediLearn Portal</span>
        </a>
        <div className="flex items-center gap-6 text-sm">
          <a href="#resources" className="flex items-center gap-2 text-white/80 hover:text-white transition">
            <BookOpen className="h-4 w-4" />
            Resources
          </a>
          <a href="#analytics" className="flex items-center gap-2 text-white/80 hover:text-white transition">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </a>
          <a href="#downloads" className="flex items-center gap-2 text-white/80 hover:text-white transition">
            <Download className="h-4 w-4" />
            Downloads
          </a>
        </div>
      </nav>
    </header>
  );
}
