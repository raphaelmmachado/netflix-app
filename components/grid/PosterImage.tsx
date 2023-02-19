import Image from "next/image";
import { useState } from "react";
interface Props {
  src: string;
  alt: string;
}
export default function PosterImage({ src, alt }: Props) {
  const [cardImage, setCardImage] = useState(src);
  const ImageNotFound = () => {
    setCardImage(
      `https://via.placeholder.com/170x250/6D6D6E/fff?text=Imagem+não+encontrada`
    );
  };
  return (
    <>
      {" "}
      <Image
        className="rounded-md  border-2 border-gray/20"
        src={cardImage}
        onError={ImageNotFound}
        width={170}
        height={250}
        priority
        alt={alt}
      />
    </>
  );
}
