import { useEffect } from "react";
import { FactCard, buttonBase } from "../components/FactCard";
import { useCatFact } from "../hooks/useCatFact";
import { addToHistory } from "../store/catSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const primaryButton = `${buttonBase} bg-ink text-paper enabled:hover:bg-ink/85`;

export function HomePage() {
  const { data, dataUpdatedAt, isLoading, isFetching, isError, refetch } =
    useCatFact();
  const dispatch = useAppDispatch();

  const favorites = useAppSelector(
    (state) => state.cats.favorites.length
  );
  const totalViewed = useAppSelector(
    (state) => state.cats.totalViewed
  );

  useEffect(() => {
    if (data?.fact) {
      dispatch(addToHistory({ fact: data.fact, fetchedAt: dataUpdatedAt }));
    }
  }, [data?.fact, dataUpdatedAt, dispatch]);

  return (
    <section>
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            One cat fact at a time
          </h1>

          <p className="mt-2 max-w-lg text-muted">
            Pull a random fact, save the ones worth keeping, and look back
            through everything you've read.
          </p>
        </div>

        <dl className="flex shrink-0 divide-x divide-rule self-start rounded-lg border border-rule bg-surface sm:self-auto">
          <Stat label="Viewed" value={totalViewed} />
          <Stat label="Saved" value={favorites} />
        </dl>
      </div>

      {isLoading && (
        <div
          className="animate-pulse rounded-lg border border-rule bg-surface p-7 shadow-card sm:p-10"
          aria-label="Loading"
        >
          <div className="h-4 w-20 rounded bg-rule" />
          <div className="mt-6 h-7 w-full rounded bg-rule" />
          <div className="mt-3 h-7 w-3/5 rounded bg-rule" />
        </div>
      )}

      {isError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-7">
          <p className="font-medium text-red-900">Couldn't load a fact.</p>
          <p className="mt-1 text-sm text-red-700">
            Check your connection and try again.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className={`${primaryButton} mt-4`}
          >
            Try again
          </button>
        </div>
      )}

      {data && (
        <FactCard fact={data.fact} label={`Fact no. ${totalViewed}`}>
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className={primaryButton}
          >
            {isFetching ? "Loading…" : "Next fact →"}
          </button>
        </FactCard>
      )}
    </section>
  );
}

type StatProps = {
  label: string;
  value: number;
};

function Stat({ label, value }: StatProps) {
  return (
    <div className="min-w-24 px-5 py-3">
      <dt className="text-xs font-medium text-muted">{label}</dt>
      <dd className="mt-0.5 font-serif text-2xl font-semibold tabular-nums text-ink">
        {value}
      </dd>
    </div>
  );
}
