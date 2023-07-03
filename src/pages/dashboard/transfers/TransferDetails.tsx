import { useRef } from 'react'
import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import { toast } from 'react-toastify'

import Button from '../../../components/shared/Button'
import { useTransferDetails } from '../../../hooks/useTransfer'
import { numberFormat } from '../../../utils/helper'
import VerticalStepGroup from '../../../components/ui/transfers/VerticalStep'
import NotFound from '../../NotFound'
import { TransferStatus } from '../../../api/types/transfer-types'
import useTranslate from '../../../hooks/useTranslate'

export default function TransferDetails() {
  const {t} = useTranslate()
  let { id } = useParams()
  const componentRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const { isLoading, data: transferData } = useTransferDetails(id)

  if (isLoading) return <p>Loading...</p>
  if (!transferData) return <NotFound />

  const handleRepeatTransfer = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if(transferData.status.toLowerCase() === TransferStatus.PAYMENT_PENDING.toLowerCase()) {
      toast.error('You can not repeat a pending transfer, Kindly try again when payment is received.')
      return
    }

    navigate('/transfers/new', {
      state: {
        step: 1,
        sentAmount: transferData.sent_amount,
        sentCurrency: transferData.sent_currency,
        payoutCurrency: transferData.payout_currency,
        paymentMethod: transferData.payment_method,
        country: transferData.beneficiary_country,
        rate: transferData.rate
      }
    })
  }
  
  return (
    <main className="flex-grow">
      <section className="flex flex-wrap justify-between items-center">
        <div className="flex items-center space-x-2.5">
          <h1 className="text-xl sm:text-2xl font-semibold">{t('transferDetailsPage.text')}</h1>
          <h1 className="text-xl sm:text-2xl font-semibold">#{transferData.transfer_id}</h1>
        </div>
        <div className="flex items-center space-x-2 max-[545px]:mt-4">
          <Button
          onClick={handlePrint}
          >
            <div className="flex items-center space-x-2 bg-transparent border border-text-color text-text-color py-2 sm:py-3 px-4 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span className="min-[320px]:whitespace-nowrap">{t('download.pdf')}</span>
            </div>
          </Button>
          <Button
          onClick={handleRepeatTransfer}
          >
            <div className="flex items-center space-x-2 bg-green-color border border-green-color py-2 sm:py-3 px-4 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span className="min-[320px]:whitespace-nowrap">{t('button.repeatTransfer')}</span>
            </div>
          </Button>
        </div>
      </section>
      <section className="flex flex-col md:flex-row items-start md:space-x-3.5 mt-9">
        <div 
        ref={componentRef}
        className="bg-white md:flex-1 rounded px-6 xl:px-24 py-11 w-full">
          <div>
            <h3 className="text-base">{t('transferDetailsPage.title')}</h3>
            <div className="mt-3 whitespace-break-spaces">
              <div className="flex justify-between items-center space-x-3 py-3 sm:px-4 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">{t('transferPage.table.head.transferId')}</span>
                <span className="text-xs font-semibold">#{transferData.transfer_id}</span>
              </div>
              <div className="flex justify-between items-center space-x-3 py-3 sm:px-4 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">{t('transferPage.table.head.sentAmount')}</span>
                <span className="text-xs font-semibold">{transferData.sent_currency} {numberFormat(transferData.sent_amount)}</span>
              </div>
              <div className="flex justify-between items-center space-x-3 py-3 sm:px-4 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">{t('transferDetailsPage.fees')}</span>
                <span className="text-xs font-semibold">{transferData.sent_currency} {numberFormat(transferData.fees)}</span>
              </div>
              <div className="flex justify-between items-center space-x-3 py-3 sm:px-4 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">{t('transferDetailsPage.totalPay')}</span>
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
