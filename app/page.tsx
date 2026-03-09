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
    badge: "bg-amber-100 text-amber-800",
    bar: "bg-gradient-to-r from-amber-300 to-amber-400",
  },
  savory: {
    label: "Savory",
    badge: "bg-emerald-100 text-emerald-800",
    bar: "bg-gradient-to-r from-emerald-300 to-emerald-400",
  },
  other: {
    label: "Wildcard",
    badge: "bg-violet-100 text-violet-800",
    bar: "bg-gradient-to-r from-violet-300 to-violet-400",
  },
};

// Background floating π symbols — positions & delays
const BG_PIS = [
  { size: 160, top: "2%", left: "-1%", opacity: 0.045, delay: "0s" },
  { size: 100, top: "12%", right: "0%", opacity: 0.05, delay: "3s" },
  { size: 80, top: "44%", left: "2%", opacity: 0.04, delay: "6s" },
  { size: 130, top: "58%", right: "1%", opacity: 0.04, delay: "1.5s" },
  { size: 70, bottom: "22%", left: "14%", opacity: 0.055, delay: "4.5s" },
  { size: 90, bottom: "6%", right: "10%", opacity: 0.04, delay: "2s" },
  { size: 60, top: "30%", left: "10%", opacity: 0.035, delay: "7s" },
  { size: 110, bottom: "40%", right: "6%", opacity: 0.045, delay: "5s" },
];

export default async function Home() {
  const pies = await getPies();

  return (
    <div className="min-h-screen bg-[#FFF8EC] overflow-x-hidden">
      {/* Floating π background */}
      <div className="fixed inset-0 pointer-events-none select-none overflow-hidden">
        {BG_PIS.map((item, i) => (
          <span
            key={i}
            className="absolute font-serif font-black text-amber-800 animate-float-pi"
            style={{
              fontSize: item.size,
              top: item.top,
              left: item.left,
              right: item.right,
              bottom: item.bottom,
              opacity: item.opacity,
              animationDelay: item.delay,
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
            background: "linear-gradient(135deg, #f59e0b, #b45309)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          π
        </div>
        <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-amber-200 text-amber-700 text-sm font-semibold px-4 py-2 rounded-full shadow-sm">
          <span>🗓</span>
          <span>March 14th &middot; 3.14.2026</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 text-center px-6 pt-4 pb-20 sm:pb-28">
        {/* Big title */}
        <h1 className="font-serif font-black leading-none tracking-tight">
          <span
            className="block"
            style={{
              fontSize: "clamp(96px, 20vw, 180px)",
              background: "linear-gradient(150deg, #fbbf24, #f59e0b, #92400e)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 0.9,
            }}
          >
            π
          </span>
          <span
            className="block text-amber-900 -mt-2 sm:-mt-4"
            style={{ fontSize: "clamp(52px, 11vw, 100px)" }}
          >
            Night
          </span>
        </h1>

        <p className="text-amber-600 text-base sm:text-lg mt-4 italic font-medium max-w-xs sm:max-w-sm mx-auto leading-snug">
          Irrational amounts of pie, rational coordination.
        </p>

        {/* Countdown */}
        <div className="mt-12">
          <p className="text-amber-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">
            The feast begins in
          </p>
          <div className="flex justify-center">
            <Countdown />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <PieNupSection />
          <p className="text-amber-400 text-xs font-medium">
            {pies.length > 0
              ? `${pies.length} pie${pies.length !== 1 ? "s" : ""} committed so far`
              : "Be the first to sign the pie-nup!"}
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="relative z-10 flex items-center gap-4 px-6 sm:px-14 max-w-5xl mx-auto -mt-6 mb-10">
        <div className="flex-1 h-px bg-amber-200" />
        <span className="text-amber-300 text-2xl">🥧</span>
        <div className="flex-1 h-px bg-amber-200" />
      </div>

      {/* Pie Registry */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 sm:px-14 pb-28">
        <div className="flex items-baseline gap-3 mb-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-amber-900">
            The Pie Registry
          </h2>
          {pies.length > 0 && (
            <span className="text-amber-400 font-medium text-base">
              {pies.length} {pies.length === 1 ? "pie" : "pies"}
            </span>
          )}
        </div>

        {pies.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-5">🥧</div>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-amber-800">
              The crust is still forming&hellip;
            </h3>
            <p className="text-amber-500 mt-2 text-base">
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
                  className="pie-card bg-white rounded-2xl shadow-sm border border-amber-100/80 overflow-hidden"
                >
                  {/* Color bar */}
                  <div className={`h-1.5 ${config.bar}`} />
                  <div className="p-5">
                    <div className="text-4xl mb-3 leading-none">🥧</div>
                    <h3 className="font-serif text-xl font-black text-amber-900 leading-tight">
                      {pie.pie_name}
                    </h3>
                    <p className="text-amber-600 font-semibold text-sm mt-1">
                      by {pie.name}
                    </p>
                    <div className="flex items-center flex-wrap gap-2 mt-3">
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${config.badge}`}
                      >
                        {config.label}
                      </span>
                      <span className="text-xs text-amber-400 font-medium">
                        &middot; Serves {pie.serves}
                      </span>
                    </div>
                    {pie.notes && (
                      <p className="text-xs text-amber-400 mt-3 leading-relaxed italic border-t border-amber-50 pt-3">
                        {pie.notes}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Add-your-pie card */}
            <div className="pie-card bg-amber-50/60 border-2 border-dashed border-amber-200 rounded-2xl overflow-hidden flex items-center justify-center min-h-[160px]">
              <div className="text-center p-5">
                <div className="text-3xl mb-2">➕</div>
                <p className="text-amber-600 font-bold text-sm">
                  Add your pie
                </p>
                <p className="text-amber-400 text-xs mt-0.5">
                  Sign the Pie-nup above
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-amber-100 bg-white/30 text-center px-6 py-12">
        <p className="font-serif text-xl sm:text-2xl font-bold text-amber-700">
          π = 3.14159265358979323846&hellip;
        </p>
        <p className="text-amber-500 text-sm mt-1.5 italic">
          And counting. Just like the pies.
        </p>
        <div className="flex items-center justify-center gap-2 mt-6 text-amber-300 text-xs font-medium tracking-wide">
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
