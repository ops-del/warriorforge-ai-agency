export default function Footer() {
  return (
    <footer className="border-t border-white/30 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-center text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} AI Automation Agency. All rights
          reserved.
        </p>
        <div className="flex justify-center gap-4">
          <a href="mailto:hello@example.com" className="hover:text-brand.blue">
            hello@example.com
          </a>
          <a
            href="https://calendar.app.google"
            target="_blank"
            rel="noreferrer"
            className="hover:text-brand.blue"
          >
            Book a Call
          </a>
        </div>
      </div>
    </footer>
  );
}
