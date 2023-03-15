import { CreatedBy } from "../../../typing";
import apiConfiguration from "../../../constants/apiConfiguration";
import Image from "next/image";
interface Props {
  creators: CreatedBy[];
}
export default function Creators({ creators }: Props) {
  const PROFILE_SIZE = apiConfiguration.images.profile_sizes;
  const BASE_URL = apiConfiguration.images.secure_base_url;

  return (
    <>
      {" "}
      <section className="sm:px-12 flex flex-col sm:flex-row justify-center items-center gap-4">
        <h2 className="text-lg text-gray px-12">Criado por</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex gap-8 m-2">
          {creators.map((item, i) => {
            return (
              <figure
                key={i}
                className="flex gap-3 justify-around items-center"
              >
                <Image
                  src={`${BASE_URL}${PROFILE_SIZE[1]}${item.profile_path}`}
                  title={item.name}
                  alt="profile"
                  width={50}
                  height={50}
                  style={{ height: "50px", borderRadius: "50%" }}
                  className="rounded-md object-cover"
                />
                <h3 className="text-sm">{item.name}</h3>
              </figure>
            );
          })}
        </div>
      </section>
    </>
  );
}
