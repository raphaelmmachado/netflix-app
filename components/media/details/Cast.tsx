import { MediaCast } from "../../../typing";
import { useRouter } from "next/router";
import apiConfiguration from "../../../constants/apiConfiguration";
import Image from "next/image";
import slugify from "../../../utils/formatters/slugfy";
interface Props {
  cast: MediaCast[];
}
export default function Cast({ cast }: Props) {
  const router = useRouter();
  const BASE_URL = apiConfiguration.images.secure_base_url;
  const PROFILE_SIZE = apiConfiguration.images.profile_sizes;
  const actors = cast.filter(
    (person) => person.known_for_department === "Acting" && person.order < 8
  );
  return (
    <section className="px-6 sm:px-12" id="cast-section">
      <h2 className="text-lg text-gray my-2">Elenco</h2>
      <div
        className="grid grid-cols-1
       sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-content-center"
      >
        {actors.map((person, i) => {
          return (
            <div
              key={i}
              onClick={() =>
                router.push({
                  pathname: `/atores/${slugify(person.name)}`,
                  query: { id: person.id },
                })
              }
              className="flex gap-2 bg-midgray/20 rounded-md
              cursor-pointer p-1"
            >
              <Image
                alt={person.name}
                src={`${BASE_URL}${PROFILE_SIZE[1]}${person.profile_path}`}
                title={person.name}
                width={70}
                height={50}
                sizes="[45px,50px,75px]"
                className="rounded-md"
                style={{ height: "auto" }}
              />
              <div>
                <h3 className="text-lg">{person.name}</h3>
                <span className="text-sm text-midgray">
                  {person.known_for_department === "Acting" && "Atuando como"}
                </span>
                <h4 className="italic">{person.character}</h4>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
