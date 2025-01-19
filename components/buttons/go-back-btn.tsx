'use client';

import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

const GoBackBtn = () => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="p-0 mb-4 self-start"
      onClick={() => router.back()}
    >
      <ArrowLeftIcon className="w-4 h-4" />
    </Button>
  );
};

export default GoBackBtn;
