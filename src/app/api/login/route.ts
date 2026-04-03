import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { token } = await req.json();

  const res = NextResponse.json({ success: true });

  res.cookies.set('__session', token, {
    domain: '.kalifaos.site', // VERY IMPORTANT
    path: '/',
    httpOnly: true,
    secure: true,
  });

  return res;
}