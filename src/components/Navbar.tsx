import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Wine, Bot } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const navItems = [
    { name: "How It Works", href: isHomePage ? "#ai-sommelier" : "/#ai-sommelier" },
    { name: "Our Vision", href: isHomePage ? "#about" : "/#about" },
    { name: "Team", href: "/team", isLink: true },
    { name: "Contact", href: isHomePage ? "#contact" : "/#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Wine className="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-110" />
              <Bot className="absolute -top-1 -right-1 w-3 h-3 text-primary animate-pulse" />
            </div>
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
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-body text-sm tracking-wide relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-body text-sm tracking-wide relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              )
            )}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="gold" size="default">
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