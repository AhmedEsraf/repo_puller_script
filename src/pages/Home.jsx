import { Link } from 'react-router-dom'

const semesters = Array.from({ length: 8 }, (_, i) => i + 1)

function labelForSemester(n) {
  const year = Math.ceil(n / 2)
  const sem = n % 2 === 1 ? 1 : 2
  const yearOrd = ['1st', '2nd', '3rd', '4th'][year - 1] || `${year}th`
  const semOrd = sem === 1 ? '1st' : '2nd'
  return `${yearOrd} Year ${semOrd} Semester`
}

export default function Home() {
  return (
    <div>
      <section className="mb-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 p-6 backdrop-blur">
        <h1 className="text-3xl font-semibold">Centralized University Notes</h1>
        <p className="mt-2 text-sm opacity-80">Browse notes organized by year and semester. Search, filter, and download instantly from GitHub Pages.</p>
      </section>
      <h2 className="text-xl font-semibold mb-3">Semesters</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {semesters.map(n => (
          <Link key={n} to={`/semester/${n}`} className="rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-sm transition bg-white dark:bg-gray-900">
            <div className="text-center font-medium">{labelForSemester(n)}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}


