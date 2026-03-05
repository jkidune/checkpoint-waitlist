import WaitlistForm from "@/components/WaitlistForm";

export default function Page() {
  return (
    <>
     

      <header className="header">
        <a className="brand" href="#">
          <span className="brand__mark" aria-hidden="true" />
          <span className="brand__name">Checkpoint</span>
        </a>
        <a className="header__cta" href="#waitlist">Early Access</a>
      </header>

      <main className="main">
        <section className="card" id="waitlist" aria-labelledby="title">
          <div className="pill">Checkpoint • Early Access</div>

          <h1 className="title" id="title">Transparency for VICOBA finances — in real time.</h1>
          <p className="subtitle">
            Replace spreadsheets, paper registers, and treasurer WhatsApp updates with one automated system.
            Every member can see the group’s financial health anytime.
          </p>

          <ul className="bullets">
            <li>Track contributions & compliance</li>
            <li>Manage loans & repayments</li>
            <li>Generate clean financial reports</li>
          </ul>

          <WaitlistForm />
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Checkpoint Platform</span>
        <span className="footer__dot">•</span>
        <span>Confidential • Early Access</span>
      </footer>
    </>
  );
}