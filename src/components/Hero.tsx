import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarDays, Clock3, Compass, MapPin, Search } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Hero = () => {
  const heroRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative isolate flex flex-1 items-center overflow-hidden px-4 pb-3 pt-16 sm:pt-24 md:items-end md:pb-6 md:pt-32">
      <div className="absolute inset-0 -z-30 bg-[url('/hero-bg.png')] bg-cover bg-no-repeat bg-[position:48%_32%] opacity-82 blur-0 scale-100 md:bg-[position:center_30%] md:opacity-100 md:blur-0 md:scale-100" />
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-slate-950/62 via-slate-950/48 to-slate-950/76 md:bg-gradient-to-r md:from-slate-950/84 md:via-slate-900/62 md:to-slate-900/42" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-slate-950 to-transparent md:hidden" />

      <div ref={heroRef} className="container mx-auto w-full scroll-reveal">
        <div className="relative mx-auto grid max-w-2xl items-center gap-5 overflow-hidden rounded-[1.55rem] border border-slate-500/40 bg-slate-900/46 p-4 text-white shadow-2xl shadow-slate-950/45 backdrop-blur-[16px] sm:p-5 md:max-w-[78rem] md:gap-7 md:rounded-[1.8rem] md:bg-slate-900/40 md:backdrop-blur-[14px] md:p-8 md:grid-cols-[1.2fr_0.8fr]">
          <div className="pointer-events-none absolute -left-12 -top-16 h-52 w-52 rounded-full bg-red-400/35 blur-[48px]" />
          <div className="pointer-events-none absolute -right-20 -top-12 h-56 w-56 rounded-full bg-fuchsia-400/32 blur-[52px]" />
          <div className="pointer-events-none absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-cyan-300/24 blur-[54px]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_1.2px)] bg-[length:3px_3px] opacity-20" />

          <div className="relative z-10">
            <p className="mb-4 inline-flex items-center gap-2 rounded-2xl border border-slate-700/85 bg-slate-950/98 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0_10px_24px_hsl(220_50%_4%_/_0.42)] backdrop-blur-[8px] md:mb-6">Mor Raipur Collective</p>
            <h1 className="mt-2 max-w-3xl text-[1.95rem] font-extrabold leading-[1.06] [text-shadow:0_2px_10px_rgba(2,6,23,0.5)] sm:text-[2rem] md:mt-3 md:text-[clamp(2.65rem,4.05vw,4.15rem)] md:leading-[1.02]">
              Raipur in one place.
              <span className="mt-2 block text-amber-200">Food, travel, markets, and real local stories.</span>
            </h1>
            <article className="mt-4 max-w-2xl rounded-2xl border border-white/28 bg-slate-900/34 p-4 text-white shadow-[0_10px_28px_rgba(2,6,23,0.24)] backdrop-blur-[12px] md:mt-5 md:bg-slate-900/30 md:p-5 md:backdrop-blur-[10px]">
              <p className="text-sm font-medium leading-relaxed text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.55)] md:text-lg">
                Built for people who want practical city guidance: where to go, what is worth it, and what locals actually recommend.
              </p>
            </article>

            <div className="mt-5 hidden max-w-2xl rounded-2xl border border-slate-600/55 bg-slate-950/84 p-2 text-white shadow-xl backdrop-blur-[8px] md:mt-6 md:block md:bg-slate-950/72">
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

            <div className="mt-4 grid gap-2.5 sm:hidden">
              <Button className="h-10 rounded-xl border border-foreground bg-foreground px-6 text-background hover:bg-foreground/90">
                Explore City
              </Button>
              <Button className="h-10 rounded-xl border border-slate-600/70 bg-slate-950/78 px-6 text-white hover:bg-slate-900/90">
                Plan Your Day
              </Button>
            </div>

            <div className="mt-5 hidden gap-3 border-t border-slate-600/55 pt-4 text-sm text-white/95 sm:grid-cols-3 md:mt-6 md:grid">
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-cyan-200" /> City zones mapped</p>
              <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-amber-200" /> Weekly event picks</p>
              <p className="flex items-center gap-2"><Compass className="h-4 w-4 text-emerald-200" /> Practical day routes</p>
            </div>
          </div>

          <div className="relative z-10 hidden gap-5 md:grid">
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
