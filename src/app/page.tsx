import { Button } from '@/features/shared/ui/button';

import Link from 'next/link';

export default function Page() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-12">
      <h1 className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-4xl font-bold text-transparent md:text-7xl">
        Jobio
      </h1>
      <p className="text-3xl">
        Job tracking app for{' '}
        <span className="text-primary font-bold">job hunters</span>
      </p>
      <Button className="p-6 text-xl" asChild>
        <Link href="/jobs/add">Get Started</Link>
      </Button>
    </main>
  );
}
