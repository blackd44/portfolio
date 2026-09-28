import { APP_ENV } from "@/utils/app-env";
import { validateContact } from "@/utils/contact";
import { NextResponse } from "next/server";

type Body = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
};

const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function POST(req: Request) {
  const url = process.env.GOOGLE_SCRIPT_URL;
  const secret = process.env.CONTACT_SECRET;
  if (!url || !secret) {
    return NextResponse.json(
      { error: "The contact form isn't set up yet." },
      { status: 500 }
    );
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // honeypot: people never see this field, bots fill it in
  if (text(body.website)) return NextResponse.json({ ok: true });

  const values = {
    name: text(body.name),
    email: text(body.email),
    subject: text(body.subject),
    message: text(body.message),
  };
  const errors = validateContact(values);
  if (Object.keys(errors).length) {
    return NextResponse.json(
      { error: "Please fix the highlighted fields.", errors },
      { status: 400 }
    );
  }
  const { name, email, subject, message } = values;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret, name, email, subject, message, env: APP_ENV }),
      redirect: "follow",
      cache: "no-store",
    });
    const raw = await res.text();
    let data: { ok?: boolean; error?: string } | null = null;
    try {
      data = JSON.parse(raw);
    } catch {}
    if (!res.ok || !data?.ok) {
      throw new Error(
        `${res.status} ${res.statusText} from ${new URL(res.url).host}: ` +
          (data?.error ?? raw.replace(/\s+/g, " ").slice(0, 300))
      );
    }
  } catch (err) {
    console.error("contact form:", err);
    return NextResponse.json(
      { error: "Couldn't send your message. Please try again later." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
