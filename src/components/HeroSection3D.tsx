import { motion } from "framer-motion";
import { Sparkles, Shield, Leaf, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Component() {
  return <div>Component placeholder</div>;
}
export const HeroSection3D = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-12 h-12 text-primary/30"
          animate={{ 
            rotate: 360,
            y: [0, -20, 0]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <Leaf className="w-full h-full" />
        </motion.div>
        
        <motion.div 
          className="absolute top-32 right-20 w-8 h-8 text-secondary/40"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <Shield className="w-full h-full" />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-32 left-1/4 w-10 h-10 text-accent/30"
          animate={{ 
            x: [0, 30, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <Sparkles className="w-full h-full" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 glass rounded-full px-6 py-3 text-sm font-medium"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="gradient-text">Powered by Blockchain Technology</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="text-foreground">Ayurvedic Herb</span>
            <br />
            <span className="gradient-text">Traceability</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Complete transparency from farm to pharmacy. Track every step in your 
            Ayurvedic herbs journey with immutable blockchain records and AI-powered 
            quality verification.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button 
              size="lg" 
              className="group glass hover:glass text-lg px-8 py-6 rounded-2xl"
            >
              <span>Start Tracking</span>
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="glass text-lg px-8 py-6 rounded-2xl border-primary/30 hover:border-primary/50"
            >
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="glass rounded-2xl p-6 card-3d">
              <div className="text-3xl font-bold gradient-text">0</div>
              <div className="text-sm text-muted-foreground mt-1">Herbs Tracked</div>
            </div>
            <div className="glass rounded-2xl p-6 card-3d">
              <div className="text-3xl font-bold gradient-text">0</div>
              <div className="text-sm text-muted-foreground mt-1">Verified Farmers</div>
            </div>
            <div className="glass rounded-2xl p-6 card-3d">
              <div className="text-3xl font-bold gradient-text">0%</div>
              <div className="text-sm text-muted-foreground mt-1">Quality Score</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
};