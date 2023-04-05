import { Link } from 'react-router-dom'
import Button from '../../components/shared/Button'
import DetailsLink from '../../components/shared/DetailsLink'
import Table from '../../components/shared/Table'

export default function Dashboard() {
  return (
    <section className="flex-grow">
      <h1 className="text-xl sm:text-2xl font-semibold">Dashboard</h1>
      <section>
        <div className="flex flex-col md:flex-row mt-9 space-y-4 md:space-x-4 md:space-y-0 lg:space-x-5">
          <div className="bg-white rounded-md p-5 lg:p-6 shadow-lg w-full md:w-1/3">
            <h3 className="text-xs font-semibold">New Transfer</h3>
            <div className="mt-3">
              <div className="bg-[#F5F6FA] p-4 rounded-md flex justify-between items-center">
                <div>
                  <p className="text-[#888888] text-[10px]">You send</p>
                  <p className="text-base font-medium mt-1">100,000</p>
                </div>
                <div className="text-center">
                  <img src="/asset/img/nigeria.png" alt="Nigeria Flag" className="mx-auto w-6 h-4" />
                  <p className="text-xs font-medium mt-1">NGN</p>
                </div>
              </div>
              <div className="bg-[#F5F6FA] p-4 rounded-md flex justify-between items-center mt-[2px]">
                <div>
                  <p className="text-[#888888] text-[10px]">Recipient gets</p>
                  <p className="text-base font-medium mt-1">86,912.80</p>
                </div>
                <div className="text-center">
                <img src="/asset/img/senegal.png" alt="Senegal Flag" className="mx-auto w-6 h-4" />
                  <div className="relative mt-1 w-12">
                    <select className="appearance-none w-full bg-transparent border-0 text-gray-700 focus:outline-none focus:bg-transparent text-xs font-medium">
                      <option>XOF</option>
                      <option>GHN</option>
                    </select>
                    <div className="pointer-events-none absolute top-[2px] bottom-0 right-0 flex items-center text-gray-800">
                      <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-[10px] mt-3">You send ₦1.00 = 0.869128 XOF</div>
            <div className="mt-3">
              <Button>
                <div className="bg-green-color py-3 px-4 rounded-md">Send Money</div>
              </Button>
            </div>
          </div>
          <div className="flex-1 bg-white rounded-md shadow-lg flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/2 h-full p-6 lg:p-10">
              <div className="mt-5 w-[60px] h-[60px] relative">
              <img src="/asset/img/prop.png" alt="Profile Picture" className="h-full w-full object-cover rounded-full" />
              <img src="/asset/img/nigeria.png" alt="Nigeria Flag" className="rounded-full h-6 w-6 absolute bottom-0 -right-2" />
              </div>
              <div className="mt-3 flex items-center space-x-1">
                <h3 className="text-xl font-semibold">Adeyemi Adedapo</h3>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#28A745]">
                  <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-xs mt-2 font-light">@topazdecimal   |    #29201923</p>
              <p className="text-[10px] mt-5 font-light w-48">Last login was today at 12:31 PM from 104.28.217.119( Dakar, Senegal )</p>
            </div>
            <div className="w-full sm:w-1/2 h-full">
              <div className="h-1/2 border-t sm:border-t-0 sm:border-l border-b border-[#F5F6FA] px-7 py-6">
                <div className="flex items-center space-x-1 mt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  <h3 className="text-sm">Total Sent</h3>
                </div>
                <p className="text-2xl mt-1 font-bold">NGN 2,493,293.82</p>
                <div className="mt-3">
                  <DetailsLink link="/transfer" text="See Details" isTable={false} />
                </div>
              </div>
              <div className="h-1/2 border-l border-[#F5F6FA] px-7 py-6">
                <div className="flex items-center space-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  <h3 className="text-sm">Beneficiaries</h3>
                </div>
                <p className="text-2xl mt-1 font-bold">6</p>
                <div className="mt-3">
                  <DetailsLink link="/beneficiaries" text="See Details" isTable={false} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-11">
        <div className="flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-semibold">Recent Transfers</h1>
          <Link to="/transfers" className="text-sm font-semibold text-green-color">See all</Link>
        </div>
        <Table showSearch={false} pageName="" />
      </section>
    </section>
  )
}
