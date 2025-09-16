import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Phone,
  TrendingUp,
  TrendingDown,
  Minus,
  Bell,
  Clock,
  MapPin,
  Activity
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const kpiData = [
  {
    title: "Active Beneficiaries",
    value: "14,756",
    change: "+3.2%",
    trend: "up",
    description: "Currently enrolled",
    icon: Users,
    color: "primary"
  },
  {
    title: "High-Risk Cases",
    value: "187",
    change: "-8.1%",
    trend: "down",
    description: "Requiring immediate attention",
    icon: AlertTriangle,
    color: "destructive"
  },
  {
    title: "Nutrition Compliance",
    value: "87.3%",
    change: "+4.5%",
    trend: "up",
    description: "Meeting intake targets",
    icon: CheckCircle,
    color: "success"
  },
  {
    title: "Completed Teleconsultations",
    value: "2,456",
    change: "+12.8%",
    trend: "up",
    description: "This month",
    icon: Phone,
    color: "secondary"
  }
];

const nutritionTrendsData = [
  { month: 'Jan', coverage: 78, target: 85 },
  { month: 'Feb', coverage: 82, target: 85 },
  { month: 'Mar', coverage: 79, target: 85 },
  { month: 'Apr', coverage: 86, target: 85 },
  { month: 'May', coverage: 88, target: 85 },
  { month: 'Jun', coverage: 87, target: 85 }
];

const anemiaRatesData = [
  { month: 'Jan', mild: 45, moderate: 28, severe: 12 },
  { month: 'Feb', mild: 42, moderate: 25, severe: 10 },
  { month: 'Mar', mild: 40, moderate: 23, severe: 8 },
  { month: 'Apr', mild: 38, moderate: 21, severe: 7 },
  { month: 'May', mild: 36, moderate: 19, severe: 6 },
  { month: 'Jun', mild: 34, moderate: 17, severe: 5 }
];

const facilityPerformanceData = [
  { name: 'PHC', value: 45, color: '#22c55e' },
  { name: 'CHC', value: 30, color: '#3b82f6' },
  { name: 'SDH', value: 15, color: '#f59e0b' },
  { name: 'DH', value: 10, color: '#ef4444' }
];

const notifications = [
  {
    id: 1,
    type: "high-risk",
    title: "High-Risk Alert",
    message: "15 beneficiaries marked high-risk in Shimla district",
    time: "2 mins ago",
    priority: "urgent"
  },
  {
    id: 2,
    type: "missed-intake",
    title: "Missed Intakes",
    message: "23 beneficiaries missed iron tablet intake today",
    time: "15 mins ago",
    priority: "medium"
  },
  {
    id: 3,
    type: "teleconsultation",
    title: "Pending Teleconsultations",
    message: "8 teleconsultations scheduled for next hour",
    time: "30 mins ago",
    priority: "low"
  },
  {
    id: 4,
    type: "system",
    title: "System Update",
    message: "Monthly data sync completed successfully",
    time: "1 hour ago",
    priority: "info"
  }
];

const districtData = [
  { district: "Shimla", coverage: 92, beneficiaries: 2845, risk: "low" },
  { district: "Kullu", coverage: 88, beneficiaries: 1967, risk: "medium" },
  { district: "Mandi", coverage: 85, beneficiaries: 3421, risk: "medium" },
  { district: "Solan", coverage: 79, beneficiaries: 1523, risk: "high" },
  { district: "Hamirpur", coverage: 94, beneficiaries: 2156, risk: "low" }
];

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return <TrendingUp className="w-3 h-3 text-success" />;
    case "down":
      return <TrendingDown className="w-3 h-3 text-success" />;
    case "neutral":
      return <Minus className="w-3 h-3 text-muted-foreground" />;
    default:
      return null;
  }
};

const getColorClasses = (color: string) => {
  switch (color) {
    case "primary":
      return "bg-primary/10 text-primary border-primary/20";
    case "destructive":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "success":
      return "bg-success/10 text-success border-success/20";
    case "warning":
      return "bg-warning/10 text-warning border-warning/20";
    case "secondary":
      return "bg-secondary/10 text-secondary border-secondary/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent":
      return "bg-destructive/10 border-destructive/20 text-destructive";
    case "medium":
      return "bg-warning/10 border-warning/20 text-warning";
    case "low":
      return "bg-success/10 border-success/20 text-success";
    default:
      return "bg-muted border-border text-muted-foreground";
  }
};

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "low":
      return "text-success bg-success/10";
    case "medium":
      return "text-warning bg-warning/10";
    case "high":
      return "text-destructive bg-destructive/10";
    default:
      return "text-muted-foreground bg-muted";
  }
};

export default function MonitoringDashboard() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Monitoring Dashboard</h1>
          <p className="text-muted-foreground">Real-time health monitoring and analytics</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Activity className="w-4 h-4 mr-2" />
            Live Data
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </CardTitle>
                <div className={`p-2 rounded-lg border ${getColorClasses(kpi.color)}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-3xl font-bold">{kpi.value}</div>
                  <div className="flex items-center justify-between">
                    <CardDescription className="text-xs">
                      {kpi.description}
                    </CardDescription>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(kpi.trend)}
                      <span className={`text-xs font-medium ${
                        kpi.trend === "up" ? "text-success" : 
                        kpi.trend === "down" ? "text-success" : 
                        "text-muted-foreground"
                      }`}>
                        {kpi.change}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Nutrition Coverage Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Nutrition Coverage Trends</CardTitle>
              <CardDescription>Monthly coverage vs targets</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={nutritionTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="coverage" fill="hsl(var(--primary))" radius={4} />
                  <Bar dataKey="target" fill="hsl(var(--muted))" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Anemia Rates */}
          <Card>
            <CardHeader>
              <CardTitle>Anemia Rates by Severity</CardTitle>
              <CardDescription>Monthly trends in anemia prevalence</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={anemiaRatesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="mild" stroke="hsl(var(--warning))" strokeWidth={2} />
                  <Line type="monotone" dataKey="moderate" stroke="hsl(var(--destructive))" strokeWidth={2} />
                  <Line type="monotone" dataKey="severe" stroke="#dc2626" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Facility Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Facility Performance Distribution</CardTitle>
              <CardDescription>Coverage by facility type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={facilityPerformanceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {facilityPerformanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Notifications and Map Section */}
        <div className="space-y-6">
          {/* Real-time Notifications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-lg">Real-time Alerts</CardTitle>
                <CardDescription>Recent notifications and updates</CardDescription>
              </div>
              <Bell className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-80">
                <div className="space-y-3 p-6 pt-0">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-3 rounded-lg border ${getPriorityColor(notification.priority)}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <p className="text-xs text-muted-foreground">{notification.message}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {notification.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 mt-2">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* District Coverage Map */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">District Coverage Overview</CardTitle>
              <CardDescription>Beneficiary coverage by district</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {districtData.map((district) => (
                  <div key={district.district} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{district.district}</p>
                        <p className="text-xs text-muted-foreground">{district.beneficiaries} beneficiaries</p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-sm font-bold">{district.coverage}%</p>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getRiskColor(district.risk)}`}
                      >
                        {district.risk} risk
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}