export function getOptimizedImageUrl(
  url: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
  } = {}
): string {
  if (!url) return '';

  const isPexels = url.includes('pexels.com');
  const isCloudinary = url.includes('cloudinary.com');
  const isUnsplash = url.includes('unsplash.com');

  if (isPexels) {
    const params = new URLSearchParams();
    if (options.width) params.append('w', options.width.toString());
    if (options.height) params.append('h', options.height.toString());
    params.append('auto', 'compress');
    params.append('cs', 'tinysrgb');

    return `${url.split('?')[0]}?${params.toString()}`;
  }

  if (isCloudinary) {
    const urlParts = url.split('/upload/');
    if (urlParts.length === 2) {
      const transformations = [];

      if (options.width) transformations.push(`w_${options.width}`);
      if (options.height) transformations.push(`h_${options.height}`);
      if (options.quality) transformations.push(`q_${options.quality}`);
      if (options.format) transformations.push(`f_${options.format}`);

      transformations.push('c_fill');
      transformations.push('g_auto');

      return `${urlParts[0]}/upload/${transformations.join(',')}/${urlParts[1]}`;
    }
  }

  if (isUnsplash) {
    const params = new URLSearchParams();
    if (options.width) params.append('w', options.width.toString());
    if (options.height) params.append('h', options.height.toString());
    if (options.quality) params.append('q', options.quality.toString());
    params.append('auto', 'format');
    params.append('fit', 'crop');

    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${params.toString()}`;
  }

  return url;
}

export function generateSrcSet(
  baseUrl: string,
  widths: number[] = [320, 640, 768, 1024, 1280, 1536]
): string {
  return widths
    .map(width => `${getOptimizedImageUrl(baseUrl, { width, quality: 80 })} ${width}w`)
    .join(', ');
}

export function generateSizes(
  breakpoints: { [key: string]: string } = {
    '(max-width: 640px)': '100vw',
    '(max-width: 1024px)': '50vw',
    default: '33vw'
  }
): string {
  const entries = Object.entries(breakpoints);
  const mediaQueries = entries
    .filter(([key]) => key !== 'default')
    .map(([query, size]) => `${query} ${size}`);

  const defaultSize = breakpoints.default || '100vw';
  return [...mediaQueries, defaultSize].join(', ');
}

export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

export function preloadImages(urls: string[]): Promise<void[]> {
  return Promise.all(urls.map(preloadImage));
}

export const imageFormats = {
  webp: 'image/webp',
  jpg: 'image/jpeg',
  png: 'image/png',
  avif: 'image/avif'
};

export function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    const img = new Image();
    img.onload = () => resolve(img.width === 2);
    img.onerror = () => resolve(false);
    img.src = webP;
  });
}

export function getBlurDataURL(color: string = '#1a1a1a'): string {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='${encodeURIComponent(color)}'/%3E%3C/svg%3E`;
}
