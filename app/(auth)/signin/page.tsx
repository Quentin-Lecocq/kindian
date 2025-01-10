'use client';

import { signIn } from 'next-auth/react';

const SignIn = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Sign in to your account</h1>
      <button
        onClick={() => signIn('google')}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
