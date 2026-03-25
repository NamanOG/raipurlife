import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const History = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="relative isolate overflow-hidden px-4 py-20 min-h-[42vh]">
        <div className="absolute inset-0 -z-10 bg-[url('/places/Traditional.png')] bg-cover bg-center opacity-50 dark:opacity-28" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/82 via-slate-900/62 to-slate-800/42 dark:from-slate-950/74 dark:via-slate-900/58 dark:to-slate-800/36" />
        <div className="container mx-auto">
          <div className="inline-block border border-white/30 bg-slate-950/42 px-5 py-4 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">Heritage</p>
            <h1 className="mt-2 max-w-3xl text-4xl font-bold text-white md:text-5xl">History of Raipur</h1>
            <p className="mt-4 max-w-2xl text-white/92 dark:text-white/80">
              From ancient roots to a fast-growing capital, Raipur carries a layered identity shaped by culture, trade, and community life.
            </p>
          </div>
        </div>
      </section>

      <section ref={sectionRef} className="scroll-reveal px-4 py-14">
        <div className="container mx-auto grid gap-8 md:grid-cols-2">
          <article className="glass border border-border/70 p-6 hover-lift">
            <img src="/places/Traditional.png" alt="Traditional Raipur" className="mb-5 h-56 w-full object-cover" />
            <h2 className="text-2xl font-semibold">Ancient roots</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Raipur's identity has been shaped by multiple dynasties and trading routes. Its local traditions, language, and architecture still carry that long cultural memory.
            </p>
          </article>

          <article className="glass border border-border/70 p-6 hover-lift">
            <img src="/places/urban.png" alt="Modern Raipur" className="mb-5 h-56 w-full object-cover" />
            <h2 className="text-2xl font-semibold">Modern transformation</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Today, Raipur balances heritage with infrastructure growth. Museums, markets, and newer districts together create a city that is expanding without losing its local pulse.
            </p>
          </article>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default History;
