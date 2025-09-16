import { useState } from "react";
import { 
  AlertTriangle,
  Bell,
  Video,
  TrendingUp,
  Filter,
  Download,
  Search,
  Calendar,
  MapPin,
  Phone,
  User,
  FileText
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HighRiskBeneficiary {
  id: string;
  name: string;
  age: number;
  facility: string;
  riskType: 'severe-anemia' | 'missed-nutrition' | 'diagnostic-alert' | 'pregnancy-complication';
  priority: 'critical' | 'high' | 'medium';
  dateFlagged: string;
  lastVisit: string;
  contact: string;
  location: string;
  assignedWorker: string;
  details: Record<string, any>;
}

const highRiskBeneficiaries: HighRiskBeneficiary[] = [
  {
    id: "BEN001",
    name: "Priya Sharma",
    age: 28,
    facility: "PHC Kumhari",
    riskType: "severe-anemia",
    priority: "critical",
    dateFlagged: "2024-03-15",
    lastVisit: "2024-03-10",
    contact: "+91 9876543210",
    location: "Village Kumhari, Bilaspur",
    assignedWorker: "ASHA Sunita Devi",
    details: {
      hemoglobin: "6.2 g/dL",
      condition: "Severe anemia requiring immediate intervention",
      riskFactors: ["Pregnancy", "Poor nutrition", "Missed supplements"]
    }
  },
  {
    id: "BEN002", 
    name: "Kavita Patel",
    age: 24,
    facility: "CHC Bilaspur",
    riskType: "missed-nutrition",
    priority: "high",
    dateFlagged: "2024-03-14",
    lastVisit: "2024-02-28",
    contact: "+91 9876543211",
    location: "Ward 15, Bilaspur",
    assignedWorker: "ANM Rekha Singh",
    details: {
      missedVisits: 3,
      condition: "Missed nutrition supplements for 3 consecutive visits",
      riskFactors: ["Low BMI", "First pregnancy", "Distance from facility"]
    }
  },
  {
    id: "BEN003",
    name: "Meera Yadav", 
    age: 32,
    facility: "SC Korba",
    riskType: "diagnostic-alert",
    priority: "critical",
    dateFlagged: "2024-03-13",
    lastVisit: "2024-03-12",
    contact: "+91 9876543212",
    location: "Village Katghora, Korba",
    assignedWorker: "ASHA Kamla Bai",
    details: {
      bloodPressure: "160/110 mmHg",
      condition: "Severe hypertension during pregnancy",
      riskFactors: ["Gestational hypertension", "Previous pregnancy complications"]
    }
  },
  {
    id: "BEN004",
    name: "Sunita Verma",
    age: 19,
    facility: "PHC Durg",
    riskType: "pregnancy-complication",
    priority: "high",
    dateFlagged: "2024-03-12",
    lastVisit: "2024-03-11",
    contact: "+91 9876543213",
    location: "Sector 8, Durg",
    assignedWorker: "ANM Sushma Jain",
    details: {
      gestationalAge: "32 weeks",
      condition: "Multiple pregnancy complications",
      riskFactors: ["Teen pregnancy", "Low weight gain", "Irregular checkups"]
    }
  },
  {
    id: "BEN005",
    name: "Radha Sahu",
    age: 26,
    facility: "CHC Raipur",
    riskType: "missed-nutrition",
    priority: "medium",
    dateFlagged: "2024-03-11",
    lastVisit: "2024-03-05",
    contact: "+91 9876543214",
    location: "Village Arang, Raipur",
    assignedWorker: "ASHA Pushpa Devi",
    details: {
      missedVisits: 2,
      condition: "Irregular nutrition supplement intake",
      riskFactors: ["Work commitments", "Transportation issues"]
    }
  }
];

const getRiskTypeLabel = (type: string) => {
  switch (type) {
    case 'severe-anemia': return 'Severe Anemia';
    case 'missed-nutrition': return 'Missed Nutrition';
    case 'diagnostic-alert': return 'Diagnostic Alert';
    case 'pregnancy-complication': return 'Pregnancy Complication';
    default: return type;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical': return 'bg-destructive text-destructive-foreground';
    case 'high': return 'bg-warning text-warning-foreground';
    case 'medium': return 'bg-secondary text-secondary-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getRiskTypeColor = (type: string) => {
  switch (type) {
    case 'severe-anemia': return 'bg-destructive text-destructive-foreground';
    case 'missed-nutrition': return 'bg-warning text-warning-foreground';
    case 'diagnostic-alert': return 'bg-destructive text-destructive-foreground';
    case 'pregnancy-complication': return 'bg-warning text-warning-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

export default function HighRiskBeneficiaries() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [riskTypeFilter, setRiskTypeFilter] = useState("all");
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<HighRiskBeneficiary | null>(null);

  const filteredBeneficiaries = highRiskBeneficiaries.filter(beneficiary => {
    const matchesSearch = beneficiary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         beneficiary.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === "all" || beneficiary.priority === priorityFilter;
    const matchesRiskType = riskTypeFilter === "all" || beneficiary.riskType === riskTypeFilter;
    
    return matchesSearch && matchesPriority && matchesRiskType;
  });

  const criticalCount = highRiskBeneficiaries.filter(b => b.priority === 'critical').length;
  const highCount = highRiskBeneficiaries.filter(b => b.priority === 'high').length;
  const mediumCount = highRiskBeneficiaries.filter(b => b.priority === 'medium').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="w-10 h-10 bg-destructive rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive-foreground" />
            </div>
            High-Risk Beneficiaries
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage critical cases requiring immediate attention
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-destructive hover:bg-destructive/90">
            <Bell className="w-4 h-4 mr-2" />
            Send Alerts
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical Cases</p>
                <p className="text-2xl font-bold text-destructive">{criticalCount}</p>
              </div>
              <div className="w-8 h-8 bg-destructive rounded-full flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-destructive-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-warning/20 bg-warning/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold text-warning">{highCount}</p>
              </div>
              <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-warning-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-secondary/20 bg-secondary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Medium Priority</p>
                <p className="text-2xl font-bold text-secondary">{mediumCount}</p>
              </div>
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-secondary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Cases</p>
                <p className="text-2xl font-bold text-foreground">{highRiskBeneficiaries.length}</p>
              </div>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Priority Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
              </SelectContent>
            </Select>
            <Select value={riskTypeFilter} onValueChange={setRiskTypeFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Risk Type Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Types</SelectItem>
                <SelectItem value="severe-anemia">Severe Anemia</SelectItem>
                <SelectItem value="missed-nutrition">Missed Nutrition</SelectItem>
                <SelectItem value="diagnostic-alert">Diagnostic Alert</SelectItem>
                <SelectItem value="pregnancy-complication">Pregnancy Complication</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* High-Risk Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            High-Risk Cases ({filteredBeneficiaries.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Beneficiary ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Facility</TableHead>
                <TableHead>Risk Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Date Flagged</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBeneficiaries.map((beneficiary) => (
                <TableRow key={beneficiary.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{beneficiary.id}</TableCell>
                  <TableCell>
                    <Button
                      variant="link"
                      className="p-0 h-auto font-medium text-left"
                      onClick={() => setSelectedBeneficiary(beneficiary)}
                    >
                      {beneficiary.name}
                    </Button>
                  </TableCell>
                  <TableCell>{beneficiary.age}</TableCell>
                  <TableCell>{beneficiary.facility}</TableCell>
                  <TableCell>
                    <Badge className={getRiskTypeColor(beneficiary.riskType)}>
                      {getRiskTypeLabel(beneficiary.riskType)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(beneficiary.priority)}>
                      {beneficiary.priority.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="w-3 h-3" />
                      {new Date(beneficiary.dateFlagged).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        <Video className="w-3 h-3 mr-1" />
                        Teleconsult
                      </Button>
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        <Bell className="w-3 h-3 mr-1" />
                        Alert
                      </Button>
                      <Button size="sm" className="h-7 text-xs bg-destructive hover:bg-destructive/90">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Escalate
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Beneficiary Details Dialog */}
      <Dialog open={!!selectedBeneficiary} onOpenChange={() => setSelectedBeneficiary(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              {selectedBeneficiary?.name} - High Risk Details
            </DialogTitle>
          </DialogHeader>
          
          {selectedBeneficiary && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="details">Risk Details</TabsTrigger>
                <TabsTrigger value="actions">Actions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div><strong>ID:</strong> {selectedBeneficiary.id}</div>
                    <div><strong>Age:</strong> {selectedBeneficiary.age} years</div>
                    <div><strong>Facility:</strong> {selectedBeneficiary.facility}</div>
                    <div><strong>Assigned Worker:</strong> {selectedBeneficiary.assignedWorker}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      <strong>Contact:</strong> {selectedBeneficiary.contact}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <strong>Location:</strong> {selectedBeneficiary.location}
                    </div>
                    <div><strong>Last Visit:</strong> {new Date(selectedBeneficiary.lastVisit).toLocaleDateString()}</div>
                    <div><strong>Date Flagged:</strong> {new Date(selectedBeneficiary.dateFlagged).toLocaleDateString()}</div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Badge className={getPriorityColor(selectedBeneficiary.priority)}>
                    {selectedBeneficiary.priority.toUpperCase()} PRIORITY
                  </Badge>
                  <Badge className={getRiskTypeColor(selectedBeneficiary.riskType)}>
                    {getRiskTypeLabel(selectedBeneficiary.riskType)}
                  </Badge>
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Risk Details</h4>
                  <p className="text-sm text-muted-foreground mb-3">{selectedBeneficiary.details.condition}</p>
                  
                  {selectedBeneficiary.details.hemoglobin && (
                    <div className="mb-2">
                      <strong>Hemoglobin Level:</strong> {selectedBeneficiary.details.hemoglobin}
                    </div>
                  )}
                  
                  {selectedBeneficiary.details.bloodPressure && (
                    <div className="mb-2">
                      <strong>Blood Pressure:</strong> {selectedBeneficiary.details.bloodPressure}
                    </div>
                  )}
                  
                  {selectedBeneficiary.details.missedVisits && (
                    <div className="mb-2">
                      <strong>Missed Visits:</strong> {selectedBeneficiary.details.missedVisits}
                    </div>
                  )}
                  
                  {selectedBeneficiary.details.gestationalAge && (
                    <div className="mb-2">
                      <strong>Gestational Age:</strong> {selectedBeneficiary.details.gestationalAge}
                    </div>
                  )}
                  
                  <div>
                    <strong>Risk Factors:</strong>
                    <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                      {selectedBeneficiary.details.riskFactors?.map((factor: string, index: number) => (
                        <li key={index}>{factor}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="actions" className="space-y-4">
                <div className="grid gap-3">
                  <Button variant="outline" className="w-full">
                    <Bell className="w-4 h-4 mr-2" />
                    Send Alert to ASHA Worker
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Beneficiary
                  </Button>
                  <Button className="w-full bg-destructive hover:bg-destructive/90">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Escalate to District Level
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}