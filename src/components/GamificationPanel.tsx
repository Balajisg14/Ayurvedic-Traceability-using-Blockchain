import { motion } from "framer-motion";
import { Trophy, Star, Target, Award, Zap, Crown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  earned: boolean;
  progress?: number;
  maxProgress?: number;
}

interface GamificationPanelProps {
  userRole: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  achievements: Achievement[];
}

const roleColors = {
  collector: "from-green-500 to-emerald-600",
  processor: "from-blue-500 to-cyan-600",
  lab: "from-purple-500 to-violet-600",
  manufacturer: "from-orange-500 to-amber-600",
  manager: "from-red-500 to-rose-600",
  consumer: "from-pink-500 to-fuchsia-600",
};

export function GamificationPanel({ userRole, level, xp, nextLevelXp, achievements }: GamificationPanelProps) {
  const progressPercentage = (xp / nextLevelXp) * 100;
  const earnedAchievements = achievements.filter(a => a.earned).length;

  return (
    <div className="space-y-6">
      {/* Level & XP Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
      >
        <Card className="relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${roleColors[userRole as keyof typeof roleColors] || roleColors.collector} opacity-10`} />
          
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`h-12 w-12 rounded-full bg-gradient-to-r ${roleColors[userRole as keyof typeof roleColors] || roleColors.collector} flex items-center justify-center`}>
                  <Crown className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Level {level}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{userRole} Expert</p>
                </div>
              </div>
              <Badge variant="secondary" className="text-sm">
                <Zap className="h-3 w-3 mr-1" />
                {xp} XP
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to Level {level + 1}</span>
                <span>{xp}/{nextLevelXp} XP</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Achievements Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Achievements
              <Badge variant="outline" className="ml-auto">
                {earnedAchievements}/{achievements.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className={`relative p-4 rounded-lg border transition-all ${
                    achievement.earned 
                      ? "bg-gradient-to-br from-primary/10 to-transparent border-primary/20" 
                      : "bg-muted/30 border-muted"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      achievement.earned 
                        ? "bg-gradient-primary text-primary-foreground" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      <achievement.icon className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className={`font-medium text-sm ${
                          achievement.earned ? "text-foreground" : "text-muted-foreground"
                        }`}>
                          {achievement.title}
                        </h4>
                        {achievement.earned && (
                          <Badge variant="secondary" className="text-xs px-2 py-0">
                            ✓
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {achievement.description}
                      </p>
                      
                      {!achievement.earned && achievement.progress !== undefined && achievement.maxProgress && (
                        <div className="mt-2 space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Progress</span>
                            <span>{achievement.progress}/{achievement.maxProgress}</span>
                          </div>
                          <Progress 
                            value={(achievement.progress / achievement.maxProgress) * 100} 
                            className="h-1.5" 
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Leaderboard Teaser */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Monthly Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { rank: 1, name: "Farmer Krishna", xp: 2840, role: "collector" },
                { rank: 2, name: "Dr. Sharma Lab", xp: 2650, role: "lab" },
                { rank: 3, name: "You", xp: xp, role: userRole, highlight: true },
              ].map((entry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    entry.highlight ? "bg-primary/10 border border-primary/20" : "bg-muted/30"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      entry.rank === 1 ? "bg-yellow-500 text-white" :
                      entry.rank === 2 ? "bg-gray-400 text-white" :
                      entry.rank === 3 ? "bg-amber-600 text-white" : "bg-muted"
                    }`}>
                      {entry.rank}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{entry.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{entry.role}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {entry.xp} XP
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}