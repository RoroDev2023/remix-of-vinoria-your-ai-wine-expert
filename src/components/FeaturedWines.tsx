import { motion } from "framer-motion";
import { Star, MapPin } from "lucide-react";
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
  return (
    <section id="collection" className="py-24 bg-card relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-body text-sm tracking-widest text-primary uppercase">
            In Our Stores
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mt-4 text-foreground">
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
            >
              <div className="bg-background rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-500 shadow-card hover:shadow-xl hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative h-80 bg-gradient-to-b from-muted to-card overflow-hidden">
                  <img
                    src={wine.image}
                    alt={wine.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Type Badge */}
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full border border-border">
                    <span className="font-body text-xs font-medium text-foreground">
                      {wine.type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="font-body text-sm text-primary font-medium">{wine.rating}</span>
                  </div>

                  {/* Wine Info */}
                  <h3 className="font-display text-xl font-semibold text-foreground mb-1">
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
                    <Button variant="outline_wine" size="sm">
                      Find in Store
                    </Button>
                  </div>
                </div>
              </div>
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
          <Button variant="gold" size="lg" className="group">
            <MapPin className="w-5 h-5" />
            Find a Vinoria Store
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedWines;