import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../../lib/api";
import type { DemoLead } from "../../types/DemoLead";

export default function AdminDemoLeadDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [lead, setLead] = useState<DemoLead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    api.adminDemoLeads
      .get(Number(id))
      .then((data) => {
        setLead(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;
  if (!lead) return <div className="p-8">Demo lead not found</div>;

  return (
    <div className="p-8">
      <Link
        to="/admin/demo-leads"
        className="text-orange-600 hover:text-orange-800 mb-4 inline-block"
      >
        ← Back to Demo Leads
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Demo Lead #{lead.id}
      </h1>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <h2 className="text-sm font-medium text-gray-500 uppercase">
            Automation
          </h2>
          <p className="text-lg text-gray-900">{lead.automationName}</p>
          <p className="text-sm text-gray-600">({lead.automationSlug})</p>
        </div>

        <div className="border-t pt-4">
          <h2 className="text-sm font-medium text-gray-500 uppercase">
            Contact Information
          </h2>
          <div className="mt-2 space-y-2">
            <div>
              <span className="font-medium">Name:</span> {lead.name}
            </div>
            <div>
              <span className="font-medium">Email:</span>{" "}
              <a
                href={`mailto:${lead.email}`}
                className="text-orange-600 hover:underline"
              >
                {lead.email}
              </a>
            </div>
            {lead.phone && (
              <div>
                <span className="font-medium">Phone:</span>{" "}
                <a
                  href={`tel:${lead.phone}`}
                  className="text-orange-600 hover:underline"
                >
                  {lead.phone}
                </a>
              </div>
            )}
            {lead.company && (
              <div>
                <span className="font-medium">Company:</span> {lead.company}
              </div>
            )}
            {lead.website && (
              <div>
                <span className="font-medium">Website:</span>{" "}
                <a
                  href={lead.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 hover:underline"
                >
                  {lead.website}
                </a>
              </div>
            )}
          </div>
        </div>

        {lead.notes && (
          <div className="border-t pt-4">
            <h2 className="text-sm font-medium text-gray-500 uppercase">
              Notes
            </h2>
            <p className="mt-2 text-gray-900 whitespace-pre-wrap">
              {lead.notes}
            </p>
          </div>
        )}

        <div className="border-t pt-4">
          <h2 className="text-sm font-medium text-gray-500 uppercase">
            Submitted
          </h2>
          <p className="text-gray-900">
            {new Date(lead.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
