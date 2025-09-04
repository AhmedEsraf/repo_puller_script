export default function Filters({ sessions, uploaders, session, uploader, onSession, onUploader, sort, onSort }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <select value={session} onChange={e=>onSession(e.target.value)} className="rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-2 py-2 text-sm">
        <option value="">All Sessions</option>
        {sessions.map(s=> <option key={s} value={s}>{s}</option>)}
      </select>
      <select value={uploader} onChange={e=>onUploader(e.target.value)} className="rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-2 py-2 text-sm">
        <option value="">All Uploaders</option>
        {uploaders.map(u=> <option key={u} value={u}>{u}</option>)}
      </select>
      <select value={sort} onChange={e=>onSort(e.target.value)} className="rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-2 py-2 text-sm">
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  )
}


