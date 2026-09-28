import { useEffect } from "react";
import { FactCard } from "../components/FactCard";
import { useCatFact } from "../hooks/useCatFact";
import { addToHistory } from "../store/catSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

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
      <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-orange-700">
            Tiny facts. Serious cat energy.
          </p>

          <h1 className="max-w-3xl text-4xl font-black tracking-tight text-stone-950 sm:text-6xl">
            Learn one completely unnecessary cat fact.
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-stone-600">
            Fetch a random fact, save the good ones, and keep a little history
            of everything you discover.
          </p>
        </div>

        <div className="flex gap-3">
          <Stat label="Saved" value={favorites} />
          <Stat label="Viewed" value={totalViewed} />
        </div>
      </div>

      {isLoading && (
        <div className="animate-pulse rounded-3xl border border-orange-100 bg-white p-9 shadow-sm">
          <div className="h-5 w-24 rounded bg-stone-100" />
          <div className="mt-7 h-8 w-full rounded bg-stone-100" />
          <div className="mt-3 h-8 w-4/5 rounded bg-stone-100" />
          <div className="mt-8 h-10 w-28 rounded-full bg-stone-100" />
        </div>
      )}

      {isError && (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-7">
          <h2 className="font-black text-red-900">
            The cat ran away with the API request.
          </h2>
          <p className="mt-1 text-red-700">
            Try fetching the fact again.
          </p>
        </div>
      )}

      {data && <FactCard fact={data.fact} />}

      <button
        type="button"
        onClick={() => refetch()}
        disabled={isFetching}
        className="mt-5 w-full rounded-2xl bg-orange-500 px-5 py-4 text-base font-black text-white shadow-sm transition enabled:hover:-translate-y-0.5 enabled:hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isFetching ? "Finding a fact…" : "🐾 Another cat fact"}
      </button>
    </section>
  );
}

type StatProps = {
  label: string;
  value: number;
};

function Stat({ label, value }: StatProps) {
  return (
    <div className="min-w-24 rounded-2xl bg-white px-5 py-4 text-center shadow-sm">
      <div className="text-2xl font-black text-stone-900">{value}</div>

      <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
        {label}
      </div>
    </div>
  );
}