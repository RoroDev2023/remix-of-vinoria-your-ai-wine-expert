import { motion } from "framer-motion";
import { Award, Leaf, Globe, Heart } from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "We partner only with the world's most prestigious vineyards and winemakers.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Committed to eco-friendly practices and supporting sustainable viticulture.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Sourcing exceptional wines from 50+ wine regions across the globe.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Every bottle is selected with care and expertise by our team and AI.",
  },
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-card relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-body text-sm tracking-widest text-gold uppercase">
              Our Story
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mt-4 mb-6">
              Where Tradition <br />
              <span className="italic text-gradient-gold">Meets Innovation</span>
            </h2>
            <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
              <p>
                Founded by wine enthusiasts and technologists, Vinoria was born from a simple 
                vision: to make exceptional wine accessible to everyone, guided by the 
                intelligence of AI.
              </p>
              <p>
                We believe that the perfect wine shouldn't be discovered by chance. Our AI 
                sommelier learns from centuries of wine wisdom and your personal preferences 
                to create a truly personalized experience.
              </p>
              <p>
                From the rolling hills of Tuscany to the sun-kissed vineyards of Napa Valley, 
                we bring the world's finest wines directly to your table, curated just for you.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-border">
              {[
                { value: "10+", label: "Years Experience" },
                { value: "50+", label: "Wine Regions" },
                { value: "100k+", label: "Bottles Delivered" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl font-semibold text-gold">
                    {stat.value}
                  </div>
                  <div className="font-body text-xs text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Values Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background border border-border rounded-2xl p-6 hover:border-gold/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
