import React, { useEffect, useMemo, useState } from 'react';
import { BarChart3 } from 'lucide-react';

// Simple chart using SVG so we avoid extra deps.
function Bar({ label, value, max, index }) {
  const height = max === 0 ? 0 : Math.round((value / max) * 160) + 2;
  const x = index * 44;
  return (
    <g transform={`translate(${x}, 0)`}>
      <rect x={6} y={180 - height} width={28} height={height} rx={6} className="fill-cyan-400/80" />
      <text x={20} y={196} textAnchor="middle" className="fill-white/70 text-[10px]">{label}</text>
      <text x={20} y={168 - height} textAnchor="middle" className="fill-white text-[10px] font-semibold">{value}</text>
    </g>
  );
}

export default function Analytics() {
  const [data, setData] = useState([
    { label: 'Mon', value: 24 },
    { label: 'Tue', value: 31 },
    { label: 'Wed', value: 18 },
    { label: 'Thu', value: 42 },
    { label: 'Fri', value: 37 },
    { label: 'Sat', value: 12 },
    { label: 'Sun', value: 20 },
  ]);

  // Future: wire to backend for real data
  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => prev.map((d) => ({ ...d, value: Math.max(5, Math.min(60, Math.round(d.value + (Math.random() * 10 - 5)))) })));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const max = useMemo(() => Math.max(...data.map((d) => d.value), 0), [data]);

  return (
    <section id="analytics" className="relative py-20 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Patient Check-up Analytics</h2>
            <p className="mt-2 text-white/70 max-w-2xl">Weekly count of patients checked up. Data animates to simulate live updates.</p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-6">
          <div className="flex items-center gap-3 text-white/80">
            <BarChart3 className="h-5 w-5 text-cyan-300" />
            <span className="text-sm">Patients per day</span>
          </div>
          <div className="mt-6 w-full overflow-x-auto">
            <svg width={data.length * 44} height={200} viewBox={`0 0 ${data.length * 44} 200`}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#0891b2" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="transparent" />
              {data.map((d, i) => (
                <Bar key={d.label} label={d.label} value={d.value} max={max} index={i} />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
