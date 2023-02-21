import Image from "next/image";
import apiConfiguration from "../../../constants/apiConfiguration";
import { Media } from "../../../typing";

interface Props {
  recommendations: Media[];
}
export default function Recommendations({ recommendations }: Props) {
  const BASE_URL = apiConfiguration.images.secure_base_url;
  const SIZE = apiConfiguration.images.still_sizes[0];

  return (
    <section>
      {recommendations.map((item, i) => {
        return (
          <div key={i}>
            <h1>{item.title ?? item.name}</h1>
            <Image
              src={`${BASE_URL}${SIZE}${item.backdrop_path}`}
              width={200}
              height={40}
              alt="movie-backdrop"
            />
          </div>
        );
      })}
    </section>
  );
}
