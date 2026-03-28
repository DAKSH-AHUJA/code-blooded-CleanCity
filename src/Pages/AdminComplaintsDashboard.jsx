import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const AdminComplaintsDashboard = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClearingAll, setIsClearingAll] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchComplaints = async () => {
    setIsLoading(true);
    setError('');
    setMessage('');
    try {
      console.log('Fetching complaints for admin dashboard');
      const { data, error: fetchError } = await supabase
        .from('complaints')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      console.log('Complaints fetch response:', data);
      setComplaints(data || []);
    } catch (fetchError) {
      console.error('Fetch complaints error:', fetchError);
      setError('Failed to load complaints.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleDeleteComplaint = async (complaintId) => {
    const shouldDelete = window.confirm('Delete this complaint?');
    if (!shouldDelete) return;

    try {
      setError('');
      setMessage('');
      console.log('Deleting complaint:', complaintId);

      const { error: deleteError } = await supabase
        .from('complaints')
        .delete()
        .eq('id', complaintId);

      if (deleteError) {
        throw deleteError;
      }

      setComplaints((prev) => prev.filter((item) => item.id !== complaintId));
      setMessage('Complaint deleted successfully.');
    } catch (deleteError) {
      console.error('Delete complaint error:', deleteError);
      setError('Failed to delete complaint.');
    }
  };

  const handleClearAllComplaints = async () => {
    const shouldDeleteAll = window.confirm('Clear all complaints? This cannot be undone.');
    if (!shouldDeleteAll) return;

    setIsClearingAll(true);
    setError('');
    setMessage('');

    try {
      console.log('Clearing all complaints');
      const { error: clearError } = await supabase
        .from('complaints')
        .delete()
        .neq('id', 0);

      if (clearError) {
        throw clearError;
      }

      setMessage('All complaints deleted successfully.');
      await fetchComplaints();
    } catch (clearError) {
      console.error('Clear all complaints error:', clearError);
      setError('Failed to clear complaints.');
    } finally {
      setIsClearingAll(false);
    }
  };

  const handleLogout = () => {
    console.log('Admin logout');
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/20 px-4 py-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Complaint Dashboard</h1>
            <p className="text-sm text-gray-600">Manage all submitted complaints.</p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={fetchComplaints}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={handleClearAllComplaints}
              disabled={isClearingAll || complaints.length === 0}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isClearingAll ? 'Clearing...' : 'Clear All Complaints'}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Logout
            </button>
          </div>
        </div>

        {!!message && (
          <p className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
            {message}
          </p>
        )}

        {!!error && (
          <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        {isLoading ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-600 shadow-sm">
            Loading complaints...
          </div>
        ) : complaints.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-600 shadow-sm">
            No complaints found.
          </div>
        ) : (
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <article key={complaint.id} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-900">{complaint.description}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      {complaint.created_at ? new Date(complaint.created_at).toLocaleString() : 'No timestamp'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteComplaint(complaint.id)}
                    className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
                {complaint.image_url ? (
                  <img
                    src={complaint.image_url}
                    alt="Complaint"
                    className="h-56 w-full rounded-lg border border-gray-100 object-cover"
                    loading="lazy"
                  />
                ) : null}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminComplaintsDashboard;
