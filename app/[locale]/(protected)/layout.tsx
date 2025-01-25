import AppSidebar from '@/components/app-sidebar';
import DropdownAvatar from '@/components/dropdown-avatar';
import LocaleSwitcher from '@/components/switchers/locale-switcher';
import ThemeSwitcher from '@/components/switchers/theme-switcher';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { getUser } from '@/utils/user';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <header className="border-b flex justify-between items-center p-4">
          <SidebarTrigger />
          <div className="flex items-center gap-4">
            <LocaleSwitcher />
            <ThemeSwitcher />
            <DropdownAvatar user={user?.user_metadata ?? null} />
          </div>
        </header>
        <main className="w-full p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
