import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Semester from './pages/Semester'
import Course from './pages/Course'
import GlobalSearch from './pages/GlobalSearch'
import Leaderboard from './pages/Leaderboard'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container-max py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/semester/:num" element={<Semester />} />
          <Route path="/course/:semester/:code" element={<Course />} />
          <Route path="/search" element={<GlobalSearch />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}


