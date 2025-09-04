import { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const semesters = Array.from({length:8}, (_,i)=>i+1)
    Promise.all(
      semesters.map(n => fetch(`${import.meta.env.BASE_URL}data/semester${n}/index.json`).then(r=>r.ok?r.json():[]).catch(()=>[]))
    ).then(async lists => {
      const fetches = []
      lists.forEach((list, i) => {
        const sem = `semester${i+1}`
        list.forEach(file => {
          fetches.push(
            fetch(`${import.meta.env.BASE_URL}data/${sem}/${file}`).then(r=>r.json())
          )
        })
      })
      const allCourses = await Promise.all(fetches)
      const counts = new Map()
      allCourses.forEach(c => {
        c.contents?.forEach(item => {
          counts.set(item.uploadedBy, (counts.get(item.uploadedBy)||0) + 1)
        })
      })
      const arr = Array.from(counts.entries()).map(([name, count]) => ({ name, count }))
      arr.sort((a,b)=> b.count - a.count)
      setLeaders(arr)
    }).catch(()=> setError('Unable to compute leaderboard.')).finally(()=> setLoading(false))
  }, [])

  if (loading) return <Loading />
  if (error) return <ErrorState message={error} />

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-3">Top Contributors</h1>
      <div className="divide-y divide-gray-200 dark:divide-gray-800 rounded border border-gray-200 dark:border-gray-800">
        {leaders.map((l, idx) => (
          <div key={l.name} className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="w-6 text-center text-sm opacity-60">{idx+1}</span>
              <span className="font-medium">{l.name}</span>
            </div>
            <div className="text-sm">{l.count}</div>
          </div>
        ))}
      </div>
    </div>
  )
}


