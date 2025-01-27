import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { FaGithub, FaGoogle } from 'react-icons/fa';

type LoginProviderButtonsProps = {
  loading: boolean;
  onGithubSignIn: () => void;
  onGoogleSignIn: () => void;
};

const LoginProviderButtons = ({
  loading,
  onGithubSignIn,
  onGoogleSignIn,
}: LoginProviderButtonsProps) => {
  return (
    <div className="flex flex-row gap-2 w-full">
      <Button
        disabled={loading}
        variant="outline"
        className="flex-1"
        onClick={onGithubSignIn}
      >
        <div className="flex items-center gap-2">
          {loading ? <Spinner size="small" /> : <FaGithub />}
          Github
        </div>
      </Button>
      <Button
        disabled={loading}
        variant="outline"
        onClick={onGoogleSignIn}
        className="flex-1"
      >
        <div className="flex items-center gap-2">
          {loading ? <Spinner size="small" /> : <FaGoogle />}
          Google
        </div>
      </Button>
    </div>
  );
};

export default LoginProviderButtons;
