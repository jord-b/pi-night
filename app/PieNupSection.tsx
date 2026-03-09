"use client";

import { useState, useTransition, useEffect } from "react";
import { createPortal } from "react-dom";
import { addPie } from "./actions";

const TYPE_OPTIONS = [
  {
    value: "sweet",
    label: "Sweet",
    emoji: "🍯",
    desc: "Fruit, custard, chocolate, dessert",
    selected: "border-rose-400 bg-rose-50 text-rose-800",
  },
  {
    value: "savory",
    label: "Savory",
    emoji: "🧅",
    desc: "Quiche, pot pie, meat pie",
    selected: "border-teal-400 bg-teal-50 text-teal-800",
  },
  {
    value: "other",
    label: "Wildcard",
    emoji: "🌀",
    desc: "Surprise us!",
    selected: "border-violet-400 bg-violet-50 text-violet-800",
  },
];

const SERVES_OPTIONS = ["2–4", "4–6", "6–8", "8–10", "10–12", "12+"];

export default function PieNupSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedType, setSelectedType] = useState("sweet");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setMounted(true);
  }, []);

  const openModal = () => {
    setIsOpen(true);
    setSuccess(false);
    setError(null);
    setSelectedType("sweet");
  };

  // Listen for the add-card trigger from anywhere on the page
  useEffect(() => {
    const handler = () => openModal();
    window.addEventListener("open-pie-nup", handler);
    return () => window.removeEventListener("open-pie-nup", handler);
  }, []);

  // Lock scroll on <html> while modal is open
  useEffect(() => {
    if (!isOpen) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  const closeModal = () => {
    if (isPending) return;
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await addPie(formData);
        setSuccess(true);
        setTimeout(() => {
          setIsOpen(false);
          setSuccess(false);
        }, 2500);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    });
  };

  const modal = isOpen ? (
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Sign the Pie-nup"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(23, 9, 61, 0.92)" }}
        onClick={closeModal}
      />

      {/* Panel */}
      <div className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-lg shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* Mobile drag handle */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-violet-200 rounded-full" />
        </div>

        <div className="px-6 sm:px-8 pb-8 pt-4 sm:pt-7">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-violet-900 leading-tight">
                Sign the Pie-nup
              </h2>
              <p className="text-slate-400 text-sm mt-0.5 font-semibold">
                Commit to your crust. The people are counting on you.
              </p>
            </div>
            <button
              onClick={closeModal}
              className="ml-4 mt-0.5 text-violet-200 hover:text-violet-400 transition-colors flex-shrink-0"
              aria-label="Close"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Success state */}
          {success ? (
            <div className="text-center py-10">
              <div className="text-7xl mb-4 animate-bounce">🥧</div>
              <h3 className="font-serif text-2xl text-violet-900">
                Pie committed!
              </h3>
              <p className="text-slate-500 font-semibold mt-2">
                You&apos;re officially part of the pie-nup.
              </p>
              <p className="text-slate-400 text-sm mt-1">
                See you on 3.14! 🎉
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-violet-800 mb-1.5">
                  Your Name{" "}
                  <span className="text-violet-300 font-normal">*</span>
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  autoFocus
                  placeholder="e.g. Archimedes"
                  className="input-field"
                />
              </div>

              {/* Pie name */}
              <div>
                <label className="block text-sm font-bold text-violet-800 mb-1.5">
                  What Pie?{" "}
                  <span className="text-violet-300 font-normal">*</span>
                </label>
                <input
                  name="pie_name"
                  type="text"
                  required
                  placeholder="e.g. Brown Butter Apple Pie"
                  className="input-field"
                />
              </div>

              {/* Pie type */}
              <div>
                <label className="block text-sm font-bold text-violet-800 mb-2">
                  Type{" "}
                  <span className="text-violet-300 font-normal">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {TYPE_OPTIONS.map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex flex-col items-center text-center p-3 rounded-xl border-2 cursor-pointer transition-all select-none ${
                        selectedType === opt.value
                          ? opt.selected
                          : "border-violet-100 text-slate-400 hover:border-violet-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="pie_type"
                        value={opt.value}
                        checked={selectedType === opt.value}
                        onChange={() => setSelectedType(opt.value)}
                        className="sr-only"
                        required
                      />
                      <span className="text-2xl mb-1">{opt.emoji}</span>
                      <span className="text-xs font-bold">{opt.label}</span>
                      <span className="text-[10px] leading-tight mt-0.5 opacity-70">
                        {opt.desc}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Serves */}
              <div>
                <label className="block text-sm font-bold text-violet-800 mb-1.5">
                  Serves{" "}
                  <span className="text-violet-300 font-normal">*</span>
                </label>
                <select
                  name="serves"
                  required
                  defaultValue=""
                  className="input-field appearance-none"
                >
                  <option value="" disabled>
                    How many people?
                  </option>
                  {SERVES_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s} people
                    </option>
                  ))}
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-bold text-violet-800 mb-1.5">
                  Notes{" "}
                  <span className="text-violet-300 font-normal">(optional)</span>
                </label>
                <textarea
                  name="notes"
                  placeholder="Allergen info, needs refrigeration, gluten-free, etc."
                  rows={2}
                  className="input-field resize-none"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">
                  <p className="text-rose-600 text-sm font-bold">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isPending}
                className="btn-primary w-full justify-center text-base mt-2"
              >
                {isPending ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Sealing the crust...
                  </>
                ) : (
                  <>Pie, Incoming! 🥧</>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button onClick={openModal} className="btn-primary text-lg">
        Pie-nup Here
        <span aria-hidden className="text-xl ml-1">
          →
        </span>
      </button>

      {/* Render modal into document.body to escape any parent stacking context */}
      {mounted && createPortal(modal, document.body)}
    </>
  );
}
