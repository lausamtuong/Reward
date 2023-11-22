import { NextRequest, NextResponse } from 'next/server';
import i18n from '../i18n';

// This function can be marked `async` if using `await` inside
export default function middleware(request: NextRequest) {
  const locale = request.nextUrl.locale || i18n.defaultLocale;
  request.nextUrl.searchParams.set('locale', locale);
  request.nextUrl.href = request.nextUrl.href.replace(`/${locale}`, '');
  return NextResponse.rewrite(request.nextUrl);
}

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  // matcher: ['/((?!api|_next|health|ping|.*\\..*).*)'],
};
