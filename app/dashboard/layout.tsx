const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      {children}
    </div>
  );
};

export default DashboardLayout;
