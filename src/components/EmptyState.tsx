type EmptyStateProps = {
  title: string
  body: string
}

export function EmptyState({ title, body }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-rule bg-surface/60 px-6 py-14 text-center">
      <h2 className="font-serif text-xl font-semibold text-ink">
        {title}
      </h2>

      <p className="mx-auto mt-2 max-w-sm text-muted">
        {body}
      </p>
    </div>
  )
}
