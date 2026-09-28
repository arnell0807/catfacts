import { useEffect, useRef, useState } from "react";
import { toggleFavorite } from "../store/catSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

type FactCardProps = {
  fact: string;
  compact?: boolean;
};

export function FactCard({ fact, compact = false }: FactCardProps) {
  const dispatch = useAppDispatch();
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const copiedTimer = useRef<number>(undefined);

  useEffect(() => {
    return () => {
      clearTimeout(copiedTimer.current);
    };
  }, []);

  const isFavorite = useAppSelector((state) =>
    state.cats.favorites.includes(fact),
  );

  async function copyFact() {
    try {
      await navigator.clipboard.writeText(fact);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }

    clearTimeout(copiedTimer.current);
    copiedTimer.current = setTimeout(() => setCopyStatus("idle"), 1200);
  }

  return (
    <article
      className={`rounded-3xl border border-orange-100 bg-white shadow-sm ${
        compact ? "p-5" : "p-7 sm:p-9"
      }`}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-orange-800">
          Cat fact
        </span>

        <span aria-hidden="true" className="text-2xl">
          🐾
        </span>
      </div>

      <p
        className={`${
          compact ? "text-lg" : "text-2xl sm:text-3xl"
        } font-bold leading-snug tracking-tight text-stone-900`}
      >
        {fact}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => dispatch(toggleFavorite(fact))}
          className="rounded-full bg-stone-900 px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5"
        >
          {isFavorite ? "♥ Saved" : "♡ Save"}
        </button>

        <button
          type="button"
          onClick={copyFact}
          className="rounded-full border border-stone-200 px-4 py-2 text-sm font-bold text-stone-700 transition hover:bg-stone-50"
        >
          {copyStatus === "copied"
            ? "Copied!"
            : copyStatus === "failed"
              ? "Couldn't copy"
              : "Copy"}
        </button>
      </div>
    </article>
  );
}
