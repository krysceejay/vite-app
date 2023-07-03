import { Link, Outlet } from 'react-router-dom'
import useTranslate from '../../hooks/useTranslate'
import useLocalStorage from '../../hooks/useLocalStorage'
import { useEffect } from 'react'
import Language from '../shared/Language'

export default function MainLayout() {
  const {t, i18n} = useTranslate()
  const [lang, setLang] = useLocalStorage('lang', 'en')

  useEffect(() => {
    i18n.changeLanguage(lang)
  }, [lang])

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {value} = e.target
    setLang(value)
  }

  return (
    <div className="min-h-screen flex flex-col w-screen overflow-hidden">
      <nav className="sticky top-0 z-40 shadow-sm w-full bg-white flex items-center justify-between py-2 px-4 sm:px-14 sm:py-3">
        <img src="/asset/img/blogo.png" alt="logo" className="h-[34px] w-[130px] object-contain" />
        <Language lang={lang} handleSelectChange={handleSelectChange} />
      </nav>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-transparent p-7 border-t border-[#E0E0E0] text-center">
        <div className="text-xs">
          {t('term.warn')} <Link to="/" className="text-green-color">{t('term.use')}</Link> {t('and')} <Link to="/" className="text-green-color">{t('privacy')}</Link>. {t('copyright')} &copy; {new Date().getFullYear()} Vargent Africa.
        </div>
      </footer>
    </div>
  )
}
