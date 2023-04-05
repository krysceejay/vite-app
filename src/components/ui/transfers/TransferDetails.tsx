import Button from '../../shared/Button'

interface TransferDetailsProps {
    goTo: (int: number) => void
}

export default function TransferDetails({ goTo }: TransferDetailsProps) {
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
                    <div className="w-4 h-4 bg-[#D9D9D9] rounded-full z-10 cursor-pointer" onClick={() => goTo(1)} />
                    <p className="text-[10px] min-[420px]:text-xs font-semibold mt-2.5">Select Beneficiary</p>
                </div>
                <div
                    className="
                relative flex flex-col justify-center items-center w-full 
                before:content-[''] before:bg-[#D9D9D9] before:absolute before:w-full before:h-[2px] 
                before:right-1/2 before:top-[36%] before:-translate-y-2">
                    <div className="w-4 h-4 bg-[#D9D9D9] rounded-full z-10 cursor-pointer" onClick={() => goTo(2)} />
                    <p className="text-[10px] min-[420px]:text-xs font-semibold mt-2.5">Confirm & Pay</p>
                </div>
            </div>
            <div className="mt-10 px-2">
                <div className="bg-[#F5F6FA] p-4 rounded-md flex justify-between items-center">
                    <div>
                        <p className="text-[#888888] text-[10px]">You send</p>
                        <p className="text-base font-medium mt-1">100,000</p>
                    </div>
                    <div className="text-center">
                        <img src="/asset/img/nigeria.png" alt="Nigeria Flag" className="mx-auto w-6 h-4" />
                        <p className="text-xs font-medium mt-1">NGN</p>
                    </div>
                </div>
                <div className="bg-[#F5F6FA] p-4 rounded-md flex justify-between items-center mt-2.5">
                    <div>
                        <p className="text-[#888888] text-[10px]">Recipient gets</p>
                        <p className="text-base font-medium mt-1">86,912.80</p>
                    </div>
                    <div className="text-center">
                        <img src="/asset/img/senegal.png" alt="Senegal Flag" className="mx-auto w-6 h-4" />
                        <div className="relative mt-1 w-12">
                            <select className="appearance-none w-full bg-transparent border-0 text-gray-700 focus:outline-none focus:bg-transparent text-xs font-medium">
                                <option>XOF</option>
                                <option>GHN</option>
                            </select>
                            <div className="pointer-events-none absolute top-[2px] bottom-0 right-0 flex items-center text-gray-800">
                                <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-full space-x-2.5 mt-2.5">
                    <div className="rounded-md overflow-hidden bg-[#F5F6FA] flex-1 p-4">
                        <p className="text-[#888888] text-[10px]">Rate</p>
                        <p className="text-base font-medium mt-1">NGN = 0.7957 XOF</p>
                    </div>
                    <div className="rounded-md overflow-hidden bg-[#F5F6FA] flex-1 p-4">
                        <p className="text-[#888888] text-[10px]">Transfer fee</p>
                        <p className="text-base font-medium mt-1">NGN 3,000.00</p>
                    </div>
                </div>
                <div className="mt-2.5 w-full rounded-md overflow-hidden bg-[#F5F6FA] p-4">
                    <p className="text-[#888888] text-[10px]">Delivery Method</p>
                    <div className="relative mt-1">
                        <select className="appearance-none w-full bg-transparent text-base font-medium border-0 text-gray-700 pr-8 rounded-md focus:outline-none focus:bg-transparent">
                            <option>Mobile Money</option>
                            <option>Bank Transfer</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-800">
                            <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>
                <div className="mt-2.5 w-full rounded-md overflow-hidden bg-[#F5F6FA] p-4">
                    <p className="text-[#888888] text-[10px]">Payment Method</p>
                    <div className="relative mt-1">
                        <select className="appearance-none w-full bg-transparent text-base font-medium border-0 text-gray-700 pr-8 rounded-md focus:outline-none focus:bg-transparent">
                            <option>Bank Transfer</option>
                            <option>Mobile Money</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-800">
                            <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <div className="cursor-pointer" onClick={() => goTo(1)}>
                        <Button>
                            <div className="bg-green-color py-3 px-4 rounded-md">Select Beneficiary</div>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}