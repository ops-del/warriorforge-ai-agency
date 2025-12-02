import { useState } from "react";
import type { FormEvent } from "react";
import { api } from "../../lib/api";
import type { DemoLeadPayload } from "../../types/DemoLead";

interface DemoChatProps {
  title: string;
  description: string;
  automationSlug: string;
  automationName: string;
  scriptedSteps: string[];
}

interface Message {
  from: "ai" | "user";
  text: string;
}

export function DemoChat({
  title,
  description,
  automationSlug,
  automationName,
  scriptedSteps,
}: DemoChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "ai",
      text: scriptedSteps[0] || "Hello! How can I help you today?",
    },
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadFormData, setLeadFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    phone: "",
    notes: "",
  });

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { from: "user", text: userInput },
    ];
    setMessages(newMessages);
    setUserInput("");

    const nextStep = currentStep + 1;
    if (nextStep < scriptedSteps.length) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { from: "ai", text: scriptedSteps[nextStep] },
        ]);
        setCurrentStep(nextStep);
      }, 800);
    } else {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            from: "ai",
            text: "This looks like a great fit! I'd love to set up a proper system for you. Can you share your details so we can get started?",
          },
        ]);
        setShowLeadForm(true);
      }, 800);
    }
  };

  const handleLeadSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload: DemoLeadPayload = {
      automationSlug,
      automationName,
      name: leadFormData.name,
      email: leadFormData.email,
      company: leadFormData.company || undefined,
      website: leadFormData.website || undefined,
      phone: leadFormData.phone || undefined,
      notes: leadFormData.notes || undefined,
    };

    try {
      await api.createDemoLead(payload);
      setLeadSubmitted(true);
    } catch (error) {
      console.error("Failed to submit demo lead:", error);
      alert("Failed to submit. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-6">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-orange-100">{description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 p-6">
          <div className="md:col-span-2">
            <div className="border border-gray-300 rounded-lg bg-gray-50 p-4 h-96 overflow-y-auto mb-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-3 ${
                    msg.from === "ai" ? "text-left" : "text-right"
                  }`}
                >
                  <div
                    className={`inline-block px-4 py-2 rounded-lg max-w-xs ${
                      msg.from === "ai"
                        ? "bg-gray-200 text-gray-900"
                        : "bg-orange-600 text-white"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {!showLeadForm && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type your reply..."
                  className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-2 rounded transition-colors"
                >
                  Send
                </button>
              </div>
            )}
          </div>

          <div className="md:col-span-1">
            {!showLeadForm && !leadSubmitted && (
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Demo Mode</h3>
                <p className="text-sm text-gray-600">
                  This is a simulated conversation. After a few exchanges,
                  you'll be able to submit your details for a real
                  implementation.
                </p>
              </div>
            )}

            {showLeadForm && !leadSubmitted && (
              <div className="bg-white border border-gray-300 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Get Your Custom System
                </h3>
                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Name *"
                    value={leadFormData.name}
                    onChange={(e) =>
                      setLeadFormData({ ...leadFormData, name: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email *"
                    value={leadFormData.email}
                    onChange={(e) =>
                      setLeadFormData({
                        ...leadFormData,
                        email: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={leadFormData.phone}
                    onChange={(e) =>
                      setLeadFormData({
                        ...leadFormData,
                        phone: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    value={leadFormData.company}
                    onChange={(e) =>
                      setLeadFormData({
                        ...leadFormData,
                        company: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <input
                    type="url"
                    placeholder="Website"
                    value={leadFormData.website}
                    onChange={(e) =>
                      setLeadFormData({
                        ...leadFormData,
                        website: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <textarea
                    placeholder="Notes"
                    value={leadFormData.notes}
                    onChange={(e) =>
                      setLeadFormData({
                        ...leadFormData,
                        notes: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                  >
                    Submit
                  </button>
                </form>
              </div>
            )}

            {leadSubmitted && (
              <div className="bg-green-50 border border-green-300 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">
                  Lead Received!
                </h3>
                <p className="text-sm text-green-800">
                  We'll contact you soon to forge your custom system. Check your
                  email for next steps.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
