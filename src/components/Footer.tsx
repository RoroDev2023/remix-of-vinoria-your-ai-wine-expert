import { motion } from "framer-motion";
import { Wine, Sparkles, Instagram, Facebook, Twitter, ArrowRight, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const footerLinks = {
    Shop: ["All Wines", "Red Wines", "White Wines", "Rosé", "Champagne"],
    Company: ["Our Story", "Careers", "Press", "Partners"],
    Support: ["Contact", "FAQ", "Shipping", "Returns"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"]
  };

  return (
    <footer id="contact" className="bg-background border-t border-border relative overflow-hidden">
      {/* Background tech pattern */}
      <div className="absolute inset-0 tech-dots opacity-20" />
      
      {/* Newsletter Section */}
      <div className="container mx-auto px-6 py-16 relative z-10">
        <motion.div 
          className="bg-card rounded-3xl p-8 md:p-12 border border-border relative overflow-hidden"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {/* Animated background glow */}
          <motion.div
            animate={{ 
              opacity: isHovered ? 0.15 : 0.08,
              scale: isHovered ? 1.1 : 1
            }}
            className="absolute -top-20 -right-20 w-80 h-80 bg-primary rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              opacity: isHovered ? 0.12 : 0.05,
              scale: isHovered ? 1.1 : 1
            }}
            className="absolute -bottom-20 -left-20 w-60 h-60 bg-gold rounded-full blur-3xl"
          />
          
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.h3 
                className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4"
                animate={{ x: isHovered ? 4 : 0 }}
              >
                Join the <span className="italic text-gradient-gold">Vinoria</span> Club
              </motion.h3>
              <p className="font-body text-muted-foreground">
                Get exclusive access to rare wines, early releases, and personalized recommendations 
                from our AI sommelier.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-muted border border-border rounded-xl pl-11 pr-4 py-3 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all" 
                />
              </div>
              <Button variant="gold" size="lg" className="group relative overflow-hidden">
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
                Subscribe
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.a 
              href="#" 
              className="flex items-center gap-3 mb-6 group"
              whileHover={{ x: 4 }}
            >
              <div className="relative">
                <Wine className="w-8 h-8 text-gold" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-1 border border-dashed border-gold/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-gold-light" />
              </div>
              <span className="font-display text-2xl font-semibold text-foreground">
                Vinoria
              </span>
            </motion.a>
            <p className="font-body text-sm text-muted-foreground mb-6 max-w-xs">
              Your AI-powered journey to discovering exceptional wines, 
              curated for your unique palate.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" }
              ].map(({ Icon, label }, index) => (
                <motion.a 
                  key={index} 
                  href="#" 
                  aria-label={label}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display text-sm font-semibold text-foreground mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link}>
                    <motion.a 
                      href="#" 
                      className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors relative inline-block"
                      onHoverStart={() => setHoveredLink(link)}
                      onHoverEnd={() => setHoveredLink(null)}
                      whileHover={{ x: 4 }}
                    >
                      {link}
                      <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: hoveredLink === link ? 1 : 0 }}
                        className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary origin-left"
                      />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-body text-sm text-muted-foreground">
            © 2025 Vinoria. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-green-500"
            />
            <p className="font-body text-xs text-muted-foreground">
              All systems operational
            </p>
          </div>
          <p className="font-body text-xs text-muted-foreground">
            Must be 18+ to purchase. Please drink responsibly.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
