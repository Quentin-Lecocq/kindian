import { signOut } from '@/app/[locale]/(login)/actions';
import { UserMetadata } from '@supabase/supabase-js';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface DropdownAvatarProps {
  user: UserMetadata | null;
}

const DropdownAvatar = ({ user }: DropdownAvatarProps) => {
  if (!user) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={user.avatar_url} />
            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mr-4">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Settings
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="cursor-pointer">
            <form action={signOut}>
              <Button className="p-0 h-5" variant="ghost">
                Sign out
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default DropdownAvatar;
