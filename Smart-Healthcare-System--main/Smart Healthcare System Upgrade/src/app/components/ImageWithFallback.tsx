import { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export function ImageWithFallback({ src, fallback, alt, ...props }: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const defaultFallback = 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=300&fit=crop';

  return (
    <img
      src={error ? (fallback || defaultFallback) : src}
      alt={alt}
      onError={() => setError(true)}
      onLoad={() => setLoading(false)}
      {...props}
    />
  );
}
