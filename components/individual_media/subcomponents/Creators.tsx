import { CreatedBy } from "../../../typing";
import apiConfiguration from "../../../constants/apiConfiguration";
import Picture from "../../Picture";
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
        <h1 className="text-lg text-gray px-12">Criado por</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex gap-8 m-2">
          {creators.map((item, i) => {
            return (
              <figure
                key={i}
                className="flex gap-3 justify-around items-center"
              >
                <Picture
                  src={`${BASE_URL}${PROFILE_SIZE[1]}${item.profile_path}`}
                  title={item.name}
                  alt="profile"
                  width={50}
                  height={50}
                  style={{ height: "50px", borderRadius: "50%" }}
                  className="rounded-md object-cover"
                />
                <h1 className="text-sm">{item.name}</h1>
              </figure>
            );
          })}
        </div>
      </section>
    </>
  );
}
