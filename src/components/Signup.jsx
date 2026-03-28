import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-emerald-50 p-6">
      <div className="max-w-md rounded-xl border border-emerald-200 bg-white p-6 text-center shadow-sm">
        <h1 className="mb-2 text-2xl font-bold text-emerald-800">No Signup Needed</h1>
        <p className="mb-4 text-sm text-gray-700">
          You can submit complaints directly without creating an account.
        </p>
        <Link
          to="/report-issue"
          className="inline-flex rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          Report a Complaint
        </Link>
      </div>
    </div>
  );
};

export default Signup;
