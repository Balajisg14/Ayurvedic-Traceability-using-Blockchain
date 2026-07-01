import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HeroSection3D } from "@/components/HeroSection3D";
import { RoleCardsGlass } from "@/components/RoleCardsGlass";
import { DashboardHighlights } from "@/components/DashboardHighlights";
import { ConsumerQRPortal } from "@/components/ConsumerQRPortal";
import { TestimonialsImpact } from "@/components/TestimonialsImpact";
import { 
  Leaf, 
  Factory, 
  FlaskConical, 
  Package, 
  BarChart3, 
  QrCode,
  ArrowLeft,
  Award,
  Target,
  Star,
  Zap,
  Shield,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { QRScanner } from "@/components/QRScanner";
import { ProvenanceTimeline } from "@/components/ProvenanceTimeline";

export default function Dashboard() {
  const navigate = useNavigate();
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<string | null>(null);

  const roles = [
    {
      id: "collector",
      title: "Herb Collector",
      description: "Record harvest data, GPS location, and initial quality metrics for Ayurvedic herbs",
      icon: Leaf
    },
    {
      id: "processor", 
      title: "Processor",
      description: "Create batches, record processing steps, and generate QR codes for herb lots",
      icon: Factory
    },
    {
      id: "lab",
      title: "Laboratory",
      description: "Submit quality tests, upload certificates, and validate herb authenticity",
      icon: FlaskConical
    },
    {
      id: "manufacturer",
      title: "Manufacturer", 
      description: "Combine batches into formulations and create final product codes",
      icon: Package
    },
    {
      id: "manager",
      title: "Supply Chain Manager",
      description: "Monitor harvests, track compliance, and generate sustainability reports",
      icon: BarChart3
    },
    {
      id: "consumer",
      title: "Consumer Portal",
      description: "Scan product QR codes to trace the complete journey from farm to shelf",
      icon: QrCode
    },
    {
      id: "distributor",
      title: "Distributor",
      description: "Manage inventory, track shipments, and ensure quality during distribution",
      icon: Package
    },
    {
      id: "retailer",
      title: "Retailer",
      description: "Verify product authenticity and provide consumer information at point of sale",
      icon: Package
    },
    {
      id: "regulator",
      title: "Regulator",
      description: "Monitor compliance, verify certifications, and ensure industry standards",
      icon: Shield
    }
  ];

  const handleRoleSelect = (roleId: string) => {
    if (roleId === "consumer") {
      setShowQRScanner(true);
    } else {
      // Navigate to specific role page
      navigate(`/${roleId}`);
    }
  };

  const handleQRScan = (data: string) => {
    setScannedProduct(data);
    setShowQRScanner(false);
  };

  const handleBack = () => {
    setScannedProduct(null);
  };

  // Mock provenance data for demo
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

  if (scannedProduct) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Button variant="outline" onClick={handleBack} className="flex items-center gap-2 glass">
              <ArrowLeft className="h-4 w-4" />
              Back to Homepage
            </Button>
          </div>
          <ProvenanceTimeline
            productId={scannedProduct}
            productName="Premium Ashwagandha Capsules"
            steps={mockProvenanceSteps}
            finalLocation="Your Local Store"
          />
        </div>
      </div>
    );
  }

  // Removed selectedRole logic - now handled by routing

  return (
    <div className="min-h-screen">
      <div className="space-y-0">
        {/* Hero Section */}
        <HeroSection3D />

        {/* Role Selection */}
        <RoleCardsGlass 
          roles={roles} 
          onRoleSelect={handleRoleSelect} 
        />

        {/* Dashboard Highlights */}
        <DashboardHighlights />

        {/* Consumer QR Portal */}
        <ConsumerQRPortal />

        {/* Testimonials & Impact */}
        <TestimonialsImpact />

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