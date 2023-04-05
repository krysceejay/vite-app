import { useState } from "react"

import TransferDetails from '../../../components/ui/transfers/TransferDetails'
import Beneficiary from '../../../components/ui/transfers/Beneficiary'
import ConfirmPay from '../../../components/ui/transfers/ConfirmPay'
import PageTopOne from "../../../components/shared/PageTopOne"



export default function NewTransfer() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  function goTo(index: number) {
    setCurrentStepIndex(index)
  }
  
  const steps = [
    <TransferDetails key={1} goTo={goTo} />,
    <Beneficiary key={2} goTo={goTo} />,
    <ConfirmPay key={3} goTo={goTo} />
  ]

  return (
    <main className="flex-grow">
      <PageTopOne title="New Transfer" hasBtn={false} link="/" />
      <section className="flex space-y-3.5 mt-9 items-start flex-col min-[835px]:flex-row min-[835px]:space-x-3.5 min-[835px]:space-y-0">
        <div className="bg-white md:flex-1 rounded px-0 min-[420px]:px-6 py-11 w-full">
          {steps[currentStepIndex]}
        </div>
        <div className="w-full xl:w-[390px] bg-white rounded mt-4 md:mt-0 px-6 py-11 whitespace-break-spaces">
            <h3 className="text-base">Payment Details</h3>
            <div className="mt-3">
              <div className="flex justify-between items-center py-3 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">You send</span>
                <span className="text-xs font-semibold">NGN 80,000.00</span>
              </div>
              <div className="flex justify-between items-center py-3 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">Payment method</span>
                <span className="text-xs font-semibold">Bank Transfer</span>
              </div>
              <div className="flex justify-between items-center py-3 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">Rate</span>
                <span className="text-xs font-semibold">NGN = 0.7957 XOF</span>
              </div>
              <div className="flex justify-between items-center py-3 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">Beneficiary gets</span>
                <span className="text-xs font-semibold">XOF 63,656.00</span>
              </div>
              {currentStepIndex == 2 &&
              <div className="flex justify-between items-center py-3 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">Beneficiary</span>
                <span className="text-xs font-semibold">Toure Birame</span>
              </div>
              }
              <div className="flex justify-between items-center py-3 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">Delivery method</span>
                <span className="text-xs font-semibold">Mobile Money</span>
              </div>
              {currentStepIndex == 2 &&
              <>
                <div className="flex justify-between items-center py-3 border-t border-[#E0E0E0]">
                  <span className="text-xs font-light">Network</span>
                  <span className="text-xs font-semibold">Orange Money</span>
                </div>
                <div className="flex justify-between items-center py-3 border-t border-[#E0E0E0]">
                  <span className="text-xs font-light">Mobile Number</span>
                  <span className="text-xs font-semibold">778030289</span>
                </div>
              </>
              }
              <div className="flex justify-between items-center py-3 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">Fees</span>
                <span className="text-xs font-semibold">NGN 3,000.00</span>
              </div>
              <div className="flex justify-between items-center py-3 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">Total payment due</span>
                <span className={`text-sm font-bold ${currentStepIndex == 2 && 'text-green-color'}`}>NGN 83,000.00</span>
              </div>
            </div>
        </div>
      </section>
    </main>
  )
}
