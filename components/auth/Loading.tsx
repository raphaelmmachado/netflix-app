import Image from "next/image";
export default function Loading() {
  return (
    <main className="min-h-screen bg-black grid place-content-center">
      <div>
        <Image
          src={"/assets/NetflixLogoSvg.svg"}
          width={280}
          height={150}
          alt="netflix-logo"
          className="self-center object-cover animate-bounce"
        />
      </div>
    </main>
  );
}
