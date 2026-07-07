export function cn(...inputs) {
  return inputs.flat().filter(Boolean).join(' ');
}

export function getSupabaseThumbnailUrl(url) {
  if (!url || typeof url !== 'string') return url;
  if (url.includes('.supabase.co/storage/v1/object/public/') && /\.(jpg|jpeg|png|webp)$/i.test(url)) {
    if (url.includes('_thumb.')) return url;
    return url.replace(/(\.jpg|\.jpeg|\.png|\.webp)$/i, '_thumb$1');
  }
  return url;
}
