import { DemoChat } from "../../components/demo/DemoChat";

export default function LeadCaptureDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-white">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Luma Greeting Banner */}
        <div className="mb-6 rounded-2xl border border-brand.purple/40 bg-gradient-to-r from-brand.blue/20 to-brand.purple/20 p-5">
          <p className="text-sm font-semibold text-brand.purple mb-2">
            ⚔️ FORGE INTELLIGENCE
          </p>
          <p className="text-slate-200">
            You're talking to <strong>Luma</strong>, the Forge Intelligence of
            WarriorForge Automations. Answer her questions honestly — she's
            mapping how this AI would run inside your business.
          </p>
        </div>

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            WarriorForge Lead Capture Demo
          </h1>
          <p className="text-slate-300 max-w-2xl">
            This is a live simulation of an AI lead capture system forged for
            high-intent prospects. It behaves like a 24/7 sales warrior that
            greets visitors, collects their details, and qualifies them
            automatically.
          </p>
        </header>

        <DemoChat
          automationSlug="ai-lead-capture-follow-up"
          automationName="AI Lead Capture & Follow-Up System"
          title="Lead Capture & Follow-Up AI"
          description="Watch how this AI greets your visitors, captures their details, and positions you as the authority — all before you ever talk to them."
          scriptedSteps={[
            "Hey, I'm your AI Lead Capture assistant from WarriorForge Automations. What's your first name?",
            "Nice to meet you. What does your business do and who do you typically work with?",
            "Got it. If a new lead landed on your page right now, what's the #1 question they'd probably ask?",
            "Imagine every one of those leads getting an instant response, plus a follow-up sequence. That's what this system is built to do.",
          ]}
        />
      </div>
    </div>
  );
}
