import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  User, 
  Calendar, 
  FileText, 
  CheckCircle, 
  Factory, 
  FlaskConical,
  Package,
  Leaf
} from "lucide-react";

interface ProvenanceStep {
  id: string;
  type: 'collection' | 'processing' | 'testing' | 'manufacturing';
  title: string;
  location: string;
  date: string;
  actor: string;
  status: 'completed' | 'verified' | 'pending';
  details: Record<string, any>;
  certificates?: string[];
}

interface ProvenanceTimelineProps {
  productId: string;
  steps: ProvenanceStep[];
  productName: string;
  finalLocation?: string;
}

export function ProvenanceTimeline({ productId, steps, productName, finalLocation }: ProvenanceTimelineProps) {
  const getStepIcon = (type: string) => {
    switch (type) {
      case 'collection':
        return Leaf;
      case 'processing':
        return Factory;
      case 'testing':
        return FlaskConical;
      case 'manufacturing':
        return Package;
      default:
        return CheckCircle;
    }
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-primary bg-primary/10';
      case 'verified':
        return 'text-secondary bg-secondary/10';
      case 'pending':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Product Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Package className="h-4 w-4" />
          Product ID: {productId}
        </div>
        <h1 className="text-3xl font-bold text-foreground">{productName}</h1>
        {finalLocation && (
          <div className="flex items-center justify-center gap-2 text-accent">
            <MapPin className="h-4 w-4" />
            Currently at: {finalLocation}
          </div>
        )}
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary"></div>
        
        <div className="space-y-8">
          {steps.map((step, index) => {
            const Icon = getStepIcon(step.type);
            
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                {/* Timeline node */}
                <div className={`absolute left-6 w-4 h-4 rounded-full border-2 border-background ${getStepColor(step.status)} flex items-center justify-center`}>
                  <div className="w-2 h-2 rounded-full bg-current"></div>
                </div>
                
                {/* Content card */}
                <div className="ml-16">
                  <Card className="border-primary/10 hover:shadow-soft transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${getStepColor(step.status)}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{step.title}</CardTitle>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {step.actor}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {step.date}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {step.location}
                              </div>
                            </div>
                          </div>
                        </div>
                        <Badge variant={step.status === 'verified' ? 'default' : 'secondary'}>
                          {step.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      {/* Step details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {Object.entries(step.details).map(([key, value]) => (
                          <div key={key} className="space-y-1">
                            <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </dt>
                            <dd className="text-sm font-medium">{value}</dd>
                          </div>
                        ))}
                      </div>
                      
                      {/* Certificates */}
                      {step.certificates && step.certificates.length > 0 && (
                        <>
                          <Separator className="my-4" />
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              Certificates & Documents
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {step.certificates.map((cert, i) => (
                                <Button key={i} variant="outline" size="sm">
                                  View {cert}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}