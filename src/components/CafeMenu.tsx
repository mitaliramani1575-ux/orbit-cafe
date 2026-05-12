import { motion } from "motion/react";

const menuItems = [
  { name: "Orbit Dark Roast", price: "$6.50", category: "Coffee", desc: "Our signature high-altitude beans with notes of dark chocolate." },
  { name: "Kyoto Matcha", price: "$7.00", category: "Tea", desc: "Ceremonial grade stone-ground matcha with oat milk." },
  { name: "Nitro Cold Brew", price: "$6.00", category: "Coffee", desc: "Velvety smooth nitrogen-infused 12-hour cold brew." },
  { name: "Lavender Latte", price: "$7.50", category: "Coffee", desc: "Espresso with house-made lavender syrup and steamed milk." },
  { name: "Matcha Rose", price: "$8.00", category: "Tea", desc: "Ceremonial matcha with a hint of rose and dried petals." },
  { name: "Truffle Croissant", price: "$9.50", category: "Bakery", desc: "Flaky, buttery pastry with wild truffle honey glaze." },
  { name: "Açai Orbit Bowl", price: "$14.00", category: "Bowls", desc: "Organic açai, house-made granola, and seasonal berries." },
  { name: "Avocado Sourdough", price: "$12.00", category: "Bakery", desc: "Fermented sourdough, smashed hass avocado, and chili flakes." },
  { name: "Miso Glazed Salmon Bowl", price: "$16.50", category: "Bowls", desc: "Miso glazed salmon, wild rice, and pickled ginger." },
  { name: "Protein Glow Shot", price: "$5.00", category: "Wellness", desc: "Espresso, collagen, and MCT oil for sustained focus." },
  { name: "Blueberry Hibiscus", price: "$6.50", category: "Wellness", desc: "Anti-oxidant rich hibiscus tea with fresh blueberries and mint." },
  { name: "Burrata & Fig Toast", price: "$13.50", category: "Bakery", desc: "Creamy burrata, mission figs, and honey on dark rye." },
  { name: "Matcha Chia Pudding", price: "$11.00", category: "Bowls", desc: "Chia seeds soaked in matcha almond milk with fruit compote." },
];

export default function CafeMenu() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:sticky lg:top-32 h-fit">
             <h2 className="text-5xl font-display font-light text-orbit-cream mb-8 leading-tight">
               Fuel Your <br /> <span className="text-orbit-accent italic font-serif">Ambition.</span>
             </h2>
             <p className="text-orbit-gray mb-12 max-w-sm">
               An editorial café menu curated for sustained energy and cognitive clarity. 
               No refined sugars, just premium fuel.
             </p>
             <a href="#contact" className="text-orbit-accent font-display tracking-[0.2em] uppercase text-[10px] font-bold border-b border-orbit-accent pb-2 hover:opacity-70 transition-opacity inline-block">
               Download Full Menu (PDF)
             </a>
          </div>

          <div className="lg:col-span-2 space-y-12">
            {menuItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group flex justify-between items-start pb-8 border-b border-white/5 hover:border-white/20 transition-colors"
              >
                <div className="flex-1 pr-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] tracking-widest uppercase text-orbit-accent">{item.category}</span>
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                  </div>
                  <h3 className="text-2xl font-display font-medium mb-2 group-hover:text-orbit-warm transition-colors">{item.name}</h3>
                  <p className="text-white/30 text-sm max-w-md">{item.desc}</p>
                </div>
                <div className="text-xl font-display font-medium text-orbit-accent">
                  {item.price}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
