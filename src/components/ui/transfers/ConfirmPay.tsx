import { TNewTransfer } from '../../../common-types'
import { numberFormat, roundToTwoDP, truncate } from '../../../utils/helper'
import Button from '../../shared/Button'
import { FormInput } from '../../shared/Form'
import { IPayment } from '../../../api/types/payment-types'
import PaymentAccount from './PaymentAccount'
import useTranslate from '../../../hooks/useTranslate'

interface ConfirmPayProps {
  handleOnchange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleConfirmPay: (e: React.MouseEvent<HTMLButtonElement>) => void
  newTransfer: TNewTransfer
  paymentData: IPayment | undefined
  paymentLoading: boolean
  paymentError: boolean
}

export default function ConfirmPay({ handleOnchange, handleConfirmPay, newTransfer, paymentData, paymentLoading, paymentError }: ConfirmPayProps) {
  const {t} = useTranslate()
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
          <p className="text-green-color text-[10px] min-[420px]:text-xs font-semibold mt-2.5">{truncate(t('transferPage.newTransfer.transferDetails'), 20)}</p>
        </div>
        <div
          className="
                relative flex flex-col justify-center items-center w-full 
                before:content-[''] before:bg-green-color before:absolute before:w-full before:h-[2px] 
                before:right-1/2 before:top-[36%] before:-translate-y-2">
          <div className="w-4 h-4 bg-green-color rounded-full z-10 cursor-pointer" />
          <p className="text-green-color text-[10px] min-[420px]:text-xs font-semibold mt-2.5">{truncate(t('transferPage.newTransfer.selectBeneficiary'), 20)}</p>
        </div>
        <div
          className="
                relative flex flex-col justify-center items-center w-full 
                before:content-[''] before:bg-green-color before:absolute before:w-full before:h-[2px] 
                before:right-1/2 before:top-[36%] before:-translate-y-2">
          <div className="w-4 h-4 bg-green-color rounded-full z-10" />
          <p className="text-green-color text-[10px] min-[420px]:text-xs font-semibold mt-2.5">{truncate(t('transferPage.newTransfer.confirmPay'), 20)}</p>
        </div>
      </div>
      <div className="mt-8 px-2">
        <div className="mt-2 pb-3 w-full rounded-md overflow-hidden bg-[#F5F6FA]">
          <FormInput
            label={t('transferPurpose.text')}
            type="text"
            name="transferPurpose"
            value={transferPurpose}
            onChange={handleOnchange}
            placeholder={t('transferPurpose.placeholder')}
          />
        </div>
        <p className="text-[10px] mt-7">{t('transferPage.newTransfer.payInstruction')}:</p>
        <div className="mt-3.5 px-7 py-4 bg-[#F5F6FA] rounded">
          <PaymentAccount payment={paymentData} />
          <div className="border-b border-b-white py-4">
            <p className="text-[10px]">{t('transferPage.newTransfer.payRef')}</p>
            <p className="text-xs font-medium mt-1">{paymentData?.transfer.transfer_id}</p>
          </div>
          <div className="py-4">
            <p className="text-[10px]">{t('transferPage.newTransfer.amountDue')}</p>
            <p className="text-xs font-medium mt-1">{sentCurrency} {paymentData ? numberFormat(roundToTwoDP(+paymentData.total_payment)) : 0}</p>
          </div>
        </div>
        <div className="mt-5">
          <Button
            onClick={userHandleClick}
          >
            <div className="bg-green-color py-3 px-4 rounded-md">{t('button.confirmTransfer')}</div>
          </Button>
        </div>
      </div>
    </div>
  )
}