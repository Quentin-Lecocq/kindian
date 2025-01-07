import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ThemeToggle from './theme-toggle';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4">
      <h1 className="text-3xl font-bold">Kindian</h1>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
