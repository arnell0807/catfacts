import { EmptyState } from "../components/EmptyState";
import { FactCard, secondaryButton } from "../components/FactCard";
import { clearFavorites } from "../store/catSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export function FavoritesPage() {
  const favorites = useAppSelector((state) => state.cats.favorites);
  const dispatch = useAppDispatch();

  return (
    <section>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold tracking-tight">Favorites</h1>
          <p className="mt-1 text-muted">
            {favorites.length === 1 ? "1 saved fact" : `${favorites.length} saved facts`}
          </p>
        </div>
        {favorites.length > 0 && (
          <button
            type="button"
            onClick={() => dispatch(clearFavorites())}
            className={secondaryButton}
          >
            Clear favorites
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <EmptyState
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
