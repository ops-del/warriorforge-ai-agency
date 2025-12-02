import React from "react";

export default function ContactPage() {
  return (
    <div className="max-w-xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-6 text-brand.blue">
        Contact WarriorForge
      </h1>
      <p className="mb-4 text-lg">
        Book a call, request a demo, or ask a question. We respond within 1
        business day.
      </p>
      <form
        className="space-y-6"
        action="mailto:ops@warriorforgeai.com"
        method="POST"
        encType="text/plain"
      >
        <div>
          <label className="block mb-2 font-semibold" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-brand.blue text-white px-6 py-3 font-semibold shadow-lg"
        >
          Send Message
        </button>
      </form>
      <p className="mt-8 text-sm text-slate-500">
        Or email us directly:{" "}
        <a href="mailto:ops@warriorforgeai.com" className="underline">
          ops@warriorforgeai.com
        </a>
      </p>
    </div>
  );
}
