import { motion } from "motion/react";
import { Link } from "react-router-dom";

const zones = [
  { 
    title: "The Gallery", 
    tag: "Open Workspace", 
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
    col: "md:col-span-2 md:row-span-2"
  },
  { 
    title: "Zen Pods", 
    tag: "Deep Focus", 
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=2070&auto=format&fit=crop",
    col: "md:col-span-1 md:row-span-1"
  },
  { 
    title: "Rooftop Lab", 
    tag: "Creator Zone", 
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
    col: "md:col-span-1 md:row-span-2"
  },
  { 
    title: "Orbit Lounge", 
    tag: "Collaboration", 
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
    col: "md:col-span-1 md:row-span-1"
  },
];

export default function WorkspaceGrid() {
  return (
    <section className="py-24 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-light text-orbit-cream mb-4">Curated <span className="text-orbit-accent italic font-serif">Environments</span></h2>
          <p className="text-orbit-gray">Different tasks require different spaces. We provide them all.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 h-[1000px] md:h-[800px]">
          {zones.map((zone, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className={`${zone.col} relative group overflow-hidden rounded-2xl border border-white/10 cinematic-shadow bg-white/5 cursor-pointer`}
            >
              <Link to="/gallery">
                <img
                  src={zone.img}
                  alt={zone.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.4] group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orbit-bg/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                
                <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div>
                    <span className="text-[10px] tracking-[0.2em] font-display text-orbit-accent uppercase mb-2 block font-bold">{zone.tag}</span>
                    <h3 className="text-3xl font-display font-light text-orbit-cream tracking-tight">{zone.title}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-all duration-500 bg-white/5 backdrop-blur-sm hover:bg-orbit-accent hover:border-orbit-accent hover:text-orbit-bg group/arrow">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-orbit-cream group-hover/arrow:text-orbit-bg transition-colors"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

