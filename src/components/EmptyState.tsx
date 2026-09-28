type EmptyStateProps = {
  emoji: string
  title: string
  body: string
}

export function EmptyState({ emoji, title, body }: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-orange-200 bg-white/60 px-6 py-14 text-center">
      <div className="text-4xl" aria-hidden="true">
        {emoji}
      </div>

      <h2 className="mt-4 text-xl font-black text-stone-900">
        {title}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-stone-600">
        {body}
      </p>
    </div>
  )
}