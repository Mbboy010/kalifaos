import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { token } = await req.json();

  const isProduction = process.env.NODE_ENV === 'production';

  const res = NextResponse.json({ success: true });

  res.cookies.set('__session', token, {
    domain: isProduction ? '.kalifaos.site' : 'localhost',
    path: '/',
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
  });

  return res;
}