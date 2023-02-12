import Image from "next/image";
import tmdbConfig from "../../constants/apiConfiguration";
const BASE_URL = tmdbConfig.images.secure_base_url;
const LOGO_SIZE = tmdbConfig.images.logo_sizes[4];
const NETFLIX_LOGO = "/wwemzKWzjKYJFfCeiB57q3r4Bcm.png";
export default function Loading() {
  return (
    <main className="min-h-screen bg-black grid place-content-center">
      <div>
        <Image
          src={`${BASE_URL}${LOGO_SIZE}${NETFLIX_LOGO}`}
          priority
          width={280}
          height={150}
          alt="netflix-logo"
          className="self-center object-cover animate-bounce"
        />
      </div>
    </main>
  );
}
