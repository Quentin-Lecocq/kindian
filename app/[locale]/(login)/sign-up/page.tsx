import { getUser } from '@/utils/user';
import { redirect } from 'next/navigation';
import Login from '../../../../features/auth/components/login';

const SignUp = async () => {
  const user = await getUser();

  if (user) {
    return redirect('/home');
  }

  return <Login mode="signup" />;
};

export default SignUp;
