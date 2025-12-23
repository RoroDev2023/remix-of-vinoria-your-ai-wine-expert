import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";
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
    <section id="collection" className="py-24 bg-background relative overflow-hidden">
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
          <span className="font-body text-sm tracking-widest text-gold uppercase">
            Curated Selection
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mt-4 text-foreground">
            Featured <span className="italic text-gradient-gold">Wines</span>
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-2xl mx-auto">
            Hand-picked by our AI sommelier based on exceptional quality, rare finds, 
            and perfect seasonal pairings.
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
              <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-gold/30 transition-all duration-500 shadow-card hover:shadow-2xl hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative h-80 bg-gradient-to-b from-card to-muted overflow-hidden">
                  <img
                    src={wine.image}
                    alt={wine.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Type Badge */}
                  <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="font-body text-xs font-medium text-foreground">
                      {wine.type}
                    </span>
                  </div>
                  {/* Quick Add Button */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    className="absolute top-4 right-4 bg-gold text-background p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 fill-gold text-gold" />
                    <span className="font-body text-sm text-gold">{wine.rating}</span>
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
                      Add to Cellar
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button variant="gold" size="lg">
            Explore Full Collection
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedWines;
