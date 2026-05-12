/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LiveFeatures from "./components/LiveFeatures";
import WorkspaceGrid from "./components/WorkspaceGrid";
import AIDashboard from "./components/AIDashboard";
import CafeMenu from "./components/CafeMenu";
import Community from "./components/Community";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import GalleryPage from "./components/GalleryPage";
import AdminPanel from "./components/AdminPanel";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

import { db, handleFirestoreError, OperationType } from "./lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function HomePage({ submitted, setSubmitted }: { submitted: boolean, setSubmitted: (v: boolean) => void }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const transmission = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      type: (formData.get('message') as string).toLowerCase().includes('membership') ? 'membership' : 'contact',
      status: 'pending',
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, 'transmissions'), transmission);
      setSubmitted(true);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'transmissions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div id="home">
        <Hero />
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div id="features">
          <LiveFeatures />
        </div>
        <div id="spaces">
          <WorkspaceGrid />
        </div>
        <div id="insights">
          <AIDashboard />
        </div>
        <div id="menu">
          <CafeMenu />
        </div>
        <div id="community">
          <Community />
        </div>
        <div id="membership">
          <Pricing />
        </div>
        
        {/* Final CTA / Contact */}
        <section id="contact" className="py-32 px-6 relative overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-8xl font-display font-light tracking-tight text-orbit-cream mb-8 leading-[0.9]">
                Your Next Big <br /> 
                <span className="italic font-serif text-orbit-accent">Idea</span> Starts Here.
              </h2>
              <p className="text-xl text-orbit-gray mb-12 font-light leading-relaxed max-w-2xl mx-auto">
                Coffee, creativity, and community — all under one orbit. 
                Experience the sanctuary designed for deep work.
              </p>
            </div>

            <div className="max-w-xl mx-auto bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
               {submitted ? (
                 <div className="text-center py-12">
                   <div className="w-16 h-16 bg-orbit-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <div className="w-4 h-4 bg-orbit-accent rounded-full animate-pulse" />
                   </div>
                   <h3 className="text-2xl font-display font-medium text-orbit-cream mb-4 uppercase tracking-widest">Transmission Received</h3>
                   <p className="text-orbit-gray text-sm">We've added your request to the orbit. Expect a response shortly.</p>
                   <button onClick={() => setSubmitted(false)} className="mt-8 text-orbit-accent text-[10px] uppercase tracking-[0.2em] font-bold border-b border-orbit-accent pb-1">Send another</button>
                 </div>
               ) : (
                 <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-orbit-accent font-bold">Name</label>
                        <input name="name" type="text" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orbit-accent/50 transition-colors" placeholder="JUAN PÉREZ" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-orbit-accent font-bold">Email</label>
                        <input name="email" type="email" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orbit-accent/50 transition-colors" placeholder="HELLO@ORBIT.COM" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-orbit-accent font-bold">Message</label>
                      <textarea name="message" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm h-32 focus:outline-none focus:border-orbit-accent/50 transition-colors resize-none" placeholder="RESERVE A DESK OR ASK A QUESTION..." />
                    </div>
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full py-4 bg-orbit-accent text-orbit-bg font-bold tracking-[0.2em] rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all text-[10px] uppercase disabled:opacity-50"
                    >
                      {loading ? "Sending..." : "Send Transmission"}
                    </button>
                 </form>
               )}
            </div>
          </div>
          
          {/* Background cinematic elements */}
          <div className="absolute inset-0 z-0">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-orbit-accent/5 blur-[150px] rounded-full" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[300px] bg-orbit-warm/5 blur-[100px] rounded-full rotate-12" />
          </div>
        </section>
      </motion.div>
    </main>
  );
}

export default function App() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="grain relative overflow-x-hidden">
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <HomePage submitted={submitted} setSubmitted={setSubmitted} />
              <Footer />
            </>
          } />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}


