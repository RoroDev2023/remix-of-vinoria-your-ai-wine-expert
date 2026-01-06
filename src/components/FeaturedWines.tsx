import { motion } from "framer-motion";
import { useState } from "react";
import { Star, MapPin, Eye, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import wineBottle1 from "@/assets/wine-bottle-1.jpg";
import wineBottle2 from "@/assets/wine-bottle-2.jpg";
import wineBottle3 from "@/assets/wine-bottle-3.jpg";

const wines = [
  {
    id: 1,
    name: "Château Margaux",
    region: "Bordeaux, France",
    year: 2018,
    price: 285,
    rating: 4.9,
    type: "Red",
    image: wineBottle1,
  },
  {
    id: 2,
    name: "Domaine Leflaive",
    region: "Burgundy, France",
    year: 2020,
    price: 195,
    rating: 4.8,
    type: "White",
    image: wineBottle2,
  },
  {
    id: 3,
    name: "Whispering Angel",
    region: "Provence, France",
    year: 2022,
    price: 45,
    rating: 4.7,
    type: "Rosé",
    image: wineBottle3,
  },
];

const FeaturedWines = () => {
  const [hoveredWine, setHoveredWine] = useState<number | null>(null);

  return (
    <section id="collection" className="py-24 bg-card relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wines-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="1" fill="hsl(var(--primary))" opacity="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wines-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span 
            className="inline-flex items-center gap-2 font-body text-sm tracking-widest text-primary uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4" />
            In Our Stores
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mt-6 text-foreground">
            Featured <span className="italic text-gradient-wine">Wines</span>
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-2xl mx-auto">
            A glimpse of the exceptional wines available in our automated stores — 
            curated by our AI sommelier based on quality, rarity, and seasonal pairings.
          </p>
        </motion.div>

        {/* Wine Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wines.map((wine, index) => (
            <motion.div
              key={wine.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
              onMouseEnter={() => setHoveredWine(wine.id)}
              onMouseLeave={() => setHoveredWine(null)}
            >
              <motion.div 
                className="bg-background rounded-2xl overflow-hidden border border-border transition-all duration-500 shadow-card relative"
                whileHover={{ y: -8, boxShadow: "0 25px 50px -12px hsl(var(--primary) / 0.15)" }}
              >
                {/* Animated border glow */}
                <motion.div 
                  className="absolute -inset-0.5 bg-gradient-to-r from-primary via-gold to-primary rounded-2xl opacity-0 group-hover:opacity-50 blur-sm transition-opacity duration-500 -z-10"
                  animate={hoveredWine === wine.id ? { 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                  } : {}}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ backgroundSize: "200% 200%" }}
                />

                {/* Image Container */}
                <div className="relative h-80 bg-gradient-to-b from-muted to-card overflow-hidden">
                  <motion.img
                    src={wine.image}
                    alt={wine.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Tech overlay on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  
                  {/* Quick view button */}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                  >
                    <motion.button
                      className="w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center border border-primary/30 text-primary"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye className="w-5 h-5" />
                    </motion.button>
                  </motion.div>

                  {/* Type Badge */}
                  <motion.div 
                    className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-primary/20"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="font-body text-xs font-medium text-foreground">
                      {wine.type}
                    </span>
                  </motion.div>

                  {/* Corner accents */}
                  <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-primary/30 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-primary/30 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Rating */}
                  <motion.div 
                    className="flex items-center gap-1 mb-3"
                    whileHover={{ x: 4 }}
                  >
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="font-body text-sm text-primary font-medium">{wine.rating}</span>
                    <span className="text-muted-foreground text-xs ml-1">/ 5.0</span>
                  </motion.div>

                  {/* Wine Info */}
                  <h3 className="font-display text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {wine.name}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mb-4">
                    {wine.region} · {wine.year}
                  </p>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between">
                    <div className="font-display text-2xl font-semibold text-foreground">
                      ${wine.price}
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="outline_wine" size="sm" className="group/btn">
                        <span className="group-hover/btn:text-primary transition-colors">Find in Store</span>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Store Finder CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button variant="gold" size="lg" className="group relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Find a Vinoria Store
              </span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-gold via-primary to-gold opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundSize: "200% 100%" }}
                animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedWines;