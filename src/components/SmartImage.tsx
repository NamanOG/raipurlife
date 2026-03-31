import { ImgHTMLAttributes, useEffect, useMemo, useState } from "react";
import { resolvePlaceImage } from "@/utils/placeImages";

type SmartImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src?: string;
  fallbackQuery?: string;
};

const HERO_FALLBACK = "/hero-bg.png";

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

  const localFallback = useMemo(() => {
    const query = (fallbackQuery || alt || "raipur").trim();
    return resolvePlaceImage({ name: query });
  }, [alt, fallbackQuery]);

  return (
    <img
      {...props}
      alt={alt}
      src={currentSrc}
      loading={props.loading ?? "lazy"}
      decoding={props.decoding ?? "async"}
      onError={(event) => {
        if (currentSrc !== localFallback) {
          setCurrentSrc(localFallback);
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
