import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, QrCode, Search } from "lucide-react";
import { motion } from "framer-motion";

interface QRScannerProps {
  onScan: (data: string) => void;
  onClose: () => void;
}

export default function Component() {
  return <div>Component placeholder</div>;
}

export function QRScanner({ onScan, onClose }: QRScannerProps) {
  const [manualCode, setManualCode] = useState('');

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim()) {
      onScan(manualCode.trim());
    }
  };

  // For demo purposes, we'll use a mock scanner that triggers after a delay
  const handleScanDemo = () => {
    // Simulate scanning a demo QR code
    setTimeout(() => {
      onScan("DEMO-ASHWAGANDHA-BATCH-2024-001");
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md"
      >
        <Card className="border-primary/20 shadow-glow">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <QrCode className="h-6 w-6 text-primary" />
              Scan Product QR Code
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="scan" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="scan" className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  Demo Scan
                </TabsTrigger>
                <TabsTrigger value="manual" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Enter Code
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="scan" className="space-y-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-gradient-primary relative flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 border-4 border-white rounded-lg flex items-center justify-center animate-pulse-glow">
                      <QrCode className="h-12 w-12 text-white" />
                    </div>
                    <p className="text-white font-medium">Demo QR Scanner</p>
                    <Button 
                      variant="secondary" 
                      onClick={handleScanDemo}
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      Simulate Scan
                    </Button>
                  </div>
                  
                  {/* Scanning frame corners */}
                  <div className="absolute inset-4 border-2 border-white/50">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white"></div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Click "Simulate Scan" to try the demo product
                </p>
              </TabsContent>
              
              <TabsContent value="manual" className="space-y-4">
                <form onSubmit={handleManualSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="manual-code">Product Code or Batch ID</Label>
                    <Input
                      id="manual-code"
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value)}
                      placeholder="Enter product code..."
                      className="text-center text-lg font-mono"
                    />
                  </div>
                  <Button type="submit" variant="hero" className="w-full" disabled={!manualCode.trim()}>
                    Look Up Product
                  </Button>
                </form>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">Try demo codes:</p>
                  <div className="space-y-1">
                    <button
                      type="button"
                      onClick={() => setManualCode("DEMO-ASHWAGANDHA-BATCH-2024-001")}
                      className="block w-full text-xs text-primary hover:underline font-mono"
                    >
                      DEMO-ASHWAGANDHA-BATCH-2024-001
                    </button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}