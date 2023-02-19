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
      <section className="px-12 flex justify-center items-center gap-4">
        <h1 className="text-lg text-gray">Criado por</h1>
        <div className="flex gap-8 m-2">
          {creators.map((item, i) => {
            return (
              <figure
                key={i}
                className="flex gap-3 justify-around items-center"
              >
                <Image
                  src={`${img_URL}${item.profile_path}`}
                  alt="profile_picture"
                  width={50}
                  height={0}
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
