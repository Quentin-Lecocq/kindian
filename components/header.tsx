import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import kindianLogo from '@/public/kindian-logo.png';
import Image from 'next/image';
import ThemeToggle from './theme-toggle';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-2">
      <div className="flex items-center">
        <Image src={kindianLogo} alt="Kindian" width={64} height={64} />
        <h1 className="text-3xl font-bold">Kindian</h1>
      </div>
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
