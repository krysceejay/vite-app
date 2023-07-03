import { Fragment } from "react"
import { IPayment } from "../../../api/types/payment-types"
import { MethodName } from "../../../api/types/payment-method-types"
import useTranslate from "../../../hooks/useTranslate"

type PaymentAccountProp = {
    payment: IPayment | undefined
}

let details: JSX.Element | null = null

const PaymentAccount = ({payment}: PaymentAccountProp) => {
    const {t} = useTranslate()
    switch (payment?.transfer.payment_method) {
        case MethodName.BANK_TRANSFER: {
            details = <div>
                    <div className="border-b border-b-white py-4">
                        <p className="text-[10px]">{t('transferPage.newTransfer.accountName')}</p>
                        <p className="text-xs font-medium mt-1">{payment?.account_name}</p>
                    </div>
                    <div className="border-b border-b-white py-4">
                        <p className="text-[10px]">{t('transferPage.newTransfer.accountNum')}</p>
                        <p className="text-xs font-medium mt-1">{payment?.bank_account_number}</p>
                    </div>
                    <div className="border-b border-b-white py-4">
                        <p className="text-[10px]">{t('transferPage.newTransfer.bankName')}</p>
                        <p className="text-xs font-medium mt-1">{payment?.bank_name}</p>
                    </div>
                </div>
            break
        }
        case MethodName.MOBILE_MONEY: {
            details = <div>
                    <div className="border-b border-b-white py-4">
                        <p className="text-[10px]">{t('transferPage.newTransfer.serviceName')}</p>
                        <p className="text-xs font-medium mt-1">{payment?.m_money_carrier}</p>
                    </div>
                    <div className="border-b border-b-white py-4">
                        <p className="text-[10px]">{t('transferPage.newTransfer.phoneNum')}</p>
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