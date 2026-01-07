import { motion } from "framer-motion";
import { Star, MapPin, Heart, Eye } from "lucide-react";
import { Button } from "./ui/button";
import wineBottle1 from "@/assets/wine-bottle-1.jpg";
import wineBottle2 from "@/assets/wine-bottle-2.jpg";
import wineBottle3 from "@/assets/wine-bottle-3.jpg";
import { useState } from "react";

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
  const [likedWines, setLikedWines] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLikedWines(prev => 
      prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]
    );
  };

  return (
    <section id="collection" className="py-24 bg-card relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 tech-dots opacity-30" />
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        className="absolute bottom-0 right-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl"
      />

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
            className="font-body text-sm tracking-widest text-primary uppercase inline-block"
            whileHover={{ letterSpacing: "0.2em" }}
            transition={{ duration: 0.3 }}
          >
            In Our Stores
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mt-4 text-foreground">
            Featured <motion.span 
              className="italic text-gradient-wine inline-block"
              whileHover={{ scale: 1.02 }}
            >
              Wines
            </motion.span>
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
              onHoverStart={() => setHoveredWine(wine.id)}
              onHoverEnd={() => setHoveredWine(null)}
              className="group"
            >
              <motion.div 
                className="bg-background rounded-2xl overflow-hidden border border-border hover:border-primary/40 transition-all duration-500 shadow-card hover:shadow-xl relative"
                whileHover={{ y: -8 }}
              >
                {/* Image Container */}
                <div className="relative h-80 bg-gradient-to-b from-muted to-card overflow-hidden">
                  <motion.img
                    src={wine.image}
                    alt={wine.name}
                    className="w-full h-full object-cover"
                    animate={{ scale: hoveredWine === wine.id ? 1.08 : 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Overlay on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredWine === wine.id ? 1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent"
                  />
                  
                  {/* Type Badge */}
                  <motion.div 
                    className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full border border-border"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="font-body text-xs font-medium text-foreground">
                      {wine.type}
                    </span>
                  </motion.div>

                  {/* Action buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: hoveredWine === wine.id ? 1 : 0,
                      y: hoveredWine === wine.id ? 0 : 10
                    }}
                    className="absolute top-4 right-4 flex gap-2"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleLike(wine.id)}
                      className={`w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors ${
                        likedWines.includes(wine.id) 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-background/90 text-foreground hover:bg-primary/10'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${likedWines.includes(wine.id) ? 'fill-current' : ''}`} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-9 h-9 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-primary/10 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                  </motion.div>

                  {/* Quick view indicator */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: hoveredWine === wine.id ? 1 : 0,
                      y: hoveredWine === wine.id ? 0 : 20
                    }}
                    className="absolute bottom-4 left-4 right-4"
                  >
                    <div className="bg-background/95 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
                      <span className="font-body text-sm text-foreground">Quick View</span>
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 relative">
                  {/* Animated border accent */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: hoveredWine === wine.id ? '100%' : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-0 left-0 h-px bg-gradient-to-r from-primary via-primary/50 to-transparent"
                  />
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <motion.div
                      animate={{ rotate: hoveredWine === wine.id ? [0, -10, 10, 0] : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Star className="w-4 h-4 fill-primary text-primary" />
                    </motion.div>
                    <span className="font-body text-sm text-primary font-medium">{wine.rating}</span>
                  </div>

                  {/* Wine Info */}
                  <h3 className="font-display text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {wine.name}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mb-4">
                    {wine.region} · {wine.year}
                  </p>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between">
                    <motion.div 
                      className="font-display text-2xl font-semibold text-foreground"
                      animate={{ scale: hoveredWine === wine.id ? 1.05 : 1 }}
                    >
                      ${wine.price}
                    </motion.div>
                    <Button variant="outline_wine" size="sm" className="group/btn">
                      <span>Find in Store</span>
                      <MapPin className="w-3 h-3 ml-1 group-hover/btn:animate-bounce" />
                    </Button>
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
          className="text-center mt-12"
        >
          <Button variant="gold" size="lg" className="group relative overflow-hidden">
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            <MapPin className="w-5 h-5" />
            Find a Vinoria Store
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedWines;
