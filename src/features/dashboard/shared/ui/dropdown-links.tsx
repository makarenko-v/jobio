'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/features/shared/ui/dropdown-menu';
import { Button } from '@/features/shared/ui/button';
import { AlignLeft } from 'lucide-react';
import { links } from '@/features/dashboard/shared/links';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';

export function DropdownLinks() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="lg:hidden">
        <Button variant="outline" size="icon">
          <AlignLeft />
          <span className="sr-only">Toggle links</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-52 lg:hidden"
        align="start"
        sideOffset={25}
      >
        {links.map((link) => (
          <DropdownMenuItem key={link.label}>
            <Link className="flex items-center gap-4" href={link.href}>
              {link.icon} <span className="capitalize">{link.label}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
