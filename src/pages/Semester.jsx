import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'

export default function Semester() {
  const { num } = useParams()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  function labelForSemester(n) {
    const s = Number(n)
    const year = Math.ceil(s / 2)
    const sem = s % 2 === 1 ? 1 : 2
    const yearOrd = ['1st', '2nd', '3rd', '4th'][year - 1] || `${year}th`
    const semOrd = sem === 1 ? '1st' : '2nd'
    return `${yearOrd} Year ${semOrd} Semester`
  }

  useEffect(() => {
    // List JSON files in this semester via an index we maintain
    fetch(`${import.meta.env.BASE_URL}data/semester${num}/index.json`)
      .then(r => {
        if (!r.ok) throw new Error('Index not found')
        return r.json()
      })
      .then(list => Promise.all(list.map(file => fetch(`${import.meta.env.BASE_URL}data/semester${num}/${file}`).then(r=>r.json()))))
      .then(jsons => {
        setCourses(jsons.map(j => ({ code: j.courseCode, name: j.courseName })))
      })
      .catch(() => setError('No courses found yet. Check back soon.'))
      .finally(() => setLoading(false))
  }, [num])

  if (loading) return <Loading />
  if (error) return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">{labelForSemester(num)}</h1>
      <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-8 text-center text-sm opacity-80">
        {error}
      </div>
    </div>
  )

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">{labelForSemester(num)}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {courses.map(c => (
          <Link key={c.code} to={`/course/semester${num}/${c.code}`} className="rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-sm transition bg-white dark:bg-gray-900">
            <div className="font-medium">{c.code}</div>
            <div className="text-sm opacity-80">{c.name}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}


