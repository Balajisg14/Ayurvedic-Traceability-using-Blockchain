import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Leaf, Factory, FlaskConical, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface MapLocation {
  id: string;
  type: "collection" | "processing" | "lab" | "manufacturing";
  lat: number;
  lng: number;
  title: string;
  status: "active" | "completed" | "pending";
  details?: any;
}

const mockLocations: MapLocation[] = [
  {
    id: "1",
    type: "collection",
    lat: 30.0668,
    lng: 79.0193,
    title: "Uttarakhand Highlands",
    status: "completed",
    details: { species: "Ashwagandha", quantity: "25.4 kg" }
  },
  {
    id: "2",
    type: "lab",
    lat: 30.3165,
    lng: 78.0322,
    title: "Dehradun Testing Lab",
    status: "completed",
    details: { testResult: "Passed", quality: "Premium" }
  },
  {
    id: "3",
    type: "processing",
    lat: 30.2747,
    lng: 79.4183,
    title: "Processing Facility",
    status: "active",
    details: { batchSize: "100 kg", progress: "Drying" }
  },
  {
    id: "4",
    type: "manufacturing",
    lat: 28.7041,
    lng: 77.1025,
    title: "Delhi Manufacturing",
    status: "pending",
    details: { capacity: "5000 units", eta: "2 days" }
  }
];

const getLocationIcon = (type: string) => {
  switch (type) {
    case "collection": return Leaf;
    case "processing": return Factory;
    case "lab": return FlaskConical;
    case "manufacturing": return Package;
    default: return MapPin;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed": return "text-green-500";
    case "active": return "text-blue-500";
    case "pending": return "text-yellow-500";
    default: return "text-gray-500";
  }
};

export function InteractiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [viewMode, setViewMode] = useState<"satellite" | "terrain">("terrain");

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold">Supply Chain Map</h2>
          <p className="text-muted-foreground">Real-time tracking of your herb journey</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "terrain" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("terrain")}
          >
            Terrain
          </Button>
          <Button
            variant={viewMode === "satellite" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("satellite")}
          >
            Satellite
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2"
        >
          <Card className="h-[500px] overflow-hidden">
            <CardContent className="p-0 h-full relative">
              {/* Simple map background */}
              <div 
                className={`w-full h-full ${
                  viewMode === "satellite" 
                    ? "bg-gradient-to-br from-green-800 via-green-600 to-amber-700" 
                    : "bg-gradient-to-br from-green-100 via-green-50 to-amber-50"
                } relative overflow-hidden`}
              >
                {/* Grid lines for map feel */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="absolute border-border" style={{
                      left: `${i * 10}%`,
                      top: 0,
                      bottom: 0,
                      borderLeft: "1px solid"
                    }} />
                  ))}
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="absolute border-border" style={{
                      top: `${i * 10}%`,
                      left: 0,
                      right: 0,
                      borderTop: "1px solid"
                    }} />
                  ))}
                </div>

                {/* Location markers */}
                {mockLocations.map((location, index) => {
                  const Icon = getLocationIcon(location.type);
                  return (
                    <motion.div
                      key={location.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.2 }}
                      className="absolute cursor-pointer"
                      style={{
                        left: `${20 + index * 15}%`,
                        top: `${30 + (index % 2) * 20}%`,
                        transform: "translate(-50%, -50%)"
                      }}
                      onClick={() => setSelectedLocation(location)}
                    >
                      <div className="relative group">
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          className="h-12 w-12 rounded-full bg-card border-2 border-primary flex items-center justify-center shadow-lg"
                        >
                          <Icon className={`h-6 w-6 ${getStatusColor(location.status)}`} />
                        </motion.div>
                        
                        {/* Pulse animation for active locations */}
                        {location.status === "active" && (
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-blue-500"
                            animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}

                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-card border rounded-lg p-2 shadow-lg whitespace-nowrap">
                            <p className="text-xs font-medium">{location.title}</p>
                            <p className={`text-xs ${getStatusColor(location.status)} capitalize`}>
                              {location.status}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {mockLocations.slice(0, -1).map((location, index) => (
                    <motion.path
                      key={`line-${index}`}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: (index + 1) * 0.3, duration: 0.8 }}
                      d={`M ${20 + index * 15}% ${30 + (index % 2) * 20}% L ${20 + (index + 1) * 15}% ${30 + ((index + 1) % 2) * 20}%`}
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      fill="none"
                      className="opacity-60"
                    />
                  ))}
                </svg>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Location Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Location Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedLocation ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const Icon = getLocationIcon(selectedLocation.type);
                      return <Icon className={`h-8 w-8 ${getStatusColor(selectedLocation.status)}`} />;
                    })()}
                    <div>
                      <h3 className="font-semibold">{selectedLocation.title}</h3>
                      <Badge variant="outline" className="text-xs capitalize">
                        {selectedLocation.type}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <Badge 
                        variant={selectedLocation.status === "completed" ? "default" : "secondary"}
                        className="text-xs capitalize"
                      >
                        {selectedLocation.status}
                      </Badge>
                    </div>

                    {selectedLocation.details && Object.entries(selectedLocation.details).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="text-sm font-medium">{value as string}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Click on a location marker to view details
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Legend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { type: "collection", label: "Collection Point", color: "text-green-500" },
                { type: "processing", label: "Processing", color: "text-blue-500" },
                { type: "lab", label: "Quality Testing", color: "text-purple-500" },
                { type: "manufacturing", label: "Manufacturing", color: "text-orange-500" },
              ].map((item) => {
                const Icon = getLocationIcon(item.type);
                return (
                  <div key={item.type} className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${item.color}`} />
                    <span className="text-sm">{item.label}</span>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}