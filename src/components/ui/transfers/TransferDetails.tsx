import { ICountry } from '../../../api/types/country-types'
import { IUser } from '../../../api/types/user-types'
import { TNewTransfer, TPaymentMethod } from '../../../common-types'
import Button from '../../shared/Button'
import { FormSelect } from '../../shared/Form'
import NewTransferSend from './NewTransferSend'
import { toast } from 'react-toastify'

interface TransferDetailsProps {
    goTo: (int: number) => void
    newTransfer: TNewTransfer
    handleOnchange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    handleSelectPayment: (n: string) => (e: React.ChangeEvent<HTMLSelectElement>) => void
    authUser: IUser | null | undefined
    getFee: (s: string) => {
        fees: string
        total: string
    }
    paymentMethodOptions: TPaymentMethod[]
    countries: ICountry[] | undefined
}

export default function TransferDetails({
    goTo, newTransfer, handleOnchange, handleSelectChange,
    authUser, getFee, handleSelectPayment,
    paymentMethodOptions, countries }: TransferDetailsProps) {
    const {
        sentAmount,
        sentCurrency,
        payoutCurrency,
        paymentMethod,
        country,
        rate,
    } = newTransfer

    const handleClick = () => {
        if (!sentAmount || !sentCurrency || !paymentMethod || !rate || !payoutCurrency) {
            toast.error('Kindly provide all required fields before you proceed.')
            return
        }
        goTo(1)
    }
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
                before:content-[''] before:bg-[#D9D9D9] before:absolute before:w-full before:h-[2px] 
                before:right-1/2 before:top-[36%] before:-translate-y-2">
                    <div className="w-4 h-4 bg-[#D9D9D9] rounded-full z-10 cursor-pointer" onClick={handleClick} />
                    <p className="text-[10px] min-[420px]:text-xs font-semibold mt-2.5">Select Beneficiary</p>
                </div>
                <div
                    className="
                relative flex flex-col justify-center items-center w-full 
                before:content-[''] before:bg-[#D9D9D9] before:absolute before:w-full before:h-[2px] 
                before:right-1/2 before:top-[36%] before:-translate-y-2">
                    <div className="w-4 h-4 bg-[#D9D9D9] rounded-full z-10" />
                    <p className="text-[10px] min-[420px]:text-xs font-semibold mt-2.5">Confirm & Pay</p>
                </div>
            </div>
            <div className="mt-10 px-2">
                <NewTransferSend
                    sentAmount={sentAmount}
                    currency={payoutCurrency}
                    country={country}
                    rate={rate}
                    countries={countries}
                    handleOnchange={handleOnchange}
                    handleSelectChange={handleSelectChange}
                    authUser={authUser}
                />
                <div className="flex w-full space-x-2.5 mt-2.5">
                    <div className="rounded-md overflow-hidden bg-[#F5F6FA] flex-1 p-4">
                        <p className="text-[#888888] text-[10px]">Rate</p>
                        <p className="text-base font-medium mt-1">{`${sentCurrency} = ${rate} ${payoutCurrency}`}</p>
                    </div>
                    <div className="rounded-md overflow-hidden bg-[#F5F6FA] flex-1 p-4">
                        <p className="text-[#888888] text-[10px]">Transfer fee</p>
                        <p className="text-base font-medium mt-1">{sentCurrency} {getFee(sentAmount).fees}</p>
                    </div>
                </div>
                {/* <div className="mt-2.5 w-full rounded-md overflow-hidden bg-[#F5F6FA] pb-3 p-1 pr-2">
                    <FormSelect
                        label="Delivery Method"
                        value={deliveryMethod}
                        onChange={handleSelectPayment('deliveryMethod')}
                        required
                        options={paymentMethodOptions}
                        emptyOption="Select delivery method"
                        errorMessage="Delivery Method is required"
                    />
                </div> */}
                <div className="mt-2.5 w-full rounded-md overflow-hidden bg-[#F5F6FA] pb-3 p-1 pr-2">
                    <FormSelect
                        label="Payment Method"
                        value={paymentMethod}
                        onChange={handleSelectPayment('paymentMethod')}
                        required
                        options={paymentMethodOptions}
                        emptyOption="Select payment method"
                        errorMessage="Payment Method is required"
                    />
                </div>
                <div className="mt-5">
                    <div className="cursor-pointer" onClick={handleClick}>
                        <Button>
                            <div className="bg-green-color py-3 px-4 rounded-md">Select Beneficiary</div>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}