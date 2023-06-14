import { useQuery } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { getUserTransfersSumSent } from '../../api/transfers'
import DetailsLink from '../../components/shared/DetailsLink'
import AuthContext, { IAuthContext } from '../../context/authContext'
import { useTransferData } from '../../hooks/useTransfer'
import { numberFormat, stringToHslColor } from '../../utils/helper'
import renderFlag from '../../utils/flags'
import NewTransferSend from '../../components/ui/transfers/NewTransferSend'
import { useBeneficiaryData } from '../../hooks/useBeneficiary'
import TransferTable from '../../components/ui/transfers/TransferTable'
import Skeleton from '../../components/shared/Skeleton'

type TNewTransfer = {
  sentAmount: string
  currency: string
  rate: string
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { authUser } = useContext(AuthContext) as IAuthContext

  const [newTransfer, setNewTransfer] = useState<TNewTransfer>({
    sentAmount: '',
    currency: authUser?.country.currency || '',
    rate: '1'
  })
  const { sentAmount, currency, rate } = newTransfer

  const { isLoading: transferIsLoading, isError: transferIsError, data: transferData } = useTransferData({})

  const { isLoading: sumSentIsLoading, isError: sumSentIsError, data: sumSent } = useQuery({
    queryKey: ['transfers-sent'],
    queryFn: getUserTransfersSumSent
  })

  const { isLoading: beneficiaryIsLoading, isError: beneficiaryIsError, data: beneficiaryData } = useBeneficiaryData({})

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewTransfer(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewTransfer(prev => ({
      ...prev,
      currency: e.target.value,
      rate: e.target.selectedOptions[0].getAttribute('data-rate') ?? prev.rate
    }))
  }

  const handleOnclick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    //  const newAmount = removeCommaFromNumber(sentAmount)
    navigate('/transfers/new', {
      state: {
        sentAmount: sentAmount,
        payoutCurrency: currency,
        rate
      }
    })
  }

  // if (transferIsLoading || sumSentIsLoading || beneficiaryIsLoading) return <p>Loading...</p>
  // if (getTransfers.isError) return <p>Error occurred</p>
  return (
    <section className="flex-grow overflow-hidden">
      <h1 className="text-xl sm:text-2xl font-semibold">Dashboard</h1>
      <section className="overflow-hidden">
        <div className="flex flex-col md:flex-row mt-9 space-y-4 md:space-x-4 md:space-y-0 lg:space-x-5">
          <div className="bg-white rounded-md p-5 lg:p-6 shadow-lg w-full md:w-1/3">
            <h3 className="text-xs font-semibold">New Transfer</h3>
            <NewTransferSend
              sentAmount={sentAmount}
              currency={currency}
              rate={rate}
              handleOnchange={handleOnchange}
              handleSelectChange={handleSelectChange}
              handleOnclick={handleOnclick}
              authUser={authUser}
              hasBtnSend={true}
            />
          </div>
          <div className="flex-1 bg-white rounded-md shadow-lg flex flex-col sm:flex-row overflow-hidden">
            <div className="w-full sm:w-[45%] h-full p-6 lg:p-10">
              <div className="mt-5 w-[60px] h-[60px] relative">
                {authUser?.profile_image ?
                  <img src={`${import.meta.env.VITE_PROFILE_URL}/${authUser.profile_image}`} alt="Profile Picture" className="h-full w-full object-cover rounded-full" /> :
                  <div
                    className="w-full h-full rounded-full flex justify-center items-center font-medium uppercase"
                    style={{ backgroundColor: stringToHslColor(authUser?.email) }}
                  >
                    {authUser ? `${authUser.first_name.charAt(0)}${authUser.last_name.charAt(0)}` : ''}
                  </div>
                }
                <img src={renderFlag(authUser?.country.currency)} alt="Nigeria Flag" className="rounded-full h-6 w-6 absolute bottom-0 -right-2" />
              </div>
              <div className="mt-3 flex items-center space-x-1">
                <h3 className="text-xl font-semibold capitalize">{`${authUser?.first_name} ${authUser?.last_name}`}</h3>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#28A745]">
                  <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
              </div>
              {/* <p className="text-xs mt-2 font-light">@topazdecimal   |    #29201923</p> */}
              <p className="text-[10px] mt-2 font-light max-w-[192px] break-words">Last login was {moment(authUser?.last_login).calendar()}
              </p>
            </div>
            <div className="w-full sm:w-[55%] h-full overflow-hidden">
              <div className="h-1/2 border-t sm:border-t-0 sm:border-l border-b border-[#F5F6FA] px-7 py-6">
                <div className="flex items-center space-x-1 mt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  <h3 className="text-sm">Total Sent</h3>
                </div>
                {sumSentIsLoading ? <div className="h-6 w-3/5 mt-2">
                  <Skeleton />
                </div> :
                  <p className="text-2xl mt-1 font-bold max-w-xs break-words">
                    {sumSent !== undefined ?
                      `${authUser?.country.currency} ${numberFormat(sumSent)}`
                      : null}
                  </p>
                }
                <div className="mt-3">
                  <DetailsLink link="/transfer" text="See Details" isTable={false} />
                </div>
              </div>
              <div className="h-1/2 border-l border-[#F5F6FA] px-7 py-6">
                <div className="flex items-center space-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  <h3 className="text-sm">Beneficiaries</h3>
                </div>
                {beneficiaryIsLoading ? <div className="h-6 w-3/5 mt-2">
                  <Skeleton />
                </div> :
                <p className="text-2xl mt-1 font-bold">
                  {beneficiaryData?.total !== undefined ? numberFormat(beneficiaryData.total) : 0}
                </p>
                }
                <div className="mt-3">
                  <DetailsLink link="/beneficiaries" text="See Details" isTable={false} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-11">
        <div className="flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-semibold">Recent Transfers</h1>
          {transferData?.total !== 0 &&
            <Link to="/transfers" className="text-sm font-semibold text-green-color">See all</Link>
          }
        </div>
        {transferData?.total === 0 ? <div className="h-40 flex justify-center items-center">No transfer</div> :
          <div className="mt-5 bg-white rounded-md overflow-hidden">
            <div className="px-6 md:px-10">
              <TransferTable data={transferData?.data} />
            </div>
          </div>
        }
      </section>
    </section>
  )
}
