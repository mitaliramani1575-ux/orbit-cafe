import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Logo from "./Logo";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-4 glass" : "py-8 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-4">
          <a href="#home" className="flex items-center gap-3 group">
            <Logo className="w-12 h-12 transition-transform group-hover:scale-110" />
            <span className="font-display font-bold text-xl tracking-[0.2em] uppercase text-orbit-cream group-hover:text-orbit-accent transition-colors">Orbit Café</span>
          </a>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest uppercase text-orbit-gray">
          <a href="#home" className="text-orbit-cream hover:text-orbit-accent border-b border-orbit-accent pb-1 transition-colors">Home</a>
          <a href="#spaces" className="hover:text-white transition-colors">Spaces</a>
          <a href="#menu" className="hover:text-white transition-colors">Menu</a>
          <a href="#membership" className="hover:text-white transition-colors">Membership</a>
        </div>

        <div className="hidden md:block">
          <a href="#contact" className="px-6 py-2 rounded-full border border-orbit-accent/40 text-orbit-cream text-xs font-semibold tracking-widest uppercase hover:bg-orbit-accent hover:text-orbit-bg transition-all duration-300">
            BOOK A DESK
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 glass py-8 px-6 flex flex-col gap-6 text-center md:hidden"
        >
          <a href="#spaces" className="text-lg font-display" onClick={() => setMobileMenuOpen(false)}>Workspace</a>
          <a href="#menu" className="text-lg font-display" onClick={() => setMobileMenuOpen(false)}>Café</a>
          <a href="#membership" className="text-lg font-display" onClick={() => setMobileMenuOpen(false)}>Membership</a>
          <a href="#contact" className="w-full py-4 rounded-full bg-orbit-accent text-orbit-bg font-bold inline-block" onClick={() => setMobileMenuOpen(false)}>
            BOOK A TABLE
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
