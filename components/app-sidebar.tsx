import {
  BarChart,
  FileDown,
  FileUp,
  Heart,
  Home,
  Inbox,
  Star,
} from 'lucide-react';
import NavUser from './nav-user';
import ThemeToggle from './theme-toggle';
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
    url: '/',
    icon: Home,
  },
  {
    title: 'My Books',
    url: '/books',
    icon: Inbox,
  },
  {
    title: 'My Highlights',
    url: '/highlights',
    icon: Star,
  },
  {
    title: 'Export',
    url: '/export',
    icon: FileDown,
  },
  {
    title: 'Import',
    url: '/import',
    icon: FileUp,
  },
  {
    title: 'Favorites',
    url: '/favorites',
    icon: Heart,
  },
  {
    title: 'Statistics',
    url: '/statistics',
    icon: BarChart,
  },
];

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl font-bold">
            <h1>Kindian</h1>
            <ThemeToggle />
          </SidebarGroupLabel>
          <SidebarGroupContent>
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
