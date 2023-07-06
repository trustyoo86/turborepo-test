import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import qs from 'qs';

export function middleware(request: NextRequest) {
  const queries = new URLSearchParams(request.nextUrl.search);
  const params = Object.fromEntries(queries.entries());
  console.log('params ====>', params);

  return NextResponse.next();
}
