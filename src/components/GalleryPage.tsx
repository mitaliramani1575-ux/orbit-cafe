import { motion } from "motion/react";
import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

const galleryImages = [
  { url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop", title: "Main Sanctuary" },
  { url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop", title: "Signature Brew" },
  { url: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop", title: "The Gallery" },
  { url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=2070&auto=format&fit=crop", title: "Zen Pods" },
  { url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop", title: "Rooftop Lab" },
  { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop", title: "Orbit Lounge" },
  { url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop", title: "Founder Mornings" },
  { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop", title: "No-Code Workshop" },
  { url: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?q=80&w=2071&auto=format&fit=crop", title: "VC Pitch Night" },
  { url: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=2070&auto=format&fit=crop", title: "Corner Focus" },
  { url: "https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?q=80&w=2070&auto=format&fit=crop", title: "Evening Glow" },
  { url: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=2071&auto=format&fit=crop", title: "Acoustic Pod" },
];

export default function GalleryPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-orbit-bg grain py-24 px-6 md:px-12">
      <nav className="fixed top-0 left-0 right-0 z-50 glass py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <Logo className="w-10 h-10" />
          <span className="font-display font-bold text-lg tracking-[0.2em] uppercase text-orbit-cream">Orbit Café</span>
        </div>
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orbit-accent hover:text-orbit-cream transition-colors"
        >
          <Home size={16} /> Back to Home
        </button>
      </nav>

      <div className="max-w-7xl mx-auto mt-12">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-display font-light text-orbit-cream mb-6 leading-[0.9] tracking-tighter"
          >
            Visual <span className="italic font-serif text-orbit-accent">Archive.</span>
          </motion.h1>
          <p className="text-orbit-gray text-lg max-w-2xl mx-auto uppercase tracking-widest text-[10px] font-bold">
            A window into the sanctuary of deep work and creativity.
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {galleryImages.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="relative group overflow-hidden rounded-2xl border border-white/10 cinematic-shadow break-inside-avoid"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orbit-bg/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <span className="text-[10px] uppercase tracking-[0.2em] text-orbit-accent font-bold mb-1 block">Space Perspective</span>
                <h3 className="text-xl font-display font-light text-orbit-cream">{img.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <footer className="mt-32 pt-20 border-t border-white/5 text-center">
         <button 
           onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }}
           className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-8 hover:border-orbit-accent group transition-all"
         >
           <ArrowLeft className="rotate-90 text-orbit-gray group-hover:text-orbit-accent" />
         </button>
         <p className="text-[10px] uppercase tracking-[0.3em] text-orbit-gray font-medium">© 2024 Orbit Workspace Group</p>
      </footer>
    </div>
  );
}
