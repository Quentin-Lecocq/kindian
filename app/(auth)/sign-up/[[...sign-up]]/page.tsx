import { SignUp } from '@clerk/nextjs';

const SignupPage = () => {
  return <SignUp forceRedirectUrl="/new-user" />;
};

export default SignupPage;
