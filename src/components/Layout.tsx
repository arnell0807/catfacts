import { NavLink, Outlet, type NavLinkRenderProps } from 'react-router-dom'
import { useAppSelector } from "../store/hooks"

const navClass = ({ isActive }: NavLinkRenderProps) =>
  `flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-ink text-paper'
      : 'text-muted hover:bg-ink/5 hover:text-ink'
  }`

function Count({ value }: { value: number }) {
  if (value === 0) return null
  return <span className="text-xs tabular-nums opacity-70">{value}</span>
}

export function Layout() {
  const favorites = useAppSelector((state) => state.cats.favorites.length)
  const history = useAppSelector((state) => state.cats.history.length)

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-rule bg-surface">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
          <NavLink to="/" className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-md bg-ink font-serif text-lg font-semibold text-paper">
              C
            </span>
            <span className="font-serif text-lg font-semibold">CatFact</span>
          </NavLink>

          <nav className="flex gap-1">
            <NavLink to="/" end className={navClass}>
              Home
            </NavLink>

            <NavLink to="/favorites" className={navClass}>
              Favorites <Count value={favorites} />
            </NavLink>

            <NavLink to="/history" className={navClass}>
              History <Count value={history} />
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-10 sm:py-14">
        <Outlet />
      </main>
    </div>
  )
}
