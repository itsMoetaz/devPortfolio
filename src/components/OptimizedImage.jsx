import { lazy, Suspense } from 'react';
import LazyImage from './LazyImage';

/**
 * OptimizedImage component automatically selects the appropriate image size
 * and uses WebP format with fallback to JPG/PNG
 */
const OptimizedImage = ({
  src,
  alt,
  className = "",
  sizes = "100vw",
  lazy = true,
  width,
  height,
  ...props
}) => {
  // Extract path and extension from src
  const getPathAndExt = (src) => {
    const lastDot = src.lastIndexOf('.');
    const ext = lastDot !== -1 ? src.substring(lastDot) : '';
    const path = lastDot !== -1 ? src.substring(0, lastDot) : src;
    return { path, ext };
  };

  const { path, ext } = getPathAndExt(src);
  
  // Check if this is an external URL (CDN)
  const isExternal = src.startsWith('http');
  
  // For external URLs, just use LazyImage directly
  if (isExternal) {
    return <LazyImage src={src} alt={alt} width={width} height={height} className={className} {...props} />;
  }

  // For local images, use the optimized versions
  const dir = path.includes('/assets/') ? 'src/assets/optimized' : 'public/optimized';
  const filename = path.substring(path.lastIndexOf('/') + 1);
  
  // Determine which size to use based on the width prop or responsive needs
  const getSize = () => {
    if (!width || width >= 1280) return 'large';
    if (width >= 640) return 'medium';
    return 'small';
  };
  
  const size = getSize();
  const optimizedSrc = `/${dir}/${size}-${filename}${ext}`;
  const webpSrc = `/${dir}/${size}-${filename}.webp`;
  
  // If lazy loading is disabled, use regular img tag
  if (!lazy) {
    return (
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <source srcSet={optimizedSrc} type={`image/${ext.substring(1)}`} />
        <img 
          src={optimizedSrc} 
          alt={alt} 
          width={width} 
          height={height}
          className={className}
          {...props}
        />
      </picture>
    );
  }
  
  // Otherwise use LazyImage
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <source srcSet={optimizedSrc} type={`image/${ext.substring(1)}`} />
      <LazyImage 
        src={optimizedSrc} 
        alt={alt} 
        width={width} 
        height={height}
        className={className}
        {...props}
      />
    </picture>
  );
};

export default OptimizedImage;
