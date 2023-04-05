import PageTopOne from '../../../components/shared/PageTopOne'

export default function KYCDocuments() {
  return (
    <main className="flex-grow">
      <PageTopOne title="KYC Documents" hasBtn={false} link="/" />
      <section className="bg-white rounded-md mt-9 py-3.5 overflow-hidden">
        <div className="p-6 sm:px-10 auto-grid">
          <div className="border border-[#D7D7D7] rounded-md flex flex-col justify-center items-center px-4 py-7 bg-white cursor-pointer">
            <img src="/asset/img/securityg.png" alt="Identity Proof" className="mx-auto h-[35px] w-[30px]" />
            <div className="mt-4 text-center">
              <p className="text-sm font-semibold">Proof of Identity</p>
              <p className="text-xs mt-2 font-light">Travel Passport</p>
              <div className="flex items-center justify-center space-x-1 mt-1">
                <div className="bg-[#28A745] w-2 h-2 rounded-full" />
                <h3 className="text-[10px] font-light">Paid out</h3>
              </div>
            </div>
          </div>
          <div className="border border-[#D7D7D7] rounded-md flex flex-col justify-center items-center px-4 py-7 bg-white cursor-pointer">
            <img src="/asset/img/securityy.png" alt="Address Proof" className="mx-auto h-[35px] w-[30px]" />
            <div className="mt-4 text-center">
              <p className="text-sm font-semibold">Proof of Address</p>
              <p className="text-xs mt-2 font-light">Electricity Bill</p>
              <div className="flex items-center justify-center space-x-1 mt-1">
                <div className="bg-[#EEB012] w-2 h-2 rounded-full" />
                <h3 className="text-[10px] font-light">Uploaded</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
