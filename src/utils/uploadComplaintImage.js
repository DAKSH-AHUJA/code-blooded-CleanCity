import { supabase } from '../lib/supabaseClient';

const BUCKET_NAME = 'complaints-images';

const getFileExtension = (fileName = '') => {
  const ext = fileName.split('.').pop();
  return ext && ext !== fileName ? ext.toLowerCase() : 'jpg';
};

const buildUniqueFileName = (file) => {
  const extension = getFileExtension(file?.name);
  const uuid =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2, 10);
  const timestamp = Date.now();

  return `${timestamp}-${uuid}.${extension}`;
};

export async function uploadComplaintImage(file) {
  if (!file) {
    throw new Error('No image file provided for upload.');
  }

  const filePath = buildUniqueFileName(file);

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`Failed to upload image: ${uploadError.message}`);
  }

  const { data: publicUrlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  const publicUrl = publicUrlData?.publicUrl;

  if (!publicUrl) {
    throw new Error('Image uploaded but failed to generate public URL.');
  }

  return publicUrl;
}
