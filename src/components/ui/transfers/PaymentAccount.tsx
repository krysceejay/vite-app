import { Fragment } from "react"
import { IPayment } from "../../../api/types/payment-types"
import { MethodName } from "../../../api/types/payment-method-types"

type PaymentAccountProp = {
    payment: IPayment | undefined
}

let details: JSX.Element | null = null

const PaymentAccount = ({payment}: PaymentAccountProp) => {
    switch (payment?.transfer.payment_method) {
        case MethodName.BANK_TRANSFER: {
            details = <div>
                    <div className="border-b border-b-white py-4">
                        <p className="text-[10px]">Account Name</p>
                        <p className="text-xs font-medium mt-1">{payment?.account_name}</p>
                    </div>
                    <div className="border-b border-b-white py-4">
                        <p className="text-[10px]">Account Number</p>
                        <p className="text-xs font-medium mt-1">{payment?.bank_account_number}</p>
                    </div>
                    <div className="border-b border-b-white py-4">
                        <p className="text-[10px]">Bank Name</p>
                        <p className="text-xs font-medium mt-1">{payment?.bank_name}</p>
                    </div>
                </div>
            break
        }
        case MethodName.MOBILE_MONEY: {
            details = <div>
                    <div className="border-b border-b-white py-4">
                        <p className="text-[10px]">Service Name</p>
                        <p className="text-xs font-medium mt-1">{payment?.m_money_carrier}</p>
                    </div>
                    <div className="border-b border-b-white py-4">
                        <p className="text-[10px]">Phone Number</p>
                        <p className="text-xs font-medium mt-1">{payment?.m_money_phone}</p>
                    </div>
                </div>
            break
        }
        default:
            break;
    }

    return <Fragment>{details}</Fragment>
}

export default PaymentAccount