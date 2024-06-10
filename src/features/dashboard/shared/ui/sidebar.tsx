'use client';

import { Button } from '@/features/shared/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { links } from '@/features/dashboard/shared/links';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-muted h-full px-8 py-4">
      <Image
        src="/logo.png"
        alt="Logo"
        className="mx-auto"
        width={64}
        height={64}
        priority
      />
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
