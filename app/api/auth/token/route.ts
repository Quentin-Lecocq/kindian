import { getAccessToken } from '@/utils/user';
import { NextResponse } from 'next/server';

export async function GET() {
  const token = await getAccessToken();

  if (!token) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  return NextResponse.json({ token });
}
