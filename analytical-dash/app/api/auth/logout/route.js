import { logoutUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST() {
    logoutUser();
    return NextResponse.json({ message: 'Logged out' });
}