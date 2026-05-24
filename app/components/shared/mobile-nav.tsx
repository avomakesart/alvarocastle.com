import { Link, useNavigate, type LinkProps } from 'react-router'
import * as React from 'react'
import { Button } from '~/components/ui/button'
import {
  Drawer,
  DrawerPanel,
  DrawerPopup,
  DrawerTrigger,
} from '~/components/ui/drawer'
import { cn } from '~/lib/utils'

export function MobileNav({
  items,
  className,
}: {
  items: { href: string; label: string }[]
  className?: string
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Drawer onOpenChange={setOpen} open={open} position="left">
      <DrawerTrigger
        render={
          <Button
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            size="icon"
            variant="outline"
            className={cn('relative -ms-1.5', className)}
          >
            <svg
              aria-hidden="true"
              className="pointer-events-none mt-1 size-5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width={16}
              height={16}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="origin-center -translate-y-1.75 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] in-[[data-slot=button][aria-expanded=true]]:translate-x-0 in-[[data-slot=button][aria-expanded=true]]:translate-y-0 in-[[data-slot=button][aria-expanded=true]]:rotate-315"
                d="M4 12L20 12"
              />
              <path
                className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] in-[[data-slot=button][aria-expanded=true]]:rotate-45"
                d="M4 12H20"
              />
              <path
                className="origin-center -translate-y-1.75 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] in-[[data-slot=button][aria-expanded=true]]:translate-y-0 in-[[data-slot=button][aria-expanded=true]]:rotate-135"
                d="M4 12H20"
              />
            </svg>
          </Button>
        }
      />
      <DrawerPopup showCloseButton variant="straight">
        <DrawerPanel
          className="flex flex-col gap-12 p-6 pt-8"
          scrollFade={false}
        >
          <div className="flex flex-col gap-3">
            <div className="text-xl font-medium">Menu</div>
            <div className="flex flex-col gap-1">
              <MobileLink to="/" onOpenChange={setOpen}>
                Home
              </MobileLink>
              {items.map((item) => (
                <MobileLink
                  to={item.href}
                  key={item.label}
                  onOpenChange={setOpen}
                >
                  {item.label}
                </MobileLink>
              ))}
            </div>
          </div>
        </DrawerPanel>
      </DrawerPopup>
    </Drawer>
  )
}

function MobileLink({
  to,
  onOpenChange,
  className,
  children,
  ...props
}: LinkProps & {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}) {
  const navigate = useNavigate()
  return (
    <Link
      className={cn(
        'flex items-center gap-2 py-1.5 text-2xl text-muted-foreground',
        className
      )}
      to={to}
      onClick={() => {
        navigate(to)
        onOpenChange?.(false)
      }}
      {...props}
    >
      {children}
    </Link>
  )
}
