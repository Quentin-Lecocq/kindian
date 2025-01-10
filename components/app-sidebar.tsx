'use client';

import { BarChart, FileDown, Heart, Home, Inbox, Star } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import NavUser from './nav-user';
import { Button } from './ui/button';
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

const items: {
  title: string;
  url: string;
  icon: React.ElementType;
}[] = [
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
  // TODO: temporary solution, i'll need to create a nav-main component to handle active state and use use-client at the bottom of the sidebar
  const pathname = usePathname();
  const { data: session } = useSession();

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
        {session ? (
          <NavUser user={session.user} />
        ) : (
          <div className="flex justify-center flex-col gap-4">
            <Button onClick={() => signIn('google')}>
              Sign in with google
            </Button>
            <Button onClick={() => signIn('github')}>
              Sign in with github
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
