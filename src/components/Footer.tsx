import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="py-20 border-t border-white/5 relative overflow-hidden bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1 text-center md:text-left flex flex-col items-center md:items-start">
             <div className="flex items-center gap-3 mb-6 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                <Logo className="w-12 h-12 transition-transform group-hover:scale-110" />
                <span className="font-display font-medium text-lg tracking-[0.2em] uppercase text-orbit-cream group-hover:text-orbit-accent transition-colors">Orbit Café</span>
             </div>
             <p className="text-orbit-gray text-xs leading-relaxed mb-6 uppercase tracking-wider max-w-[200px]">
               Coffee, creativity, and community — all under one orbit. Tokyo • New York • Berlin.
             </p>
             <Link to="/admin" className="text-[10px] uppercase tracking-widest text-white/20 hover:text-orbit-accent transition-colors font-bold">System Access</Link>
          </div>
          
          <div>
            <h4 className="font-display text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-orbit-accent">Navigation</h4>
            <ul className="space-y-4 text-[10px] uppercase tracking-[0.2em] text-orbit-gray font-medium">
              <li><a href="#spaces" className="hover:text-orbit-cream transition-colors">Workspace</a></li>
              <li><a href="#menu" className="hover:text-orbit-cream transition-colors">Cafe Menu</a></li>
              <li><a href="#insights" className="hover:text-orbit-cream transition-colors">Insights</a></li>
              <li><a href="#membership" className="hover:text-orbit-cream transition-colors">Membership</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-orbit-accent">Hours</h4>
            <ul className="space-y-4 text-[10px] uppercase tracking-[0.2em] text-orbit-gray font-medium">
              <li>Mon - Fri: 7am - 12am</li>
              <li>Sat - Sun: 8am - 10pm</li>
              <li className="text-orbit-cream">Members 24/7</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-orbit-accent">Newsletter</h4>
            <p className="text-[10px] uppercase tracking-[0.2em] text-orbit-gray mb-4">Join the circle of makers.</p>
            <div className="flex bg-white/5 border border-white/10 rounded-lg p-1 overflow-hidden">
              <input type="email" placeholder="ADDRESS" className="bg-transparent border-none outline-none flex-1 px-4 text-[10px] font-bold tracking-widest" />
              <button className="bg-orbit-accent text-orbit-bg px-4 py-2 rounded-md text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all">Submit</button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row gap-6 justify-between items-center text-[10px] uppercase tracking-[0.3em] text-orbit-gray">
          <p>© 2024 Orbit Workspace Group</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-orbit-accent transition-colors">Instagram</a>
            <a href="#" className="hover:text-orbit-accent transition-colors">Spotify</a>
            <a href="#" className="hover:text-orbit-accent transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
      
      {/* Absolute decor */}
      <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-orbit-accent/5 blur-[100px] rounded-full -z-10" />
    </footer>
  );
}
