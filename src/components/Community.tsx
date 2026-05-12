import { motion } from "motion/react";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const events = [
  { title: "Founder Mornings", type: "Meetup", date: "Every Tues", img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop" },
  { title: "No-Code Workshop", type: "Learn", date: "May 15", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop" },
  { title: "Night Creator Session", type: "Focus", date: "Every Fri", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" },
  { title: "VC Pitch Night", type: "Event", date: "May 28", img: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?q=80&w=2071&auto=format&fit=crop" },
];

export default function Community() {
  return (
    <section className="py-24 relative overflow-hidden bg-white/[0.01]">
       <div className="max-w-7xl mx-auto px-6 mb-16 flex justify-between items-end">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-light text-orbit-cream mb-4">Beyond <span className="text-orbit-accent italic font-serif">Coffee.</span></h2>
            <p className="text-orbit-gray">Join the circle of makers and thinkers.</p>
          </div>
          <Link to="/gallery" className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold hover:gap-4 transition-all text-orbit-accent">
            See All Events <ArrowRight size={18} />
          </Link>
       </div>

       <div className="flex overflow-x-auto pb-12 hide-scrollbar scroll-smooth gap-6 px-6 max-w-7xl mx-auto overflow-y-hidden">
          {events.map((event, idx) => (
            <motion.div
              key={idx}
              className="flex-shrink-0 w-[320px] md:w-[400px]"
              whileHover={{ y: -10 }}
            >
              <Link to="/gallery" className="block">
                <div className="rounded-3xl overflow-hidden glass-card h-[500px] relative group pointer-events-auto cursor-pointer">
                   <img
                     src={event.img}
                     alt={event.title}
                     className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                     referrerPolicy="no-referrer"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-orbit-bg via-transparent to-transparent" />
                   
                   <div className="absolute bottom-8 left-8 right-8">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-2 h-2 rounded-full bg-orbit-accent" />
                        <span className="text-[10px] tracking-widest uppercase text-white/50">{event.type}</span>
                      </div>
                      <h3 className="text-2xl font-display font-medium mb-4">{event.title}</h3>
                      <div className="flex items-center gap-2 text-white/30 text-sm">
                        <Calendar size={16} />
                        {event.date}
                      </div>
                   </div>
                </div>
              </Link>
            </motion.div>
          ))}
       </div>
    </section>
  );
}

