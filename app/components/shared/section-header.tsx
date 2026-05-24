export const SectionHeader = ({
  label,
  renderAction,
}: {
  label: string
  renderAction?: React.ReactNode
}) => {
  return (
    <div className="mb-5 flex items-center justify-between border-b pb-3 uppercase">
      {label}
      {renderAction}
    </div>
  )
}
