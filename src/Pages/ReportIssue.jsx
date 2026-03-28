import React, { useState } from 'react';
import ComplaintForm from '../components/ComplaintForm';
import ComplaintList from '../components/ComplaintList';

export default function ReportIssue() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/30 py-10 px-4">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-2">
        <section>
          <h1 className="mb-4 text-3xl font-bold text-gray-900">Report a Complaint</h1>
          <p className="mb-6 text-sm text-gray-600">
            Submit a complaint with an image. No login is required.
          </p>
          <ComplaintForm onSuccess={() => setRefreshKey((prev) => prev + 1)} />
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">Recent Complaints</h2>
          <ComplaintList refreshKey={refreshKey} />
        </section>
      </div>
    </div>
  );
}
