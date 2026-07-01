import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, QrCode, Star, Award, Leaf, Camera, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QRScanner } from "@/components/QRScanner";
import { ProvenanceTimeline } from "@/components/ProvenanceTimeline";
import { toast } from "sonner";

export default function Consumer() {
  const navigate = useNavigate();
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<string | null>(null);
  const [manualCode, setManualCode] = useState("");
  const [feedback, setFeedback] = useState({
    rating: 0,
    review: "",
    wouldRecommend: null as boolean | null
  });

  // Mock product data
  const productData = {
    name: "Premium Ashwagandha Capsules",
    brand: "AyurVeda Plus",
    batchId: "PB001",
    qrCode: "QR789012",
    price: "₹299",
    certifications: ["Organic", "AYUSH Certified", "Lab Tested", "Fair Trade"],
    qualityScore: 92,
    sustainabilityScore: 88,
    benefits: [
      "Stress reduction and anxiety relief",
      "Improved sleep quality",
      "Enhanced energy levels",
      "Immune system support"
    ]
  };

  // Mock provenance data
  const mockProvenanceSteps = [
    {
      id: "1",
      type: "collection" as const,
      title: "Herb Collection", 
      location: "Uttarakhand Highlands, India",
      date: "March 15, 2024",
      actor: "Farmer Cooperative #247",
      status: "verified" as const,
      details: {
        species: "Ashwagandha (Withania somnifera)",
        quantity: "25.4 kg",
        moisture: "12.3%",
        weather: "Clear, 18°C"
      },
      certificates: ["GPS Certificate", "Collection Permit"]
    },
    {
      id: "2",
      type: "testing" as const,
      title: "Quality Testing",
      location: "Regional Ayurvedic Lab, Dehradun", 
      date: "March 18, 2024",
      actor: "Dr. Sharma Labs Pvt Ltd",
      status: "verified" as const,
      details: {
        withanolideContent: "2.1%",
        pesticides: "Not Detected",
        heavyMetals: "Within Limits",
        microbialLoad: "Acceptable"
      },
      certificates: ["Lab Certificate", "AYUSH Compliance"]
    },
    {
      id: "3",
      type: "processing" as const,
      title: "Processing & Drying",
      location: "Himalayan Herbs Processing Unit",
      date: "March 20, 2024", 
      actor: "Himalayan Herbs Pvt Ltd",
      status: "verified" as const,
      details: {
        processType: "Solar Drying",
        temperature: "45°C", 
        duration: "72 hours",
        finalMoisture: "8.2%"
      },
      certificates: ["Processing Certificate"]
    },
    {
      id: "4",
      type: "manufacturing" as const,
      title: "Final Formulation",
      location: "Wellness Capsules Manufacturing",
      date: "March 25, 2024",
      actor: "AyurVeda Plus Industries", 
      status: "completed" as const,
      details: {
        productType: "Ashwagandha Capsules 500mg",
        batchSize: "5000 units",
        expiryDate: "March 2026",
        packaging: "Eco-friendly bottles"
      },
      certificates: ["Manufacturing License", "GMP Certificate"]
    }
  ];

  const handleQRScan = (data: string) => {
    setScannedProduct(data);
    setShowQRScanner(false);
    toast.success("Product verified! Displaying complete traceability chain.");
  };

  const handleManualLookup = () => {
    if (!manualCode.trim()) {
      toast.error("Please enter a QR code");
      return;
    }
    setScannedProduct(manualCode);
    setManualCode("");
    toast.success("Product found! Displaying traceability information.");
  };

  const handleFeedbackSubmit = () => {
    if (feedback.rating === 0) {
      toast.error("Please provide a rating");
      return;
    }

    toast.success("Thank you for your feedback! It helps improve the supply chain.");
    
    // Reset feedback form
    setFeedback({
      rating: 0,
      review: "",
      wouldRecommend: null
    });
  };

  const StarRating = ({ rating, onRatingChange }: { rating: number, onRatingChange: (rating: number) => void }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRatingChange(star)}
            className={`transition-colors ${star <= rating ? 'text-yellow-500' : 'text-muted-foreground'}`}
          >
            <Star className="h-5 w-5 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  if (scannedProduct) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setScannedProduct(null)} className="flex items-center gap-2 glass">
              <ArrowLeft className="h-4 w-4" />
              Scan Another Product
            </Button>
            <Button variant="outline" onClick={() => navigate("/")} className="glass">
              Back to Homepage
            </Button>
          </div>

          {/* Product Header */}
          <Card className="glass card-3d">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Product Image Placeholder */}
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                  <Leaf className="h-16 w-16 text-primary" />
                </div>

                {/* Product Info */}
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h1 className="text-2xl font-bold gradient-text">{productData.name}</h1>
                    <p className="text-lg text-muted-foreground">by {productData.brand}</p>
                    <p className="text-2xl font-bold text-primary mt-2">{productData.price}</p>
                  </div>

                  {/* Certifications */}
                  <div className="flex flex-wrap gap-2">
                    {productData.certifications.map((cert) => (
                      <Badge key={cert} variant="secondary" className="flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        {cert}
                      </Badge>
                    ))}
                  </div>

                  {/* Scores */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 rounded-lg bg-background/50">
                      <p className="text-2xl font-bold text-green-500">{productData.qualityScore}</p>
                      <p className="text-sm text-muted-foreground">Quality Score</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-background/50">
                      <p className="text-2xl font-bold text-blue-500">{productData.sustainabilityScore}</p>
                      <p className="text-sm text-muted-foreground">Sustainability</p>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h3 className="font-semibold mb-2">Key Benefits:</h3>
                    <ul className="space-y-1">
                      {productData.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Provenance Timeline */}
          <ProvenanceTimeline
            productId={scannedProduct}
            productName={productData.name}
            steps={mockProvenanceSteps}
            finalLocation="Your Local Store"
          />

          {/* Feedback Section */}
          <Card className="glass card-3d">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Share Your Experience
              </CardTitle>
              <CardDescription>Help others and improve the supply chain</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Rate this product:</Label>
                <StarRating 
                  rating={feedback.rating} 
                  onRatingChange={(rating) => setFeedback(prev => ({ ...prev, rating }))} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="review">Your Review (Optional)</Label>
                <Textarea
                  id="review"
                  value={feedback.review}
                  onChange={(e) => setFeedback(prev => ({ ...prev, review: e.target.value }))}
                  placeholder="Share your experience with this product..."
                  className="glass"
                />
              </div>

              <div className="space-y-2">
                <Label>Would you recommend this product?</Label>
                <div className="flex gap-2">
                  <Button
                    variant={feedback.wouldRecommend === true ? "default" : "outline"}
                    onClick={() => setFeedback(prev => ({ ...prev, wouldRecommend: true }))}
                    className="glass"
                  >
                    Yes
                  </Button>
                  <Button
                    variant={feedback.wouldRecommend === false ? "default" : "outline"}
                    onClick={() => setFeedback(prev => ({ ...prev, wouldRecommend: false }))}
                    className="glass"
                  >
                    No
                  </Button>
                </div>
              </div>

              <Button onClick={handleFeedbackSubmit} className="w-full">
                Submit Feedback
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Button variant="outline" onClick={() => navigate("/")} className="flex items-center gap-2 glass">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold gradient-text">Consumer Portal</h1>
          <p className="text-lg text-muted-foreground">Scan products to verify authenticity and trace their complete journey</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* QR Scanner */}
          <Card className="glass card-3d">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                QR Code Scanner
              </CardTitle>
              <CardDescription>Scan product QR codes for instant verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={() => setShowQRScanner(true)} 
                className="w-full h-20 text-lg"
              >
                <Camera className="h-6 w-6 mr-2" />
                Open Camera Scanner
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-muted" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="manualCode">Enter QR Code Manually</Label>
                <div className="flex gap-2">
                  <Input
                    id="manualCode"
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                    placeholder="e.g., QR789012"
                    className="glass flex-1"
                  />
                  <Button onClick={handleManualLookup}>
                    Look Up
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information */}
          <Card className="glass card-3d">
            <CardHeader>
              <CardTitle>What You'll Discover</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Complete Journey</h4>
                    <p className="text-sm text-muted-foreground">From farm to shelf - every step tracked</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Quality Certificates</h4>
                    <p className="text-sm text-muted-foreground">Lab reports and compliance documents</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Sustainability Score</h4>
                    <p className="text-sm text-muted-foreground">Environmental impact and ethical sourcing</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium">AR Visualization</h4>
                    <p className="text-sm text-muted-foreground">Interactive herb benefits display</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10">
                <h4 className="font-medium text-center mb-2">Try Demo Code</h4>
                <p className="text-center font-mono text-sm text-primary">QR789012</p>
                <p className="text-center text-xs text-muted-foreground mt-1">Sample Ashwagandha batch</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* QR Scanner Modal */}
        {showQRScanner && (
          <QRScanner
            onScan={handleQRScan}
            onClose={() => setShowQRScanner(false)}
          />
        )}
      </div>
    </div>
  );
}