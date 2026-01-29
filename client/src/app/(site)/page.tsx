import CanvasSetUp from "../_components/CanvasSetUp";

export default function Page() {
    return (
      <main className="h-screen w-screen bg-black grid grid-cols-1 p-4 pb-12 md:p-8 lg:p-16">
          <div className="fixed top-0 right-0 left-0 bottom-0 z-10">
            <CanvasSetUp/>
          </div>
          <button className="bg-white box-shadow absolute top-4 right-4 w-12 h-12 md:w-16 md:h-16 rounded-full z-999"></button>
          <button className="aspect-[4/1] w-64 md:w-96 lg:w-128 self-end justify-self-center rounded-sm z-999 bg-[url('/button.png')] bg-cover bg-center bg-no-repeat text-white font-bold text-6xl cursor-pointer">STUDY</button>
      </main>
    );
  }
  