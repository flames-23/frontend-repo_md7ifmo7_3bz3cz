import React from 'react';
import { HeartPulse, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="downloads" className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/70 text-sm flex items-center gap-2">
            <HeartPulse className="h-4 w-4 text-cyan-300" />
            MediLearn Portal — advancing healthcare education
          </p>
          <a className="inline-flex items-center gap-2 text-white/60 hover:text-white" href="#hero">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
