import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import Fuse from 'fuse.js'
import SearchBar from '../components/SearchBar'
import Filters from '../components/Filters'
import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'

export default function Course() {
  const { semester, code } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [q, setQ] = useState('')
  const [session, setSession] = useState('')
  const [uploader, setUploader] = useState('')
  const [sort, setSort] = useState('newest')

  useEffect(() => {
    setLoading(true)
    fetch(`${import.meta.env.BASE_URL}data/${semester}/${code}.json`)
      .then(r => {
        if (!r.ok) throw new Error('Not found')
        return r.json()
      })
      .then(setData)
      .catch(() => setError('Course metadata not found.'))
      .finally(() => setLoading(false))
  }, [semester, code])

  const sessions = useMemo(() => Array.from(new Set(data?.contents?.map(c => c.session) || [])), [data])
  const uploaders = useMemo(() => Array.from(new Set(data?.contents?.map(c => c.uploadedBy) || [])), [data])

  const fuse = useMemo(() => new Fuse(data?.contents || [], {
    keys: ['title', 'uploadedBy', 'topics'],
    threshold: 0.35,
  }), [data])

  const filtered = useMemo(() => {
    let items = data?.contents || []
    if (q.trim()) {
      items = fuse.search(q).map(r => r.item)
    }
    if (session) items = items.filter(i => i.session === session)
    if (uploader) items = items.filter(i => i.uploadedBy === uploader)
    items = items.slice().sort((a,b)=>{
      const da = new Date(a.uploadDate).getTime()
      const db = new Date(b.uploadDate).getTime()
      return sort === 'newest' ? db - da : da - db
    })
    return items
  }, [data, fuse, q, session, uploader, sort])

  if (loading) return <Loading />
  if (error) return <ErrorState message={error} />

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">{data.courseCode} — {data.courseName}</h1>
      <div className="mb-4 grid gap-3 md:grid-cols-2">
        <SearchBar value={q} onChange={setQ} placeholder="Search title, uploader, topics" />
        <Filters
          sessions={sessions}
          uploaders={uploaders}
          session={session}
          uploader={uploader}
          onSession={setSession}
          onUploader={setUploader}
          sort={sort}
          onSort={setSort}
        />
      </div>
      {filtered.length === 0 ? (
        <div className="text-sm text-gray-500">No content found.</div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map(item => (
            <a key={item.id} href={item.assetLink} target="_blank" rel="noreferrer" className="rounded border border-gray-200 dark:border-gray-800 p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
              <div className="font-medium mb-1">{item.title}</div>
              <div className="text-xs opacity-80 mb-1">By {item.uploadedBy} • {item.session}</div>
              <div className="flex flex-wrap gap-1 mb-2">
                {item.topics?.map(t => <span key={t} className="text-[11px] rounded bg-gray-100 dark:bg-gray-700 px-2 py-0.5">{t}</span>)}
              </div>
              <div className="text-xs opacity-70">Uploaded {item.uploadDate}</div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}


