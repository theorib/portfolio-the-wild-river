'use client';

import { logout } from '@/lib/auth';

export default function logoutButton() {
  return <button onClick={() => logout()}>Log out</button>;
}
