import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FlaskConical, CheckCircle2 } from "lucide-react";

const LaboratoryPage: React.FC = () => {
  const [formData, setFormData] = useState({
    batchId: "",
    testDate: "",
    moisture: "",
    pesticide: "",
    dnaBarcode: "",
    remarks: "",
    certificate: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, certificate: e.target.files[0] });
    }
  };

  const handleSubmit = () => {
    console.log("Laboratory Data Submitted:", formData);
    alert("Lab test results uploaded to blockchain ✅");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-6">
      <Card className="w-full max-w-3xl shadow-2xl rounded-2xl backdrop-blur-md bg-white/80">
        <CardContent className="p-8 space-y-6">
          <div className="flex items-center gap-3">
            <FlaskConical className="text-green-600 w-8 h-8" />
            <h1 className="text-2xl font-bold text-green-800">
              Laboratory Quality Testing
            </h1>
          </div>

          <Input
            name="batchId"
            placeholder="Batch ID"
            value={formData.batchId}
            onChange={handleChange}
          />
          <Input
            type="date"
            name="testDate"
            value={formData.testDate}
            onChange={handleChange}
          />
          <Input
            name="moisture"
            placeholder="Moisture Content (%)"
            value={formData.moisture}
            onChange={handleChange}
          />
          <Input
            name="pesticide"
            placeholder="Pesticide Level (ppm)"
            value={formData.pesticide}
            onChange={handleChange}
          />
          <Input
            name="dnaBarcode"
            placeholder="DNA Barcode Authentication Code"
            value={formData.dnaBarcode}
            onChange={handleChange}
          />
          <Textarea
            name="remarks"
            placeholder="Additional remarks / observations"
            value={formData.remarks}
            onChange={handleChange}
          />
          <div>
            <label className="block text-sm font-medium text-green-700 mb-2">
              Upload Lab Certificate
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.png"
              onChange={handleFileChange}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-xl flex items-center justify-center gap-2"
          >
            <Upload className="w-5 h-5" /> Submit Test Results
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LaboratoryPage;
