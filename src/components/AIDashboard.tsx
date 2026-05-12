import { motion } from "motion/react";
import { Activity, Signal, Zap, MapPin } from "lucide-react";

export default function AIDashboard() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="glass-card rounded-[40px] p-12 relative overflow-hidden">
          {/* Background decor */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orbit-accent/5 to-transparent pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                <span className="w-2 h-2 rounded-full bg-orbit-accent animate-pulse" />
                <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-orbit-accent">Live Insights</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-display font-light text-orbit-cream mb-8 leading-[1.0]">
                Smart Workspace <br /> <span className="italic font-serif text-orbit-accent">Management.</span>
              </h2>
              
              <p className="text-orbit-gray text-lg mb-10 font-light leading-relaxed">
                Our subtle AI integration monitors noise levels, seat occupancy, and ambient 
                environment to suggest the best spot for your current task.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between h-40">
                  <div className="w-10 h-10 rounded-full bg-orbit-accent/10 flex items-center justify-center">
                    <Activity size={20} className="text-orbit-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-orbit-gray uppercase tracking-tighter mb-1">Focus Score</p>
                    <p className="text-3xl font-display font-medium text-orbit-cream">82%</p>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between h-40">
                  <div className="w-10 h-10 rounded-full bg-orbit-purple/10 flex items-center justify-center">
                    <Signal size={20} className="text-orbit-purple" />
                  </div>
                  <div>
                    <p className="text-xs text-orbit-gray uppercase tracking-tighter mb-1">Free Pods</p>
                    <p className="text-3xl font-display font-medium text-orbit-cream">12</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Mock Dashboard UI */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-[#1C2533] rounded-3xl p-8 cinematic-shadow border border-white/10"
              >
                <div className="flex justify-between items-center mb-8">
                  <h4 className="font-display text-sm uppercase tracking-widest text-white/50">Floor Plan • Live</h4>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400/50" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    { zone: "Creative Studio", status: "Active", load: "Low Noise" },
                    { zone: "Silent Library", status: "Full", load: "Deep Focus" },
                    { zone: "Podcast Room", status: "Reserved", load: "Equipped" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-orbit-accent" />
                        <div>
                          <p className="text-sm font-medium">{item.zone}</p>
                          <p className="text-[10px] text-white/20 uppercase mt-1">{item.load}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-tighter border border-white/10 px-3 py-1 rounded-full">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt-10 border-t border-white/5 flex gap-12">
                   <div>
                     <p className="text-white/20 text-xs uppercase mb-1">Temperature</p>
                     <p className="text-xl font-display">22°C</p>
                   </div>
                   <div>
                     <p className="text-white/20 text-xs uppercase mb-1">Humidity</p>
                     <p className="text-xl font-display">45%</p>
                   </div>
                </div>
              </motion.div>
              
              {/* Drifting glow */}
              <div className="absolute -top-20 -right-10 w-64 h-64 bg-orbit-accent/10 blur-[100px] rounded-full -z-10 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
