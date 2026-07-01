import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Search, FileText, Download, Calendar, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function Regulator() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null);
  const [inspectionData, setInspectionData] = useState({
    batchId: "",
    inspectionDate: new Date().toISOString().split('T')[0],
    inspectionType: "",
    findings: "",
    complianceStatus: "",
    remarks: ""
  });

  // Mock compliance data
  const complianceRecords = [
    {
      id: "BTH001",
      herb: "Ashwagandha",
      collector: "Farmer Coop #247",
      processor: "Himalayan Herbs Ltd",
      batchSize: "25.4 kg",
      status: "Compliant",
      lastInspection: "2024-03-10",
      certificates: ["Organic", "AYUSH", "Lab Test"],
      riskLevel: "Low"
    },
    {
      id: "BTH002", 
      herb: "Turmeric",
      collector: "Organic Farm Ltd",
      processor: "Spice Processing Co",
      batchSize: "50.2 kg",
      status: "Under Review",
      lastInspection: "2024-03-12",
      certificates: ["Organic", "Lab Test"],
      riskLevel: "Medium"
    },
    {
      id: "BTH003",
      herb: "Brahmi",
      collector: "Hill Station Herbs",
      processor: "Ayurveda Plus",
      batchSize: "15.8 kg", 
      status: "Non-Compliant",
      lastInspection: "2024-03-08",
      certificates: ["Lab Test"],
      riskLevel: "High"
    }
  ];

  const auditLogs = [
    {
      id: "1",
      timestamp: "2024-03-15 14:30:22",
      action: "Batch Inspection",
      batchId: "BTH001",
      inspector: "Reg. Officer A.K. Sharma",
      result: "Approved",
      details: "All compliance checks passed"
    },
    {
      id: "2", 
      timestamp: "2024-03-15 12:15:18",
      action: "Certificate Verification",
      batchId: "BTH002",
      inspector: "Dr. Priya Mehta",
      result: "Pending",
      details: "Awaiting lab report confirmation"
    },
    {
      id: "3",
      timestamp: "2024-03-14 16:45:55", 
      action: "Compliance Violation",
      batchId: "BTH003",
      inspector: "Reg. Officer R.K. Singh",
      result: "Flagged",
      details: "Missing organic certification"
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setInspectionData(prev => ({ ...prev, [field]: value }));
  };

  const handleInspectionSubmit = () => {
    if (!inspectionData.batchId || !inspectionData.inspectionType || !inspectionData.complianceStatus) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Inspection record submitted and logged to blockchain");
    
    // Reset form
    setInspectionData({
      batchId: "",
      inspectionDate: new Date().toISOString().split('T')[0],
      inspectionType: "",
      findings: "",
      complianceStatus: "",
      remarks: ""
    });
  };

  const handleGenerateReport = (format: string) => {
    toast.success(`Generating ${format.toUpperCase()} compliance report...`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Compliant": return "text-green-500";
      case "Non-Compliant": return "text-red-500";
      case "Under Review": return "text-yellow-500";
      default: return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Compliant": return <CheckCircle className="h-4 w-4" />;
      case "Non-Compliant": return <XCircle className="h-4 w-4" />;
      case "Under Review": return <AlertTriangle className="h-4 w-4" />;
      default: return null;
    }
  };

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "Low": return "default";
      case "Medium": return "secondary";
      case "High": return "destructive";
      default: return "outline";
    }
  };

  const filteredRecords = complianceRecords.filter(record => 
    searchQuery === "" || 
    record.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.herb.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.collector.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto space-y-6">
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
          <h1 className="text-4xl font-bold gradient-text">Regulator Dashboard</h1>
          <p className="text-lg text-muted-foreground">Monitor compliance, verify certifications, and ensure industry standards</p>
        </motion.div>

        <Tabs defaultValue="compliance" className="w-full">
          <TabsList className="grid w-full grid-cols-4 glass">
            <TabsTrigger value="compliance">Compliance Records</TabsTrigger>
            <TabsTrigger value="inspection">New Inspection</TabsTrigger>
            <TabsTrigger value="reports">Generate Reports</TabsTrigger>
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          </TabsList>

          {/* Compliance Records Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <Card className="glass card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Compliance Overview
                </CardTitle>
                <CardDescription>Monitor all stakeholders and batch compliance status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search Bar */}
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by Batch ID, Herb, or Stakeholder..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="glass"
                  />
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 rounded-lg bg-green-500/10">
                    <p className="text-2xl font-bold text-green-500">
                      {complianceRecords.filter(r => r.status === "Compliant").length}
                    </p>
                    <p className="text-sm text-muted-foreground">Compliant</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-yellow-500/10">
                    <p className="text-2xl font-bold text-yellow-500">
                      {complianceRecords.filter(r => r.status === "Under Review").length}
                    </p>
                    <p className="text-sm text-muted-foreground">Under Review</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-red-500/10">
                    <p className="text-2xl font-bold text-red-500">
                      {complianceRecords.filter(r => r.status === "Non-Compliant").length}
                    </p>
                    <p className="text-sm text-muted-foreground">Non-Compliant</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-blue-500/10">
                    <p className="text-2xl font-bold text-blue-500">{complianceRecords.length}</p>
                    <p className="text-sm text-muted-foreground">Total Batches</p>
                  </div>
                </div>

                {/* Records Table */}
                <div className="space-y-3">
                  {filteredRecords.map((record) => (
                    <div key={record.id} className="p-4 rounded-lg bg-background/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-bold">{record.id}</span>
                          <span className="text-muted-foreground">-</span>
                          <span className="font-medium">{record.herb}</span>
                          <Badge variant={getRiskBadgeVariant(record.riskLevel)}>
                            {record.riskLevel} Risk
                          </Badge>
                        </div>
                        <div className={`flex items-center gap-2 ${getStatusColor(record.status)}`}>
                          {getStatusIcon(record.status)}
                          <span className="font-medium">{record.status}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Collector:</p>
                          <p>{record.collector}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Processor:</p>
                          <p>{record.processor}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Batch Size:</p>
                          <p>{record.batchSize}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {record.certificates.map((cert) => (
                            <Badge key={cert} variant="outline" className="text-xs">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Last Inspected: {record.lastInspection}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* New Inspection Tab */}
          <TabsContent value="inspection" className="space-y-6">
            <Card className="glass card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Conduct New Inspection
                </CardTitle>
                <CardDescription>Record inspection findings and compliance status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="batchId">Batch ID *</Label>
                    <Select value={inspectionData.batchId} onValueChange={(value) => handleInputChange("batchId", value)}>
                      <SelectTrigger className="glass">
                        <SelectValue placeholder="Select batch for inspection" />
                      </SelectTrigger>
                      <SelectContent>
                        {complianceRecords.map((record) => (
                          <SelectItem key={record.id} value={record.id}>
                            {record.id} - {record.herb}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inspectionDate">Inspection Date</Label>
                    <Input
                      id="inspectionDate"
                      type="date"
                      value={inspectionData.inspectionDate}
                      onChange={(e) => handleInputChange("inspectionDate", e.target.value)}
                      className="glass"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inspectionType">Inspection Type *</Label>
                  <Select value={inspectionData.inspectionType} onValueChange={(value) => handleInputChange("inspectionType", value)}>
                    <SelectTrigger className="glass">
                      <SelectValue placeholder="Select inspection type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="routine">Routine Inspection</SelectItem>
                      <SelectItem value="complaint">Complaint Investigation</SelectItem>
                      <SelectItem value="certification">Certification Review</SelectItem>
                      <SelectItem value="audit">Compliance Audit</SelectItem>
                      <SelectItem value="followup">Follow-up Inspection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="findings">Inspection Findings</Label>
                  <Textarea
                    id="findings"
                    value={inspectionData.findings}
                    onChange={(e) => handleInputChange("findings", e.target.value)}
                    placeholder="Describe inspection findings, observations, and test results..."
                    className="glass"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="complianceStatus">Compliance Status *</Label>
                  <Select value={inspectionData.complianceStatus} onValueChange={(value) => handleInputChange("complianceStatus", value)}>
                    <SelectTrigger className="glass">
                      <SelectValue placeholder="Select compliance status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compliant">Compliant</SelectItem>
                      <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                      <SelectItem value="conditional">Conditional Compliance</SelectItem>
                      <SelectItem value="under-review">Under Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="remarks">Remarks & Recommendations</Label>
                  <Textarea
                    id="remarks"
                    value={inspectionData.remarks}
                    onChange={(e) => handleInputChange("remarks", e.target.value)}
                    placeholder="Additional remarks, corrective actions, or recommendations..."
                    className="glass"
                  />
                </div>

                <Button onClick={handleInspectionSubmit} className="w-full">
                  <Shield className="h-4 w-4 mr-2" />
                  Submit Inspection Report
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Generate Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card className="glass card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Generate Compliance Reports
                </CardTitle>
                <CardDescription>Export blockchain-verified compliance data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Report Types */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Available Reports</h4>
                    
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-background/50">
                        <h5 className="font-medium">Compliance Summary</h5>
                        <p className="text-sm text-muted-foreground">Overall compliance status by stakeholder</p>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" onClick={() => handleGenerateReport("pdf")}>
                            PDF
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleGenerateReport("excel")}>
                            Excel
                          </Button>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-background/50">
                        <h5 className="font-medium">Audit Trail</h5>
                        <p className="text-sm text-muted-foreground">Complete blockchain audit history</p>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" onClick={() => handleGenerateReport("pdf")}>
                            PDF
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleGenerateReport("excel")}>
                            Excel
                          </Button>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-background/50">
                        <h5 className="font-medium">Certification Status</h5>
                        <p className="text-sm text-muted-foreground">Certificate validity and renewal dates</p>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" onClick={() => handleGenerateReport("pdf")}>
                            PDF
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleGenerateReport("excel")}>
                            Excel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Report Filters */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Report Filters</h4>
                    
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label>Date Range</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <Input type="date" className="glass" />
                          <Input type="date" className="glass" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Stakeholder Type</Label>
                        <Select>
                          <SelectTrigger className="glass">
                            <SelectValue placeholder="All stakeholders" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Stakeholders</SelectItem>
                            <SelectItem value="collectors">Collectors Only</SelectItem>
                            <SelectItem value="processors">Processors Only</SelectItem>
                            <SelectItem value="distributors">Distributors Only</SelectItem>
                            <SelectItem value="retailers">Retailers Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Compliance Status</Label>
                        <Select>
                          <SelectTrigger className="glass">
                            <SelectValue placeholder="All statuses" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="compliant">Compliant Only</SelectItem>
                            <SelectItem value="non-compliant">Non-Compliant Only</SelectItem>
                            <SelectItem value="under-review">Under Review Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audit Logs Tab */}
          <TabsContent value="audit" className="space-y-6">
            <Card className="glass card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Blockchain Audit Logs
                </CardTitle>
                <CardDescription>Immutable record of all regulatory actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-4 rounded-lg bg-background/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{log.action}</span>
                      <Badge variant={log.result === "Approved" ? "default" : log.result === "Flagged" ? "destructive" : "secondary"}>
                        {log.result}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Batch ID:</p>
                        <p className="font-mono">{log.batchId}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Inspector:</p>
                        <p>{log.inspector}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Timestamp:</p>
                        <p className="font-mono text-xs">{log.timestamp}</p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">{log.details}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}