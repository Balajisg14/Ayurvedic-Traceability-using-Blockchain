import { motion } from "framer-motion";
import { QrCode, Smartphone, Eye, Shield, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const ConsumerQRPortal = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">Consumer QR Portal</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Scan any product QR code to see its complete journey from farm to shelf
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - QR Scanner */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass rounded-3xl p-8 card-3d">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 mx-auto glass rounded-3xl flex items-center justify-center pulse-glow">
                  <QrCode className="w-10 h-10 text-primary" />
                </div>
                
                <h3 className="text-2xl font-bold gradient-text">Scan Product QR Code</h3>
                
                <div className="space-y-4">
                  <Button 
                    size="lg" 
                    className="w-full glass text-lg py-6 rounded-2xl"
                  >
                    <Smartphone className="w-5 h-5 mr-2" />
                    Open Camera Scanner
                  </Button>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-muted"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-background text-muted-foreground">or</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Enter product code manually" 
                      className="glass border-primary/30 focus:border-primary/50"
                    />
                    <Button variant="outline" className="glass border-primary/30">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Demo Codes */}
            <div className="glass rounded-2xl p-6">
              <h4 className="font-semibold mb-4 text-center gradient-text">Try Demo Codes</h4>
              <div className="grid grid-cols-2 gap-3">
                {["ASH001", "TUR002", "BRA003", "NEM004"].map((code) => (
                  <Button 
                    key={code}
                    variant="outline" 
                    size="sm"
                    className="glass border-primary/30 hover:border-primary/50"
                  >
                    {code}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold mb-8">
              What You'll <span className="gradient-text">Discover</span>
            </h3>

            {[
              {
                icon: Shield,
                title: "Authenticity Verification",
                description: "Confirm your product is genuine with blockchain-verified records"
              },
              {
                icon: Eye,
                title: "Complete Journey",
                description: "See the full path from harvest location to your hands"
              },
              {
                icon: CheckCircle2,
                title: "Quality Certificates",
                description: "Access all lab tests, certifications, and quality scores"
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 card-3d flex items-start gap-4"
              >
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-primary float">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">{benefit.title}</h4>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </motion.div>
            ))}

            {/* Sample QR Display */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <div className="w-32 h-32 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <QrCode className="w-16 h-16 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Sample QR Code - Scan to see demo journey
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};