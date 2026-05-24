import { LanguagesIcon } from 'lucide-react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { Button } from '~/components/ui/button'
import {
  Menu,
  MenuGroup,
  MenuGroupLabel,
  MenuPopup,
  MenuRadioGroup,
  MenuRadioItem,
  MenuTrigger,
} from '~/components/ui/menu'
import { replaceLocaleInPath } from '~/lib/lang'

export function LanguageSwithcher({
  className,
  ...rest
}: React.ComponentProps<typeof Button>) {
  const navigate = useNavigate()
  const location = useLocation()
  const { lang } = useParams()

  function changeLanguage(nextLang: string) {
    const newPath = replaceLocaleInPath(location.pathname, nextLang)
    document.cookie = `lang=${nextLang}; path=/; max-age=31536000`
    navigate(newPath)
  }

  const menuGroupLabel = {
    en: 'Languages',
    es: 'Idiomas',
  }

  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" size="icon" />}>
        <LanguagesIcon />
      </MenuTrigger>
      <MenuPopup>
        <MenuGroup>
          <MenuGroupLabel>{menuGroupLabel[lang as 'en' | 'es']}</MenuGroupLabel>
          <MenuRadioGroup value={lang} onValueChange={changeLanguage}>
            <MenuRadioItem value="en" closeOnClick>English</MenuRadioItem>
            <MenuRadioItem value="es" closeOnClick>Español</MenuRadioItem>
          </MenuRadioGroup>
        </MenuGroup>
      </MenuPopup>
    </Menu>
  )
}
