import App from "./components/App";
import Vector from "./math/Vector";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-center">WHITE CELL</h1>
        <App/>
      </div>
    </main>

  );
}
