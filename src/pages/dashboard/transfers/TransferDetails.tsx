import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'
import { getUserTransfer } from '../../../api/transfers'

import Button from '../../../components/shared/Button'
import VerticalStep from '../../../components/shared/VerticalStep'
import { useTransferDetails } from '../../../hooks/useTransfer'
import { numberFormat, roundToTwoDP } from '../../../utils/helper'
import VerticalStepGroup from '../../../components/shared/VerticalStep'
import NotFound from '../../NotFound'

export default function TransferDetails() {
  let { id } = useParams()

  const { isLoading, data: transferData } = useTransferDetails(id)

  if (isLoading) return <p>Loading...</p>
  if (!transferData) return <NotFound />
  
  return (
    <main className="flex-grow">
      <section className="flex flex-wrap justify-between items-center">
        <div className="flex items-center space-x-2.5">
          <h1 className="text-xl sm:text-2xl font-semibold">Transfer</h1>
          <h1 className="text-xl sm:text-2xl font-semibold">#{transferData.transfer_id}</h1>
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
                <span className="text-xs font-semibold">#{transferData.transfer_id}</span>
              </div>
              <div className="flex justify-between items-center space-x-3 py-3 sm:px-4 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">Send Amount</span>
                <span className="text-xs font-semibold">{transferData.sent_currency} {numberFormat(transferData.sent_amount)}</span>
              </div>
              <div className="flex justify-between items-center space-x-3 py-3 sm:px-4 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">Fee</span>
                <span className="text-xs font-semibold">{transferData.sent_currency} {numberFormat(transferData.fees)}</span>
              </div>
              <div className="flex justify-between items-center space-x-3 py-3 sm:px-4 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">Total</span>
                <span className="text-xs font-semibold">{transferData.sent_currency} {numberFormat(transferData.total_payment)}</span>
              </div>
              <div className="flex justify-between items-center space-x-3 py-3 sm:px-4 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">Destination</span>
                <span className="text-xs font-semibold">{transferData.payout_currency} - {transferData.beneficiary_country}</span>
              </div>
              <div className="flex justify-between items-center space-x-3 py-3 sm:px-4 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">Rate</span>
                <span className="text-xs font-semibold">{transferData.sent_currency} = {numberFormat(transferData.rate)} {transferData.payout_currency}</span>
              </div>
              <div className="flex justify-between items-center space-x-3 py-3 sm:px-4 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">Payment Method</span>
                <span className="text-xs font-semibold">{transferData.payment_method}</span>
              </div>
              <div className="flex justify-between items-center space-x-3 py-3 sm:px-4 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">Date</span>
                <span className="text-xs font-semibold">{moment(transferData.created_at).format('DD MMM, YYYY')}</span>
              </div>
              <div className="flex justify-between items-center space-x-3 py-3 sm:px-4 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">Status</span>
                <span className="text-xs font-semibold text-green-color">{transferData.status}</span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-base">Beneficiary Details</h3>
            <div className="mt-3 whitespace-break-spaces">
              <div className="flex justify-between items-center space-x-3 py-3 sm:px-4 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">Beneficiary</span>
                <span className="text-xs font-semibold">{transferData.beneficiary_name}</span>
              </div>
              <div className="flex justify-between items-center space-x-3 py-3 sm:px-4 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">Service</span>
                <span className="text-xs font-semibold">{transferData.beneficiary_service}</span>
              </div>
              <div className="flex justify-between items-center space-x-3 py-3 sm:px-4 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">Account Number</span>
                <span className="text-xs font-semibold">{transferData.beneficiary_send_number}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[300px] lg:w-[390px] bg-white rounded mt-4 md:mt-0 px-6 py-11">
          <h3 className="text-base">Payment Status</h3>
          <div className="mt-10 sm:pl-6">
            <VerticalStepGroup status={transferData.status} />
          </div>
        </div>
      </section>
    </main>
  )
}
