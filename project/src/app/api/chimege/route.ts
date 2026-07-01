import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const token = process.env.CHIMEGE_API;

  if (!token) {
    return NextResponse.json(
      { error: "Chimege API token missing in .env" },
      { status: 500 },
    );
  }

  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: "Text prompt is required" },
        { status: 400 },
      );
    }

    const response = await fetch("https://api.chimege.mn/v1/tts", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        Token: token,
      },
      body: String(text),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Chimege API Error: ${response.status} - ${errorText}` },
        { status: response.status },
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64Audio = btoa(
      String.fromCharCode(...new Uint8Array(arrayBuffer)),
    );

    return NextResponse.json({
      audio: `data:audio/mpeg;base64,${base64Audio}`,
    });
  } catch (error: any) {
    console.error("Chimege API Route Error:", error);
    return NextResponse.json(
      { error: `Холболтын алдаа: ${error?.message || ""}` },
      { status: 500 },
    );
  }
}
