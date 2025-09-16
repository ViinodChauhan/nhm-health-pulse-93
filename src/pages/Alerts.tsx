import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, CheckCircle, XCircle } from "lucide-react";

const Alerts = () => {
  const alerts = [
    {
      id: 1,
      type: "high-risk",
      title: "High-Risk Beneficiary Alert",
      message: "Priya Sharma (ID: BEN001) has missed 3 consecutive nutrition supplements",
      time: "2 minutes ago",
      priority: "high",
      status: "active"
    },
    {
      id: 2,
      type: "medical",
      title: "Teleconsultation Pending",
      message: "Dr. Kumar has 5 pending teleconsultations for today",
      time: "15 minutes ago",
      priority: "medium",
      status: "active"
    },
    {
      id: 3,
      type: "system",
      title: "Low Stock Alert",
      message: "Iron tablets running low at Sector 12 Health Center",
      time: "1 hour ago",
      priority: "medium",
      status: "active"
    },
    {
      id: 4,
      type: "compliance",
      title: "Compliance Check Required",
      message: "Monthly nutrition data entry pending for 3 facilities",
      time: "2 hours ago",
      priority: "low",
      status: "resolved"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case "resolved": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "dismissed": return <XCircle className="w-4 h-4 text-gray-500" />;
      default: return <Clock className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Alerts & Notifications</h1>
          <p className="text-muted-foreground">Monitor system alerts and notifications</p>
        </div>
        <Button variant="outline">
          Mark All as Read
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">12</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">3</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Resolved Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">8</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">15m</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(alert.status)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-foreground">{alert.title}</h3>
                    <Badge className={getPriorityColor(alert.priority)}>
                      {alert.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  {alert.status === "active" && (
                    <Button variant="outline" size="sm">
                      Resolve
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Alerts;