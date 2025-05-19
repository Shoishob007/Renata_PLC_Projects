import { getCurrentUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
    const user = getCurrentUser();
    return NextResponse.json(user);
}