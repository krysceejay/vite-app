import { useContext, useState } from "react"

import TransferDetails from '../../../components/ui/transfers/TransferDetails'
import Beneficiary from '../../../components/ui/transfers/Beneficiary'
import ConfirmPay from '../../../components/ui/transfers/ConfirmPay'
import PageTopOne from "../../../components/shared/PageTopOne"
import { useLocation } from "react-router-dom"
import AuthContext, { IAuthContext } from "../../../context/authContext"
import { TNewTransfer, TPaymentMethod, TSelectBeneficiary } from "../../../common-types"
import { numberFormat, removeCommaFromNumber, roundToTwoDP } from "../../../utils/helper"
import usePaymentMethodData from "../../../hooks/usePaymentMethodData"
import { getPayoutFeesAndTotal } from "../../../api/countries"
import { useQuery } from "@tanstack/react-query"
import { useNewTransfer } from "../../../hooks/useTransfer"
import Modal from "../../../components/shared/Modal"

export default function NewTransfer() {
  const { authUser } = useContext(AuthContext) as IAuthContext
  const { state } = useLocation()
  let paymentMethodOptions: TPaymentMethod[] = []

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [newTransfer, setNewTransfer] = useState<TNewTransfer>({
    sentAmount: state?.sentAmount || '',
    sentCurrency: authUser?.country.currency || '',
    payoutCurrency: state?.payoutCurrency || authUser?.country.currency || '',
    paymentMethod: '',
    rate: state?.rate || '1',
    beneficiaryName: '',
    beneficiarySendNumber: '',
    beneficiaryService: '',
    beneficiaryCountry: '',
    deliveryMethod: '',
    transferPurpose: '',
    isModalOpen: false,
  })
  const { sentAmount, sentCurrency, payoutCurrency, paymentMethod, rate, 
    beneficiaryName, beneficiarySendNumber, beneficiaryService, beneficiaryCountry,
     deliveryMethod, transferPurpose } = newTransfer

  const { isLoading: paymentMethodIsLoading, data: paymentMethodData } = usePaymentMethodData()
  if (!paymentMethodIsLoading && paymentMethodData) {
    paymentMethodOptions = paymentMethodData.map(
      ({
        guid,
        name
      }) => ({
        key: guid,
        value: name,
        opt: name
      })
    )
  }

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewTransfer(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewTransfer(prev => ({
      ...prev,
      payoutCurrency: e.target.value,
      rate: e.target.selectedOptions[0].getAttribute('data-rate') ?? prev.rate
    }))
  }

  const handleSelectPayment = (name: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    setNewTransfer(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectBeneficiary = (beneficiary: TSelectBeneficiary) => {
    setNewTransfer(prev => ({
      ...prev,
      beneficiaryName: beneficiary.name,
      beneficiarySendNumber: beneficiary.sendNumber,
      beneficiaryService: beneficiary.service,
      deliveryMethod: beneficiary.deliveryMethod,
      beneficiaryCountry: beneficiary.countryName
    }))
  }

  const { isLoading: newTransferIsLoading, mutate: addNewTransfer } = useNewTransfer()

  const handleOnclick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const newTransferInput = {
      sent_amount: +removeCommaFromNumber(sentAmount),
      sent_currency: sentCurrency,
      payout_currency: payoutCurrency,
      transfer_purpose: transferPurpose,
      beneficiary_name: beneficiaryName,
      beneficiary_send_number: beneficiarySendNumber,
      delivery_method: deliveryMethod,
      beneficiary_service: beneficiaryService,
      beneficiary_country: beneficiaryCountry,
      payment_method: paymentMethod
    }
    
    addNewTransfer(newTransferInput)
  }

  const toggleModal = () => {
    setNewTransfer(prev => ({
     ...prev,
      isModalOpen: !prev.isModalOpen
    }))
  }

  const getFee = (sentAmount: string) => {
    let fees: number = 0
    const transferFee = authUser?.country.charge_fees.find((fee) => {
      return fee.start_range <= +removeCommaFromNumber(sentAmount) && fee.end_range >= +removeCommaFromNumber(sentAmount)
    })

    if (transferFee) {
      if (transferFee.is_cap) {
        fees = transferFee.percent_fixed
      } else {
        fees = transferFee.percent_fixed * +removeCommaFromNumber(sentAmount)
      }
    }

    return {
      fees: numberFormat(roundToTwoDP(fees)),
      total: numberFormat(roundToTwoDP(fees + (+removeCommaFromNumber(sentAmount))))
    }
  }

  function goTo(index: number) {
    setCurrentStepIndex(index)
  }

  const steps: JSX.Element[] = [
    <TransferDetails
      key={1}
      goTo={goTo}
      newTransfer={newTransfer}
      handleOnchange={handleOnchange}
      handleSelectChange={handleSelectChange}
      handleSelectPayment={handleSelectPayment}
      authUser={authUser}
      getFee={getFee}
      paymentMethodOptions={paymentMethodOptions}
    />,
    <Beneficiary
      key={2}
      goTo={goTo}
      newTransfer={newTransfer}
      handleSelectBeneficiary={handleSelectBeneficiary}
      toggleModal={toggleModal}
      paymentMethodOptions={paymentMethodOptions}
    />,
    <ConfirmPay
      key={3}
      goTo={goTo}
      handleOnchange={handleOnchange}
      newTransfer={newTransfer}
      handleOnclick={handleOnclick}
    />
  ]

  if (newTransferIsLoading) return <p>Loading...</p>

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
              <span className="text-xs font-semibold">{sentCurrency} {sentAmount ? sentAmount : 0}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-t border-[#E0E0E0]">
              <span className="text-xs font-light">Payment method</span>
              <span className="text-xs font-semibold">{paymentMethod}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-t border-[#E0E0E0]">
              <span className="text-xs font-light">Rate</span>
              <span className="text-xs font-semibold">{sentCurrency} = {rate} {payoutCurrency}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-t border-[#E0E0E0]">
              <span className="text-xs font-light">Beneficiary gets</span>
              <span className="text-xs font-semibold">{payoutCurrency} {numberFormat(roundToTwoDP(+removeCommaFromNumber(sentAmount) * +rate))}</span>
            </div>
            {currentStepIndex == 2 &&
              <div className="flex justify-between items-center py-3 border-t border-[#E0E0E0]">
                <span className="text-xs font-light">Beneficiary</span>
                <span className="text-xs font-semibold">{beneficiaryName}</span>
              </div>
            }
            <div className="flex justify-between items-center py-3 border-t border-[#E0E0E0]">
              <span className="text-xs font-light">Delivery method</span>
              <span className="text-xs font-semibold">{deliveryMethod}</span>
            </div>
            {currentStepIndex == 2 &&
              <>
                <div className="flex justify-between items-center py-3 border-t border-[#E0E0E0]">
                  <span className="text-xs font-light">Network</span>
                  <span className="text-xs font-semibold">{beneficiaryService}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-t border-[#E0E0E0]">
                  <span className="text-xs font-light">Mobile Number</span>
                  <span className="text-xs font-semibold">{authUser?.phone_number}</span>
                </div>
              </>
            }
            <div className="flex justify-between items-center py-3 border-t border-[#E0E0E0]">
              <span className="text-xs font-light">Fees</span>
              <span className="text-xs font-semibold">{sentCurrency} {getFee(sentAmount).fees}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-t border-[#E0E0E0]">
              <span className="text-xs font-light">Total payment due</span>
              <span className={`text-sm font-bold ${currentStepIndex == 2 && 'text-green-color'}`}>
                {sentCurrency} {getFee(sentAmount).total}
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
