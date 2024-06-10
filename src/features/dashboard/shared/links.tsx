import { ReactNode } from 'react';
import { AppWindow, AreaChart, Layers } from 'lucide-react';

interface NavLink {
  href: string;
  label: string;
  icon: ReactNode;
}

export const links: NavLink[] = [
  {
    href: '/jobs',
    label: 'Jobs',
    icon: <AppWindow />,
  },
  {
    href: '/jobs/add',
    label: 'Add Job',
    icon: <Layers />,
  },
  {
    href: '/stats',
    label: 'Stats',
    icon: <AreaChart />,
  },
];
