import { NavLink } from 'react-router-dom'

export default function DashboardNavLinks({
  slug,
  children
}: {
  slug: string,
  children: React.ReactNode
}) {

  return (
    <NavLink 
    to={slug} 
    className={({ isActive }) => {
      return `px-3 py-2 lg:py-5 lg:px-14 flex flex-col lg:flex-row items-center space-y-1 lg:space-x-3 lg:space-y-0 ${isActive ? 'text-green-color bg-[#3D3D3D]' : 'text-white'}`
    }}>
      {children}
    </NavLink>
  )
}