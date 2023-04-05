import { useParams } from 'react-router-dom'

import Button from '../../../components/shared/Button'
import VerticalStep from '../../../components/shared/VerticalStep'

export default function TransferDetails() {
  let { id } = useParams()

  return (
    <main className="flex-grow">
      <section className="flex flex-wrap justify-between items-center">
        <div className="flex items-center space-x-2.5">
            <h1 className="text-xl sm:text-2xl font-semibold">Transfer</h1>
            <h1 className="text-xl sm:text-2xl font-semibold">#230322019{id}</h1>
        </div>
        <div className="flex items-center space-x-2 max-[545px]:mt-4">
            <Button>
                <div className="flex items-center space-x-2 bg-transparent border border-text-color text-text-color py-2 sm:py-3 px-4 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span className="min-[320px]:whitespace-nowrap">Download PDF</span>
                </div>
            </Button>
            <Button>
                <div className="flex items-center space-x-2 bg-green-color border border-green-color py-2 sm:py-3 px-4 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span className="min-[320px]:whitespace-nowrap">Repeat Transfer</span>
                </div>
            </Button>
        </div>
      </section>
      <section className="flex flex-col md:flex-row items-start md:space-x-3.5 mt-9">
        <div className="bg-white md:flex-1 rounded px-6 xl:px-24 py-11 w-full">
          <div>
            <h3 className="text-base">Payment Details</h3>
            <div className="mt-3 whitespace-break-spaces">
              <div className="flex justify-between items-center space-x-3 py-3 sm:px-4 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">Transfer ID</span>
                <span className="text-xs font-semibold">#230322019</span>
              </div>
              <div className="flex justify-between items-center space-x-3 py-3 sm:px-4 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">Send Amount</span>
                <span className="text-xs font-semibold">NGN 80,000.01</span>
              </div>
              <div className="flex justify-between items-center space-x-3 py-3 sm:px-4 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">Fee</span>
                <span className="text-xs font-semibold">NGN 2,300.00</span>
              </div>
              <div className="flex justify-between items-center space-x-3 py-3 sm:px-4 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">Total</span>
                <span className="text-xs font-semibold">NGN 82,000.01</span>
              </div>
              <div className="flex justify-between items-center space-x-3 py-3 sm:px-4 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">Destination</span>
                <span className="text-xs font-semibold">XOF - Senegal</span>
              </div>
              <div className="flex justify-between items-center space-x-3 py-3 sm:px-4 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">Rate</span>
                <span className="text-xs font-semibold">NGN = 0.7992 XOF</span>
              </div>
              <div className="flex justify-between items-center space-x-3 py-3 sm:px-4 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">Payment Method</span>
                <span className="text-xs font-semibold">Bank Transfer</span>
              </div>
              <div className="flex justify-between items-center space-x-3 py-3 sm:px-4 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">Date</span>
                <span className="text-xs font-semibold">20 Mar 2023</span>
              </div>
              <div className="flex justify-between items-center space-x-3 py-3 sm:px-4 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">Status</span>
                <span className="text-xs font-semibold text-green-color">Paid out</span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-base">Beneficiary Details</h3>
            <div className="mt-3 whitespace-break-spaces">
              <div className="flex justify-between items-center space-x-3 py-3 sm:px-4 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">Beneficiary</span>
                <span className="text-xs font-semibold">Adeyemi Adedapo</span>
              </div>
              <div className="flex justify-between items-center space-x-3 py-3 sm:px-4 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">Mobile Network</span>
                <span className="text-xs font-semibold">Orange Money</span>
              </div>
              <div className="flex justify-between items-center space-x-3 py-3 sm:px-4 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">Mobile Number</span>
                <span className="text-xs font-semibold">778030289</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[300px] lg:w-[390px] bg-white rounded mt-4 md:mt-0 px-6 py-11">
          <h3 className="text-base">Payment Status</h3>
          <div className="mt-10 sm:pl-6">
            <VerticalStep title="Payment Pending" text="We are waiting for you to complete payment." isEnd={false} />  
            <VerticalStep title="Payment Received" text="We've received your payment." isEnd={false} />  
            <VerticalStep title="KYC Uploaded" text="All required documents have been received." isEnd={false} />  
            <VerticalStep title="Documents Verified" text="Your document(s) have been verified." isEnd={false} />  
            <VerticalStep title="Payout in Progress" text="Payout is in progress." isEnd={false} />  
            <VerticalStep title="Paid out" text="We are waiting for you to complete payment." isEnd />    
          </div>
        </div>
      </section>
    </main>
  )
}
