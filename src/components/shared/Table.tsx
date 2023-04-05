import DetailsLink from './DetailsLink'
import Pagination from './Pagination'

interface TableProps {
  showSearch: boolean,
  pageName: string
}

export default function Table({ showSearch, pageName }: TableProps){
  return (
    <div className="mt-5 bg-white rounded-md overflow-hidden">
        {showSearch &&
        <div className="py-10 border-b border-b-[#F5F6FA] w-full">
            <div className="w-full sm:w-2/3 md:w-1/2 flex items-center px-6 md:px-10">
                <input 
                    className="
                    flex-1 w-full h-9 appearance-none border border-[#D7D7D7] rounded-l rounded-r-none bg-white px-3 text-[#242424] text-sm 
                    leading-tight focus:outline-none focus:shadow-none placeholder:italic" 
                    type="text" 
                    name="firstname"
                    placeholder={`Search ${pageName}`} 
                />
                <div className="border border-[#D7D7D7] border-l-0 w-20 h-9 rounded-r text-center text-xs flex justify-center items-center px-3 cursor-pointer">Search</div>
            </div>
        </div>
        }
        <div className={`${!showSearch && 'py-7'} px-6 md:px-10`}>
            <table className="border-collapse w-full text-xs font-normal table-fixed">
                <thead className="border-y border-y-[#F5F6FA]">
                    <tr className="text-left font-semibold">
                    <th className="p-4">
                        <span>Transfer ID</span>
                    </th>
                    <th className="p-4">
                        <span>Beneficiary</span>
                    </th>
                    <th className="p-4 hidden sm:table-cell">
                        <span>Payout Method</span>
                    </th>
                    <th className="p-4 hidden sm:table-cell">
                        <span>Sent Amount</span>
                    </th>
                    <th className="p-4 hidden sm:table-cell">
                        <span>Payout Amount</span>
                    </th>
                    <th className="p-4 hidden md:table-cell">
                        <span>Date</span>
                    </th>
                    <th className="p-4 hidden md:table-cell">
                        <span>Status</span>
                    </th>
                    <th className="p-4">
                        <span>View</span>
                    </th>
                    </tr>
                </thead>
                <tbody className="font-light break-words">
                    <tr className="text-left border-b border-b-[#F5F6FA]">
                    <td className="p-4">11223465351</td>
                    <td className="p-4">Aminata Dieng</td>
                    <td className="p-4 hidden sm:table-cell">Mobile Money</td>
                    <td className="p-4 hidden sm:table-cell">NGN 500,000.00</td>
                    <td className="p-4 hidden sm:table-cell">XOF 500,000.02</td>
                    <td className="p-4 hidden md:table-cell">22 Oct, 2020</td>
                    <td className="p-4 hidden md:flex flex-wrap items-center space-x-1">
                        <div className="bg-[#28A745] w-[6px] h-[6px] rounded-full" />
                        <h3>Paid out</h3>
                    </td>
                    <td className="p-4">
                        <DetailsLink link="/transfers/1" text="Details" isTable={true} />
                    </td>
                    </tr>
                    <tr className="text-left border-b border-b-[#F5F6FA]">
                    <td className="p-4">11223465351</td>
                    <td className="p-4">Aminata Dieng</td>
                    <td className="p-4 hidden sm:table-cell">Mobile Money</td>
                    <td className="p-4 hidden sm:table-cell">NGN 500,000.00</td>
                    <td className="p-4 hidden sm:table-cell">XOF 500,000.02</td>
                    <td className="p-4 hidden md:table-cell">22 Oct, 2020</td>
                    <td className="p-4 hidden md:flex flex-wrap items-center space-x-1">
                        <div className="bg-[#EEB012] w-[6px] h-[6px] rounded-full" />
                        <h3>Payment pending</h3>
                    </td>
                    <td className="p-4">
                        <DetailsLink link="/transfers/2" text="Details" isTable={true} />
                    </td>
                    </tr>
                    <tr className="text-left border-b border-b-[#F5F6FA]">
                    <td className="p-4">11223465351</td>
                    <td className="p-4">Aminata Dieng</td>
                    <td className="p-4 hidden sm:table-cell">Mobile Money</td>
                    <td className="p-4 hidden sm:table-cell">NGN 500,000.00</td>
                    <td className="p-4 hidden sm:table-cell">XOF 500,000.02</td>
                    <td className="p-4 hidden md:table-cell">22 Oct, 2020</td>
                    <td className="p-4 hidden md:flex flex-wrap items-center space-x-1">
                        <div className="bg-[#EEB012] w-[6px] h-[6px] rounded-full" />
                        <h3>KYC uploaded</h3>
                    </td>
                    <td className="p-4">
                        <DetailsLink link="/transfers/3" text="Details" isTable={true} />
                    </td>
                    </tr>
                    <tr className="text-left border-b border-b-[#F5F6FA]">
                    <td className="p-4">11223465351</td>
                    <td className="p-4">Aminata Dieng</td>
                    <td className="p-4 hidden sm:table-cell">Mobile Money</td>
                    <td className="p-4 hidden sm:table-cell">NGN 500,000.00</td>
                    <td className="p-4 hidden sm:table-cell">XOF 500,000.02</td>
                    <td className="p-4 hidden md:table-cell">22 Oct, 2020</td>
                    <td className="p-4 hidden md:flex flex-wrap items-center space-x-1">
                        <div className="bg-[#EEB012] w-[6px] h-[6px] rounded-full" />
                        <h3>KYC verified</h3>
                    </td>
                    <td className="p-4">
                        <DetailsLink link="/transfers/4" text="Details" isTable={true} />
                    </td>
                    </tr>
                    <tr className="text-left border-b border-b-[#F5F6FA]">
                    <td className="p-4">11223465351</td>
                    <td className="p-4">Aminata Dieng</td>
                    <td className="p-4 hidden sm:table-cell">Mobile Money</td>
                    <td className="p-4 hidden sm:table-cell">NGN 500,000.00</td>
                    <td className="p-4 hidden sm:table-cell">XOF 500,000.02</td>
                    <td className="p-4 hidden md:table-cell">22 Oct, 2020</td>
                    <td className="p-4 hidden md:flex flex-wrap items-center space-x-1">
                        <div className="bg-[#EEB012] w-[6px] h-[6px] rounded-full" />
                        <span>Payout in progress</span>
                    </td>
                    <td className="p-4">
                        <DetailsLink link="/transfers/5" text="Details" isTable={true} />
                    </td>
                    </tr>
                    <tr className="text-left border-b border-b-[#F5F6FA]">
                    <td className="p-4">11223465351</td>
                    <td className="p-4">Aminata Dieng</td>
                    <td className="p-4 hidden sm:table-cell">Mobile Money</td>
                    <td className="p-4 hidden sm:table-cell">NGN 500,000.00</td>
                    <td className="p-4 hidden sm:table-cell">XOF 500,000.02</td>
                    <td className="p-4 hidden md:table-cell">22 Oct, 2020</td>
                    <td className="p-4 hidden md:flex flex-wrap items-center space-x-1">
                        <div className="bg-[#28A745] w-[6px] h-[6px] rounded-full" />
                        <h3>Paid out</h3>
                    </td>
                    <td className="p-4">
                        <DetailsLink link="/transfers/6" text="Details" isTable={true} />
                    </td>
                    </tr>
                </tbody>
            </table>
        </div>
        {showSearch &&
        <div className="py-6 px-6 md:px-10 border-t border-t-[#F5F6FA] flex flex-wrap-reverse justify-between items-center">
            <h3 className="text-green-color cursor-pointer text-xs py-2">Download as CSV</h3>
            <Pagination />
        </div>
        }
    </div>
  )
}