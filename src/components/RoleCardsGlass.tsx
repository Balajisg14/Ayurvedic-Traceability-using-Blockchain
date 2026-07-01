import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RoleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  delay: number;
}

const RoleCardGlass = ({ title, description, icon: Icon, onClick, delay }: RoleCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass rounded-3xl p-8 card-3d group cursor-pointer"
      onClick={onClick}
    >
      <div className="space-y-6">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto glass rounded-2xl flex items-center justify-center group-hover:pulse-glow transition-all duration-300">
          <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
        </div>

        {/* Content */}
        <div className="text-center space-y-3">
          <h3 className="text-xl font-bold text-foreground group-hover:gradient-text transition-all duration-300">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Button */}
        <Button 
          variant="outline" 
          className="w-full glass border-primary/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
        >
          Get Started
        </Button>
      </div>
    </motion.div>
  );
};

interface RoleCardsGlassProps {
  roles: Array<{
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
  }>;
  onRoleSelect: (roleId: string) => void;
}

export const RoleCardsGlass = ({ roles, onRoleSelect }: RoleCardsGlassProps) => {
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
            <span className="gradient-text">Choose Your Role</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select your role in the Ayurvedic supply chain to access your specialized interface
          </p>
        </motion.div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <RoleCardGlass
              key={role.id}
              title={role.title}
              description={role.description}
              icon={role.icon}
              onClick={() => onRoleSelect(role.id)}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};