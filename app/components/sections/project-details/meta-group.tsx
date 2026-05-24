export interface MetaGroupProps {
  label: string
  value: string
}

export function MetaGroup({ label, value }: MetaGroupProps) {
  return (
    <div>
      <p className="mb-2.5 text-xs uppercase">{label}</p>
      <p className="text-sm">{value}</p>
    </div>
  )
}
