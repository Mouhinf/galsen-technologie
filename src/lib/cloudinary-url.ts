/**
 * Optimise une URL Cloudinary en insérant des transformations dans le chemin.
 * Format Cloudinary : https://res.cloudinary.com/<cloud>/image/upload/<public_id>
 * Transformé en :     https://res.cloudinary.com/<cloud>/image/upload/f_auto,q_auto,w_<width>/<public_id>
 */
export function optimizeCloudinaryUrl(
  url: string,
  options: { width?: number; height?: number; quality?: number } = {}
): string {
  if (!url || !isCloudinaryUrl(url)) return url;

  const { width, height, quality } = options;

  // Build transformation segments
  const transformations: string[] = ['f_auto', 'q_auto'];

  if (quality && quality < 100) {
    // Replace q_auto with explicit quality if provided
    transformations[transformations.length - 1] = `q_${quality}`;
  }

  if (width && height) {
    transformations.push(`w_${width}`, `h_${height}`, 'c_fill');
  } else if (width) {
    transformations.push(`w_${width}`, 'c_limit');
  } else if (height) {
    transformations.push(`h_${height}`, 'c_limit');
  }

  // Insert transformations before the upload/public_id segment
  // URL pattern: https://res.cloudinary.com/<cloud>/image/upload/v12345/<public_id>
  return url.replace(
    /(https?:\/\/res\.cloudinary\.com\/[^\/]+\/image\/upload\/)(v?\d+\/)?(.+)/,
    (_, base, version, publicId) => {
      const transformStr = transformations.join(',');
      return `${base}${transformStr}/${version || ''}${publicId}`;
    }
  );
}

export function isCloudinaryUrl(url: string): boolean {
  return url?.includes('res.cloudinary.com') ?? false;
}
