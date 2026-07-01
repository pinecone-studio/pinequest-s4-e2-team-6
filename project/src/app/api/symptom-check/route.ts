import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { symptom, language } = await request.json();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are an AI Medical Assistant specialized in travel medicine in rural Mongolia. 
            Analyze the user's symptoms. They might write in English, Cyrillic Mongolian, or Latin Mongolian (e.g., 'tolgoi uvduж').
            Provide a realistic risk assessment focusing on cold exposure, altitude sickness, food poisoning, or heat stroke.
            Keep the answer professional, concise (max 3 sentences), and practical for a tourist.
            Respond strictly in ${language === "en" ? "English" : "Mongolian (Cyrillic)"}.`,
          },
          { role: "user", content: symptom },
        ],
        temperature: 0.3,
      }),
    });

    const data = await response.json();
    const aiAnalysis = data.choices[0].message.content;

    return NextResponse.json({ result: aiAnalysis });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to analyze symptoms" },
      { status: 500 },
    );
  }
}
