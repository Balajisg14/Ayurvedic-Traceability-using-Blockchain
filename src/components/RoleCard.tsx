import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface RoleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  variant?: "farmer" | "processor" | "lab" | "manufacturer" | "manager" | "consumer";
  index: number;
}

export function RoleCard({ title, description, icon: Icon, onClick, variant = "farmer", index }: RoleCardProps) {
  const getCardStyle = () => {
    switch (variant) {
      case "farmer":
        return "bg-gradient-earth hover:shadow-glow border-primary/10";
      case "processor":
        return "bg-gradient-sage hover:shadow-soft border-accent/20";
      case "lab":
        return "bg-gradient-primary hover:shadow-glow border-primary/20";
      case "manufacturer":
        return "bg-gradient-secondary hover:shadow-soft border-secondary/20";
      case "manager":
        return "bg-card hover:shadow-card border-border";
      case "consumer":
        return "bg-gradient-primary hover:shadow-glow border-primary/10";
      default:
        return "bg-card hover:shadow-card border-border";
    }
  };

  const getButtonVariant = () => {
    switch (variant) {
      case "farmer":
        return "farmer" as const;
      case "processor":
        return "sage" as const;
      case "lab":
        return "hero" as const;
      case "manufacturer":
        return "secondary" as const;
      case "consumer":
        return "hero" as const;
      default:
        return "default" as const;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className={`${getCardStyle()} border-2 transition-all duration-300 cursor-pointer h-full`} onClick={onClick}>
        <CardContent className="p-8 text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-foreground">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
          </div>
          
          <Button variant={getButtonVariant()} size="lg" className="w-full">
            Get Started
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}