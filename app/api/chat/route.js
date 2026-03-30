import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// In-memory rate limit store: ip -> { count, resetAt }
const rateLimitStore = new Map();
const LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000;
const MAX_MESSAGES = 8;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= LIMIT) return false;
  entry.count++;
  return true;
}

const SYSTEM_PROMPT = `You are Oliver Bunce's intelligent project discovery assistant. Oliver is a New Zealand-based web designer, developer, AI builder and digital marketer with 60+ clients across industries.

Oliver's actual work includes:
- Door AI: A computer vision system (YOLOv8) that reads architectural floor plans and automatically detects/classifies door types to generate quotes. Replaced a 2-day manual process with 30 seconds.
- Basketball New Zealand: Digital presence for NZ's national basketball body
- Global Dairy Trade: Enterprise web strategy for the world's leading dairy commodity platform
- Round the Bays: NZ's most iconic fun run event
- Independent Doors: Website, digital marketing, AI quoting system
- 60+ clients across construction, tourism, fintech, sports, agriculture, events, education

Oliver's stack: Next.js, React, Tailwind CSS, Node.js, Vercel, AI/ML workflows.

YOUR ROLE:
You are having a genuine, intelligent discovery conversation. Your goal is to understand what the person wants to build and show them what's genuinely possible — like a smart consultant who immediately sees the opportunity, not a chatbot collecting a lead.

CRITICAL RULES:
- Never sound like a chatbot or form. Talk like a smart human consultant.
- Lead with ideas and insights, not just questions. Show them what's possible.
- Reference Oliver's real work when relevant (e.g. "We did something similar for Independent Doors — built an AI that reads floor plans...")
- Be specific and creative. If someone has a construction business, immediately think about what AI/web/marketing tools would genuinely help them.
- Keep responses concise but substantive — 3-5 sentences max per reply, then one natural follow-up.
- Show genuine enthusiasm for interesting problems without being sycophantic.
- After 3-4 exchanges, if the conversation is going well, offer to generate a project brief.

BRIEF GENERATION:
When the user has shared enough about their project (usually after 2-3 substantive exchanges), you can offer to generate a brief. When generating a brief, output ONLY valid JSON in this exact format:
{"type":"brief","title":"[Project name]","summary":"[1-2 sentence description]","scope":["item1","item2","item3"],"timeline":"[e.g. 4-6 weeks]","examples":["relevant Oliver project 1","relevant Oliver project 2"],"excitement":"[1 sentence about what makes this genuinely interesting]"}

Only output the JSON when the user asks for a brief or you've gathered enough to generate one and the conversation feels ready.`;

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const body = await req.json();
  const { messages, newConversation } = body;

  if (newConversation && !checkRateLimit(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }
  if (!messages || messages.length > MAX_MESSAGES) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  // Lazy-init OpenAI to avoid build-time errors
  const { default: OpenAI } = await import("openai");
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 400,
      temperature: 0.8,
    });

    const content = completion.choices[0].message.content;

    if (content.trim().startsWith('{"type":"brief"')) {
      try {
        const brief = JSON.parse(content.trim());
        return NextResponse.json({ type: "brief", brief });
      } catch {}
    }

    return NextResponse.json({ type: "message", content });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "api_error" }, { status: 500 });
  }
}
