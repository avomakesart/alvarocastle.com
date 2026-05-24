export function Section({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <section>
      <div className="mb-5 border-b pb-3 text-xs uppercase">{label}</div>
      {children}
    </section>
  )
}
