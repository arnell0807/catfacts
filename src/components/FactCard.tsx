import { useEffect, useRef, useState, type ReactNode } from "react";
import { toggleFavorite } from "../store/catSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

type FactCardProps = {
  fact: string;
  compact?: boolean;
  label?: string;
  children?: ReactNode;
};

export const buttonBase =
  "inline-flex items-center justify-center rounded-md px-3.5 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50";

export const secondaryButton =
  `${buttonBase} border border-rule bg-surface text-ink hover:bg-paper`;

export function FactCard({ fact, compact = false, label, children }: FactCardProps) {
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
    <article className="flex flex-col rounded-lg border border-rule bg-surface shadow-card">
      <div className={compact ? "flex-1 p-5" : "p-7 sm:p-10"}>
        {label && (
          <p className="mb-4 text-sm font-medium text-accent">{label}</p>
        )}

        <p
          className={`font-serif text-ink ${
            compact ? "text-lg leading-relaxed" : "text-2xl leading-snug sm:text-3xl"
          }`}
        >
          {fact}
        </p>
      </div>

      <div
        className={`flex flex-wrap items-center gap-2 border-t border-rule ${
          compact ? "px-5 py-3" : "px-7 py-4 sm:px-10"
        }`}
      >
        <button
          type="button"
          onClick={() => dispatch(toggleFavorite(fact))}
          aria-pressed={isFavorite}
          className={
            isFavorite
              ? `${buttonBase} border border-accent/30 bg-accent-soft text-accent`
              : secondaryButton
          }
        >
          {isFavorite ? "Saved" : "Save"}
        </button>

        <button type="button" onClick={copyFact} className={secondaryButton}>
          {copyStatus === "copied"
            ? "Copied"
            : copyStatus === "failed"
              ? "Couldn't copy"
              : "Copy"}
        </button>

        {children && <div className="ml-auto">{children}</div>}
      </div>
    </article>
  );
}
