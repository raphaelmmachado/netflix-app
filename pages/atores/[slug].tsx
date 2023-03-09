//next / react
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Picture from "../../components/Picture";
import { Actor, Media } from "../../typing";
import getMoreDetails from "../../utils/requests/getMoreDetails";
import apiConfiguration from "../../constants/apiConfiguration";
import TitleDesc from "../../components/media/details/TitleDesc";
import formatDate from "../../utils/formatters/formatDate";
import department from "../../constants/knowForDepartment";
const Grid = dynamic(() => import("../../components/actor/Grid"), {
  ssr: false,
});

interface Props {
  details: Actor;
  medias: Media[];
}

export default function App({ details, medias }: Props) {
  const BASE_URL = apiConfiguration.images.secure_base_url;
  const PROFILE_SIZE = apiConfiguration.images.profile_sizes;
  const name = details.name.split(" ");
  return (
    <>
      <Head>
        <title>Netflix</title>
        <meta
          name="description"
          content="Netflix - Assista ao melhores filmes"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="sm:pl-20 px-6 sm:px-12 min-h-screen py-20">
        <section
          className="flex flex-col sm:flex-row justify-center text-4xl
         items-center gap-5 uppercase"
        >
          <span>{name.slice(0, name.length - 1)}</span>
          <span className="flex-shrink">
            <Picture
              src={`${BASE_URL}${PROFILE_SIZE[2]}${details.profile_path}`}
              alt={details.name}
              width={125}
              height={75}
              title={details.name}
              className="rounded-lg "
              style={{ height: "auto" }}
            />
          </span>
          <span className="">{name.slice(name.length - 1)}</span>
        </section>

        <section className="my-8 sm:px-12 font-thin">
          {details.biography && (
            <TitleDesc title="Biografia" value={details.biography} />
          )}
          <div className="flex items-center justify-start gap-8 my-4">
            {" "}
            {details.birthday && (
              <TitleDesc
                title="Nascido em"
                value={formatDate(details.birthday, { dateStyle: "long" })}
              />
            )}
            {details.deathday && (
              <TitleDesc title="Faleceu em" value={details.deathday} />
            )}
            {details.place_of_birth && (
              <TitleDesc
                title="Local de origem"
                value={details.place_of_birth}
              />
            )}
            {details.known_for_department && (
              <TitleDesc
                title="Profissão"
                value={department[details.known_for_department]}
              />
            )}
          </div>
        </section>
        <br />
        <section className="">
          <h2 className="text-midgray px-12">Participações</h2>
          <br />
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-8 gap-x-4">
            {medias.length > 0 &&
              medias.map((media, i) => {
                return (
                  media.media_type && (
                    <Grid
                      key={i}
                      alt="media"
                      title={media.title ?? media.name}
                      img_path={media.poster_path!}
                      id={media.id}
                      type={media.media_type}
                    />
                  )
                );
              })}
          </div>
        </section>
      </main>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (content) => {
  const queryID = content.query.id;
  const id = Number(queryID);
  const [details, medias] = await Promise.all([
    getMoreDetails(id, "person", "").then((res: Actor) => res),
    getMoreDetails(id, "person", "/combined_credits").then((res) => {
      const medias: Media[] = res.cast;
      return medias;
    }),
  ]);

  return { props: { details: details, medias: medias } };
};
