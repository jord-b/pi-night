import { createSupabaseClient, type PieCommitment } from "@/lib/supabase";
import Countdown from "./Countdown";
import PieNupSection from "./PieNupSection";

export const dynamic = "force-dynamic";

async function getPies(): Promise<PieCommitment[]> {
  try {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
      .from("pie_commitments")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
}

const TYPE_CONFIG: Record<
  string,
  { label: string; badge: string; bar: string }
> = {
  sweet: {
    label: "Sweet",
    badge: "bg-rose-100 text-rose-700",
    bar: "bg-gradient-to-r from-rose-400 to-pink-400",
  },
  savory: {
    label: "Savory",
    badge: "bg-teal-100 text-teal-700",
    bar: "bg-gradient-to-r from-teal-400 to-cyan-400",
  },
  other: {
    label: "Wildcard",
    badge: "bg-violet-100 text-violet-700",
    bar: "bg-gradient-to-r from-violet-400 to-purple-400",
  },
};

const BG_PIS = [
  { size: 160, top: "2%", left: "-1%", opacity: 0.07, delay: "0s", color: "#f43f5e" },
  { size: 100, top: "12%", right: "0%", opacity: 0.07, delay: "3s", color: "#8b5cf6" },
  { size: 80, top: "44%", left: "2%", opacity: 0.06, delay: "6s", color: "#14b8a6" },
  { size: 130, top: "58%", right: "1%", opacity: 0.06, delay: "1.5s", color: "#f43f5e" },
  { size: 70, bottom: "22%", left: "14%", opacity: 0.07, delay: "4.5s", color: "#8b5cf6" },
  { size: 90, bottom: "6%", right: "10%", opacity: 0.06, delay: "2s", color: "#14b8a6" },
  { size: 60, top: "30%", left: "10%", opacity: 0.05, delay: "7s", color: "#fb923c" },
  { size: 110, bottom: "40%", right: "6%", opacity: 0.06, delay: "5s", color: "#fb923c" },
];

export default async function Home() {
  const pies = await getPies();

  return (
    <div className="min-h-screen bg-[#fdfaff] overflow-x-hidden">
      {/* Floating π background */}
      <div className="fixed inset-0 pointer-events-none select-none overflow-hidden">
        {BG_PIS.map((item, i) => (
          <span
            key={i}
            className="absolute font-serif font-black animate-float-pi"
            style={{
              fontSize: item.size,
              top: item.top,
              left: item.left,
              right: item.right,
              bottom: item.bottom,
              opacity: item.opacity,
              animationDelay: item.delay,
              color: item.color,
              lineHeight: 1,
            }}
          >
            π
          </span>
        ))}
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 sm:px-14 py-6">
        <div
          className="font-serif font-black text-5xl leading-none"
          style={{
            background: "linear-gradient(135deg, #f43f5e, #fb923c)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          π
        </div>
        <div className="flex items-center gap-2 bg-white border-2 border-violet-100 text-violet-600 text-sm font-bold px-4 py-2 rounded-full shadow-sm">
          <span>🗓</span>
          <span>March 14th &middot; 3.14.2026</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 text-center px-6 pt-4 pb-20 sm:pb-28">
        <h1 className="font-serif font-black leading-none tracking-tight">
          <span
            className="block"
            style={{
              fontSize: "clamp(96px, 20vw, 180px)",
              background: "linear-gradient(150deg, #f43f5e, #fb923c)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 0.95,
            }}
          >
            π
          </span>
          <span
            className="block text-violet-900 -mt-2 sm:-mt-4"
            style={{ fontSize: "clamp(52px, 11vw, 100px)" }}
          >
            Night
          </span>
        </h1>

        <p className="text-slate-500 text-base sm:text-lg mt-4 font-semibold max-w-xs sm:max-w-sm mx-auto leading-snug">
          Irrational amounts of pie, rational coordination.
        </p>

        {/* Countdown */}
        <div className="mt-12">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">
            The feast begins in
          </p>
          <div className="flex justify-center">
            <Countdown />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <PieNupSection />
          <p className="text-slate-400 text-xs font-semibold">
            {pies.length > 0
              ? `${pies.length} pie${pies.length !== 1 ? "s" : ""} committed so far`
              : "Be the first to sign the pie-nup!"}
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="relative z-10 flex items-center gap-4 px-6 sm:px-14 max-w-5xl mx-auto -mt-6 mb-10">
        <div className="flex-1 h-px bg-violet-100" />
        <span className="text-2xl">🥧</span>
        <div className="flex-1 h-px bg-violet-100" />
      </div>

      {/* Pie Registry */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 sm:px-14 pb-28">
        <div className="flex items-baseline gap-3 mb-8">
          <h2 className="font-serif text-3xl sm:text-4xl text-violet-900">
            The Pie Registry
          </h2>
          {pies.length > 0 && (
            <span className="text-slate-400 font-semibold text-base">
              {pies.length} {pies.length === 1 ? "pie" : "pies"}
            </span>
          )}
        </div>

        {pies.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-5">🥧</div>
            <h3 className="font-serif text-2xl sm:text-3xl text-violet-800">
              The crust is still forming&hellip;
            </h3>
            <p className="text-slate-400 mt-2 text-base font-semibold">
              No pies signed up yet. Will you be the first?
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {pies.map((pie) => {
              const config = TYPE_CONFIG[pie.pie_type] ?? TYPE_CONFIG.other;
              return (
                <div
                  key={pie.id}
                  className="pie-card bg-white rounded-2xl shadow-sm border border-violet-100/80 overflow-hidden"
                >
                  <div className={`h-1.5 ${config.bar}`} />
                  <div className="p-5">
                    <div className="text-4xl mb-3 leading-none">🥧</div>
                    <h3 className="font-serif text-xl text-violet-900 leading-tight">
                      {pie.pie_name}
                    </h3>
                    <p className="text-slate-500 font-bold text-sm mt-1">
                      by {pie.name}
                    </p>
                    <div className="flex items-center flex-wrap gap-2 mt-3">
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${config.badge}`}
                      >
                        {config.label}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">
                        &middot; Serves {pie.serves}
                      </span>
                    </div>
                    {pie.notes && (
                      <p className="text-xs text-slate-400 mt-3 leading-relaxed italic border-t border-violet-50 pt-3">
                        {pie.notes}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Add-your-pie placeholder card */}
            <div className="pie-card bg-violet-50/60 border-2 border-dashed border-violet-200 rounded-2xl overflow-hidden flex items-center justify-center min-h-[160px]">
              <div className="text-center p-5">
                <div className="text-3xl mb-2">➕</div>
                <p className="text-violet-500 font-bold text-sm">
                  Add your pie
                </p>
                <p className="text-violet-300 text-xs mt-0.5">
                  Pie-nup above!
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-violet-100 bg-white/50 text-center px-6 py-12">
        <p className="font-serif text-xl sm:text-2xl text-violet-700">
          π = 3.14159265358979323846&hellip;
        </p>
        <p className="text-slate-400 text-sm mt-1.5 font-semibold italic">
          And counting. Just like the pies.
        </p>
        <div className="flex items-center justify-center gap-2 mt-6 text-slate-300 text-xs font-bold tracking-wide">
          <span>π Night</span>
          <span>·</span>
          <span>March 14, 2026</span>
          <span>·</span>
          <span>Made with 🥧</span>
        </div>
      </footer>
    </div>
  );
}
