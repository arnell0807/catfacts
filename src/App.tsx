import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { FavoritesPage } from './pages/FavoritesPage'
import { HistoryPage } from './pages/HistoryPage'
import { HomePage } from './pages/HomePage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
