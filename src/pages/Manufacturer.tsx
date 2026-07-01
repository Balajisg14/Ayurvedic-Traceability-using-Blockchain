import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Factory, QrCode } from "lucide-react";

// Cleaned up unused imports and comments

const ManufacturerPage: React.FC = () => {
  const navigate = useNavigate();
  // Example stats, replace with real data from API if available
  const [manufacturerCount, setManufacturerCount] = useState(12);
  const [productsCompleted, setProductsCompleted] = useState(34);
  const [formData, setFormData] = useState({
    batchId: "",
    formulationName: "",
    formulationDate: "",
    ingredients: "",
    storageConditions: "",
    remarks: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
  console.log("Manufacturer Data Submitted:", formData);
  alert("Manufacturing details uploaded & QR code generated ✅");
  navigate("/dashboard"); // Navigate to Dashboard after submit
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-green-50 p-6">
      {/* Summary Section */}
      <div className="w-full max-w-3xl mb-8">
        <div className="flex justify-between items-center bg-white/90 rounded-2xl shadow-lg px-8 py-6">
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold text-gray-600">Total Manufacturers</span>
            <span className="text-3xl font-bold text-green-700">{manufacturerCount}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold text-gray-600">Products Completed</span>
            <span className="text-3xl font-bold text-yellow-700">{productsCompleted}</span>
          </div>
        </div>
      </div>
      {/* Entry Form Section */}
      <Card className="w-full max-w-3xl shadow-2xl rounded-2xl backdrop-blur-md bg-white/80">
        <CardContent className="p-8 space-y-6">
          <div className="flex items-center gap-3">
            <Factory className="text-yellow-600 w-8 h-8" />
            <h1 className="text-2xl font-bold text-green-900">
              Manufacturer – Final Product Formulation
            </h1>
          </div>
          <Input
            name="batchId"
            placeholder="Batch ID"
            value={formData.batchId}
            onChange={handleChange}
          />
          <Input
            name="formulationName"
            placeholder="Formulation Name (e.g., Ashwagandha Capsules)"
            value={formData.formulationName}
            onChange={handleChange}
          />
          <Input
            type="date"
            name="formulationDate"
            value={formData.formulationDate}
            onChange={handleChange}
          />
          <Textarea
            name="ingredients"
            placeholder="Ingredients with proportions"
            value={formData.ingredients}
            onChange={handleChange}
          />
          <Textarea
            name="storageConditions"
            placeholder="Storage conditions (Temp, Humidity, Packaging)"
            value={formData.storageConditions}
            onChange={handleChange}
          />
          <Textarea
            name="remarks"
            placeholder="Additional notes"
            value={formData.remarks}
            onChange={handleChange}
          />
          <Button
            onClick={handleSubmit}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 rounded-xl flex items-center justify-center gap-2"
          >
            <QrCode className="w-5 h-5" /> Generate Blockchain QR Code
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManufacturerPage;
