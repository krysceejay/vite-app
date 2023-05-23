import moment from 'moment'
import { ITransfer } from '../../../api/types/transfer-types'
import { numberFormat } from '../../../utils/helper'
import DetailsLink from '../../shared/DetailsLink'

interface TableProps {
  data?: ITransfer[]
}

export default function TransferTable({ data }: TableProps) {
  return (
    <table className="border-collapse w-full text-xs font-normal table-fixed">
      <thead className="border-y border-y-[#F5F6FA]">
        <tr className="text-left font-semibold [&>*]:p-4">
          <th>
            <span>Transfer ID</span>
          </th>
          <th>
            <span>Beneficiary</span>
          </th>
          <th className="hidden sm:table-cell">
            <span>Payout Method</span>
          </th>
          <th className="hidden sm:table-cell">
            <span>Sent Amount</span>
          </th>
          <th className="hidden sm:table-cell">
            <span>Payout Amount</span>
          </th>
          <th className="hidden md:table-cell">
            <span>Date</span>
          </th>
          <th className="hidden md:table-cell">
            <span>Status</span>
          </th>
          <th>
            <span>View</span>
          </th>
        </tr>
      </thead>
      <tbody className="font-light break-words">
        {data?.map(transfer =>
          <tr className="text-left border-b border-b-[#F5F6FA]" key={transfer.guid}>
            <td className="p-4">{transfer.transfer_id}</td>
            <td className="p-4">{transfer.beneficiary_name}</td>
            <td className="p-4 hidden sm:table-cell">{transfer.payment_method}</td>
            <td className="p-4 hidden sm:table-cell">{transfer.sent_currency} {numberFormat(transfer.sent_amount)}</td>
            <td className="p-4 hidden sm:table-cell">{transfer.payout_currency} {numberFormat(transfer.payout_amount)}</td>
            <td className="p-4 hidden md:table-cell">{moment(transfer.created_at).format('DD MMM, YYYY')}</td>
            <td className="p-4 hidden md:flex flex-wrap items-center space-x-1">
              <div className="bg-[#28A745] w-[6px] h-[6px] rounded-full" />
              <h3>{transfer.status}</h3>
            </td>
            <td className="p-4">
              <DetailsLink link={`/transfers/${transfer.guid}`} text="Details" isTable={true} />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}