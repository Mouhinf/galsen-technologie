export function optimizeCloudinaryUrl(
  url: string,
  options: { width?: number; height?: number; quality?: number } = {}
): string {
  return url;
}

export function isCloudinaryUrl(url: string): boolean {
  return url?.includes('res.cloudinary.com') ?? false;
}
