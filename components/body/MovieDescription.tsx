import { useState } from "react";

interface Text {
  text: string;
}

export default function MovieDescription({ text }: Text) {
  const [hovered, setHover] = useState(false);

  return (
    <p
      className={`text-white max-w-fit
       ${!hovered ? "md:max-w-[50vw]" : "md:max-w-fit line-clamp-4"}`}
      onMouseDown={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {text}
    </p>
  );
}
