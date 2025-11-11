import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    version: "1",
    image: "https://nost.vercel.app/og.png",
    buttons: [
      {
        label: "Join NOST Airdrop",
        action: "link",
        target: "https://nost.vercel.app"
      }
    ],
    postUrl: "https://nost.vercel.app/api/webhook"
  });
}
