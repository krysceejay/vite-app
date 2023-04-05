import { Link, Outlet } from 'react-router-dom'

import DashboardNav from '../ui/DashboardNav'


export default function DashboardLayout(){

  return (
    <div className="relative min-h-screen flex w-screen overflow-hidden">
      <DashboardNav />
      <main className="flex-1 pb-16">
        <nav className="sticky top-0 z-20 shadow-sm w-full bg-white flex items-center justify-end h-[72px] px-5">
          <div className="flex items-center space-x-2.5 h-full py-6 px-4 border-l border-l-[#EFEFEF]">
            <div className="rounded-full w-7 h-7 overflow-hidden">
              <img src="/asset/img/profilepix.png" alt="Profile Picture" className="object-cover h-7 w-7" />
            </div>
            <span className="text-sm">Adeyemi Adedapo</span>
            <div className="text-gray-800 cursor-pointer">
              <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
        </nav>
        <section className="px-4 md:px-6 xl:px-10 pt-10 pb-14 flex flex-col min-h-[95vh] ml-0 lg:ml-60 xl:ml-72">
          <Outlet />
        </section>
        <footer className="ml-0 lg:ml-60 xl:ml-72">
          <div className="bg-transparent mx-4 md:mx-6 xl:mx-10 py-7 border-t border-[#E0E0E0]">
            <div className="text-xs">
              By using this website, you accept our <Link to="/" className="text-[#009933]">Terms of Use</Link> and <Link to="/" className="text-[#009933]">Privacy Policy</Link>. Copyright &copy; {new Date().getFullYear()} Vargent Africa.
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
