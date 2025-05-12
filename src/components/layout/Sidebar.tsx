
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, User, Shield, Briefcase, Settings, Menu
} from 'lucide-react';
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
} from '@/components/ui/sidebar';

const menuItems = [
  { 
    title: 'Dashboard', 
    path: '/', 
    icon: Home 
  },
  { 
    title: 'My Profile', 
    path: '/profile', 
    icon: User 
  },
  { 
    title: 'Security', 
    path: '/security', 
    icon: Shield 
  },
  { 
    title: 'Job Posts', 
    path: '/job-posts', 
    icon: Briefcase 
  },
  { 
    title: 'Company Settings', 
    path: '/settings', 
    icon: Settings 
  },
];

const SidebarComponent = () => {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  // Helper functions
  const isActive = (path: string) => {
    if (path === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(path);
  };

  const isExpanded = menuItems.some((item) => isActive(item.path));

  const getNavClass = ({ isActive }: { isActive: boolean }) => 
    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "hover:bg-sidebar-accent/50";

  return (
    <Sidebar 
      className={`transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}
      collapsible
    >
      <div className="h-14 flex items-center px-3 justify-between border-b border-sidebar-border">
        {!collapsed && (
          <div className="text-xl font-bold text-sidebar-foreground">
            CompanyHQ
          </div>
        )}
        <SidebarTrigger className="ml-auto">
          <Menu className="h-5 w-5" />
        </SidebarTrigger>
      </div>

      <SidebarContent>
        <SidebarGroup
          open={isExpanded}
          defaultOpen={true}
        >
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Main Navigation
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      end={item.path === '/'}
                      className={`${getNavClass} flex items-center px-3 py-2 rounded-md`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <span className="ml-3 whitespace-nowrap">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SidebarComponent;
