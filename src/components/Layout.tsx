import { NavLink, Outlet, type NavLinkRenderProps } from 'react-router-dom'
import { useAppSelector } from "../store/hooks"

const navClass = ({ isActive }: NavLinkRenderProps) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition ${
    isActive
      ? 'bg-stone-900 text-white'
      : 'text-stone-600 hover:bg-white hover:text-stone-900'
  }`

export function Layout() {
  const favorites = useAppSelector((state) => state.cats.favorites.length)
  const history = useAppSelector((state) => state.cats.history.length)

  return (
    <div className="min-h-screen bg-orange-50 text-stone-800">
      <header className="border-b border-orange-100 bg-orange-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <NavLink to="/" className="flex items-center gap-3 text-xl font-black tracking-tight">
            <span className="grid size-10 place-items-center rounded-2xl bg-stone-900 text-xl text-white">
              🐱
            </span>
            CatFact
          </NavLink>

          <nav className="flex flex-wrap gap-1 rounded-full bg-orange-100/70 p-1">
            <NavLink to="/" end className={navClass}>
              Home
            </NavLink>

            <NavLink to="/favorites" className={navClass}>
              Favorites {favorites > 0 && `(${favorites})`}
            </NavLink>

            <NavLink to="/history" className={navClass}>
              History {history > 0 && `(${history})`}
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10">
        <Outlet />
      </main>
    </div>
  )
}