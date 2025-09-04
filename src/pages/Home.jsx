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
      <h1 className="text-2xl font-semibold mb-4">Semesters</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {semesters.map(n => (
          <Link key={n} to={`/semester/${n}`} className="rounded border border-gray-200 dark:border-gray-800 p-6 hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="text-center font-medium">{labelForSemester(n)}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}


