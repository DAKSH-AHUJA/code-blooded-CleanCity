import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { uploadComplaintImage } from '../utils/uploadComplaintImage';

export default function ComplaintForm() {
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    setImageFile(file);
  };

  const resetForm = () => {
    setDescription('');
    setImageFile(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSuccess(false);

    if (!description.trim()) {
      setError('Please enter a complaint description.');
      return;
    }

    if (!imageFile) {
      setError('Please select an image.');
      return;
    }

    setIsSubmitting(true);

    try {
      const imageUrl = await uploadComplaintImage(imageFile);

      const { error: insertError } = await supabase.from('complaints').insert([
        {
          description: description.trim(),
          image_url: imageUrl,
        },
      ]);

      if (insertError) {
        throw new Error(`Failed to save complaint: ${insertError.message}`);
      }

      setIsSuccess(true);
      resetForm();
    } catch (submitError) {
      setError(submitError.message || 'Something went wrong while submitting your complaint.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
    >
      <h2 className="text-xl font-semibold text-gray-900">Submit Complaint</h2>

      <div className="space-y-2">
        <label htmlFor="complaint-description" className="block text-sm font-medium text-gray-700">
          Complaint Description
        </label>
        <textarea
          id="complaint-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={4}
          placeholder="Describe your complaint..."
          disabled={isSubmitting}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="complaint-image" className="block text-sm font-medium text-gray-700">
          Upload Image
        </label>
        <input
          id="complaint-image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isSubmitting}
          className="block w-full text-sm text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-emerald-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-emerald-700 hover:file:bg-emerald-100"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
      </button>

      {isSuccess && (
        <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          Complaint submitted successfully.
        </p>
      )}

      {error && (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}
    </form>
  );
}
