import Image from "next/image";
import { CSSProperties, useState } from "react";
interface Props {
  src: string;
  width: number;
  height: number;
  alt: string;
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
      `https://via.placeholder.com/${width.toString()}x${height.toString()}/6D6D6E/fff?text=sem+imagem`
    );
  return (
    <>
      <Image
        onError={(e) => fallbackImage()}
        blurDataURL={`https://via.placeholder.com/${width.toString()}x${height.toString()}/6D6D6E/fff?text=sem+imagem`}
        placeholder="blur"
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
    </>
  );
}
