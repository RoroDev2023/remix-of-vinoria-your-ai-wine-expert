import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Wine, Bot, Cpu } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const navItems = [
    { name: "Simulator", href: "/simulator", isLink: true },
    { name: "How It Works", href: isHomePage ? "#ai-sommelier" : "/#ai-sommelier" },
    { name: "Roadmap", href: "/roadmap", isLink: true },
    { name: "Our Vision", href: isHomePage ? "#about" : "/#about" },
    { name: "Team", href: "/team", isLink: true },
    { name: "Contact", href: isHomePage ? "#contact" : "/#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      {/* Subtle tech accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ width: "100%" }}
      />
      
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Wine className="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-110" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-1 border border-dashed border-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <Bot className="absolute -top-1 -right-1 w-3 h-3 text-primary animate-pulse" />
            </motion.div>
            <span className="font-display text-2xl font-semibold text-foreground tracking-wide">
              Vinoria
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => 
              item.isLink ? (
                <Link
                  key={item.name}
                  to={item.href}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-body text-sm tracking-wide relative group py-2"
                >
                  {item.name}
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-0.5 bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: hoveredItem === item.name ? "100%" : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-body text-sm tracking-wide relative group py-2"
                >
                  {item.name}
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-0.5 bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: hoveredItem === item.name ? "100%" : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </a>
              )
            )}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="gold" size="default" className="group relative overflow-hidden">
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
              />
              <Cpu className="w-4 h-4 mr-1 group-hover:rotate-90 transition-transform duration-300" />
              Find a Store
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-t border-border"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navItems.map((item, index) => 
                item.isLink ? (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-body text-lg py-2 block"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsOpen(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-body text-lg py-2"
                  >
                    {item.name}
                  </motion.a>
                )
              )}
              <Button variant="gold" size="lg" className="mt-4">
                Find a Store
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;