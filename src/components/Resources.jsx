import React, { useEffect, useState } from 'react';
import { FileText, Download } from 'lucide-react';

const API = import.meta.env.VITE_BACKEND_URL || '';

export default function Resources() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/pdfs`);
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        setItems([]);
      }
    })();
  }, []);

  return (
    <section id="resources" className="relative py-20 bg-gradient-to-b from-black to-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Education PDFs</h2>
            <p className="mt-2 text-white/70 max-w-2xl">Curated, downloadable resources to support your medical learning journey.</p>
          </div>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((r) => (
            <div key={r._id} className="group rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-cyan-500/20 p-3 ring-1 ring-cyan-500/30">
                  <FileText className="h-6 w-6 text-cyan-300" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg leading-tight">{r.title}</h3>
                  <p className="mt-1 text-white/70 text-sm">{r.description}</p>
                </div>
              </div>
              <a href={r.url} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200">
                <Download className="h-4 w-4" />
                Download PDF
              </a>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-white/70">No PDFs yet. Admin can add from the floating Admin button.</div>
          )}
        </div>
      </div>
    </section>
  );
}
