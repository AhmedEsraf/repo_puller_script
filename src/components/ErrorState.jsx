export default function ErrorState({ message = 'Failed to load data.' }) {
  return (
    <div className="py-16 text-center text-sm text-red-600">{message}</div>
  )
}


