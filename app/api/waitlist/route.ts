import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Honeypot (spam bots)
    if (body.company_website) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const email = String(body.email || "").trim().toLowerCase();
    const full_name = String(body.full_name || "").trim() || null;
    const phone = String(body.phone || "").trim() || null;
    const group_name = String(body.group_name || "").trim() || null;

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ ok: false, message: "Enter a valid email." }, { status: 400 });
    }

    const utm = body.utm && typeof body.utm === "object" ? body.utm : null;

    const { error } = await supabaseAdmin
      .from("waitlist_signups")
      .insert([{ email, full_name, phone, group_name, utm }]);

    // If email already exists, treat as success (nice UX)
    if (error?.code === "23505") {
      return NextResponse.json({ ok: true, message: "You’re already on the list." }, { status: 200 });
    }

    if (error) {
      return NextResponse.json({ ok: false, message: "Could not save. Try again." }, { status: 500 });
    }

    return NextResponse.json({ ok: true, message: "You’re in! We’ll email you when early access opens." });
  } catch {
    return NextResponse.json({ ok: false, message: "Bad request." }, { status: 400 });
  }
}