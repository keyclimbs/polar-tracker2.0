import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.text();
  if (!body) return NextResponse.json({ error: "Empty webhook payload" }, { status: 400 });
  return NextResponse.json({ received: true });
}
