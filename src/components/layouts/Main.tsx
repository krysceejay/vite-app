import { Link, Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col w-screen overflow-hidden">
      <nav className="sticky top-0 z-40 shadow-sm w-full bg-white flex items-center justify-between py-2 px-4 sm:px-14 sm:py-3">
        <img src="/asset/img/blogo.png" alt="logo" className="h-[34px] w-[130px] object-contain" />
        <div className="relative">
          <select className="appearance-none w-full bg-transparent border-0 text-gray-700 py-3 px-4 pr-8 rounded focus:outline-none focus:bg-transparent text-sm">
            <option>English</option>
            <option>French</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-800">
            <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </nav>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-transparent p-7 border-t border-[#E0E0E0] text-center">
        <div className="text-xs">
            By using this website, you accept our <Link to="/" className="text-green-color">Terms of Use</Link> and <Link to="/" className="text-green-color">Privacy Policy</Link>. Copyright &copy; {new Date().getFullYear()} Vargent Africa.
        </div>
      </footer>
    </div>
  )
}
