import { BarChart, FileDown, Heart, Home, Inbox, Star } from 'lucide-react';
import NavUser from './nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';

const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://github.com/shadcn.png',
};

const items: { title: string; url: string; icon: React.ElementType }[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'My Books',
    url: '/dashboard/books',
    icon: Inbox,
  },
  {
    title: 'My Highlights',
    url: '/dashboard/highlights',
    icon: Star,
  },
  {
    title: 'Export',
    url: '/export',
    icon: FileDown,
  },
  {
    title: 'Favorites',
    url: '/dashboard/favorites',
    icon: Heart,
  },
  {
    title: 'Statistics',
    url: '/dashboard/statistics',
    icon: BarChart,
  },
];

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <h1 className="text-3xl font-bold text-white">Kindian</h1>
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-10">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
