import { Link } from 'react-router'
import { Separator } from '~/components/ui/separator'
import { LanguageSwithcher } from './language-switcher'
import { MainNav } from './main-nav'
import { MobileNav } from './mobile-nav'
import { ThemeToggle } from './theme-toggle'

export interface NavItem {
  href: string
  label: string
}

export const Header = ({ navItems }: { navItems: NavItem[] }) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-sm before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-border/64">
      <div className="relative container mx-auto flex h-(--header-height) w-full items-center justify-between gap-2 px-4 sm:px-6 md:max-w-5xl">
        <MobileNav className="ml-1.5 flex md:hidden" items={navItems} />
        <div className="-mt-0.5 flex shrink-0 items-center gap-1.5 font-heading text-2xl sm:text-[1.625em]">
          <Link to="/" className="font-heading text-3xl">
            ac.
          </Link>
        </div>
        <div className="ms-auto flex items-center gap-2 md:flex-1 md:justify-end">
          <MainNav items={navItems} className="hidden md:flex" />
          <Separator orientation="vertical" className="hidden md:flex" />
          <ThemeToggle className="ml-0 md:ml-2" />
          <LanguageSwithcher />
        </div>
      </div>
    </header>
  )
}
