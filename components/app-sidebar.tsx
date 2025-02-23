'use client';

import { useScopedI18n } from '@/locales/clients';
import { BarChart, FileDown, Heart, Home, Inbox, Star } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './logo';
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

type SidebarItemTitle =
  | 'home'
  | 'books'
  | 'highlights'
  | 'export'
  | 'favorites'
  | 'statistics';

const items: {
  title: SidebarItemTitle;
  url: string;
  icon: React.ElementType;
}[] = [
  {
    title: 'home',
    url: '/home',
    icon: Home,
  },
  {
    title: 'books',
    url: '/books',
    icon: Inbox,
  },
  {
    title: 'highlights',
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
  const t = useScopedI18n('sidebar');
  // TODO: temporary solution, i'll need to create a nav-main component to handle active state and use use-client at the bottom of the sidebar
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="pt-6 pb-4">
            <Logo />
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-4">
            <SidebarMenu className="text-foreground">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.includes(item.url)}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{t(item.title)}</span>
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
