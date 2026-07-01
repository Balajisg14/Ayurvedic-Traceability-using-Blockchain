import { motion } from "framer-motion";
import { Leaf, Droplets, Recycle, Heart, Award, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface SustainabilityMetric {
  id: string;
  title: string;
  score: number;
  icon: React.ComponentType<any>;
  description: string;
  trend: "up" | "down" | "stable";
  color: string;
}

interface SustainabilityScorecardProps {
  overallScore: number;
  metrics: SustainabilityMetric[];
  certifications: string[];
}

const sustainabilityMetrics: SustainabilityMetric[] = [
  {
    id: "organic",
    title: "Organic Farming",
    score: 95,
    icon: Leaf,
    description: "Pesticide-free cultivation practices",
    trend: "up",
    color: "text-green-500"
  },
  {
    id: "water",
    title: "Water Conservation",
    score: 88,
    icon: Droplets,
    description: "Efficient irrigation and water usage",
    trend: "up",
    color: "text-blue-500"
  },
  {
    id: "waste",
    title: "Waste Management",
    score: 92,
    icon: Recycle,
    description: "Circular economy practices",
    trend: "stable",
    color: "text-purple-500"
  },
  {
    id: "fair-trade",
    title: "Fair Trade",
    score: 87,
    icon: Heart,
    description: "Ethical farmer compensation",
    trend: "up",
    color: "text-red-500"
  }
];

const certifications = [
  "USDA Organic",
  "Fair Trade Certified",
  "Rainforest Alliance",
  "Carbon Neutral",
  "AYUSH Compliance",
  "ISO 14001"
];

export function SustainabilityScorecard({ 
  overallScore = 91, 
  metrics = sustainabilityMetrics,
  certifications: certs = certifications 
}: SustainabilityScorecardProps) {
  
  const getScoreColor = (score: number) => {
    if (score >= 90) return "from-green-500 to-emerald-600";
    if (score >= 70) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-red-600";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return "↗️";
      case "down": return "↘️";
      case "stable": return "➡️";
      default: return "➡️";
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10" />
          
          <CardHeader className="relative text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Award className="h-6 w-6 text-primary" />
              Sustainability Score
            </CardTitle>
          </CardHeader>

          <CardContent className="relative text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative"
            >
              <div className={`text-7xl font-bold bg-gradient-to-r ${getScoreColor(overallScore)} bg-clip-text text-transparent`}>
                {overallScore}
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                Out of 100 - Excellent Performance
              </div>
            </motion.div>

            <div className="flex justify-center space-x-4">
              <Badge variant="secondary" className="text-xs">
                🌱 Carbon Negative
              </Badge>
              <Badge variant="secondary" className="text-xs">
                💧 Water Positive
              </Badge>
              <Badge variant="secondary" className="text-xs">
                🤝 Fair Trade
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden group hover:shadow-lg transition-all">
              <div className={`absolute inset-0 opacity-5 bg-gradient-to-br ${getScoreColor(metric.score)}`} />
              
              <CardContent className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <metric.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{metric.title}</h3>
                      <p className="text-xs text-muted-foreground">{metric.description}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${metric.color}`}>
                      {metric.score}%
                    </div>
                    <div className="text-xs flex items-center gap-1">
                      <span>{getTrendIcon(metric.trend)}</span>
                      <span className="text-muted-foreground">vs last month</span>
                    </div>
                  </div>
                </div>

                <Progress value={metric.score} className="h-2 mb-3" />
                
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="text-xs">
                    {metric.score >= 90 ? "Excellent" : metric.score >= 70 ? "Good" : "Needs Improvement"}
                  </Badge>
                  <TrendingUp className={`h-3 w-3 ${metric.color}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Certifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Certifications & Standards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {certs.map((cert, index) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10"
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <Award className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-medium truncate">{cert}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
              <div className="flex items-start space-x-3">
                <Leaf className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-green-800 dark:text-green-200">
                    Impact Summary
                  </h4>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                    This product supports 127 farmers across 3 regions, conserves 2,400L water per kg, 
                    and maintains 95% organic farming practices. Your purchase contributes to sustainable 
                    livelihoods and environmental conservation.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}