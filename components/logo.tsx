'use client';

import { useRouter } from 'next/navigation';

const Logo = () => {
  const router = useRouter();
  return (
    <h1
      className="text-3xl font-bold text-foreground cursor-pointer"
      onClick={() => router.push('/')}
    >
      Kindian
    </h1>
  );
};

export default Logo;
