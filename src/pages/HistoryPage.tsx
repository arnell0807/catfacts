import { EmptyState } from '../components/EmptyState'
import { secondaryButton } from '../components/FactCard'
import { clearHistory } from '../store/catSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'


export function HistoryPage() {
  const history = useAppSelector((state) => state.cats.history)
  const dispatch = useAppDispatch()

  return (
    <section>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold tracking-tight">History</h1>
          <p className="mt-1 text-muted">Your last 50 facts, newest first.</p>
        </div>
        {history.length > 0 && (
          <button
            type="button"
            onClick={() => dispatch(clearHistory())}
            className={secondaryButton}
          >
            Clear history
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <EmptyState title="Nothing here yet" body="Every fact you view will be added here automatically." />
      ) : (
        <ol className="divide-y divide-rule overflow-hidden rounded-lg border border-rule bg-surface shadow-card">
          {history.map((item) => (
            <li key={item.viewedAt} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:gap-6">
              <time
                className="shrink-0 pt-0.5 text-xs tabular-nums text-muted sm:w-36"
                dateTime={item.viewedAt}
              >
                {new Date(item.viewedAt).toLocaleString(undefined, {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </time>
              <p className="leading-relaxed text-ink">{item.fact}</p>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
