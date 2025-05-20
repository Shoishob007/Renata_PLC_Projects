import { loginUser } from '@/lib/auth';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { email, password } = await request.json();

    try {
        const user = await loginUser(email, password);

        const cookieStore = await cookies();
        cookieStore.set('user', JSON.stringify(user), { httpOnly: true });

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Login failed' },
            { status: 401 }
        );
    }
}