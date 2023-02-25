import ArrowLeftIcon from "@heroicons/react/24/solid/ChevronLeftIcon";
import ArrowRightIcon from "@heroicons/react/24/solid/ChevronRightIcon";

interface Props {
  page?: number;
  previousPage: () => void;
  nextPage: () => void;
}
export default function Footer({ page, previousPage, nextPage }: Props) {
  return (
    <>
      {" "}
      <footer className="mt-48 ">
        <section className="flex justify-center items-center">
          <span className="bg-red rounded-bl-md rounded-tl-md">
            {page && page > 1 && (
              <ArrowLeftIcon
                onClick={previousPage}
                className=" w-10 h-10 cursor-pointer text-smokewt"
              />
            )}
          </span>

          <div className="text-smokewt bg-black border border-l-0 border-r-0 border-smokewt/10 p-2 h-max rounded-sm">
            Página <span className="text-red">{page}</span> / 500
          </div>

          <span className="bg-red rounded-br-md rounded-tr-md">
            {page && (
              <ArrowRightIcon
                onClick={nextPage}
                className="text-smokewt w-10 h-10 cursor-pointer"
              />
            )}
          </span>
        </section>
      </footer>
    </>
  );
}
