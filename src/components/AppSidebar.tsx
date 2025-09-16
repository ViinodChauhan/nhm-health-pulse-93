import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  Users,
  MapPin,
  Search,
  Bell,
  FileText,
  Video,
  Settings,
  ChevronDown,
  Building2,
  Heart,
  UserCheck,
  Activity,
  GitBranch,
  AlertTriangle,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: BarChart3,
  },
  {
    title: "Beneficiary Management",
    icon: Users,
    subItems: [
      { title: "Search Beneficiaries", url: "/beneficiaries/search", icon: Search },
      { title: "Registration", url: "/beneficiaries/register", icon: UserCheck },
      { title: "Lifecycle Mapping", url: "/beneficiaries/lifecycle", icon: GitBranch },
      { title: "High-Risk Cases", url: "/beneficiaries/high-risk", icon: AlertTriangle },
      { title: "Health Records", url: "/beneficiaries/health", icon: Heart },
    ],
  },
  {
    title: "Geographic View",
    url: "/geographic",
    icon: MapPin,
  },
  {
    title: "Health Monitoring",
    icon: Activity,
    subItems: [
      { title: "Nutrition Tracking", url: "/health/nutrition", icon: Heart },
      { title: "Medicine Intake", url: "/health/medicine", icon: Activity },
      { title: "Diagnostic Results", url: "/health/diagnostics", icon: FileText },
    ],
  },
  {
    title: "Facilities",
    url: "/facilities",
    icon: Building2,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: FileText,
  },
  {
    title: "IEC Materials",
    url: "/iec-materials",
    icon: FileText,
  },
  {
    title: "Alerts",
    url: "/alerts",
    icon: Bell,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const [openGroups, setOpenGroups] = useState<string[]>(["Health Monitoring"]);
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium" 
      : "hover:bg-muted text-muted-foreground hover:text-foreground";

  const toggleGroup = (title: string) => {
    setOpenGroups(prev => 
      prev.includes(title) 
        ? prev.filter(g => g !== title)
        : [...prev, title]
    );
  };

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-card border-r">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="text-sm font-semibold text-primary">NHM HP</h2>
                <p className="text-xs text-muted-foreground">Monitoring Portal</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.subItems ? (
                    <Collapsible
                      open={openGroups.includes(item.title)}
                      onOpenChange={() => toggleGroup(item.title)}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="w-full justify-between hover:bg-muted">
                          <div className="flex items-center gap-2">
                            <item.icon className="w-4 h-4" />
                            {!isCollapsed && <span>{item.title}</span>}
                          </div>
                          {!isCollapsed && (
                            <ChevronDown className={`w-4 h-4 transition-transform ${
                              openGroups.includes(item.title) ? "rotate-180" : ""
                            }`} />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-1">
                        {!isCollapsed && item.subItems.map((subItem) => (
                          <SidebarMenuItem key={subItem.title} className="ml-6">
                            <SidebarMenuButton asChild size="sm">
                              <NavLink 
                                to={subItem.url} 
                                className={({ isActive }) => 
                                  isActive 
                                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors" 
                                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors"
                                }
                              >
                                <subItem.icon className="w-4 h-4" />
                                <span>{subItem.title}</span>
                              </NavLink>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavCls}>
                        <item.icon className="w-4 h-4 mr-2" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}