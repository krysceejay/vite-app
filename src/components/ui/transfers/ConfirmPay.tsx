import { IPayoutFeesTransferOutput } from '../../../api/types/country-types'
import { TNewTransfer } from '../../../common-types'
import { numberFormat, removeCommaFromNumber, roundToTwoDP } from '../../../utils/helper'
import Button from '../../shared/Button'
import { FormInput } from '../../shared/Form'
import { toast } from 'react-toastify'
import { isAxiosError } from 'axios'
import { getPayoutFeesAndTotal } from '../../../api/countries'
import { useQuery } from '@tanstack/react-query'
import { usePaymentByTransfer } from '../../../hooks/usePayment'
import { IPayment } from '../../../api/types/payment-types'
import PaymentAccount from './PaymentAccount'

interface ConfirmPayProps {
  handleOnchange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleConfirmPay: (e: React.MouseEvent<HTMLButtonElement>) => void
  newTransfer: TNewTransfer
  paymentData: IPayment | undefined
  paymentLoading: boolean
  paymentError: boolean
}

export default function ConfirmPay({ handleOnchange, handleConfirmPay, newTransfer, paymentData, paymentLoading, paymentError }: ConfirmPayProps) {
  const { sentCurrency, transferPurpose } = newTransfer
  // const { isLoading: pftIsLoading, isError, data: payoutFeeTotal } = useQuery({
  //   queryKey: ['payout-fees-total', { sentAmount, sentCurrency, payoutCurrency }],
  //   queryFn: () => getPayoutFeesAndTotal({
  //     sent_amount: +removeCommaFromNumber(sentAmount),
  //     sent_currency: sentCurrency,
  //     payout_currency: payoutCurrency
  //   }),
  //   onError: (err) => {
  //     if (isAxiosError(err)) {
  //       toast.error(err.response?.data.message)
  //     } else {
  //       console.log('unexpected', err)
  //     }
  //   }
  // })

  const userHandleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleConfirmPay(e)
  }

  if (paymentLoading) return <p>Loading...</p>
  if (paymentError) return <p>Error occurred...</p>

  return (
    <div className="w-full sm:w-[420px] mx-auto">
      <div className="flex justify-between items-center">
        <div
          className="
                relative flex flex-col justify-center items-center w-full">
          <div className="w-4 h-4 bg-green-color rounded-full z-10 cursor-pointer" />
          <p className="text-green-color text-[10px] min-[420px]:text-xs font-semibold mt-2.5">Transfer Details</p>
        </div>
        <div
          className="
                relative flex flex-col justify-center items-center w-full 
                before:content-[''] before:bg-green-color before:absolute before:w-full before:h-[2px] 
                before:right-1/2 before:top-[36%] before:-translate-y-2">
          <div className="w-4 h-4 bg-green-color rounded-full z-10 cursor-pointer" />
          <p className="text-green-color text-[10px] min-[420px]:text-xs font-semibold mt-2.5">Select Beneficiary</p>
        </div>
        <div
          className="
                relative flex flex-col justify-center items-center w-full 
                before:content-[''] before:bg-green-color before:absolute before:w-full before:h-[2px] 
                before:right-1/2 before:top-[36%] before:-translate-y-2">
          <div className="w-4 h-4 bg-green-color rounded-full z-10" />
          <p className="text-green-color text-[10px] min-[420px]:text-xs font-semibold mt-2.5">Confirm & Pay</p>
        </div>
      </div>
      <div className="mt-8 px-2">
        <div className="mt-2 pb-3 w-full rounded-md overflow-hidden bg-[#F5F6FA]">
          <FormInput
            label="Transfer Purpose"
            type="text"
            name="transferPurpose"
            value={transferPurpose}
            onChange={handleOnchange}
            placeholder="Enter purpose of transfer"
          />
        </div>
        <p className="text-[10px] mt-7">Pay the amount due to the account with details below:</p>
        <div className="mt-3.5 px-7 py-4 bg-[#F5F6FA] rounded">
          <PaymentAccount payment={paymentData} />
          <div className="border-b border-b-white py-4">
            <p className="text-[10px]">Payment/Transaction Reference</p>
            <p className="text-xs font-medium mt-1">{paymentData?.transfer.transfer_id}</p>
          </div>
          <div className="py-4">
            <p className="text-[10px]">Amount Due</p>
            <p className="text-xs font-medium mt-1">{sentCurrency} {paymentData ? numberFormat(roundToTwoDP(+paymentData.total_payment)) : 0}</p>
          </div>
        </div>
        <div className="mt-5">
          <Button
            onClick={userHandleClick}
          >
            <div className="bg-green-color py-3 px-4 rounded-md">Confirm Transfer</div>
          </Button>
        </div>
      </div>
    </div>
  )
}