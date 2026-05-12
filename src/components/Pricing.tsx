import React from 'react';
import { motion } from "motion/react";
import { Check } from "lucide-react";

const plans = [
  { name: "Day Pass", price: "$25", features: ["1 Day Access", "High Speed WiFi", "1 Premium Brew", "Open Desk Seating"] },
  { name: "Creator Pass", price: "$180", features: ["Weekly Access", "Unlimited Coffee", "Private Booth Booking", "Community Events", "Priority WiFi"], featured: true },
  { name: "Orbit Unlimited", price: "$490", features: ["24/7 Entry", "Dedicated Desk", "Locker Space", "Partner Discounts", "Guest Passes"], accent: true },
];

export default function Pricing() {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      const top = element.offsetTop;
      window.scrollTo({
        top: top - 80, // Offset for navbar
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-light text-orbit-cream mb-6">Choose Your <span className="text-orbit-accent italic font-serif">Orbit.</span></h2>
          <p className="text-orbit-gray max-w-md mx-auto">Flexible plans for every type of seeker. No long term contracts.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`p-10 rounded-3xl flex flex-col items-center text-center relative overflow-hidden transition-all duration-500 border ${
                plan.featured ? "bg-white/[0.08] border-orbit-accent/40 shadow-2xl shadow-orbit-accent/10" : "bg-white/[0.02] border-white/5"
              }`}
            >
              {plan.featured && (
                 <div className="absolute top-6 right-8 bg-orbit-accent text-orbit-bg text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                   Recommended
                 </div>
              )}
              
              <h3 className="font-display text-xl mb-2 text-orbit-gray">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-display font-medium text-orbit-cream">{plan.price}</span>
                <span className="text-orbit-gray text-sm">/mo</span>
              </div>

              <div className="w-full space-y-4 mb-10 text-left">
                {plan.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-3">
                    <Check size={16} className="text-orbit-accent" />
                    <span className="text-sm text-orbit-gray font-light">{feat}</span>
                  </div>
                ))}
              </div>

              <a 
                href="#contact" 
                onClick={scrollToContact}
                className={`w-full py-4 rounded-xl font-bold tracking-[0.2em] text-[10px] uppercase transition-all flex items-center justify-center cursor-pointer relative z-10 ${
                  plan.featured 
                    ? "bg-orbit-accent text-orbit-bg hover:scale-[1.02] hover:shadow-lg hover:shadow-orbit-accent/20" 
                    : "border border-white/10 hover:bg-white/5 text-orbit-cream"
                }`}
              >
                JOIN NOW
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
