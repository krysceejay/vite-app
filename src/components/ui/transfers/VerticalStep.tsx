import { Fragment } from "react"
import { TransferStatus } from "../../../api/types/transfer-types"

type VerticalStep = {
  id: number
  title: string
  text: string
  isEnd: boolean
}

type VerticalStepGroupProp = {
  status: string
}

const steps: VerticalStep[] = [
  { id: 1, title: TransferStatus.PAYMENT_PENDING, text: "We are waiting for you to complete payment.", isEnd: false },
  { id: 2, title: TransferStatus.PAYMENT_RECEIVED, text: "We've received your payment.", isEnd: false },
  { id: 3, title: TransferStatus.PAYOUT_INPROGRESS, text: "Payout is in progress.", isEnd: false },
  { id: 4, title: TransferStatus.PAID_OUT, text: "Payout completed", isEnd: true },
]

export default function VerticalStepGroup({status}: VerticalStepGroupProp) {
  let stp: VerticalStep = { id: 1, title: "Payment Pending", text: "We are waiting for you to complete payment.", isEnd: false }

  stp = steps.find(s => s.title.toLowerCase() === status.toLowerCase()) ?? stp

  const result = steps.map(step =>
    <div key={step.id} className={`px-6 pb-6 border-l relative ${step.isEnd ? 'border-transparent' : step.id < stp.id ? 'border-green-color' : 'border-[#d9d9d9]'}`}>
      <h3 className={`text-green-color text-xs leading-[0] whitespace-break-spaces capitalize ${step.isEnd ? 'font-semibold' : 'font-normal'}`}>{step.title}</h3>
      <p className="text-[10px] font-light mt-2">{step.text}</p>
      <div className={`w-2 h-2 rounded-full absolute -top-[3.5px] -left-[4.5px] ${step.id <= stp.id ? 'bg-green-color' : 'bg-[#d9d9d9]'} `} />
    </div>
  )

  return <Fragment>{result}</Fragment>
}