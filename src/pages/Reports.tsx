import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Download, FileText, BarChart3 } from "lucide-react";

const Reports = () => {
  const reports = [
    {
      id: 1,
      name: "Monthly Nutrition Report",
      type: "Nutrition",
      period: "March 2024",
      status: "Ready",
      size: "2.3 MB"
    },
    {
      id: 2,
      name: "Beneficiary Coverage Report",
      type: "Coverage",
      period: "Q1 2024",
      status: "Ready",
      size: "1.8 MB"
    },
    {
      id: 3,
      name: "High-Risk Analysis",
      type: "Analysis",
      period: "March 2024",
      status: "Generating",
      size: "-"
    },
    {
      id: 4,
      name: "Facility Performance Report",
      type: "Performance",
      period: "March 2024",
      status: "Ready",
      size: "3.1 MB"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground">Generate and download system reports</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <FileText className="w-4 h-4 mr-2" />
          Generate New Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nutrition">Nutrition Summary</SelectItem>
                  <SelectItem value="coverage">Coverage Report</SelectItem>
                  <SelectItem value="performance">Performance Analysis</SelectItem>
                  <SelectItem value="compliance">Compliance Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Period</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">This Week</SelectItem>
                  <SelectItem value="monthly">This Month</SelectItem>
                  <SelectItem value="quarterly">This Quarter</SelectItem>
                  <SelectItem value="yearly">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button className="w-full">
              <BarChart3 className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Available Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{report.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{report.type}</span>
                        <span>•</span>
                        <span>{report.period}</span>
                        <span>•</span>
                        <span>{report.size}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      report.status === "Ready" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {report.status}
                    </span>
                    {report.status === "Ready" && (
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;