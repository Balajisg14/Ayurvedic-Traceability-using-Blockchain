import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Upload, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function HerbCollector() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    herbName: "",
    scientificName: "",
    harvestDate: new Date().toISOString().split('T')[0],
    harvestTime: new Date().toTimeString().split(' ')[0].slice(0, 5),
    gpsLocation: "",
    soilConditions: "",
    weatherConditions: "",
    qualityRating: "",
    moistureContent: "",
    colorGrade: "",
    certificationFile: null as File | null
  });

  const [batches, setBatches] = useState([
    { id: "BTH001", herb: "Ashwagandha", location: "Field A-12", status: "Processing" },
    { id: "BTH002", herb: "Turmeric", location: "Field B-7", status: "Quality Check" }
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (file: File | null) => {
    setFormData(prev => ({ ...prev, certificationFile: file }));
  };

  const handleSubmit = () => {
    if (!formData.herbName || !formData.scientificName || !formData.gpsLocation) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newBatch = {
      id: `BTH${String(batches.length + 3).padStart(3, '0')}`,
      herb: formData.herbName,
      location: formData.gpsLocation,
      status: "Collected"
    };

    setBatches(prev => [...prev, newBatch]);
    
    // Reset form
    setFormData({
      herbName: "",
      scientificName: "",
      harvestDate: new Date().toISOString().split('T')[0],
      harvestTime: new Date().toTimeString().split(' ')[0].slice(0, 5),
      gpsLocation: "",
      soilConditions: "",
      weatherConditions: "",
      qualityRating: "",
      moistureContent: "",
      colorGrade: "",
      certificationFile: null
    });

    toast.success("New harvest batch recorded successfully!");
  };

  const handleNextStep = () => {
    navigate("/processor");
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => navigate("/")} className="flex items-center gap-2 glass">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <Button onClick={handleNextStep} className="flex items-center gap-2">
            Next Step: Processor
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold gradient-text">Herb Collector Dashboard</h1>
          <p className="text-lg text-muted-foreground">Record harvest data and track collection activities</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Collection Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  New Harvest Entry
                </CardTitle>
                <CardDescription>Record details of your herb collection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="herbName">Herb Name *</Label>
                    <Input
                      id="herbName"
                      value={formData.herbName}
                      onChange={(e) => handleInputChange("herbName", e.target.value)}
                      placeholder="e.g., Ashwagandha"
                      className="glass"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="scientificName">Scientific Name *</Label>
                    <Input
                      id="scientificName"
                      value={formData.scientificName}
                      onChange={(e) => handleInputChange("scientificName", e.target.value)}
                      placeholder="e.g., Withania somnifera"
                      className="glass"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="harvestDate">Harvest Date</Label>
                    <Input
                      id="harvestDate"
                      type="date"
                      value={formData.harvestDate}
                      onChange={(e) => handleInputChange("harvestDate", e.target.value)}
                      className="glass"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="harvestTime">Harvest Time</Label>
                    <Input
                      id="harvestTime"
                      type="time"
                      value={formData.harvestTime}
                      onChange={(e) => handleInputChange("harvestTime", e.target.value)}
                      className="glass"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gpsLocation" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    GPS Location *
                  </Label>
                  <Input
                    id="gpsLocation"
                    value={formData.gpsLocation}
                    onChange={(e) => handleInputChange("gpsLocation", e.target.value)}
                    placeholder="e.g., 30.3165° N, 78.0322° E"
                    className="glass"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="soilConditions">Soil Conditions</Label>
                  <Textarea
                    id="soilConditions"
                    value={formData.soilConditions}
                    onChange={(e) => handleInputChange("soilConditions", e.target.value)}
                    placeholder="Describe soil type, pH, moisture, nutrients..."
                    className="glass"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weatherConditions">Weather Conditions</Label>
                  <Input
                    id="weatherConditions"
                    value={formData.weatherConditions}
                    onChange={(e) => handleInputChange("weatherConditions", e.target.value)}
                    placeholder="e.g., Clear sky, 22°C, 65% humidity"
                    className="glass"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="qualityRating">Quality Rating (1-10)</Label>
                    <Input
                      id="qualityRating"
                      type="number"
                      min="1"
                      max="10"
                      value={formData.qualityRating}
                      onChange={(e) => handleInputChange("qualityRating", e.target.value)}
                      className="glass"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="moistureContent">Moisture %</Label>
                    <Input
                      id="moistureContent"
                      value={formData.moistureContent}
                      onChange={(e) => handleInputChange("moistureContent", e.target.value)}
                      placeholder="e.g., 12.5"
                      className="glass"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="colorGrade">Color Grade</Label>
                    <Input
                      id="colorGrade"
                      value={formData.colorGrade}
                      onChange={(e) => handleInputChange("colorGrade", e.target.value)}
                      placeholder="e.g., A+, Good"
                      className="glass"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certification" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Organic Certification Upload
                  </Label>
                  <Input
                    id="certification"
                    type="file"
                    accept=".pdf,.jpg,.png"
                    onChange={(e) => handleFileUpload(e.target.files?.[0] || null)}
                    className="glass"
                  />
                </div>

                <Button onClick={handleSubmit} className="w-full">
                  Add Harvest Batch
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Live Batches & Map */}
          <div className="space-y-6">
            {/* Current Batches */}
            <Card className="glass card-3d">
              <CardHeader>
                <CardTitle>Active Batches</CardTitle>
                <CardDescription>Your current harvest records</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {batches.map((batch) => (
                  <div key={batch.id} className="p-3 rounded-lg bg-background/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{batch.id}</span>
                      <Badge variant={batch.status === "Collected" ? "default" : "secondary"}>
                        {batch.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{batch.herb}</p>
                    <p className="text-xs text-muted-foreground">{batch.location}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Interactive Map Placeholder */}
            <Card className="glass card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Farm Location Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <MapPin className="h-8 w-8 mx-auto text-primary" />
                    <p className="text-sm text-muted-foreground">3D Interactive Map</p>
                    <p className="text-xs text-muted-foreground">GPS tracking active</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}