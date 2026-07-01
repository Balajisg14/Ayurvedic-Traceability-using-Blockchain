import { motion } from "framer-motion";
import { TrendingUp, CheckCircle, Users, Package, Star, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const StatCard = ({ title, value, change, icon: Icon, color }: {
  title: string;
  value: string;
  change: string;
  icon: any;
  color: string;
}) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.02 }}
    className="glass rounded-3xl p-6 card-3d"
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 glass rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <Badge variant="outline" className="glass border-primary/30 text-primary">
        {change}
      </Badge>
    </div>
    <div className="space-y-2">
      <h3 className="text-2xl font-bold gradient-text">{value}</h3>
      <p className="text-sm text-muted-foreground">{title}</p>
    </div>
  </motion.div>
);

export const DashboardHighlights = () => {
  const stats = [
    {
      title: "Total Harvest Records",
      value: "0",
      change: "+12.5%",
      icon: Package,
      color: "text-primary"
    },
    {
      title: "Quality Verified",
      value: "0%",
      change: "+2.1%",
      icon: CheckCircle,
      color: "text-accent"
    },
    {
      title: "Active Farmers",
      value: "0",
      change: "+8.3%",
      icon: Users,
      color: "text-secondary"
    },
    {
      title: "Supply Chain Progress",
      value: "0%",
      change: "+5.7%",
      icon: TrendingUp,
      color: "text-primary"
    },
    {
      title: "Average Quality Score",
      value: "0",
      change: "+0.2",
      icon: Star,
      color: "text-secondary"
    },
    {
      title: "Real-time Tracking",
      value: "Active",
      change: "Live",
      icon: Activity,
      color: "text-accent"
    }
  ];

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
            <span className="gradient-text">Live Dashboard</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time insights into your supply chain performance and quality metrics
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 card-3d"
        >
          <h3 className="text-2xl font-bold mb-6 gradient-text">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { 
                time: "2 minutes ago", 
                activity: "New batch of Ashwagandha processed", 
                location: "Uttarakhand Processing Unit",
                status: "success"
              },
              { 
                time: "15 minutes ago", 
                activity: "Quality test completed for Turmeric batch #TU-2024-156", 
                location: "Regional Lab, Delhi",
                status: "success"
              },
              { 
                time: "1 hour ago", 
                activity: "Herb collection recorded", 
                location: "Himalayan Highlands Farm",
                status: "pending"
              },
              { 
                time: "3 hours ago", 
                activity: "Consumer scan: Premium Brahmi Capsules", 
                location: "Mumbai, Maharashtra",
                status: "info"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-between p-4 glass rounded-2xl"
              >
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.activity}</p>
                  <p className="text-sm text-muted-foreground">{item.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{item.time}</p>
                  <Badge 
                    variant={item.status === 'success' ? 'default' : 'outline'}
                    className="glass border-primary/30"
                  >
                    {item.status}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};