import { ReactNode } from 'react';

interface JobInfoProps {
  icon: ReactNode;
  text: string;
}

export function JobInfo({ icon, text }: JobInfoProps): ReactNode {
  return (
    <div className="flex gap-2">
      {icon}
      {text}
    </div>
  );
}
