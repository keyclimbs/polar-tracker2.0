import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { authorizeUrl } from "@/lib/polar";

export async function GET() {
  const clientId = process.env.POLAR_CLIENT_ID;
  if (!clientId) return NextResponse.json({ error: "POLAR_CLIENT_ID is not configured" }, { status: 503 });
  const redirectUri = process.env.POLAR_REDIRECT_URI;
  if (!redirectUri) return NextResponse.json({ error: "POLAR_REDIRECT_URI is not configured" }, { status: 503 });
  const state = randomBytes(16).toString("hex");
  const response = NextResponse.redirect(`${authorizeUrl}?${new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: "accesslink.read_all",
    state,
  })}`);
  response.cookies.set("polar_oauth_state", state, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 600 });
  return response;
}
