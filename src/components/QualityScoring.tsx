import { motion } from "framer-motion";
import { Star, Shield, Award, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface QualityScoringProps {
  score: number;
  factors: {
    purity: number;
    potency: number;
    freshness: number;
    authenticity: number;
  };
  certifications: string[];
}

export function QualityScoring({ score, factors, certifications }: QualityScoringProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreGradient = (score: number) => {
    if (score >= 90) return "from-green-500 to-emerald-600";
    if (score >= 70) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-red-600";
  };

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
      
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            AI Quality Analysis
          </CardTitle>
          <Badge variant="secondary" className="text-xs">
            Real-time
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-6">
        {/* Overall Score */}
        <div className="text-center space-y-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative"
          >
            <div className={`text-6xl font-bold bg-gradient-to-r ${getScoreGradient(score)} bg-clip-text text-transparent`}>
              {score}
            </div>
            <div className="flex justify-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(score / 20) 
                      ? "text-yellow-400 fill-current" 
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </motion.div>
          <p className="text-sm text-muted-foreground">
            Premium Grade Ashwagandha
          </p>
        </div>

        {/* Quality Factors */}
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Quality Factors
          </h4>
          
          {Object.entries(factors).map(([factor, value], index) => (
            <motion.div
              key={factor}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between text-sm">
                <span className="capitalize font-medium">{factor}</span>
                <span className={getScoreColor(value)}>{value}%</span>
              </div>
              <Progress value={value} className="h-2" />
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <Award className="h-4 w-4" />
            Certifications
          </h4>
          <div className="flex flex-wrap gap-2">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Badge variant="outline" className="text-xs">
                  {cert}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}