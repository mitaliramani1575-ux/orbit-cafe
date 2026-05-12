import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background with cinematic blur */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-orbit-bg via-orbit-bg/80 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop"
          alt="Orbit Café Interior"
          className="w-full h-full object-cover scale-110 blur-sm"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit"
          >
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest font-semibold">Open 24/7 • 82% Occupancy</span>
          </motion.div>
          
          <h1 className="text-7xl md:text-8xl font-display font-light text-orbit-cream leading-[0.9] tracking-tight">
            Where Great <br />
            <span className="italic font-serif text-orbit-accent">Ideas</span> Brew.
          </h1>
          
          <p className="text-lg text-orbit-gray max-w-md leading-relaxed">
            A cinematic coworking sanctuary designed for founders, creators, and deep thinkers. 
            Premium coffee meets immersive productivity.
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <a href="#features" className="px-10 py-4 bg-orbit-accent text-orbit-bg font-bold rounded-lg hover:scale-105 transition-transform cinematic-shadow uppercase tracking-widest text-xs inline-block">
              EXPLORE ORBIT
            </a>
            <a href="#menu" className="px-10 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg font-bold text-orbit-cream hover:bg-white/10 transition-colors uppercase tracking-widest text-xs inline-block">
              SEE MENU
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="hidden lg:block relative"
        >
          <div className="relative z-10 rounded-2xl overflow-hidden cinematic-shadow border border-white/10 group">
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop"
              alt="Orbit Specialty Coffee"
              className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-orbit-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-8 left-8 right-8 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-orbit-warm font-display text-sm tracking-widest uppercase mb-1">Signature Brew</p>
              <p className="text-2xl font-display font-medium">Orbit Dark Roast</p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-orbit-accent/10 blur-[80px] rounded-full" />
          <div className="absolute -bottom-20 -left-10 w-60 h-60 bg-orbit-warm/10 blur-[100px] rounded-full" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
        <div className="w-px h-12 bg-white/20" />
      </motion.div>
    </section>
  );
}
