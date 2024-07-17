'use client';
import { logout } from '@/lib/actions/auth.actions/logout.actions';

export default function logoutButton() {
  return <button onClick={() => logout()}>Log out</button>;
}
