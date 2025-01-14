'use client';

import SignInWrapper from '@/features/auth/components/signin-wrapper';
import { useToast } from '@/hooks/use-toast';
import { BarChart, FileDown, Heart, Home, Inbox, Star } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

const items: {
  title: string;
  url: string;
  icon: React.ElementType;
  protected: boolean;
}[] = [
  {
    title: 'dashboard',
    url: '/dashboard',
    icon: Home,
    protected: true,
  },
  {
    title: 'my-books',
    url: '/dashboard/books',
    icon: Inbox,
    protected: true,
  },
  {
    title: 'my-highlights',
    url: '/dashboard/highlights',
    icon: Star,
    protected: true,
  },
  {
    title: 'export',
    url: '/export',
    icon: FileDown,
    protected: false,
  },
  {
    title: 'favorites',
    url: '/dashboard/favorites',
    icon: Heart,
    protected: true,
  },
  {
    title: 'statistics',
    url: '/dashboard/statistics',
    icon: BarChart,
    protected: true,
  },
];

const AppSidebar = () => {
  // TODO: temporary solution, i'll need to create a nav-main component to handle active state and use use-client at the bottom of the sidebar
  const pathname = usePathname();
  const { data: session } = useSession();
  const { toast } = useToast();

  const alertUserProtectedSection = (
    e: React.MouseEvent<HTMLLIElement>,
    isProtected: boolean
  ) => {
    if (!session && isProtected) {
      e.preventDefault();
      toast({
        variant: 'destructive',
        title: 'Unauthorized',
        description: 'Please sign in to access this section',
      });
    }
  };

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
                <SidebarMenuItem
                  key={item.title}
                  className={`${
                    !session && item.protected ? 'opacity-50' : ''
                  }`}
                  onClick={(e) => {
                    alertUserProtectedSection(e, item.protected);
                  }}
                >
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
      <SidebarFooter>
        {session ? <NavUser user={session.user} /> : <SignInWrapper />}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
