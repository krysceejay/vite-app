import { IPayoutFeesTransferOutput } from '../../../api/types/country-types'
import { TNewTransfer } from '../../../common-types'
import { numberFormat, removeCommaFromNumber, roundToTwoDP } from '../../../utils/helper'
import Button from '../../shared/Button'
import { FormInput } from '../../shared/Form'
import { toast } from 'react-toastify'
import { isAxiosError } from 'axios'
import { getPayoutFeesAndTotal } from '../../../api/countries'
import { useQuery } from '@tanstack/react-query'

interface ConfirmPayProps {
  goTo: (int: number) => void
  handleOnchange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleOnclick: (e: React.MouseEvent<HTMLButtonElement>) => void
  newTransfer: TNewTransfer
}

export default function ConfirmPay({ goTo, handleOnchange, handleOnclick, newTransfer }: ConfirmPayProps) {
  const { sentAmount, sentCurrency, payoutCurrency, transferPurpose } = newTransfer

  const { isLoading: pftIsLoading, isError, data: payoutFeeTotal } = useQuery({
    queryKey: ['payout-fees-total', { sentAmount, sentCurrency, payoutCurrency }],
    queryFn: () => getPayoutFeesAndTotal({
      sent_amount: +removeCommaFromNumber(sentAmount),
      sent_currency: sentCurrency,
      payout_currency: payoutCurrency
    }),
    onError: (err) => {
      if (isAxiosError(err)) {
        toast.error(err.response?.data.message)
      } else {
        console.log('unexpected', err)
      }
    }
  })

  const userHandleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!transferPurpose) {
      toast.error('Kindly add a transfer purpose.')
      return
    }
    handleOnclick(e)
  }

  if (pftIsLoading) return <p>Loading...</p>
  return (
    <div className="w-full sm:w-[420px] mx-auto">
      <div className="flex justify-between items-center">
        <div
          className="
                relative flex flex-col justify-center items-center w-full">
          <div className="w-4 h-4 bg-green-color rounded-full z-10 cursor-pointer" onClick={() => goTo(0)} />
          <p className="text-green-color text-[10px] min-[420px]:text-xs font-semibold mt-2.5">Transfer Details</p>
        </div>
        <div
          className="
                relative flex flex-col justify-center items-center w-full 
                before:content-[''] before:bg-green-color before:absolute before:w-full before:h-[2px] 
                before:right-1/2 before:top-[36%] before:-translate-y-2">
          <div className="w-4 h-4 bg-green-color rounded-full z-10 cursor-pointer" onClick={() => goTo(1)} />
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
        {/* <div className="mt-2.5 w-full rounded-md overflow-hidden bg-[#F5F6FA] p-4">
          <p className="text-[#888888] text-[10px]">Transfer Purpose <span className="text-red-500">*</span></p>
          <div className="relative mt-1">
            <select className="appearance-none w-full bg-transparent text-base font-medium border-0 text-gray-700 pr-8 rounded-md focus:outline-none focus:bg-transparent">
              <option>Family Support</option>
              <option>Bills</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-800">
              <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
        </div> */}
        {!isError &&
          <>
            <div className="mt-2 pb-3 w-full rounded-md overflow-hidden bg-[#F5F6FA]">
              <FormInput
                label="Transfer Purpose"
                type="text"
                name="transferPurpose"
                value={transferPurpose}
                onChange={handleOnchange}
                placeholder=""
                required
                errorMessage="Transfer Purpose is required"
              />
            </div>
            <p className="text-[10px] mt-7">Pay the amount due to the account with details below:</p>
            <div className="mt-3.5 px-7 py-4 bg-[#F5F6FA] rounded">
              <div className="border-b border-b-white py-4">
                <p className="text-[10px]">Account Name</p>
                <p className="text-xs font-medium mt-1">Provargent Technologies Limited</p>
              </div>
              <div className="border-b border-b-white py-4">
                <p className="text-[10px]">Account Number</p>
                <p className="text-xs font-medium mt-1">1002378627</p>
              </div>
              <div className="border-b border-b-white py-4">
                <p className="text-[10px]">Bank Name</p>
                <p className="text-xs font-medium mt-1">Providus Bank</p>
              </div>
              {/* <div className="border-b border-b-white py-4">
            <p className="text-[10px]">Payment/Transaction Reference</p>
            <p className="text-xs font-medium mt-1">29201923</p>
          </div> */}
              <div className="py-4">
                <p className="text-[10px]">Amount Due</p>
                <p className="text-xs font-medium mt-1">{sentCurrency} {payoutFeeTotal ? numberFormat(roundToTwoDP(payoutFeeTotal.total_payment)) : 0}</p>
              </div>
            </div>
            <div className="mt-5">
              <Button
                onClick={userHandleClick}
              >
                <div className="bg-green-color py-3 px-4 rounded-md">Confirm Transfer</div>
              </Button>
            </div>
          </>
        }
      </div>
    </div>
  )
}