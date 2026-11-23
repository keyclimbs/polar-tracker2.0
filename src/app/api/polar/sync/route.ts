import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ error: "No Polar connection is configured. Enable Demo Mode or connect Polar." }, { status: 409 });
}
