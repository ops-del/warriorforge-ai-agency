import { DemoChat } from "../../components/demo/DemoChat";

export default function SupportInboxDemoPage() {
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
            WarriorForge Support Inbox Demo
          </h1>
          <p className="text-slate-300 max-w-2xl">
            This demo shows how an AI support agent can handle common questions,
            triage issues, and free you or your team from repetitive support
            work — while giving customers instant answers.
          </p>
        </header>

        <DemoChat
          automationSlug="ai-customer-support-inbox"
          automationName="AI Customer Support Inbox"
          title="Customer Support AI Inbox"
          description="This AI sits on the front line of your customer support, answering FAQs, routing complex requests, and keeping customers feeling taken care of 24/7."
          scriptedSteps={[
            "Hey, I'm your AI Support assistant from WarriorForge Automations. What kind of business are you running?",
            "Nice. What's the most common question or complaint your customers message you about?",
            "If an AI could answer that instantly, how much time would that save you or your team each week?",
            "This support inbox is designed to handle FAQs, basic troubleshooting, and smart routing — so humans only handle the real edge cases.",
          ]}
        />
      </div>
    </div>
  );
}
