import NetflixLogo from "../NetflixLogo";
export default function Loading() {
  return (
    <main className="min-h-screen bg-black grid place-content-center">
      <div className="animate-bounce">
        <NetflixLogo width="450" height="120" />
      </div>
    </main>
  );
}
