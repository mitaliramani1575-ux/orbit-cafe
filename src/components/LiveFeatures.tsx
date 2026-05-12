import { motion } from "motion/react";
import { Wifi, Clock, ShieldCheck, Coffee, Users, Cloud } from "lucide-react";

const features = [
  { icon: Wifi, title: "Fiber Optic", desc: "Gigabit speeds for heavy workflows." },
  { icon: Clock, title: "24/7 Access", desc: "For the late-night visionaries." },
  { icon: ShieldCheck, title: "Silent Pods", desc: "Total isolation for deep focus." },
  { icon: Users, title: "Community", desc: "Network with top tier creators." },
  { icon: Coffee, title: "Luxury Brew", desc: "Unlimited premium coffee & tea." },
  { icon: Cloud, title: "Cloud Sync", desc: "Shared displays & creative tools." },
];

export default function LiveFeatures() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-light text-orbit-cream mb-6"
          >
            Built for <span className="text-orbit-accent italic font-serif">Performance</span>
          </motion.h2>
          <p className="text-orbit-gray max-w-lg mx-auto">
            We've engineered every detail of Orbit Café to maximize your creative output.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-8 group relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:bg-orbit-accent group-hover:text-orbit-bg transition-colors duration-300">
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-display font-medium mb-3">{item.title}</h3>
              <p className="text-white/40 leading-relaxed">{item.desc}</p>
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-orbit-accent/5 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
