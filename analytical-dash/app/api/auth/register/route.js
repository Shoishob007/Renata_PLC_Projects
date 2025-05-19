import { registerUser } from '@/lib/auth';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { email, name, password, image_url, role_id } = await request.json();

  try {
    const user = await registerUser({ email, name, password, image_url, role_id });
    cookies().set('user', JSON.stringify(user), { httpOnly: true });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Registration failed' },
      { status: 400 }
    );
  }
}