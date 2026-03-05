"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function WaitlistForm() {
  const router = useRouter();

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  const utm = useMemo(() => {
    if (typeof window === "undefined") return null;
    const p = new URLSearchParams(window.location.search);
    const obj: Record<string, string> = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((k) => {
      const v = p.get(k);
      if (v) obj[k] = v;
    });
    return Object.keys(obj).length ? obj : null;
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = new FormData(e.currentTarget);
    const payload = {
      email: String(form.get("email") || ""),
      full_name: String(form.get("full_name") || ""),
      phone: String(form.get("phone") || ""),
      group_name: String(form.get("group_name") || ""),
      company_website: String(form.get("company_website") || ""), // honeypot
      utm,
    };

    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data.ok) {
      setStatus("success");
      setMessage(data.message || "Saved!");
      (e.target as HTMLFormElement).reset();

      // Redirect to thank you page
      router.push("/thank-you");
      return;
    }

    setStatus("error");
    setMessage(data.message || "Something went wrong.");
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <input name="company_website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />

      <div className="grid">
        <input className="input" name="full_name" placeholder="Full name (optional)" />
        <input className="input" name="phone" placeholder="Phone (optional)" />
      </div>

      <input className="input" name="group_name" placeholder="VICOBA / group name (optional)" />

      <div className="row">
        <input className="input" name="email" type="email" placeholder="Your email address" required />
        <button className="button" type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Saving..." : "Join waitlist"}
        </button>
      </div>

      {message ? <p className={`msg ${status}`}>{message}</p> : <p className="fineprint">Early access invites go out in batches.</p>}
    </form>
  );
}