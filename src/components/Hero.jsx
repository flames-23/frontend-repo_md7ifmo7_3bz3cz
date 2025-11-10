import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-black" id="hero">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/2fSS9b44gtYBt4RI/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 ring-1 ring-white/20 backdrop-blur">
            Healthcare • Education • Insights
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            Your futuristic medical learning portal
          </h1>
          <p className="mt-4 text-white/80 text-lg max-w-xl">
            Download curated education PDFs and explore real-time analytics on patient check-ups — all in one elegant, animated experience.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#resources" className="rounded-md bg-cyan-500/90 hover:bg-cyan-400 text-black font-semibold px-5 py-3 transition">
              Browse PDFs
            </a>
            <a href="#analytics" className="rounded-md bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3 ring-1 ring-white/20 transition">
              View Analytics
            </a>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
    </section>
  );
}
