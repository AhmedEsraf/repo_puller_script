export default function SearchBar({ value, onChange, placeholder='Search...' }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e)=>onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring"
    />
  )
}


