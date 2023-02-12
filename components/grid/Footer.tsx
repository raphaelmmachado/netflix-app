import ArrowLeftIcon from "@heroicons/react/24/solid/ArrowLeftIcon";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";

interface Props {
  page?: number;
  previousPage: () => void;
  nextPage: () => void;
}
export default function Footer({ page, previousPage, nextPage }: Props) {
  return (
    <>
      {" "}
      <footer className="w-full flex justify-center gap-4 mt-20">
        {page && page > 1 && (
          <ArrowLeftIcon
            onClick={previousPage}
            className=" w-6 h-6 cursor-pointer text-gray"
          />
        )}
        <div className="text-gray">Página {page}</div>
        {page && (
          <ArrowRightIcon
            onClick={nextPage}
            className="text-gray w-6 h-6 cursor-pointer"
          />
        )}
      </footer>
    </>
  );
}
