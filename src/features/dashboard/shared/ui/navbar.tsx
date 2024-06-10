import { DropdownLinks } from '@/features/dashboard/shared/ui/dropdown-links';
import { UserButton } from '@clerk/nextjs';
import { ThemeToggle } from '@/features/shared/ui/theme-toggle';

export function Navbar() {
  return (
    <nav className="bg-muted flex items-center justify-between px-4 py-4 sm:px-16 lg:px-24">
      <div>
        <DropdownLinks />
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
}
