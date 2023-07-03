import moment from 'moment'
import { ITransfer } from '../../../api/types/transfer-types'
import { numberFormat } from '../../../utils/helper'
import DetailsLink from '../../shared/DetailsLink'
import useTranslate from '../../../hooks/useTranslate'

interface TableProps {
  data?: ITransfer[]
}

export default function TransferTable({ data }: TableProps) {
  const {t} = useTranslate()
  return (
    <table className="border-collapse w-full text-xs font-normal table-fixed">
      <thead className="border-y border-y-[#F5F6FA]">
        <tr className="text-left font-semibold [&>*]:p-4">
          <th>
            <span>{t('transferPage.table.head.transferId')}</span>
          </th>
          <th>
            <span>{t('transferPage.table.head.beneficiary')}</span>
          </th>
          <th className="hidden sm:table-cell">
            <span>{t('transferPage.table.head.payoutMethod')}</span>
          </th>
          <th className="hidden sm:table-cell">
            <span>{t('transferPage.table.head.sentAmount')}</span>
          </th>
          <th className="hidden sm:table-cell">
            <span>{t('transferPage.table.head.payoutAmount')}</span>
          </th>
          <th className="hidden md:table-cell">
            <span>{t('transferPage.table.head.date')}</span>
          </th>
          <th className="hidden md:table-cell">
            <span>{t('transferPage.table.head.status')}</span>
          </th>
          <th>
            <span>{t('transferPage.table.head.view')}</span>
          </th>
        </tr>
      </thead>
      <tbody className="font-light break-words">
        {data?.map(transfer =>
          <tr className="text-left border-b border-b-[#F5F6FA]" key={transfer.guid}>
            <td className="p-4">#{transfer.transfer_id}</td>
            <td className="p-4">{transfer.beneficiary_name}</td>
            <td className="p-4 hidden sm:table-cell">{transfer.payment_method}</td>
            <td className="p-4 hidden sm:table-cell">{transfer.sent_currency} {numberFormat(transfer.sent_amount)}</td>
            <td className="p-4 hidden sm:table-cell">{transfer.payout_currency} {numberFormat(transfer.payout_amount)}</td>
            <td className="p-4 hidden md:table-cell">{moment(transfer.created_at).format('DD MMM, YYYY')}</td>
            <td className="p-4 hidden md:flex flex-wrap items-center space-x-1">
              {transfer.status.toLowerCase() === 'paid out' ?
              <div className="bg-[#28A745] w-[6px] h-[6px] rounded-full" /> : 
              <div className="bg-[#EEB012] w-[6px] h-[6px] rounded-full" /> 
              }
              <h3>{t(`transferPage.status.${transfer.status}`)}</h3>
            </td>
            <td className="p-4">
              <DetailsLink link={`/transfers/${transfer.guid}`} text={t('transferPage.table.details')} isTable={true} />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}