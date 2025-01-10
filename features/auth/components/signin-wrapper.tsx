import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const SignInWrapper = () => {
  return (
    <div className="flex flex-col gap-4">
      <Button className="bg-white" onClick={() => signIn('google')}>
        <FcGoogle />
        Sign in with Google
      </Button>
      <Button
        className="bg-gray-800 text-white hover:bg-gray-900"
        onClick={() => signIn('github')}
      >
        <FaGithub />
        Sign in with Github
      </Button>
    </div>
  );
};

export default SignInWrapper;
