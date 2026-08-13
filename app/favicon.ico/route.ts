import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const iconResponse = await fetch(`${request.nextUrl.origin}/icon`);
  const buffer = await iconResponse.arrayBuffer();
  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
