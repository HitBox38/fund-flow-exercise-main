import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isPageRequest = !request.nextUrl.pathname.match(/\.(js|css|png|jpg|svg)$/);

  if (request.nextUrl.pathname === "/dashboard") {
    return NextResponse.next();
  }

  if (isPageRequest) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
