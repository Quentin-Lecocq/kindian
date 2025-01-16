import AppSidebar from '@/components/app-sidebar';
import ThemeToggle from '@/components/theme-toggle';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { UserButton } from '@clerk/nextjs';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="outline w-full">
        <header className="border-b flex justify-between items-center p-4">
          <SidebarTrigger />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserButton />
          </div>
        </header>
        <main className="w-full p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
