import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Clock, Briefcase } from 'lucide-react';

const positions = [
  {
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "We're looking for an experienced Full Stack Developer to help build and scale our review management platform."
  },
  {
    title: "Product Manager",
    department: "Product",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "Join us in shaping the future of customer feedback management as a Product Manager."
  },
  {
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Remote",
    type: "Full-time",
    description: "Help our customers succeed by providing exceptional support and guidance."
  },
  {
    title: "Marketing Manager",
    department: "Marketing",
    location: "New York, NY",
    type: "Full-time",
    description: "Drive our marketing efforts and help us reach more businesses who can benefit from our platform."
  }
];

const benefits = [
  "Competitive salary and equity",
  "Health, dental, and vision insurance",
  "Unlimited PTO",
  "Remote-first culture",
  "Professional development budget",
  "Home office stipend",
  "401(k) matching",
  "Regular team retreats"
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={false} />

      <main>
        {/* Hero Section */}
        <motion.section 
          className="relative py-20 overflow-hidden bg-gradient-to-b from-primary/10 to-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Join Our Team
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Help us transform how businesses manage and leverage customer feedback
            </motion.p>
          </div>
        </motion.section>

        {/* Open Positions */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Open Positions
            </motion.h2>
            
            <motion.div 
              className="grid md:grid-cols-2 gap-6"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {positions.map((position, index) => (
                <motion.div key={index} variants={item}>
                  <Card className="p-6 h-full hover:border-primary transition-colors">
                    <h3 className="text-xl font-semibold mb-2">{position.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        <span>{position.department}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{position.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{position.type}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-6">{position.description}</p>
                    <Button className="w-full">Apply Now</Button>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-12">Why Join Us?</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="p-4 rounded-lg bg-card border"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {benefit}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}