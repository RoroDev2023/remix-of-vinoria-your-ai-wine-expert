import { Wine, Bot, Instagram, Linkedin, Twitter } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  const footerLinks = {
    Company: ["Our Vision", "Technology", "Careers", "Press"],
    Stores: ["Find Locations", "Opening Hours", "Accessibility", "Partners"],
    Support: ["FAQ", "Contact", "How It Works", "Feedback"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  };

  return (
    <footer id="contact" className="bg-card border-t border-border">
      {/* Newsletter Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="bg-background rounded-3xl p-8 md:p-12 border border-border relative overflow-hidden shadow-card">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Stay Updated with <span className="italic text-gradient-wine">Vinoria</span>
              </h3>
              <p className="font-body text-muted-foreground">
                Be the first to know about new store openings, AI features, 
                and exclusive offers from our automated wine experience.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-card border border-border rounded-xl px-4 py-3 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
              />
              <Button variant="gold" size="lg">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-6">
              <div className="relative">
                <Wine className="w-8 h-8 text-primary" />
                <Bot className="absolute -top-1 -right-1 w-3 h-3 text-primary" />
              </div>
              <span className="font-display text-2xl font-semibold text-foreground">
                Vinoria
              </span>
            </a>
            <p className="font-body text-sm text-muted-foreground mb-6 max-w-xs">
              The future of wine shopping. AI-powered hologram sommeliers 
              in fully automated stores, open 24/7.
            </p>
            <div className="flex gap-4">
              {[Instagram, Linkedin, Twitter].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
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
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-sm text-muted-foreground">
            © 2024 Vinoria. All rights reserved.
          </p>
          <p className="font-body text-xs text-muted-foreground">
            Must be 21+ to purchase. Please drink responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;