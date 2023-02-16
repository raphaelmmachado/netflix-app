import { WatchProvider } from "../../../typing";
import Image from "next/image";
import apiConfiguration from "../../../constants/apiConfiguration";
interface Props {
  providers: WatchProvider;
}
export default function Providers({ providers }: Props) {
  const BASE_URL = apiConfiguration.images.secure_base_url;
  const LOGO_SIZE = apiConfiguration.images.logo_sizes;
  return (
    <section className="grid grid-rows-3 gap-y-4 place-content-start px-12">
      <div>
        {providers.flatrate && (
          <>
            <h3 className="text-gray">Apps de Transmissão</h3>
            <div className="grid auto-cols-auto grid-flow-col place-content-start place-items-center gap-3">
              {providers.flatrate?.map((prov, i) => {
                return (
                  <div key={i}>
                    <Image
                      src={`${BASE_URL}${LOGO_SIZE[1]}${prov.logo_path}`}
                      width={50}
                      height={50}
                      alt={prov.provider_name}
                      className="rounded-md"
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      <div>
        {providers.rent && (
          <>
            <h3 className="text-gray">Alugar</h3>
            <div className="grid auto-cols-auto grid-flow-col place-content-start place-items-center gap-3">
              {providers.rent?.map((prov, i) => {
                return (
                  <div key={i}>
                    <Image
                      src={`${BASE_URL}${LOGO_SIZE[1]}${prov.logo_path}`}
                      width={50}
                      height={50}
                      alt={prov.provider_name}
                      className="rounded-md"
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      <div>
        {providers.buy && (
          <>
            <h3 className="text-gray">Comprar</h3>
            <div className="grid auto-cols-auto grid-flow-col place-content-start place-items-center gap-3">
              {providers.buy?.map((prov, i) => {
                return (
                  <div key={i}>
                    <Image
                      src={`${BASE_URL}${LOGO_SIZE[1]}${prov.logo_path}`}
                      width={50}
                      height={50}
                      alt={prov.provider_name}
                      className="rounded-md"
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
