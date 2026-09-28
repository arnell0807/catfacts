import { EmptyState } from "../components/EmptyState";
import { FactCard } from "../components/FactCard";
import { clearFavorites } from "../store/catSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export function FavoritesPage() {
  const favorites = useAppSelector((state) => state.cats.favorites);
  const dispatch = useAppDispatch();

  return (
    <section>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-700">
            Your collection
          </p>
          <h1 className="mt-1 text-4xl font-black tracking-tight text-stone-950">
            Favorites
          </h1>
        </div>
        {favorites.length > 0 && (
          <button
            type="button"
            onClick={() => dispatch(clearFavorites())}
            className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-bold text-stone-600 hover:bg-stone-50"
          >
            Clear favorites
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <EmptyState
          emoji="♡"
          title="No favorites yet"
          body="Save a fact from the home page and it will show up here."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {favorites.map((fact) => (
            <FactCard key={fact} fact={fact} compact />
          ))}
        </div>
      )}
    </section>
  );
}
