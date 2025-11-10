import React, { useEffect, useMemo, useState } from 'react';
import { BarChart3 } from 'lucide-react';

const API = import.meta.env.VITE_BACKEND_URL || '';

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
    { label: 'Mon', value: 0 },
    { label: 'Tue', value: 0 },
    { label: 'Wed', value: 0 },
    { label: 'Thu', value: 0 },
    { label: 'Fri', value: 0 },
    { label: 'Sat', value: 0 },
    { label: 'Sun', value: 0 },
  ]);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API}/analytics/weekly`);
      const d = await res.json();
      if (d && d.data) setData(d.data);
    } catch (e) {}
  };

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 5000);
    return () => clearInterval(id);
  }, []);

  const max = useMemo(() => Math.max(...data.map((d) => d.value), 0), [data]);

  return (
    <section id="analytics" className="relative py-20 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Patient Check-up Analytics</h2>
            <p className="mt-2 text-white/70 max-w-2xl">Weekly count of patients checked up. Auto-refreshes every 5s.</p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-6">
          <div className="flex items-center gap-3 text-white/80">
            <BarChart3 className="h-5 w-5 text-cyan-300" />
            <span className="text-sm">Patients per day</span>
          </div>
          <div className="mt-6 w-full overflow-x-auto">
            <svg width={data.length * 44} height={200} viewBox={`0 0 ${data.length * 44} 200`}>
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
