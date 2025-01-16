'use client';

import { BarChart, FileDown, Heart, Home, Inbox, Star } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';

const items: {
  title: string;
  url: string;
  icon: React.ElementType;
}[] = [
  {
    title: 'dashboard',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'my-books',
    url: '/books',
    icon: Inbox,
  },
  {
    title: 'my-highlights',
    url: '/highlights',
    icon: Star,
  },
  {
    title: 'export',
    url: '/export',
    icon: FileDown,
  },
  {
    title: 'favorites',
    url: '/favorites',
    icon: Heart,
  },
  {
    title: 'statistics',
    url: '/statistics',
    icon: BarChart,
  },
];

const AppSidebar = () => {
  // TODO: temporary solution, i'll need to create a nav-main component to handle active state and use use-client at the bottom of the sidebar
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <h1 className="text-2xl font-bold">Kindian</h1>
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-4">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
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

export default AppSidebar;
