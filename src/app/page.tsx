import { Button } from '@/features/shared/ui/button';

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="flex flex-col gap-6">
        <Button>Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </main>
  );
}
