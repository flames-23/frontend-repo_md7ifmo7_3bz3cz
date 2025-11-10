import React, { useEffect, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || '';

export default function AdminBar() {
  const [token, setToken] = useState(localStorage.getItem('ml_token') || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [pdf, setPdf] = useState({ title: '', description: '', url: '', tags: '' });
  const [checkup, setCheckup] = useState({ patient_name: '', department: '', notes: '', date: '' });
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (token) localStorage.setItem('ml_token', token);
    else localStorage.removeItem('ml_token');
  }, [token]);

  const login = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) throw new Error((await res.json()).detail || 'Login failed');
      const data = await res.json();
      setToken(data.token);
      setMessage('Logged in as ' + data.user.email);
      setExpanded(true);
    } catch (err) {
      setMessage(err.message);
    }
  };

  const setupAdmin = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch(`${API}/setup/admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Admin', email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Setup failed');
      setMessage('Admin created. You can now login.');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const addPdf = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch(`${API}/pdfs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          title: pdf.title,
          description: pdf.description || undefined,
          url: pdf.url,
          tags: pdf.tags ? pdf.tags.split(',').map((t) => t.trim()).filter(Boolean) : undefined,
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Failed to add PDF');
      setMessage('PDF added');
      setPdf({ title: '', description: '', url: '', tags: '' });
    } catch (err) {
      setMessage(err.message);
    }
  };

  const addCheckup = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch(`${API}/checkups`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          patient_name: checkup.patient_name || undefined,
          department: checkup.department || undefined,
          notes: checkup.notes || undefined,
          date: checkup.date ? new Date(checkup.date).toISOString() : undefined,
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Failed to record check-up');
      setMessage('Check-up recorded');
      setCheckup({ patient_name: '', department: '', notes: '', date: '' });
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <button onClick={() => setExpanded((v) => !v)} className="rounded-full bg-cyan-500 text-black font-semibold px-4 py-2 shadow-lg">
        {expanded ? 'Close Admin' : 'Admin'}
      </button>

      {expanded && (
        <div className="mt-3 w-[360px] max-w-[92vw] rounded-xl border border-white/10 bg-slate-900/95 p-4 text-white backdrop-blur">
          {!token ? (
            <div>
              <h3 className="font-semibold">Admin Access</h3>
              <form onSubmit={login} className="mt-3 space-y-2">
                <input className="w-full rounded bg-white/10 px-3 py-2" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input className="w-full rounded bg-white/10 px-3 py-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <div className="flex gap-2">
                  <button className="rounded bg-cyan-500 text-black font-medium px-3 py-2">Login</button>
                  <button onClick={setupAdmin} type="button" className="rounded bg-white/10 ring-1 ring-white/20 px-3 py-2">Bootstrap Admin</button>
                </div>
              </form>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Admin Tools</h3>
                <button className="text-sm text-white/70 hover:text-white" onClick={() => setToken('')}>Logout</button>
              </div>

              <form onSubmit={addPdf} className="space-y-2">
                <p className="text-sm text-white/60">Add PDF</p>
                <input className="w-full rounded bg-white/10 px-3 py-2" placeholder="Title" value={pdf.title} onChange={(e) => setPdf({ ...pdf, title: e.target.value })} required />
                <input className="w-full rounded bg-white/10 px-3 py-2" placeholder="Description" value={pdf.description} onChange={(e) => setPdf({ ...pdf, description: e.target.value })} />
                <input className="w-full rounded bg-white/10 px-3 py-2" placeholder="PDF URL (https://...)" type="url" value={pdf.url} onChange={(e) => setPdf({ ...pdf, url: e.target.value })} required />
                <input className="w-full rounded bg-white/10 px-3 py-2" placeholder="Tags (comma separated)" value={pdf.tags} onChange={(e) => setPdf({ ...pdf, tags: e.target.value })} />
                <button className="w-full rounded bg-cyan-500 text-black font-medium px-3 py-2">Save PDF</button>
              </form>

              <form onSubmit={addCheckup} className="space-y-2">
                <p className="text-sm text-white/60">Record Check-up</p>
                <input className="w-full rounded bg-white/10 px-3 py-2" placeholder="Patient name (optional)" value={checkup.patient_name} onChange={(e) => setCheckup({ ...checkup, patient_name: e.target.value })} />
                <input className="w-full rounded bg-white/10 px-3 py-2" placeholder="Department" value={checkup.department} onChange={(e) => setCheckup({ ...checkup, department: e.target.value })} />
                <input className="w-full rounded bg-white/10 px-3 py-2" placeholder="Notes" value={checkup.notes} onChange={(e) => setCheckup({ ...checkup, notes: e.target.value })} />
                <input className="w-full rounded bg-white/10 px-3 py-2" placeholder="Date (optional)" type="datetime-local" value={checkup.date} onChange={(e) => setCheckup({ ...checkup, date: e.target.value })} />
                <button className="w-full rounded bg-cyan-500 text-black font-medium px-3 py-2">Save Check-up</button>
              </form>
            </div>
          )}

          {message && <p className="mt-3 text-xs text-cyan-300">{message}</p>}
        </div>
      )}
    </div>
  );
}
