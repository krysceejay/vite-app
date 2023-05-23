import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { Link, Outlet, Navigate } from 'react-router-dom'
import { signOut } from '../../api/users';
import AuthContext, { IAuthContext } from '../../context/authContext';
import { toast } from 'react-toastify'
import { isAxiosError } from 'axios'

import DashboardNav from '../ui/DashboardNav'
import { stringToHslColor } from '../../utils/helper';


export default function DashboardLayout() {
  const { authUser } = useContext(AuthContext) as IAuthContext
  const [dropOpen, setDropOpen] = useState<boolean>(false)
  const queryClient = useQueryClient()

  const { mutate: logOutUser } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      toast.success('Logout successful')
      queryClient.setQueryData(['current-user'], null)
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        toast.error(err.response?.data.message)
      } else {
        console.log('unexpected', err)
      }
    }
  })

  if (!authUser) return <Navigate to="/" />
  return (
    <div className="relative min-h-screen flex w-screen overflow-hidden">
      <DashboardNav />
      <main className="flex-1 pb-16">
        <nav className="sticky top-0 z-20 shadow-sm w-full bg-white flex items-center justify-end h-[72px] px-5">
          <div className="flex items-center space-x-2.5 h-full py-6 px-4 border-l border-l-[#EFEFEF]">
            <div className="rounded-full w-7 h-7 overflow-hidden">
              {/* <img src="/asset/img/profilepix.png" alt="Profile Picture" className="object-cover h-7 w-7" /> */}
              {authUser?.profile_image ?
                  <img src={`${import.meta.env.VITE_PROFILE_URL}/${authUser.profile_image}`} alt="Profile Picture" className="h-full w-full object-cover rounded-full" /> :
                  <div
                    className="w-full h-full rounded-full flex justify-center items-center font-medium text-xs"
                    style={{ backgroundColor: stringToHslColor(authUser?.email) }}
                  >
                    {authUser ? `${authUser.first_name.charAt(0)}${authUser.last_name.charAt(0)}` : ''}
                  </div>
                }
            </div>
            <span className="text-sm capitalize">{`${authUser?.first_name} ${authUser?.last_name}`}</span>
            <div className="text-gray-800 cursor-pointer relative h-5">
              <button onClick={() => setDropOpen(prev => !prev)}>
                {dropOpen ?
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clipRule="evenodd" />
                  </svg> :
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>}
              </button>
              {dropOpen &&
                <ul className="absolute top-12 right-0 bg-white rounded-md overflow-hidden flex flex-col divide-y hover:[&>*]:bg-[#F5F6FA] transition ease-in-out duration-[3000ms]">
                  {/* <li className="px-3 py-2">
                    <span className="cursor-pointer text-xs">Notification</span>
                  </li>
                  <li className="px-3 py-2">
                    <span className="cursor-pointer text-xs">Messages</span>
                  </li> */}
                  <li className="flex items-center space-x-2 px-3 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z" clipRule="evenodd" />
                      <path fillRule="evenodd" d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z" clipRule="evenodd" />
                    </svg>
                    <span className="cursor-pointer text-xs" onClick={() => logOutUser()}>Logout</span>
                  </li>
                </ul>
              }
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
