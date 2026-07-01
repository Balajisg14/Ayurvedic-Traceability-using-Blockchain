import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, QrCode, Upload, Factory, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function Processor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    batchId: "",
    processingSteps: "",
    processingDate: new Date().toISOString().split('T')[0],
    processingTime: new Date().toTimeString().split(' ')[0].slice(0, 5),
    machineryUsed: "",
    storageTemp: "",
    storageHumidity: "",
    processingDuration: "",
    qualityTestFile: null as File | null
  });

  const [availableBatches] = useState([
    { id: "BTH001", herb: "Ashwagandha", collector: "Farmer Coop #247", status: "Ready" },
    { id: "BTH002", herb: "Turmeric", collector: "Organic Farm Ltd", status: "Ready" },
    { id: "BTH003", herb: "Brahmi", collector: "Hill Station Herbs", status: "Processing" }
  ]);

  const [processedBatches, setProcessedBatches] = useState([
    { id: "PB001", originalBatch: "BTH001", qrCode: "QR789012", status: "Ready for Distribution" }
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (file: File | null) => {
    setFormData(prev => ({ ...prev, qualityTestFile: file }));
  };

  const handleProcessBatch = () => {
    if (!formData.batchId || !formData.processingSteps || !formData.machineryUsed) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newProcessedBatch = {
      id: `PB${String(processedBatches.length + 2).padStart(3, '0')}`,
      originalBatch: formData.batchId,
      qrCode: `QR${Math.random().toString().slice(2, 8)}`,
      status: "Processing Complete"
    };

    setProcessedBatches(prev => [...prev, newProcessedBatch]);
    
    // Reset form
    setFormData({
      batchId: "",
      processingSteps: "",
      processingDate: new Date().toISOString().split('T')[0],
      processingTime: new Date().toTimeString().split(' ')[0].slice(0, 5),
      machineryUsed: "",
      storageTemp: "",
      storageHumidity: "",
      processingDuration: "",
      qualityTestFile: null
    });

    toast.success("Batch processed successfully with QR code generated!");
  };

  const handleNextStep = () => {
    navigate("/distributor");
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
            Next Step: Distributor
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold gradient-text">Processor Dashboard</h1>
          <p className="text-lg text-muted-foreground">Process herb batches and generate QR codes for traceability</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Processing Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Factory className="h-5 w-5" />
                  Batch Processing
                </CardTitle>
                <CardDescription>Process collected herbs and maintain quality records</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="batchId">Select Batch ID *</Label>
                  <Select value={formData.batchId} onValueChange={(value) => handleInputChange("batchId", value)}>
                    <SelectTrigger className="glass">
                      <SelectValue placeholder="Choose a batch to process" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableBatches.filter(batch => batch.status === "Ready").map((batch) => (
                        <SelectItem key={batch.id} value={batch.id}>
                          {batch.id} - {batch.herb} ({batch.collector})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="processingSteps">Processing Steps *</Label>
                  <Textarea
                    id="processingSteps"
                    value={formData.processingSteps}
                    onChange={(e) => handleInputChange("processingSteps", e.target.value)}
                    placeholder="Describe processing steps: drying, cleaning, grinding, extraction..."
                    className="glass"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="processingDate">Processing Date</Label>
                    <Input
                      id="processingDate"
                      type="date"
                      value={formData.processingDate}
                      onChange={(e) => handleInputChange("processingDate", e.target.value)}
                      className="glass"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="processingTime">Processing Time</Label>
                    <Input
                      id="processingTime"
                      type="time"
                      value={formData.processingTime}
                      onChange={(e) => handleInputChange("processingTime", e.target.value)}
                      className="glass"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="machineryUsed">Machinery Used *</Label>
                  <Input
                    id="machineryUsed"
                    value={formData.machineryUsed}
                    onChange={(e) => handleInputChange("machineryUsed", e.target.value)}
                    placeholder="e.g., Solar Dryer SD-200, Grinder GR-150"
                    className="glass"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="storageTemp">Storage Temperature (°C)</Label>
                    <Input
                      id="storageTemp"
                      value={formData.storageTemp}
                      onChange={(e) => handleInputChange("storageTemp", e.target.value)}
                      placeholder="e.g., 25"
                      className="glass"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storageHumidity">Storage Humidity (%)</Label>
                    <Input
                      id="storageHumidity"
                      value={formData.storageHumidity}
                      onChange={(e) => handleInputChange("storageHumidity", e.target.value)}
                      placeholder="e.g., 60"
                      className="glass"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="processingDuration" className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Duration (hours)
                    </Label>
                    <Input
                      id="processingDuration"
                      value={formData.processingDuration}
                      onChange={(e) => handleInputChange("processingDuration", e.target.value)}
                      placeholder="e.g., 48"
                      className="glass"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="qualityTest" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Quality Test Results Upload
                  </Label>
                  <Input
                    id="qualityTest"
                    type="file"
                    accept=".pdf,.jpg,.png"
                    onChange={(e) => handleFileUpload(e.target.files?.[0] || null)}
                    className="glass"
                  />
                </div>

                <Button onClick={handleProcessBatch} className="w-full">
                  <QrCode className="h-4 w-4 mr-2" />
                  Process Batch & Generate QR Code
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Batches & Blockchain Log */}
          <div className="space-y-6">
            {/* Available Batches */}
            <Card className="glass card-3d">
              <CardHeader>
                <CardTitle>Available Batches</CardTitle>
                <CardDescription>Ready for processing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {availableBatches.map((batch) => (
                  <div key={batch.id} className="p-3 rounded-lg bg-background/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{batch.id}</span>
                      <Badge variant={batch.status === "Ready" ? "default" : "secondary"}>
                        {batch.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{batch.herb}</p>
                    <p className="text-xs text-muted-foreground">{batch.collector}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Processed Batches */}
            <Card className="glass card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  Processed Batches
                </CardTitle>
                <CardDescription>Completed with QR codes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {processedBatches.map((batch) => (
                  <div key={batch.id} className="p-3 rounded-lg bg-background/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{batch.id}</span>
                      <Badge variant="default">Complete</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">From: {batch.originalBatch}</p>
                    <p className="text-xs text-primary font-mono">{batch.qrCode}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Blockchain Status */}
            <Card className="glass card-3d">
              <CardHeader>
                <CardTitle>Blockchain Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded bg-green-500/10">
                    <span className="text-sm">Auto-updating</span>
                    <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    All processing records are automatically logged to blockchain for immutable tracking.
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