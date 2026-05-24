import { Link, useLocation } from 'react-router'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'

export function MainNav({
  items,
  className,
  ...props
}: React.ComponentProps<'nav'> & {
  items: { href: string; label: string }[]
}) {
  const location = useLocation()

  return (
    <nav className={cn('items-center gap-2', className)} {...props}>
      {items.map((item) => (
        <Button
          data-pressed={location.pathname.includes(item.href) || undefined}
          key={item.href}
          render={
            <Link
              className={cn(
                location.pathname.includes(item.href) && 'text-primary'
              )}
              to={item.href}
            />
          }
          variant="link"
        >
          {item.label}
        </Button>
      ))}
    </nav>
  )
}
