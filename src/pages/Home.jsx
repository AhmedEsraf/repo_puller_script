import { Link } from 'react-router-dom'

const semesters = Array.from({ length: 8 }, (_, i) => i + 1)

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Semesters</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {semesters.map(n => (
          <Link key={n} to={`/semester/${n}`} className="rounded border border-gray-200 dark:border-gray-800 p-6 hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="text-center font-medium">Semester {n}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}


