import { NextResponse } from 'next/server';
import * as argon2 from 'argon2';
import db from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const hashedPassword = await argon2.hash(password);

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ success: 'Account Created' }, { status: 200 });
  } catch (err) {
    console.error(err);
    if (err instanceof Error)
      return NextResponse.json({ error: err.message }, { status: 500 });
    return NextResponse.json(
      { error: 'an unknown error has occured' },
      { status: 500 },
    );
  }
}
