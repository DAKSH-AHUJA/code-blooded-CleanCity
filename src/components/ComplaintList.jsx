import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function ComplaintList() {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      setIsLoading(true);
      setError('');

      try {
        const { data, error: fetchError } = await supabase
          .from('complaints')
          .select('description, image_url');

        if (fetchError) {
          throw new Error(fetchError.message);
        }

        setComplaints(data || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch complaints.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (isLoading) {
    return <p className="text-sm text-gray-600">Loading complaints...</p>;
  }

  if (error) {
    return (
      <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
        {error}
      </p>
    );
  }

  if (complaints.length === 0) {
    return <p className="text-sm text-gray-600">No complaints found.</p>;
  }

  return (
    <div className="space-y-4">
      {complaints.map((complaint, index) => (
        <article
          key={`${complaint.image_url || 'complaint'}-${index}`}
          className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
        >
          <p className="mb-3 text-sm text-gray-800">{complaint.description}</p>
          {complaint.image_url ? (
            <img
              src={complaint.image_url}
              alt="Complaint"
              className="h-52 w-full rounded-lg object-cover"
              loading="lazy"
            />
          ) : null}
        </article>
      ))}
    </div>
  );
}
