import { useEffect, useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import SearchBar from '../components/SearchBar'
import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'

export default function GlobalSearch() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [q, setQ] = useState('')

  useEffect(() => {
    // Load all semesters' indexes if present (1..8)
    const semesters = Array.from({length:8}, (_,i)=>i+1)
    Promise.all(
      semesters.map(n => fetch(`${import.meta.env.BASE_URL}data/semester${n}/index.json`).then(r=>r.ok?r.json():[]).catch(()=>[]))
    ).then(async lists => {
      const fetches = []
      lists.forEach((list, i) => {
        const sem = `semester${i+1}`
        list.forEach(file => {
          fetches.push(
            fetch(`${import.meta.env.BASE_URL}data/${sem}/${file}`).then(r=>r.json()).then(j => j.contents.map(c => ({...c, courseCode: j.courseCode, courseName: j.courseName, semester: sem})))
          )
        })
      })
      const all = (await Promise.all(fetches)).flat()
      setItems(all)
    }).catch(()=> setError('Global index missing.')).finally(()=> setLoading(false))
  }, [])

  const fuse = useMemo(() => new Fuse(items, { keys: ['title', 'uploadedBy', 'topics', 'courseCode', 'courseName'], threshold: 0.35 }), [items])
  const results = useMemo(() => q.trim()? fuse.search(q).map(r=>r.item) : items, [q, fuse, items])

  if (loading) return <Loading />
  if (error) return <ErrorState message={error} />

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-3">Global Search</h1>
      <SearchBar value={q} onChange={setQ} placeholder="Search across all courses" />
      <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {results.map(item => (
          <a key={`${item.id}-${item.courseCode}`} href={item.assetLink} target="_blank" rel="noreferrer" className="rounded border border-gray-200 dark:border-gray-800 p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="font-medium mb-1">{item.title}</div>
            <div className="text-xs opacity-80 mb-1">{item.courseCode} — {item.courseName}</div>
            <div className="text-xs opacity-80 mb-1">By {item.uploadedBy} • {item.session}</div>
            <div className="flex flex-wrap gap-1">
              {item.topics?.map(t => <span key={t} className="text-[11px] rounded bg-gray-100 dark:bg-gray-700 px-2 py-0.5">{t}</span>)}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}


