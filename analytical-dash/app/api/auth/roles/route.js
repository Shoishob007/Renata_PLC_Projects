import { getRoles } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const roles = getRoles();
  return NextResponse.json(roles);
}