import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import teamRahim from "@/assets/team-rahim.png";
import teamFarid from "@/assets/team-farid.png";
import teamZohrab from "@/assets/team-zohrab.png";
import { Sparkles, TrendingUp, Globe, Briefcase } from "lucide-react";

const Team = () => {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  const teamMembers = [
    {
      name: "Rahim Askarov",
      role: "Chief Executive Officer",
      image: teamRahim,
      flag: "🇺🇸",
      location: "United States",
      icon: Sparkles,
      description: "Visionary entrepreneur with a passion for merging cutting-edge AI technology with the timeless art of wine selection. Rahim leads Vinoria with an unwavering commitment to innovation and customer experience.",
      highlights: [
        "Strategic Vision & Leadership",
        "AI & Technology Innovation",
        "Customer-Centric Approach",
        "Global Market Expansion"
      ]
    },
    {
      name: "Farid Huseynov",
      role: "Chief Operating Officer",
      image: teamFarid,
      flag: "🇬🇧",
      location: "United Kingdom",
      icon: TrendingUp,
      description: "Operations mastermind with deep roots in successful business ventures. Farid brings unparalleled operational expertise to scale Vinoria's automated stores worldwide.",
      highlights: [
        "Family owns Bridge Group of Companies in Baku",
        "200M+ AZN Annual Turnover",
        "Operational Excellence",
        "Strategic Partnerships"
      ]
    },
    {
      name: "Zohrab Aslanov",
      role: "Chief Financial Officer",
      image: teamZohrab,
      flag: "🇨🇭",
      location: "Switzerland",
      icon: Briefcase,
      description: "Financial strategist with proven track record in building and scaling successful enterprises. Zohrab ensures Vinoria's financial health and sustainable growth.",
      highlights: [
        "CEO of AZZA in Baku",
        "50M+ AZN Annual Turnover",
        "Financial Strategy & Planning",
        "Investment Management"
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <Navbar />
      
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Globe className="w-4 h-4" />
              Leadership Team
            </motion.span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Meet the Visionaries Behind{" "}
              <span className="text-primary relative">
                Vinoria
                <motion.span 
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Our leadership team combines decades of experience in technology, business operations, 
              and finance to revolutionize the wine retail industry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 px-6 relative">
        <div className="container mx-auto">
          <div className="flex flex-col gap-32">
            {teamMembers.map((member, index) => {
              const Icon = member.icon;
              const isHovered = hoveredMember === member.name;
              
              return (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex flex-col ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-12 lg:gap-16 items-center`}
                  onMouseEnter={() => setHoveredMember(member.name)}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  {/* Image */}
                  <div className="w-full lg:w-1/2">
                    <motion.div 
                      className="relative group cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Tech grid overlay */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl" />
                        <svg className="absolute inset-0 w-full h-full rounded-2xl" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <pattern id={`grid-${index}`} width="40" height="40" patternUnits="userSpaceOnUse">
                              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.3"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
                        </svg>
                      </div>

                      {/* Animated border */}
                      <motion.div 
                        className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl opacity-0 group-hover:opacity-75 blur-sm transition-opacity duration-500"
                        animate={isHovered ? { 
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                        } : {}}
                        transition={{ duration: 3, repeat: Infinity }}
                        style={{ backgroundSize: "200% 200%" }}
                      />
                      
                      <div className="relative overflow-hidden rounded-2xl bg-card border border-border">
                        <div className="aspect-[3/4] overflow-hidden">
                          <motion.img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover object-center"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.6 }}
                          />
                        </div>
                        
                        {/* Bottom info overlay */}
                        <motion.div 
                          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/90 to-transparent p-6"
                          initial={{ opacity: 0.8 }}
                          whileHover={{ opacity: 1 }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-3xl">{member.flag}</span>
                              <span className="text-foreground font-medium">{member.location}</span>
                            </div>
                            <motion.div 
                              className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20"
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.6 }}
                            >
                              <Icon className="w-5 h-5 text-primary" />
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Corner accents */}
                      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/30 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/30 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-1/2">
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <motion.span 
                          className="text-4xl"
                          animate={isHovered ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          {member.flag}
                        </motion.span>
                        <div>
                          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                            {member.name}
                          </h2>
                          <p className="text-primary font-semibold text-lg flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            {member.role}
                          </p>
                        </div>
                      </div>
                      
                      <p className="font-body text-muted-foreground text-lg mb-8 leading-relaxed">
                        {member.description}
                      </p>

                      <div className="space-y-3">
                        <h3 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                          <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                          Key Highlights
                        </h3>
                        {member.highlights.map((highlight, i) => (
                          <motion.div
                            key={highlight}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            whileHover={{ x: 8 }}
                            className="flex items-center gap-3 group/item cursor-default"
                          >
                            <motion.div 
                              className="w-2 h-2 rounded-full bg-primary group-hover/item:shadow-[0_0_8px_hsl(var(--primary))]"
                              whileHover={{ scale: 1.5 }}
                            />
                            <span className="font-body text-foreground group-hover/item:text-primary transition-colors">
                              {highlight}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-transparent" />
        <div className="container mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Decorative elements */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Join Our Growing Team
            </h2>
            <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              We're always looking for talented individuals who share our passion for innovation 
              and the art of wine. Be part of the future of wine retail.
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">View Open Positions</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundSize: "200% 100%" }}
                animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
              />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Team;
