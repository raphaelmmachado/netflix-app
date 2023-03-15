import { useState } from "react";
import Image from "next/image";
import apiConfiguration from "../../../constants/apiConfiguration";
interface Props {
  name?: string;
  path?: string;
}
export default function Provider({ name, path }: Props) {
  const BASE_URL = apiConfiguration.images.secure_base_url;
  const LOGO_SIZE = apiConfiguration.images.logo_sizes;
  const [showName, setShowName] = useState(false);
  return (
    <>
      <div
        className="relative w-max"
        onMouseEnter={() => setShowName(true)}
        onMouseLeave={() => setShowName(false)}
      >
        {" "}
        <Image
          src={`${BASE_URL}${LOGO_SIZE[1]}${path}`}
          title={name!}
          width={50}
          height={50}
          alt="service_logo"
          className={`rounded-md`}
        />
        {showName && (
          <p
            className="absolute -bottom-2 translate-y-full left-0 right-0 z-10
             bg-black border-2 border-gray
              rounded-md px-2 py-1 text-sm min-w-max"
          >
            {name}
          </p>
        )}
      </div>
    </>
  );
}
