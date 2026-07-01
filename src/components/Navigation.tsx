import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Bell, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";

interface NavigationProps {
  onRoleSelect?: (role: string) => void;
  currentRole?: string | null;
}

export function Navigation({ onRoleSelect, currentRole }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications] = useState(3); // Mock notification count

  const navItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "analytics", label: "Analytics" },
    { id: "marketplace", label: "Marketplace" },
    { id: "community", label: "Community" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center space-x-2 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => onRoleSelect?.("home")}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            AyurTrace
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              className="text-sm font-medium transition-colors hover:text-primary relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onRoleSelect?.(item.id)}
            >
              {item.label}
              {item.id === "dashboard" && currentRole && (
                <motion.div
                  className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Right side icons */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {notifications}
                </Badge>
              )}
            </Button>
          </motion.div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User Profile */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </Button>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-background/95 backdrop-blur"
          >
            <div className="container py-4 space-y-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  className="block w-full text-left px-4 py-2 text-sm font-medium transition-colors hover:text-primary hover:bg-accent rounded-md"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onRoleSelect?.(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}