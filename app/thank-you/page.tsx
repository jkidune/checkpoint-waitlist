import Link from "next/link";
import CopyLinkButton from "@/components/CopyLinkButton";
import PremiumBadge from "@/components/PremiumBadge";

export default function ThankYouPage() {
  return (
    <>
      <header className="header">
        <Link className="brand" href="/">
          <span className="brand__mark" aria-hidden="true" />
          <span className="brand__name">Checkpoint</span>
        </Link>

        <Link className="header__cta" href="/">Home</Link>
      </header>

      <main className="main">
        <section className="card" aria-labelledby="title">
          <div className="pill">Checkpoint • Waitlist</div>

          <h1 className="title" id="title" style={{ display: "flex", gap: 12, alignItems: "center" }}>
  <PremiumBadge />
  You’re on the list
</h1>
          <p className="subtitle">
            Thanks for joining the Checkpoint early access waitlist. We’ll reach out when invites open.
          </p>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
            <Link className="header__cta" href="/">Back to home</Link>
            <CopyLinkButton className="header__cta" />
          </div>

          <p className="fineprint" style={{ marginTop: 14 }}>
            Tip: Share this link with your VICOBA committee so you onboard together.
          </p>
        </section>
      </main>
    </>
  );
}