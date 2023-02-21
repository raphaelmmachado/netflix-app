import Image from "next/image";
import { Suspense } from "react";
import { CSSProperties, useState } from "react";
interface Props {
  src: string;
  width: number;
  height: number;
  alt: string;
  fallBackImage: string;
  className?: string;
  style?: CSSProperties;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  title: string;
  tabIndex?: number;
}
export default function Picture({
  src,
  width,
  height,
  alt,
  fallBackImage,
  fill,
  priority,
  className,
  title,
  style,
  sizes,
  tabIndex,
}: Props) {
  const [image, setImage] = useState<string>(src);
  const fallbackImage = () =>
    setImage(
      `https://via.placeholder.com/${width.toString()}x${height.toString()}/6D6D6E/fff?text=${
        title ? title : "Não encontada"
      }`
    );
  return (
    <Suspense
      fallback={
        <Image
          onError={() => fallbackImage()}
          src={fallBackImage}
          alt={alt}
          fill={fill}
          width={width}
          height={height}
          tabIndex={tabIndex}
          className={className}
          style={style}
          priority={priority}
          sizes={sizes}
        />
      }
    >
      <Image
        onError={() => fallbackImage()}
        src={image}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        tabIndex={tabIndex}
        className={className}
        style={style}
        priority={priority}
        sizes={sizes}
      />
    </Suspense>
  );
}
