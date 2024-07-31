import { Lucia, TimeSpan } from 'lucia';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { db } from '@/db';
import { sessions, UserRole, users } from '@/db/schemas';
import { env } from '@/lib/env';

const adapter = new DrizzleSQLiteAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    name: env.NEXT_PUBLIC_AUTH_SESSION_COOKIE_NAME,
    attributes: {
      secure: env.NODE_ENV === 'production',
      sameSite: 'strict',
      domain: env.NEXT_PUBLIC_DOMAIN,
    },
  },
  sessionExpiresIn: new TimeSpan(30, 'd'),

  getUserAttributes: (attributes): DatabaseUserAttributes => {
    return {
      email: attributes.email,
      name: attributes.name,
      image: attributes.image,
      role: attributes.role,
      emailVerified: attributes.emailVerified,
    };
  },
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}
interface DatabaseUserAttributes {
  email: string;
  name: string;
  image: string;
  role: UserRole;
  emailVerified: boolean;
}
