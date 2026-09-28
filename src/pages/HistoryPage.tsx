import { EmptyState } from '../components/EmptyState'
import { clearHistory } from '../store/catSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'


export function HistoryPage() {
  const history = useAppSelector((state) => state.cats.history)
  const dispatch = useAppDispatch()

  return (
    <section>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-700">Last 50 facts</p>
          <h1 className="mt-1 text-4xl font-black tracking-tight text-stone-950">History</h1>
        </div>
        {history.length > 0 && (
          <button
            type="button"
            onClick={() => dispatch(clearHistory())}
            className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-bold text-stone-600 hover:bg-stone-50"
          >
            Clear history
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <EmptyState emoji="🐈" title="Nothing here yet" body="Every fact you view will be added here automatically." />
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <article key={item.viewedAt} className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
              <p className="font-semibold leading-relaxed text-stone-800">{item.fact}</p>
              <time className="mt-3 block text-xs font-medium text-stone-400" dateTime={item.viewedAt}>
                {new Date(item.viewedAt).toLocaleString()}
              </time>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
