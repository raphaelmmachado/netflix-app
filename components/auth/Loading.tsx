import NetflixLogo from "../NetflixLogo";
export default function Loading() {
  return (
    <main className="min-h-screen bg-black grid place-content-center">
      <div className="animate-bounce">
        <NetflixLogo
          svg={{ height: "150", width: "280", fill: "none" }}
          path={{ fill: "#B9090B" }}
          rect={{ width: "500", height: "135", fill: "none" }}
        />
      </div>
    </main>
  );
}
