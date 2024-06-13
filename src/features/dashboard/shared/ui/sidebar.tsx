'use client';

import { Button } from '@/features/shared/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { links } from '@/features/dashboard/shared/links';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-full bg-muted px-8 py-4">
      <h1 className="mt-2 text-center text-4xl font-bold">
        <Link href="/">Jobio</Link>
      </h1>
      <div className="mt-20 flex flex-col gap-4">
        {links.map((link) => (
          <Button
            key={link.label}
            variant={link.href === pathname ? 'default' : 'link'}
            asChild
          >
            <Link className="flex items-center gap-2" href={link.href}>
              {link.icon}
              <span className="capitalize">{link.label}</span>
            </Link>
          </Button>
        ))}
      </div>
    </aside>
  );
}
