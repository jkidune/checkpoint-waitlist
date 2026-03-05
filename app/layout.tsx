import "./globals.css";
import { DM_Sans, Sora } from "next/font/google";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });
const dm = DM_Sans({ subsets: ["latin"], variable: "--font-dm" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${dm.variable}`}>
      <body>
        {/* Global background for ALL pages */}
        <div className="bg">
          <div className="bg__blob bg__blob--a" />
          <div className="bg__blob bg__blob--b" />
          <div className="bg__blob bg__blob--c" />
          <div className="bg__noise" aria-hidden="true" />
        </div>

        {children}
      </body>
    </html>
  );
}