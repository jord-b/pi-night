"use client";

export default function AddPieCard() {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent("open-pie-nup"))}
      className="pie-card w-full text-left bg-violet-50/60 border-2 border-dashed border-violet-200 rounded-2xl overflow-hidden flex items-center justify-center min-h-[160px]"
    >
      <div className="text-center p-5">
        <div className="text-3xl mb-2">➕</div>
        <p className="text-violet-500 font-bold text-sm">Add your pie</p>
        <p className="text-violet-300 text-xs mt-0.5">Click to pie-nup!</p>
      </div>
    </button>
  );
}
