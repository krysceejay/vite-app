import { useState } from 'react'

import DashboardNavLinks from './DashboardNavLinks'
import MoreLinks from './MoreLinks'
import useTranslate from '../../hooks/useTranslate'

export default function DashboardNav({ }) {
  // const [isOpen, setIsOpen] = useState<boolean>(false)
  const {t} = useTranslate()

  return (
    <>
    {/* {isOpen && <MoreLinks setIsOpen={setIsOpen} /> } */}
    <aside className="fixed bottom-0 w-full lg:w-60 lg:top-0 lg:h-full lg:block xl:w-72 bg-[#242424] z-30">
      <div>
        <img src="/asset/img/wlogo.png" alt="Logo" className="mx-auto mt-6 h-9 w-[160px] object-contain hidden lg:block" />
        <div className="lg:pb-8 lg:overflow-y-scroll lg:mt-14 lg:h-[85vh]">
          <ul className="flex justify-between items-center lg:block">
            <li className="flex-1">
              <DashboardNavLinks slug="/dashboard">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 md:w-4 md:h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
                <h3 className="text-xs xl:text-sm">{t('dashboardPage.title')}</h3>
              </DashboardNavLinks>
            </li>
            <li className="flex-1">
              <DashboardNavLinks slug="/transfers">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 md:w-4 md:h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
                <h3 className="text-xs xl:text-sm">{t('transferPage.title')}</h3>
              </DashboardNavLinks>
            </li>
            <li className="flex-1">
              <DashboardNavLinks slug="/beneficiaries">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 md:w-4 md:h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                <h3 className="text-xs xl:text-sm">{t('beneficiariesPage.title')}</h3>
              </DashboardNavLinks>
            </li>
            {/* <li className="flex-1 cursor-pointer lg:hidden" onClick={() => setIsOpen(true)}>
              <div className="p-3 lg:py-5 lg:px-14 flex flex-col lg:flex-row items-center space-y-2 lg:space-x-3 lg:space-y-0 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 md:w-4 md:h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                <h3 className="text-xs xl:text-sm">More</h3>
              </div>
            </li> */}
            <li className="flex-1">
              <DashboardNavLinks slug="/kyc">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 md:w-4 md:h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <h3 className="text-xs xl:text-sm">{t('kycPage.title')}</h3>
              </DashboardNavLinks>
            </li>
            {/* <li className="hidden lg:block">
              <DashboardNavLinks slug="/messages">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 md:w-4 md:h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                </svg>
                <h3 className="text-xs xl:text-sm">Messages</h3>
              </DashboardNavLinks>
            </li>
            <li className="hidden lg:block">
              <DashboardNavLinks slug="/help">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 md:w-4 md:h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                <h3 className="text-xs xl:text-sm">Help & Support</h3>
              </DashboardNavLinks>
            </li> */}
          </ul>
        </div>
      </div>
    </aside>
    </>
  )
}