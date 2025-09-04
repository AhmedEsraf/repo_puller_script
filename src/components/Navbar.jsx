import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="container-max flex items-center justify-between py-3">
        <Link to="/" className="font-semibold text-lg">University Notes</Link>
        <nav className="flex items-center gap-4 text-sm">
          <NavLink to="/search" className={({isActive})=>isActive? 'font-medium' : ''}>Search</NavLink>
          <NavLink to="/leaderboard" className={({isActive})=>isActive? 'font-medium' : ''}>Leaderboard</NavLink>
          <button onClick={()=>setDark(v=>!v)} className="rounded border px-2 py-1 text-xs border-gray-300 dark:border-gray-700">
            {dark ? 'Light' : 'Dark'}
          </button>
        </nav>
      </div>
    </header>
  )
}


