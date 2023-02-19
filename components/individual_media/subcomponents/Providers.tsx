import { WatchProvider } from "../../../typing";
import Provider from "./Provider";
interface Props {
  providers: WatchProvider;
}
export default function Providers({ providers }: Props) {
  return (
    <section className="grid grid-rows-3 gap-y-4 place-content-start my-8 px-12">
      <div>
        {providers.flatrate && (
          <>
            <h3 className="text-gray text-lg">Apps de Transmissão</h3>
            <div className="grid auto-cols-auto grid-flow-col place-content-start place-items-center gap-3">
              {providers.flatrate?.map((prov, i) => {
                return (
                  <div key={i}>
                    <Provider name={prov.provider_name} path={prov.logo_path} />
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
            <h3 className="text-gray text-lg">Alugar</h3>
            <div className="grid auto-cols-auto grid-flow-col place-content-start place-items-center gap-3">
              {providers.rent?.map((prov, i) => {
                return (
                  <div key={i}>
                    <Provider name={prov.provider_name} path={prov.logo_path} />
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
            <h3 className="text-gray text-lg">Comprar</h3>
            <div className="grid auto-cols-auto grid-flow-col place-content-start place-items-center gap-3">
              {providers.buy?.map((prov, i) => {
                return (
                  <div key={i}>
                    <Provider name={prov.provider_name} path={prov.logo_path} />
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
