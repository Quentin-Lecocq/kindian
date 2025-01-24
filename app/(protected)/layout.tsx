import AppSidebar from '@/components/app-sidebar';
import ThemeSwitcher from '@/components/switchers/theme-switcher';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <header className="border-b flex justify-between items-center p-4">
          <SidebarTrigger />
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
          </div>
        </header>
        <main className="w-full p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
