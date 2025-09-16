import { useState } from "react";
import { Upload, FileText, Video, Image, Download, Eye, Globe, Calendar, User, Filter, Search, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface IECMaterial {
  id: string;
  title: string;
  type: "PDF" | "Poster" | "Video";
  category: "Nutrition" | "Child Health" | "Women Health" | "General Awareness";
  language: "English" | "Hindi" | "Both";
  uploadedBy: string;
  uploadDate: string;
  fileSize: string;
  status: "Draft" | "Published" | "Under Review";
  downloadUrl: string;
}

const mockMaterials: IECMaterial[] = [
  {
    id: "1",
    title: "Nutritional Guidelines for Pregnant Women",
    type: "PDF",
    category: "Women Health",
    language: "Both",
    uploadedBy: "Dr. Priya Sharma",
    uploadDate: "2024-01-15",
    fileSize: "2.4 MB",
    status: "Published",
    downloadUrl: "#"
  },
  {
    id: "2",
    title: "Child Vaccination Schedule Poster",
    type: "Poster",
    category: "Child Health",
    language: "Hindi",
    uploadedBy: "ANM Sunita Devi",
    uploadDate: "2024-01-20",
    fileSize: "1.8 MB",
    status: "Published",
    downloadUrl: "#"
  },
  {
    id: "3",
    title: "Breastfeeding Awareness Video",
    type: "Video",
    category: "Nutrition",
    language: "English",
    uploadedBy: "Dr. Rajesh Kumar",
    uploadDate: "2024-01-25",
    fileSize: "45.2 MB",
    status: "Under Review",
    downloadUrl: "#"
  },
  {
    id: "4",
    title: "Hand Hygiene Educational Material",
    type: "PDF",
    category: "General Awareness",
    language: "Both",
    uploadedBy: "ASHA Worker Meera",
    uploadDate: "2024-01-30",
    fileSize: "1.2 MB",
    status: "Draft",
    downloadUrl: "#"
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "PDF": return FileText;
    case "Video": return Video;
    case "Poster": return Image;
    default: return FileText;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Published": return "bg-success text-success-foreground";
    case "Under Review": return "bg-warning text-warning-foreground";
    case "Draft": return "bg-muted text-muted-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

export default function IECMaterials() {
  const [materials, setMaterials] = useState<IECMaterial[]>(mockMaterials);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [languageFilter, setLanguageFilter] = useState<string>("all");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || material.type === typeFilter;
    const matchesCategory = categoryFilter === "all" || material.category === categoryFilter;
    const matchesLanguage = languageFilter === "all" || material.language === languageFilter;
    
    return matchesSearch && matchesType && matchesCategory && matchesLanguage;
  });

  const handleUpload = () => {
    toast({
      title: "Upload Successful",
      description: "IEC material has been uploaded and is under review.",
    });
    setIsUploadDialogOpen(false);
  };

  const handlePublish = (id: string) => {
    setMaterials(prev => prev.map(material => 
      material.id === id ? { ...material, status: "Published" } : material
    ));
    toast({
      title: "Material Published",
      description: "IEC material is now available for public access.",
    });
  };

  const handleDownload = (material: IECMaterial) => {
    toast({
      title: "Download Started",
      description: `Downloading ${material.title}...`,
    });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">IEC Materials</h1>
          <p className="text-muted-foreground">
            Manage Information, Education & Communication materials for health programs
          </p>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Upload Material
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload New IEC Material</DialogTitle>
              <DialogDescription>
                Upload educational materials for health awareness programs.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter material title" />
              </div>
              <div>
                <Label htmlFor="type">Material Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PDF">PDF Document</SelectItem>
                    <SelectItem value="Poster">Poster/Image</SelectItem>
                    <SelectItem value="Video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nutrition">Nutrition</SelectItem>
                    <SelectItem value="Child Health">Child Health</SelectItem>
                    <SelectItem value="Women Health">Women Health</SelectItem>
                    <SelectItem value="General Awareness">General Awareness</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="language">Language</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Brief description of the material" />
              </div>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Drag & drop files here or click to browse
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Supports: PDF, JPG, PNG, MP4 (Max 50MB)
                </p>
              </div>
              <Button onClick={handleUpload} className="w-full">
                Upload Material
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Materials</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{materials.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {materials.filter(m => m.status === "Published").length}
            </div>
            <p className="text-xs text-muted-foreground">Available publicly</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {materials.filter(m => m.status === "Under Review").length}
            </div>
            <p className="text-xs text-muted-foreground">Pending approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search materials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="PDF">PDF</SelectItem>
                  <SelectItem value="Poster">Poster</SelectItem>
                  <SelectItem value="Video">Video</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Nutrition">Nutrition</SelectItem>
                  <SelectItem value="Child Health">Child Health</SelectItem>
                  <SelectItem value="Women Health">Women Health</SelectItem>
                  <SelectItem value="General Awareness">General Awareness</SelectItem>
                </SelectContent>
              </Select>
              <Select value={languageFilter} onValueChange={setLanguageFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="Both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Uploaded By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMaterials.map((material) => {
                const TypeIcon = getTypeIcon(material.type);
                return (
                  <TableRow key={material.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <TypeIcon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{material.title}</div>
                          <div className="text-sm text-muted-foreground">{material.fileSize}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{material.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{material.category}</Badge>
                    </TableCell>
                    <TableCell>{material.language}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{material.uploadedBy}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{new Date(material.uploadDate).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(material.status)}>
                        {material.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDownload(material)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        {material.status !== "Published" && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handlePublish(material.id)}
                          >
                            <Globe className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}