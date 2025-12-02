import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white via-white to-slate-100">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 py-12">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
