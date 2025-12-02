import { DemoChat } from "../../components/demo/DemoChat";

export default function AppointmentSetterDemoPage() {
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
            WarriorForge Appointment Setter Demo
          </h1>
          <p className="text-slate-300 max-w-2xl">
            This demo simulates an AI closer whose only job is to qualify
            prospects and get them on your calendar — without back-and-forth
            messages or missed opportunities.
          </p>
        </header>

        <DemoChat
          automationSlug="ai-appointment-setter"
          automationName="AI Appointment Setter"
          title="AI Appointment Setter"
          description="See how an AI can qualify leads and move them straight onto your calendar, acting like a relentless booking machine for your business."
          scriptedSteps={[
            "Hey, I'm your AI Appointment Setter from WarriorForge Automations. What kind of calls or appointments are you trying to book?",
            "Who is your ideal client — and what are they usually looking for when they reach out?",
            "Right now, how are you handling leads that come in after hours or when you're busy?",
            "This AI is designed to respond instantly, ask a few qualifying questions, and then push the right people straight onto your calendar.",
          ]}
        />
      </div>
    </div>
  );
}
