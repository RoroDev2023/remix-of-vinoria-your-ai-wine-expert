import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import teamRahim from "@/assets/team-rahim.png";
import teamFarid from "@/assets/team-farid.png";
import teamZohrab from "@/assets/team-zohrab.png";

const Team = () => {
  const teamMembers = [
    {
      name: "Rahim Askarov",
      role: "Chief Executive Officer",
      image: teamRahim,
      flag: "🇺🇸",
      location: "United States",
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
      description: "Financial strategist with proven track record in building and scaling successful enterprises. Zohrab ensures Vinoria's financial health and sustainable growth.",
      highlights: [
        "CEO of AZZA in Baku, Azerbaijan",
        "50M+ AZN Annual Turnover",
        "Financial Strategy & Planning",
        "Investment Management"
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Leadership Team
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Meet the Visionaries Behind{" "}
              <span className="text-primary">Vinoria</span>
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Our leadership team combines decades of experience in technology, business operations, 
              and finance to revolutionize the wine retail industry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col gap-24">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-12 items-center`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500" />
                    <div className="relative overflow-hidden rounded-3xl shadow-elegant">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-[500px] object-cover object-top"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-6">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{member.flag}</span>
                          <span className="text-foreground font-medium">{member.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl">{member.flag}</span>
                    <div>
                      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                        {member.name}
                      </h2>
                      <p className="text-primary font-semibold text-lg">{member.role}</p>
                    </div>
                  </div>
                  
                  <p className="font-body text-muted-foreground text-lg mb-8 leading-relaxed">
                    {member.description}
                  </p>

                  <div className="space-y-3">
                    <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                      Key Highlights
                    </h3>
                    {member.highlights.map((highlight, i) => (
                      <motion.div
                        key={highlight}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="font-body text-foreground">{highlight}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-24 px-6 bg-card">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Join Our Growing Team
            </h2>
            <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              We're always looking for talented individuals who share our passion for innovation 
              and the art of wine. Be part of the future of wine retail.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              View Open Positions
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Team;
