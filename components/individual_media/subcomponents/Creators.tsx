import Image from "next/image";
import { CreatedBy } from "../../../typing";
interface Props {
  creators: CreatedBy[];
  img_URL: string;
}
export default function Creators({ creators, img_URL }: Props) {
  return (
    <>
      {" "}
      <section className="px-12">
        <h3 className="text-lg text-midgray">Criadores</h3>
        <div className="grid gap-4 auto-cols-auto grid-flow-col place-content-start m-2">
          {creators.map((item, i) => {
            return (
              <figure key={i} className="flex flex-col items-center">
                <Image
                  src={`${img_URL}${item.profile_path}`}
                  alt="profile_picture"
                  width={50}
                  height={0}
                  className="rounded-md"
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
