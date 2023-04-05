
import PageTopOne from '../../../components/shared/PageTopOne'
import Pagination from '../../../components/shared/Pagination'

export default function Beneficiaries() {
  return (
    <main className="flex-grow">
      <PageTopOne title="Beneficiaries" hasBtn buttonText="New Beneficiary" link="/" />
      <section className="mt-9">
        <div className="bg-white rounded-md overflow-hidden">
          <div className="py-10 border-b border-b-[#F5F6FA] w-full">
            <div className="w-full sm:w-2/3 md:w-1/2 flex items-center px-6 md:px-10">
              <input
                className="
                    flex-1 w-full h-9 appearance-none border border-[#D7D7D7] rounded-l rounded-r-none bg-white px-3 text-[#242424] text-sm 
                    leading-tight focus:outline-none focus:shadow-none placeholder:italic"
                type="text"
                name="firstname"
                placeholder="Search Beneficiaries"
              />
              <div className="border border-[#D7D7D7] border-l-0 w-20 h-9 rounded-r text-center text-xs flex justify-center items-center px-3 cursor-pointer">Search</div>
            </div>
          </div>
          <div className="min-h-[400px]">
            <div className="p-6 sm:px-10 auto-grid">
              <div className="border border-[#D7D7D7] rounded flex flex-col justify-center items-center px-4 py-5 bg-white">
                <div className="w-16 h-16 rounded-full bg-[#FF004D] flex justify-center items-center">
                  <h3 className="text-white text-xl font-bold">AA</h3>
                </div>
                <div className="mt-2.5 text-center">
                  <p className="text-xs font-semibold">Adeyemi Adedapo</p>
                  <p className="text-xs mt-2">Mobile Money</p>
                  <div className="flex justify-center items-center mt-2.5 space-x-1">
                    <img src="/asset/img/nigeria.png" alt="Nigeria Flag" className="w-[18px] h-3" />
                    <p className="text-[10px]">Nigeria</p>
                  </div>
                  <p className="text-xs font-medium mt-5 text-green-color cursor-pointer">Send Money</p>
                </div>
              </div>
              <div className="border border-[#D7D7D7] rounded flex flex-col justify-center items-center px-4 py-5 bg-white">
                <div className="w-16 h-16 rounded-full bg-[#2872A7] flex justify-center items-center">
                  <h3 className="text-white text-xl font-bold">TB</h3>
                </div>
                <div className="mt-2.5 text-center">
                  <p className="text-xs font-semibold">Toure Birame</p>
                  <p className="text-xs mt-2">Bank Account</p>
                  <div className="flex justify-center items-center mt-2.5 space-x-1">
                    <img src="/asset/img/senegal.png" alt="Senegal Flag" className="w-[18px] h-3" />
                    <p className="text-[10px]">Senegal</p>
                  </div>
                  <p className="text-xs font-medium mt-5 text-green-color cursor-pointer">Send Money</p>
                </div>
              </div>
              <div className="border border-[#D7D7D7] rounded flex flex-col justify-center items-center px-4 py-5 bg-white">
                <div className="w-16 h-16 rounded-full bg-[#FF004D] flex justify-center items-center">
                  <h3 className="text-white text-xl font-bold">AA</h3>
                </div>
                <div className="mt-2.5 text-center">
                  <p className="text-xs font-semibold">Adeyemi Adedapo</p>
                  <p className="text-xs mt-2">Mobile Money</p>
                  <div className="flex justify-center items-center mt-2.5 space-x-1">
                    <img src="/asset/img/nigeria.png" alt="Nigeria Flag" className="w-[18px] h-3" />
                    <p className="text-[10px]">Nigeria</p>
                  </div>
                  <p className="text-xs font-medium mt-5 text-green-color cursor-pointer">Send Money</p>
                </div>
              </div>
              <div className="border border-[#D7D7D7] rounded flex flex-col justify-center items-center px-4 py-5 bg-white">
                <div className="w-16 h-16 rounded-full bg-[#FF004D] flex justify-center items-center">
                  <h3 className="text-white text-xl font-bold">AA</h3>
                </div>
                <div className="mt-2.5 text-center">
                  <p className="text-xs font-semibold">Adeyemi Adedapo</p>
                  <p className="text-xs mt-2">Mobile Money</p>
                  <div className="flex justify-center items-center mt-2.5 space-x-1">
                    <img src="/asset/img/nigeria.png" alt="Nigeria Flag" className="w-[18px] h-3" />
                    <p className="text-[10px]">Nigeria</p>
                  </div>
                  <p className="text-xs font-medium mt-5 text-green-color cursor-pointer">Send Money</p>
                </div>
              </div>
              <div className="border border-[#D7D7D7] rounded flex flex-col justify-center items-center px-4 py-5 bg-white">
                <div className="w-16 h-16 rounded-full bg-[#FF004D] flex justify-center items-center">
                  <h3 className="text-white text-xl font-bold">AA</h3>
                </div>
                <div className="mt-2.5 text-center">
                  <p className="text-xs font-semibold">Adeyemi Adedapo</p>
                  <p className="text-xs mt-2">Mobile Money</p>
                  <div className="flex justify-center items-center mt-2.5 space-x-1">
                    <img src="/asset/img/nigeria.png" alt="Nigeria Flag" className="w-[18px] h-3" />
                    <p className="text-[10px]">Nigeria</p>
                  </div>
                  <p className="text-xs font-medium mt-5 text-green-color cursor-pointer">Send Money</p>
                </div>
              </div>
            </div>
          </div>
          <div className="py-6 px-6 md:px-10 border-t border-t-[#F5F6FA] flex justify-end items-center">
            <Pagination />
          </div>
        </div>
      </section>
    </main>
  )
}
