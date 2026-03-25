import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarDays, Clock3, Compass, MapPin, Search } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Hero = () => {
  const heroRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative isolate overflow-hidden px-4 pb-14 pt-28 md:pb-16 md:pt-32">
      <div
        className="absolute inset-0 -z-30 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero-bg.png')",
          backgroundPosition: "center 30%",
        }}
      />
      <div className="absolute inset-0 -z-20 bg-gradient-to-r from-slate-950/84 via-slate-900/62 to-slate-900/42" />

      <div ref={heroRef} className="container mx-auto scroll-reveal">
        <div className="mx-auto grid max-w-6xl items-center gap-10 rounded-[1.8rem] border border-slate-700/50 bg-slate-950/42 p-7 text-white shadow-2xl backdrop-blur-[6px] md:grid-cols-[1.15fr_0.85fr] md:p-11">
          <div>
            <p className="mb-8 inline-flex items-center gap-2 rounded-2xl border border-slate-700/60 bg-slate-950/80 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0_8px_20px_hsl(220_50%_4%_/_0.35)] backdrop-blur-[8px]">Mor Raipur Collective</p>
            <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
              Raipur in one place.
              <span className="mt-2 block text-amber-200">Food, travel, markets, and real local stories.</span>
            </h1>
            <article className="mt-6 max-w-2xl rounded-2xl border border-slate-700/60 bg-slate-950/80 p-5 text-white backdrop-blur-[8px]">
              <p className="text-sm font-medium leading-relaxed text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.55)] md:text-lg">
                Built for people who want practical city guidance: where to go, what is worth it, and what locals actually recommend.
              </p>
            </article>

            <div className="mt-8 max-w-2xl rounded-2xl border border-slate-600/55 bg-slate-950/66 p-2 text-white shadow-xl backdrop-blur-[8px]">
              <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                <div className="flex flex-1 items-center gap-3 px-3">
                  <Search className="h-4 w-4 text-slate-300" />
                  <Input
                    placeholder="Search places, dishes, stays, events..."
                    className="h-11 border-0 bg-transparent p-0 text-base text-white placeholder:text-slate-300 shadow-none focus-visible:ring-0"
                  />
                </div>
                <Button className="h-11 rounded-xl border border-foreground bg-foreground px-6 text-background hover:bg-foreground/90">
                  Explore
                </Button>
              </div>
            </div>

            <div className="mt-8 grid gap-3 border-t border-slate-600/55 pt-5 text-sm text-white/95 sm:grid-cols-3">
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-cyan-200" /> City zones mapped</p>
              <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-amber-200" /> Weekly event picks</p>
              <p className="flex items-center gap-2"><Compass className="h-4 w-4 text-emerald-200" /> Practical day routes</p>
            </div>
          </div>

          <div className="grid gap-5">
            <article className="rounded-2xl border border-slate-700/60 bg-slate-950/80 p-5 text-white backdrop-blur-[8px]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">Right now in Raipur</p>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-start justify-between gap-3 border-b border-slate-600/55 pb-3">
                  <p className="font-medium text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.55)]">Sunset walk window at Sarovar is active</p>
                  <span className="inline-flex items-center gap-1 text-amber-200"><Clock3 className="h-3.5 w-3.5" /> 6:10 PM</span>
                </div>
                <div className="flex items-start justify-between gap-3 border-b border-slate-600/55 pb-3">
                  <p className="font-medium text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.55)]">Street food crowd peak expected near Gol Bazaar</p>
                  <span className="inline-flex items-center gap-1 text-amber-200"><Clock3 className="h-3.5 w-3.5" /> 7:30 PM</span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <p className="font-medium text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.55)]">Cultural listings updated for this weekend</p>
                  <span className="inline-flex items-center gap-1 text-amber-200"><Clock3 className="h-3.5 w-3.5" /> Updated</span>
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-slate-700/60 bg-slate-950/80 p-5 text-white backdrop-blur-[8px]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">Local tip notebook</p>
              <p className="mt-3 text-sm font-medium leading-relaxed text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.55)]">
                Plan days around distance, food stops, and nearby hotspots. Community suggestions are prioritized from recent resident reviews.
              </p>
            </article>

            <div className="grid grid-cols-[1.2fr_0.8fr] gap-3">
              <img src="/places/sarovar.jpg" alt="Vivekananda Sarovar" className="h-32 w-full rounded-xl border border-slate-700/55 object-cover" />
              <img src="/places/nukkad.jpg" alt="Raipur food lane" className="h-32 w-full rounded-xl border border-slate-700/55 object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
