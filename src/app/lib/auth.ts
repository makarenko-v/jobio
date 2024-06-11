import { auth } from '@clerk/nextjs/server';

export function getUserId() {
  const { userId } = auth();

  return userId;
}
