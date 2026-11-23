import { NextRequest, NextResponse } from "next/server";
import { polarCallbackSchema, polarTokenSchema, tokenUrl, apiBase } from "@/lib/polar";

export async function GET(request: NextRequest) {
  const parsed = polarCallbackSchema.safeParse({
    code: request.nextUrl.searchParams.get("code"),
    state: request.nextUrl.searchParams.get("state"),
  });
  if (!parsed.success) return NextResponse.json({ error: "Invalid OAuth callback" }, { status: 400 });
  if (!parsed.data.state || parsed.data.state !== request.cookies.get("polar_oauth_state")?.value) {
    return NextResponse.json({ error: "Invalid OAuth state" }, { status: 400 });
  }
  const clientId = process.env.POLAR_CLIENT_ID;
  const clientSecret = process.env.POLAR_CLIENT_SECRET;
  const redirectUri = process.env.POLAR_REDIRECT_URI;
  if (!clientId || !clientSecret || !redirectUri) return NextResponse.json({ error: "Polar OAuth is not configured" }, { status: 503 });

  const tokenResponse = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}` },
    body: new URLSearchParams({ grant_type: "authorization_code", code: parsed.data.code, redirect_uri: redirectUri }),
  });
  if (!tokenResponse.ok) return NextResponse.json({ error: "Token exchange failed" }, { status: 502 });
  const token = polarTokenSchema.parse(await tokenResponse.json());

  const registration = await fetch(`${apiBase}/users`, {
    method: "POST",
    headers: { Authorization: "Bearer " + token.access_token, "Content-Type": "application/json" },
  });
  if (!registration.ok && registration.status !== 409) return NextResponse.json({ error: "Polar user registration failed" }, { status: 502 });

  const response = NextResponse.redirect(new URL("/settings?connected=1", request.url));
  response.cookies.delete("polar_oauth_state");
  return response;
}
