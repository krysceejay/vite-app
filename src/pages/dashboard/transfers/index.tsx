import { Fragment, useRef, useState } from 'react'
import { CSVLink } from "react-csv"
import PageTopOne from '../../../components/shared/PageTopOne'
import Pagination from '../../../components/shared/Pagination'
import {useTransferData} from '../../../hooks/useTransfer'
import { IPageState } from '../../../common-types'
import TransferTable from '../../../components/ui/transfers/TransferTable'
import { numberFormat } from '../../../utils/helper'
import moment from 'moment'
import {useSearchParams} from 'react-router-dom'


type CSVData = {
  "Transfer ID": string
  "Beneficiary": string
  "Payout Method": string
  "Sent Amount": string
  "Payout Amount": string
  "Date": string
  "Payment Status": string
}

export default function Transfers() {
  let csvData: CSVData[] = []

  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('query') || ''
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '1'
  
  const ref = useRef<HTMLInputElement>(null)

  const changePage = (num: number) => {
    if(!searchParams.get('query')) {
      setSearchParams({
        page: num.toString() 
      })
    }else {
      setSearchParams({
        query: ref.current?.value || '',
        page: num.toString()
      })
    }
  }

  const handleClick = () => {
    setSearchParams({
      query: ref.current?.value || '',
      page: '1'
    })
  }

  const handleClear = () => {
    if(ref.current){
      ref.current.value = ''
    }
    setSearchParams({})
  }

  const { isLoading, isError, error, data: transferData } = useTransferData({page: +page, limit: +limit, query})

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error occurred</p>

  const { pages, total, data } = transferData

  if (data) {
    csvData = data.map(
      ({
        transfer_id,
        beneficiary_name,
        payment_method,
        sent_amount,
        sent_currency,
        payout_amount,
        payout_currency,
        status,
        created_at
      }) => ({
        "Transfer ID": transfer_id,
        "Beneficiary": beneficiary_name,
        "Payout Method": payment_method,
        "Sent Amount": `${sent_currency} ${numberFormat(sent_amount)}`,
        "Payout Amount": `${payout_currency} ${numberFormat(payout_amount)}`,
        "Date": moment(created_at).format('DD MMM, YYYY'),
        "Payment Status": status
      })
    )
  }

  return (
    <section className="flex-grow">
      <PageTopOne title="Transfers" buttonText="New Transfer" link="/transfers/new" hasBtn />
      <section className="mt-11">
        <div className="mt-5 bg-white rounded-md overflow-hidden">
          <div className="py-10 border-b border-b-[#F5F6FA] w-full">
            <div className="w-full sm:w-2/3 md:w-1/2 flex items-center px-6 md:px-10">
              <div className="relative w-full">
                <input
                  ref={ref}
                  className="
                  flex-1 w-full h-9 appearance-none border border-[#D7D7D7] rounded-l rounded-r-none bg-white px-3 text-[#242424] text-sm 
                  leading-tight focus:outline-none focus:shadow-none placeholder:italic"
                  type="text"
                  name="query"
                  // onChange={handleOnchange}
                  // value={query}
                  placeholder="Search Transfers"
                />
                {query &&
                <div 
                  onClick={() => handleClear()}
                  className="absolute top-1.5 right-3 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#D7D7D7]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                }
              </div>
              <div
              onClick={() => handleClick()}
              className="border border-[#D7D7D7] border-l-0 w-20 h-9 rounded-r text-center text-xs flex justify-center items-center px-3 cursor-pointer">
                Search
              </div>
            </div>
          </div> 
          <div className="min-h-[400px]">
            {data.length === 0 ? <div className="h-52 flex justify-center items-center">No transfer</div> :
            <Fragment>
              <div className="py-7 px-6 md:px-10">
                <TransferTable data={data} />
              </div>
              <div className="py-6 px-6 md:px-10 border-t border-t-[#F5F6FA] flex flex-col-reverse md:flex-row justify-between md:items-center">
                <CSVLink 
                  filename={"transfers.csv"}
                  data={csvData}>
                  <h3 className="text-green-color cursor-pointer text-xs py-2">Download as CSV</h3>
                </CSVLink>
                {/* <Pagination /> */}
                {pages > 1 &&
                  <Pagination page={+page} pages={pages} limit={+limit} changePage={changePage} totalRecords={total} />
                }
              </div>
            </Fragment>
            }
          </div>
        </div>
      </section>
    </section>
  )
}
