import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Store, QrCode, Thermometer, ArrowRight, Package, Printer, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function Retailer() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shipmentId: "",
    batchId: "",
    storageTemp: "",
    storageHumidity: "",
    shelfLife: "",
    retailPrice: "",
    skuCode: "",
    storeLocation: "",
    staffNotes: ""
  });

  const [incomingShipments] = useState([
    { 
      id: "SH001", 
      batch: "PB001", 
      herb: "Ashwagandha",
      distributor: "Quick Logistics Ltd", 
      tracking: "TRK789012",
      status: "Arrived",
      arrivalDate: "2024-03-15"
    },
    { 
      id: "SH003", 
      batch: "PB003", 
      herb: "Brahmi",
      distributor: "Express Distribution Co", 
      tracking: "TRK654321",
      status: "In Transit",
      expectedDate: "2024-03-17"
    }
  ]);

  const [inventory, setInventory] = useState([
    { 
      id: "INV001", 
      batch: "PB001", 
      herb: "Ashwagandha",
      quantity: "150 units",
      shelfLife: "24 months",
      price: "₹299",
      sku: "ASH-500-001",
      status: "Active"
    },
    { 
      id: "INV002", 
      batch: "PB002", 
      herb: "Turmeric",
      quantity: "200 units",
      shelfLife: "18 months",
      price: "₹199",
      sku: "TUR-250-002",
      status: "Active"
    }
  ]);

  const [storageConditions] = useState({
    currentTemp: "22°C",
    currentHumidity: "45%",
    status: "Optimal",
    lastCheck: "2 hours ago"
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleReceiveShipment = () => {
    if (!formData.shipmentId || !formData.storageTemp || !formData.retailPrice) {
      toast.error("Please fill in all required fields");
      return;
    }

    const shipment = incomingShipments.find(s => s.id === formData.shipmentId);
    if (!shipment) return;

    const newInventoryItem = {
      id: `INV${String(inventory.length + 3).padStart(3, '0')}`,
      batch: shipment.batch,
      herb: shipment.herb,
      quantity: "100 units",
      shelfLife: formData.shelfLife || "24 months",
      price: `₹${formData.retailPrice}`,
      sku: formData.skuCode || `${shipment.herb.slice(0, 3).toUpperCase()}-${Math.random().toString().slice(2, 5)}`,
      status: "Active"
    };

    setInventory(prev => [...prev, newInventoryItem]);
    
    // Reset form
    setFormData({
      shipmentId: "",
      batchId: "",
      storageTemp: "",
      storageHumidity: "",
      shelfLife: "",
      retailPrice: "",
      skuCode: "",
      storeLocation: "",
      staffNotes: ""
    });

    toast.success("Shipment received and added to inventory successfully!");
  };

  const handlePrintLabel = (item: typeof inventory[0]) => {
    toast.success(`Printing blockchain QR label for ${item.herb} - ${item.sku}`);
  };

  const handleNextStep = () => {
    navigate("/consumer");
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
            Next Step: Consumer Portal
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold gradient-text">Retailer Dashboard</h1>
          <p className="text-lg text-muted-foreground">Manage inventory, verify authenticity, and serve customers</p>
        </motion.div>

        {/* Storage Conditions Alert */}
        <Card className="glass card-3d border-green-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-500">
              <Thermometer className="h-5 w-5" />
              Storage Conditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">{storageConditions.currentTemp}</p>
                <p className="text-xs text-muted-foreground">Temperature</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-500">{storageConditions.currentHumidity}</p>
                <p className="text-xs text-muted-foreground">Humidity</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-green-500">{storageConditions.status}</p>
                <p className="text-xs text-muted-foreground">Status</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">{storageConditions.lastCheck}</p>
                <p className="text-xs text-muted-foreground">Last Check</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Receiving Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Receive Shipment
                </CardTitle>
                <CardDescription>Log incoming shipments and update inventory</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="shipmentId">Select Incoming Shipment *</Label>
                  <Select value={formData.shipmentId} onValueChange={(value) => handleInputChange("shipmentId", value)}>
                    <SelectTrigger className="glass">
                      <SelectValue placeholder="Choose a shipment to receive" />
                    </SelectTrigger>
                    <SelectContent>
                      {incomingShipments.filter(shipment => shipment.status === "Arrived").map((shipment) => (
                        <SelectItem key={shipment.id} value={shipment.id}>
                          {shipment.id} - {shipment.herb} (From: {shipment.distributor})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="storageTemp">Storage Temperature (°C) *</Label>
                    <Input
                      id="storageTemp"
                      value={formData.storageTemp}
                      onChange={(e) => handleInputChange("storageTemp", e.target.value)}
                      placeholder="e.g., 22"
                      className="glass"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storageHumidity">Storage Humidity (%) *</Label>
                    <Input
                      id="storageHumidity"
                      value={formData.storageHumidity}
                      onChange={(e) => handleInputChange("storageHumidity", e.target.value)}
                      placeholder="e.g., 45"
                      className="glass"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="shelfLife">Shelf Life Update</Label>
                    <Input
                      id="shelfLife"
                      value={formData.shelfLife}
                      onChange={(e) => handleInputChange("shelfLife", e.target.value)}
                      placeholder="e.g., 24 months"
                      className="glass"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="retailPrice" className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      Retail Price *
                    </Label>
                    <Input
                      id="retailPrice"
                      value={formData.retailPrice}
                      onChange={(e) => handleInputChange("retailPrice", e.target.value)}
                      placeholder="e.g., 299"
                      className="glass"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="skuCode">SKU Code</Label>
                    <Input
                      id="skuCode"
                      value={formData.skuCode}
                      onChange={(e) => handleInputChange("skuCode", e.target.value)}
                      placeholder="e.g., ASH-500-001"
                      className="glass"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeLocation">Store Location</Label>
                    <Input
                      id="storeLocation"
                      value={formData.storeLocation}
                      onChange={(e) => handleInputChange("storeLocation", e.target.value)}
                      placeholder="e.g., Shelf A-12"
                      className="glass"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="staffNotes">Staff Notes</Label>
                  <Textarea
                    id="staffNotes"
                    value={formData.staffNotes}
                    onChange={(e) => handleInputChange("staffNotes", e.target.value)}
                    placeholder="Any special handling instructions or observations..."
                    className="glass"
                  />
                </div>

                <Button onClick={handleReceiveShipment} className="w-full">
                  <Store className="h-4 w-4 mr-2" />
                  Receive Shipment & Update Inventory
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Inventory & Tools */}
          <div className="space-y-6">
            {/* Current Inventory */}
            <Card className="glass card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="h-5 w-5" />
                  Current Inventory
                </CardTitle>
                <CardDescription>Products ready for sale</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {inventory.map((item) => (
                  <div key={item.id} className="p-3 rounded-lg bg-background/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.herb}</span>
                      <Badge variant="default">{item.status}</Badge>
                    </div>
                    <div className="text-sm space-y-1">
                      <p className="text-muted-foreground">SKU: {item.sku}</p>
                      <p className="text-primary font-semibold">{item.price}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handlePrintLabel(item)}
                      className="w-full"
                    >
                      <Printer className="h-3 w-3 mr-1" />
                      Print QR Label
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Incoming Shipments */}
            <Card className="glass card-3d">
              <CardHeader>
                <CardTitle>Incoming Shipments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {incomingShipments.map((shipment) => (
                  <div key={shipment.id} className="p-3 rounded-lg bg-background/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{shipment.id}</span>
                      <Badge variant={shipment.status === "Arrived" ? "default" : "secondary"}>
                        {shipment.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{shipment.herb}</p>
                    <p className="text-xs text-muted-foreground">{shipment.distributor}</p>
                    <p className="text-xs font-mono text-primary">{shipment.tracking}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* QR Label Generator */}
            <Card className="glass card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  Blockchain QR Labels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-3">
                  <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                    <QrCode className="h-12 w-12 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Generate consumer-facing QR codes with complete traceability chain
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}