import { supabase } from '../lib/supabaseClient';

const BUCKET_NAME = 'complaints-images';

const buildUniqueFileName = (file) => {
  const originalName = file?.name || 'complaint-image.jpg';
  const safeOriginalName = originalName.replace(/\s+/g, '-');
  return `${Date.now()}-${safeOriginalName}`;
};

export async function uploadComplaintImage(file) {
  if (!file) {
    throw new Error('No image file provided for upload.');
  }

  console.log('file selected:', file);
  const filePath = buildUniqueFileName(file);

  const uploadResponse = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });
  console.log('upload response:', uploadResponse);

  const { error: uploadError } = uploadResponse;

  if (uploadError) {
    console.error('Upload error:', uploadError);
    throw new Error(`Failed to upload image: ${uploadError.message}`);
  }

  const { data: publicUrlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  const publicUrl = publicUrlData?.publicUrl;
  console.log('public URL:', publicUrl);

  if (!publicUrl) {
    throw new Error('Image uploaded but failed to generate public URL.');
  }

  return publicUrl;
}
