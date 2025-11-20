import { useScrollReveal } from "@/hooks/useScrollReveal";

const History = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();
  return (
    <section ref={sectionRef} className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-200 to-red-100 p-0">
      <section className="relative w-full h-72 flex items-center justify-center bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg animate-fade-in">History of Raipur</h1>
      </section>
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4 justify-center">
            <h2 className="text-2xl font-bold text-orange-700">Ancient Roots</h2>
            <p className="text-lg text-gray-700">Raipur has a rich history dating back to ancient times, with influences from various dynasties and cultures. The city’s heritage is reflected in its architecture, traditions, and vibrant festivals.</p>
          </div>
          <img src="/public/Traditional.png" alt="Traditional" className="rounded-2xl shadow-2xl border-4 border-yellow-300" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <img src="/public/urban.png" alt="Urban" className="rounded-2xl shadow-2xl border-4 border-orange-300" />
          <div className="flex flex-col gap-4 justify-center">
            <h2 className="text-2xl font-bold text-red-700">Modern Era</h2>
            <p className="text-lg text-gray-700">Today, Raipur is a bustling urban center, blending its historical legacy with modern development. Explore the city’s museums, monuments, and lively streets to experience its unique journey through time.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default History;
