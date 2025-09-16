import { useState } from "react";
import { 
  Calendar,
  UserPlus,
  Heart,
  FileText,
  Video,
  AlertTriangle,
  CheckCircle,
  Clock,
  Camera,
  Download
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TimelineEvent {
  id: string;
  type: 'registration' | 'nutrition' | 'diagnostic' | 'followup' | 'risk';
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'flagged';
  documents?: string[];
  photos?: string[];
  details?: Record<string, any>;
}

const sampleBeneficiary = {
  id: "BEN001",
  name: "Priya Sharma",
  age: 28,
  location: "Village Kumhari, District Bilaspur",
  registrationDate: "2024-01-15"
};

const timelineEvents: TimelineEvent[] = [
  {
    id: "1",
    type: "registration",
    title: "Beneficiary Registration",
    description: "Initial registration completed with basic health assessment",
    date: "2024-01-15",
    status: "completed",
    documents: ["Registration Form", "ID Proof", "Address Proof"],
    details: {
      weight: "52 kg",
      height: "158 cm",
      bloodGroup: "O+",
      emergencyContact: "+91 9876543210"
    }
  },
  {
    id: "2",
    type: "nutrition",
    title: "Nutritional Assessment",
    description: "First nutritional intake assessment and counseling session",
    date: "2024-01-22",
    status: "completed",
    documents: ["Nutrition Plan", "Dietary Guidelines"],
    photos: ["nutrition_chart.jpg"],
    details: {
      bmi: "20.8",
      hemoglobin: "11.2 g/dL",
      recommendations: "Iron-rich diet, folic acid supplements"
    }
  },
  {
    id: "3",
    type: "diagnostic",
    title: "Blood Test - Routine",
    description: "Comprehensive blood work including CBC and iron studies",
    date: "2024-02-05",
    status: "completed",
    documents: ["Lab Report", "Doctor's Notes"],
    details: {
      hemoglobin: "11.8 g/dL",
      ironLevels: "Normal",
      recommendations: "Continue iron supplements"
    }
  },
  {
    id: "5",
    type: "risk",
    title: "Risk Flag - Low Hemoglobin",
    description: "Hemoglobin levels below threshold, immediate intervention required",
    date: "2024-03-10",
    status: "flagged",
    documents: ["Risk Assessment", "Intervention Plan"],
    details: {
      riskLevel: "Medium",
      actionRequired: "Immediate iron supplementation and weekly monitoring"
    }
  },
  {
    id: "6",
    type: "followup",
    title: "Follow-up Visit Scheduled",
    description: "Weekly monitoring visit for hemoglobin improvement",
    date: "2024-03-20",
    status: "pending",
    details: {
      visitType: "Home visit",
      assignedWorker: "ASHA Sunita Devi"
    }
  }
];

const getEventIcon = (type: TimelineEvent['type']) => {
  const iconProps = { className: "w-4 h-4" };
  switch (type) {
    case 'registration': return <UserPlus {...iconProps} />;
    case 'nutrition': return <Heart {...iconProps} />;
    case 'diagnostic': return <FileText {...iconProps} />;
    
    case 'followup': return <Clock {...iconProps} />;
    case 'risk': return <AlertTriangle {...iconProps} />;
    default: return <CheckCircle {...iconProps} />;
  }
};

const getStatusColor = (status: TimelineEvent['status']) => {
  switch (status) {
    case 'completed': return 'bg-success text-success-foreground';
    case 'pending': return 'bg-warning text-warning-foreground';
    case 'flagged': return 'bg-destructive text-destructive-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

export default function BeneficiaryLifecycle() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Beneficiary Lifecycle Mapping</h1>
          <p className="text-muted-foreground mt-1">
            Track the complete healthcare journey from registration to follow-ups
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Timeline
        </Button>
      </div>

      {/* Beneficiary Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl">{sampleBeneficiary.name}</h2>
              <p className="text-sm text-muted-foreground font-normal">
                ID: {sampleBeneficiary.id} | Age: {sampleBeneficiary.age} | {sampleBeneficiary.location}
              </p>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Healthcare Journey Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>
            
            <div className="space-y-6">
              {timelineEvents.map((event, index) => (
                <div key={event.id} className="relative flex items-start gap-4">
                  {/* Timeline dot */}
                  <div className={`
                    relative z-10 w-12 h-12 rounded-full flex items-center justify-center
                    ${getStatusColor(event.status)} shadow-sm
                  `}>
                    {getEventIcon(event.type)}
                  </div>
                  
                  {/* Event content */}
                  <div className="flex-1 min-w-0">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => setSelectedEvent(event)}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-foreground">{event.title}</h3>
                              <Badge variant="outline" className={`text-xs ${getStatusColor(event.status)}`}>
                                {event.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(event.date).toLocaleDateString()}
                              </span>
                              {event.documents && (
                                <span className="flex items-center gap-1">
                                  <FileText className="w-3 h-3" />
                                  {event.documents.length} document(s)
                                </span>
                              )}
                              {event.photos && (
                                <span className="flex items-center gap-1">
                                  <Camera className="w-3 h-3" />
                                  {event.photos.length} photo(s)
                                </span>
                              )}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Event Details Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedEvent && getEventIcon(selectedEvent.type)}
              {selectedEvent?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedEvent && (
            <ScrollArea className="max-h-96">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Status:</strong>{' '}
                    <Badge className={getStatusColor(selectedEvent.status)}>
                      {selectedEvent.status}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <strong>Description:</strong>
                  <p className="text-muted-foreground mt-1">{selectedEvent.description}</p>
                </div>

                {selectedEvent.details && (
                  <div>
                    <strong>Details:</strong>
                    <div className="bg-muted p-3 rounded-md mt-1 space-y-1">
                      {Object.entries(selectedEvent.details).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                          <span className="text-muted-foreground">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedEvent.documents && (
                  <div>
                    <strong>Documents:</strong>
                    <div className="mt-2 space-y-1">
                      {selectedEvent.documents.map((doc, index) => (
                        <Button key={index} variant="outline" size="sm" className="mr-2 mb-1">
                          <FileText className="w-3 h-3 mr-1" />
                          {doc}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedEvent.photos && (
                  <div>
                    <strong>Photos:</strong>
                    <div className="mt-2 space-y-1">
                      {selectedEvent.photos.map((photo, index) => (
                        <Button key={index} variant="outline" size="sm" className="mr-2 mb-1">
                          <Camera className="w-3 h-3 mr-1" />
                          {photo}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}