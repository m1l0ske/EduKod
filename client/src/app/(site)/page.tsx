import CanvasSetUp from "../_components/CanvasSetUp";
import Header from "../_components/Header";

export default function Page() {
  
    return (
      <main className="h-screen w-screen bg-black grid grid-cols-1 p-4 pb-12 md:p-8 lg:p-16">
        <Header/>
          <div className="fixed top-0 right-0 left-0 bottom-0 z-10">
            <CanvasSetUp/>
          </div>
          <button className="aspect-[4/1] w-64 md:w-96 lg:w-128 self-end justify-self-center rounded-sm z-999 bg-[url('/button.png')] bg-cover bg-center bg-no-repeat text-white font-bold text-6xl cursor-pointer">STUDY</button>
      </main>
    );
  }
  