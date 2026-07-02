import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      new URL("/workspace?error=missing_code", request.url),
      { status: 400 },
    );
  }

  const result = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code,
    }),
  });

  const data = await result.json();
  const token = data.access_token;

  if (!token) {
    return NextResponse.redirect(
      new URL("/workspace?error=token_exchange_failed", request.url),
      { status: 400 },
    );
  }

  // Store the token in a http only cookie
  const res = NextResponse.redirect(new URL("/workspace", request.url));
  res.cookies.set("github_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 1 month
    path: "/",
    sameSite: "lax",
  });

  return res;
}
