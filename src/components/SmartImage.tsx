import { ImgHTMLAttributes, useEffect, useMemo, useState } from "react";

type SmartImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src?: string;
  fallbackQuery?: string;
};

const HERO_FALLBACK = "/hero-bg.png";

const makeWebFallbackUrl = (query: string) =>
  `https://loremflickr.com/1200/800/${encodeURIComponent(query)}`;

const SmartImage = ({
  src,
  fallbackQuery,
  alt = "Image",
  onError,
  ...props
}: SmartImageProps) => {
  const initial = src && src.trim() ? src : HERO_FALLBACK;
  const [currentSrc, setCurrentSrc] = useState(initial);

  useEffect(() => {
    setCurrentSrc(initial);
  }, [initial]);

  const webFallback = useMemo(() => {
    const query = (fallbackQuery || alt || "raipur").trim();
    return makeWebFallbackUrl(`${query},raipur`);
  }, [alt, fallbackQuery]);

  return (
    <img
      {...props}
      alt={alt}
      src={currentSrc}
      onError={(event) => {
        if (currentSrc !== webFallback) {
          setCurrentSrc(webFallback);
        } else if (currentSrc !== HERO_FALLBACK) {
          setCurrentSrc(HERO_FALLBACK);
        }

        if (onError) {
          onError(event);
        }
      }}
    />
  );
};

export default SmartImage;
