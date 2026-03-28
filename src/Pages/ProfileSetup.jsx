import React from 'react';
import { Link } from 'react-router-dom';

const ProfileSetup = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-emerald-50 p-6">
      <div className="max-w-lg rounded-xl border border-emerald-200 bg-white p-8 text-center shadow-sm">
        <h1 className="mb-3 text-3xl font-bold text-emerald-800">Public Mode</h1>
        <p className="mb-6 text-gray-700">
          Profile setup is optional. Complaint reporting is fully public and available without authentication.
        </p>
        <Link
          to="/report-issue"
          className="inline-flex rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Continue to Report Issue
        </Link>
      </div>
    </div>
  );
};

export default ProfileSetup;
