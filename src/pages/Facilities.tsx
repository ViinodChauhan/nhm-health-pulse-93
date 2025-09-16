import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Users, Building2, Plus } from "lucide-react";

const Facilities = () => {
  const facilities = [
    {
      id: 1,
      name: "Primary Health Center - Sector 12",
      type: "PHC",
      location: "Sector 12, Chandigarh",
      capacity: 150,
      currentLoad: 98,
      staff: 12,
      status: "active"
    },
    {
      id: 2,
      name: "Sub Center - Sector 8",
      type: "Sub Center",
      location: "Sector 8, Chandigarh",
      capacity: 80,
      currentLoad: 65,
      staff: 6,
      status: "active"
    },
    {
      id: 3,
      name: "Community Health Center - Sector 16",
      type: "CHC",
      location: "Sector 16, Chandigarh",
      capacity: 200,
      currentLoad: 145,
      staff: 18,
      status: "active"
    },
    {
      id: 4,
      name: "District Hospital",
      type: "District Hospital",
      location: "Sector 32, Chandigarh",
      capacity: 500,
      currentLoad: 380,
      staff: 45,
      status: "active"
    }
  ];

  const getLoadPercentage = (current: number, capacity: number) => {
    return Math.round((current / capacity) * 100);
  };

  const getLoadColor = (percentage: number) => {
    if (percentage >= 90) return "text-red-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Healthcare Facilities</h1>
          <p className="text-muted-foreground">Manage healthcare facilities and their operations</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Facility
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Facilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">24</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Facilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">22</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Capacity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">2,150</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Load</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">1,688</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Facility Directory</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search facilities..." 
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {facilities.map((facility) => {
              const loadPercentage = getLoadPercentage(facility.currentLoad, facility.capacity);
              return (
                <div key={facility.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-foreground">{facility.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {facility.location}
                        </div>
                        <Badge variant="outline">{facility.type}</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Capacity</div>
                      <div className="font-medium">{facility.capacity}</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Current Load</div>
                      <div className={`font-medium ${getLoadColor(loadPercentage)}`}>
                        {facility.currentLoad} ({loadPercentage}%)
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Staff</div>
                      <div className="font-medium flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {facility.staff}
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Facilities;