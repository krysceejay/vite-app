import { Fragment, useState } from 'react'
import PageTopOne from '../../../components/shared/PageTopOne'
import Pagination from '../../../components/shared/Pagination'
import {useTransferData} from '../../../hooks/useTransfer'
import { IPageState } from '../../../common-types'
import TransferTable from '../../../components/ui/transfers/TransferTable'

export default function Transfers() {
  const [pageState, setPageState] = useState<IPageState>({
    page: 1,
    limit: 10
  })

  const { page, limit } = pageState

  const changePage = (num: number) => {
    setPageState(prev => ({ ...prev, page: num }))
  }

  const { isLoading, isError, error, data: transferData } = useTransferData(pageState)

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error occurred</p>

  const { pages, total, data } = transferData

  return (
    <section className="flex-grow">
      <PageTopOne title="Transfers" buttonText="New Transfer" link="/transfers/new" hasBtn />
      <section className="mt-11">
        <div className="mt-5 bg-white rounded-md overflow-hidden">
          {total === 0 ? <div className="h-40 flex justify-center items-center">No transfer</div> :
            <Fragment>
              <div className="py-10 border-b border-b-[#F5F6FA] w-full">
                <div className="w-full sm:w-2/3 md:w-1/2 flex items-center px-6 md:px-10">
                  <input
                    className="
                    flex-1 w-full h-9 appearance-none border border-[#D7D7D7] rounded-l rounded-r-none bg-white px-3 text-[#242424] text-sm 
                    leading-tight focus:outline-none focus:shadow-none placeholder:italic"
                    type="text"
                    name="firstname"
                    placeholder="Search Transfers"
                  />
                  <div className="border border-[#D7D7D7] border-l-0 w-20 h-9 rounded-r text-center text-xs flex justify-center items-center px-3 cursor-pointer">Search</div>
                </div>
              </div>
              <div className="py-7 px-6 md:px-10">
                <TransferTable data={data} />
              </div>
              <div className="py-6 px-6 md:px-10 border-t border-t-[#F5F6FA] flex flex-col-reverse md:flex-row justify-between md:items-center">
                <h3 className="text-green-color cursor-pointer text-xs py-2">Download as CSV</h3>
                {/* <Pagination /> */}
                {pages > 1 &&
                  <Pagination page={page} pages={pages} limit={limit} changePage={changePage} totalRecords={total} />
                }
              </div>
            </Fragment>
          }
        </div>
      </section>
    </section>
  )
}
