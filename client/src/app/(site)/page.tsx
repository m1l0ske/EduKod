import CanvasSetUp from "../_components/CanvasSetUp";

export default function Page() {
    return (
      <main className="h-screen w-screen bg-black grid grid-cols-1 p-4 pb-12 md:p-8 lg:p-16">
          <div className="bg-white w-256 h-96 self-center justify-self-center">
            <CanvasSetUp/>
          </div>
          <button className="bg-white box-shadow absolute top-4 right-4 w-12 h-12 md:w-16 md:h-16 rounded-full"></button>
          <button className="bg-green-400 h-12 w-64 md:h-16 md:w-96 lg:h-24 lg:w-128 self-end justify-self-center rounded-sm"></button>
      </main>
    );
  }
  