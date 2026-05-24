import { Link } from 'react-router'

export const Footer = ({ slogan }: { slogan?: string | null }) => {
  return (
    <footer className="relative mx-auto mt-8 py-6 text-muted-foreground before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-border/64">
      <div className="container flex w-full items-center justify-center gap-2 px-4 sm:px-6">
        <p>
          © {new Date().getFullYear()}{' '}
          <Link className="font-heading text-lg text-foreground" to="/">
            alvarocastle.com
          </Link>{' '}
          {slogan && `- ${slogan}`}
        </p>
      </div>
    </footer>
  )
}
