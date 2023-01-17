import { GetServerSideProps } from "next";
import { Movie } from "../../typing";
import { movieRequests } from "../../utils/moviesRequests";
import apiConfiguration from "../../utils/apiConfiguration";
import Image from "next/image";
import Header from "../../components/body/header/Header";
import Top10Badge from "../../components/movies/Top10Badge";
interface Props {
  page1: Movie[];
  page2: Movie[];
}
export default function App({ page1, page2 }: Props) {
  const url = apiConfiguration.images.base_url;
  const posterSize = apiConfiguration.images.poster_sizes[3];
  return (
    <main>
      <Header setIndex={() => () => {}} />

      <section
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 auto-cols-fr
       place-content-center place-items-center gap-6 px-12"
      >
        {page1.map((item) => {
          return (
            <div key={item.id} className="relative">
              {item.adult && (
                <Image
                  className="absolute top-0 left-1 shadow-xl shadow-gray/25"
                  src={"/assets/adult.png"}
                  width={30}
                  height={30}
                  alt={"18"}
                />
              )}
              <Top10Badge className="absolute right-0 h-6 w-6 " />
              <Image
                className="rounded-sm"
                src={`${url}${posterSize}/${item.poster_path}`}
                width={185}
                height={185}
                alt={item.name ?? item.original_title}
              />
            </div>
          );
        })}
      </section>
    </main>
  );
}
export const getServerSideProps: GetServerSideProps = async (content) => {
  content.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  const [page1, page2, page3, page4] = await Promise.all([
    fetch(movieRequests.page1).then((res) => res.json()),
    fetch(movieRequests.page2).then((res) => res.json()),
    fetch(movieRequests.page3).then((res) => res.json()),
    fetch(movieRequests.page4).then((res) => res.json()),
  ]);
  return {
    props: {
      page1: page1.results,
      page2: page2.results,
      page3: page3.results,
      page4: page4.results,
    },
  };
};
