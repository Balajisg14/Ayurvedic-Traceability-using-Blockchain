import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Truck, Package2, MapPin, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function Distributor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    batchId: "",
    packagingMaterial: "",
    ecoRating: "",
    shippingMethod: "",
    trackingNumber: "",
    destination: "",
    expectedDelivery: "",
    specialInstructions: ""
  });

  const [availableBatches] = useState([
    { id: "PB001", herb: "Ashwagandha", processor: "Himalayan Herbs Ltd", qrCode: "QR789012", status: "Ready" },
    { id: "PB002", herb: "Turmeric", processor: "Organic Processing Co", qrCode: "QR456789", status: "Ready" },
    { id: "PB003", herb: "Brahmi", processor: "Hill Station Herbs", qrCode: "QR123456", status: "Packaging" }
  ]);

  const [shipments, setShipments] = useState([
    { 
      id: "SH001", 
      batch: "PB001", 
      destination: "Mumbai Medical Store", 
      status: "In Transit",
      tracking: "TRK789012",
      progress: 65
    },
    { 
      id: "SH002", 
      batch: "PB002", 
      destination: "Delhi Pharmacy Chain", 
      status: "Delivered",
      tracking: "TRK456789",
      progress: 100
    }
  ]);

  const [alerts] = useState([
    { type: "delay", message: "Shipment SH001 delayed by 2 hours due to weather", severity: "warning" },
    { type: "quality", message: "Temperature alert for shipment SH003", severity: "error" }
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateShipment = () => {
    if (!formData.batchId || !formData.destination || !formData.shippingMethod) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newShipment = {
      id: `SH${String(shipments.length + 3).padStart(3, '0')}`,
      batch: formData.batchId,
      destination: formData.destination,
      status: "Preparing" as const,
      tracking: `TRK${Math.random().toString().slice(2, 8)}`,
      progress: 10
    };

    setShipments(prev => [...prev, newShipment]);
    
    // Reset form
    setFormData({
      batchId: "",
      packagingMaterial: "",
      ecoRating: "",
      shippingMethod: "",
      trackingNumber: "",
      destination: "",
      expectedDelivery: "",
      specialInstructions: ""
    });

    toast.success("Shipment created successfully with tracking number generated!");
  };

  const handleNextStep = () => {
    navigate("/retailer");
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
            Next Step: Retailer
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold gradient-text">Distributor Dashboard</h1>
          <p className="text-lg text-muted-foreground">Manage packaging, shipping, and real-time logistics tracking</p>
        </motion.div>

        {/* Smart Alerts */}
        {alerts.length > 0 && (
          <Card className="glass card-3d border-orange-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-500">
                <AlertCircle className="h-5 w-5" />
                Smart Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {alerts.map((alert, index) => (
                <div key={index} className={`p-3 rounded-lg ${
                  alert.severity === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-orange-500/10 text-orange-500'
                }`}>
                  <p className="text-sm">{alert.message}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Shipping Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package2 className="h-5 w-5" />
                  Create New Shipment
                </CardTitle>
                <CardDescription>Package and ship processed herb batches</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="batchId">Select Batch ID *</Label>
                  <Select value={formData.batchId} onValueChange={(value) => handleInputChange("batchId", value)}>
                    <SelectTrigger className="glass">
                      <SelectValue placeholder="Choose a batch to ship" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableBatches.filter(batch => batch.status === "Ready").map((batch) => (
                        <SelectItem key={batch.id} value={batch.id}>
                          {batch.id} - {batch.herb} (QR: {batch.qrCode})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="packagingMaterial">Packaging Material</Label>
                    <Input
                      id="packagingMaterial"
                      value={formData.packagingMaterial}
                      onChange={(e) => handleInputChange("packagingMaterial", e.target.value)}
                      placeholder="e.g., Biodegradable cardboard"
                      className="glass"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ecoRating">Eco Rating</Label>
                    <Select value={formData.ecoRating} onValueChange={(value) => handleInputChange("ecoRating", value)}>
                      <SelectTrigger className="glass">
                        <SelectValue placeholder="Select eco rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+ (Fully Recyclable)</SelectItem>
                        <SelectItem value="A">A (Mostly Recyclable)</SelectItem>
                        <SelectItem value="B">B (Partially Recyclable)</SelectItem>
                        <SelectItem value="C">C (Standard)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shippingMethod">Shipping Method *</Label>
                  <Select value={formData.shippingMethod} onValueChange={(value) => handleInputChange("shippingMethod", value)}>
                    <SelectTrigger className="glass">
                      <SelectValue placeholder="Select shipping method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="express">Express Delivery (1-2 days)</SelectItem>
                      <SelectItem value="standard">Standard Delivery (3-5 days)</SelectItem>
                      <SelectItem value="economy">Economy Delivery (5-7 days)</SelectItem>
                      <SelectItem value="cold-chain">Cold Chain Transport</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Destination *
                  </Label>
                  <Textarea
                    id="destination"
                    value={formData.destination}
                    onChange={(e) => handleInputChange("destination", e.target.value)}
                    placeholder="Retailer name and complete address..."
                    className="glass"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedDelivery">Expected Delivery Date</Label>
                  <Input
                    id="expectedDelivery"
                    type="date"
                    value={formData.expectedDelivery}
                    onChange={(e) => handleInputChange("expectedDelivery", e.target.value)}
                    className="glass"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialInstructions">Special Instructions</Label>
                  <Textarea
                    id="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                    placeholder="Temperature requirements, fragile handling, etc..."
                    className="glass"
                  />
                </div>

                <Button onClick={handleCreateShipment} className="w-full">
                  <Truck className="h-4 w-4 mr-2" />
                  Create Shipment & Generate Tracking
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Live Tracking & Shipments */}
          <div className="space-y-6">
            {/* Live Shipments */}
            <Card className="glass card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Active Shipments
                </CardTitle>
                <CardDescription>Real-time tracking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {shipments.map((shipment) => (
                  <div key={shipment.id} className="p-3 rounded-lg bg-background/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{shipment.id}</span>
                      <Badge variant={shipment.status === "Delivered" ? "default" : "secondary"}>
                        {shipment.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{shipment.destination}</p>
                    <p className="text-xs font-mono text-primary">{shipment.tracking}</p>
                    
                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{shipment.progress}%</span>
                      </div>
                      <div className="w-full bg-secondary/20 rounded-full h-2">
                        <div 
                          className="bg-primary rounded-full h-2 transition-all duration-300" 
                          style={{ width: `${shipment.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Logistics Map */}
            <Card className="glass card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Logistics Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Truck className="h-8 w-8 mx-auto text-primary" />
                    <p className="text-sm text-muted-foreground">Real-time Tracking</p>
                    <p className="text-xs text-muted-foreground">GPS enabled vehicles</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Available Batches */}
            <Card className="glass card-3d">
              <CardHeader>
                <CardTitle>Ready to Ship</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {availableBatches.filter(batch => batch.status === "Ready").map((batch) => (
                  <div key={batch.id} className="p-3 rounded-lg bg-background/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{batch.id}</span>
                      <Badge variant="default">Ready</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{batch.herb}</p>
                    <p className="text-xs text-primary font-mono">{batch.qrCode}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}