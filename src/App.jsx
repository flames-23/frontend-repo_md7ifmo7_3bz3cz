import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Resources from './components/Resources';
import Analytics from './components/Analytics';
import Footer from './components/Footer';
import AdminBar from './components/AdminBar';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <Resources />
      <Analytics />
      <Footer />
      <AdminBar />
    </div>
  );
}

export default App;
