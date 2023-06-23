import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'
import { addBeneficiary } from '../../../api/beneficiaries'
import { IPageState, TAddBeneficiaryInput, TCountry, TPaymentMethod } from '../../../common-types'
import Modal from '../../../components/shared/Modal'
import PageTopOne from '../../../components/shared/PageTopOne'
import Pagination from '../../../components/shared/Pagination'
import AddBeneficiary from '../../../components/ui/beneficiaries/AddBeneficiary'
import { useBeneficiaryData } from '../../../hooks/useBeneficiary'
import {useCountryData} from '../../../hooks/useCountryData'
import usePaymentMethodData from '../../../hooks/usePaymentMethodData'
import renderFlag from '../../../utils/flags'
import { stringToHslColor } from '../../../utils/helper'

export default function Beneficiaries() {
  const queryClient = useQueryClient()
  let paymentMethodOptions: TPaymentMethod[] = []
  let countryOptions: TCountry[] = []
  const [pageState, setPageState] = useState<IPageState>({
    page: 1,
    limit: 10,
    query: ''
  })

  const [formData, setFormData] = useState<TAddBeneficiaryInput>({
    bfullName: '',
    bsendNumber: '',
    service: '',
    bdeliveryMethod: '',
    countryName: '',
    countryCurrency: ''
  })

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const { bfullName, bsendNumber, service, bdeliveryMethod, countryName, countryCurrency } = formData
  const { page, limit, query } = pageState


  const changePage = (num: number) => {
    setPageState(prev => ({ ...prev, page: num }))
  }

  const handleOnchangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setPageState(prev => ({
       ...prev, 
       query: value,
       page: 1 
    }))
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      bdeliveryMethod: e.target.value,
    }))
  }

  const handleSelectCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      countryName: e.target.value,
      countryCurrency: e.target.selectedOptions[0].getAttribute('datacurrency') ?? ''
    }))
  }

  const { isLoading: beneficiaryIsLoading, isError: beneficiaryIsError, data: beneficiaryData } = useBeneficiaryData(pageState)
  const { isLoading: paymentMethodIsLoading, data: paymentMethodData } = usePaymentMethodData()
  if (!paymentMethodIsLoading && paymentMethodData) {
    paymentMethodOptions = paymentMethodData.map(
      ({
        guid,
        name
      }) => ({
        key: guid,
        value: name,
        opt: name
      })
    )
  }

  const { isLoading: countryIsLoading, data: countryData } = useCountryData()
  if (!countryIsLoading && countryData) {
    countryOptions = countryData.map(
      ({
        guid,
        country_name,
        currency
      }) => ({
        key: guid,
        value: country_name,
        datacurrency: currency.currency_code,
        opt: country_name
      })
    )
  }

  const { isLoading: addBeneficiaryIsLoading, mutate: addNewBeneficiary } = useMutation({
    mutationFn: addBeneficiary,
    onSuccess: () => {
      toggleModal()
      
      setFormData(prev => ({
        ...prev,
        bfullName: '',
        bsendNumber: '',
        service: '',
        bdeliveryMethod: '',
        countryName: '',
        countryCurrency: ''
      }))

      queryClient.invalidateQueries(['beneficiaries'])
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        const resErrors = err.response?.data.message
        resErrors.forEach((er: { field: string, error: string }) => {
          toast.error(er.error.replace(/_/g, ' '))
        })
      } else {
        console.log('unexpected', err)
      }
    }
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newBeneficiary = {
      full_name: bfullName,
      send_number: bsendNumber,
      service,
      delivery_method: bdeliveryMethod,
      country_name: countryName,
      country_currency: countryCurrency,
    }
    addNewBeneficiary(newBeneficiary)
  }

  if (beneficiaryIsLoading) return <p>Loading...</p>
  if (beneficiaryIsError) return <p>Error occurred</p>

  const { pages, total, data } = beneficiaryData

  return (
    <main className="flex-grow">
      <PageTopOne
        title="Beneficiaries"
        hasBtn
        buttonText="New Beneficiary"
        isLink={false}
        onClick={() => toggleModal()}
      />
      {isModalOpen &&
        <Modal hide={() => toggleModal()}>
          <AddBeneficiary
            formData={formData}
            handleSubmit={handleSubmit}
            handleOnchange={handleOnchange}
            handleSelect={handleSelect}
            handleSelectCountry={handleSelectCountry}
            paymentMethodOptions={paymentMethodOptions}
            countryOptions={countryOptions}
            addBeneficiaryIsLoading={addBeneficiaryIsLoading}
          />
        </Modal>
      }
      <section className="mt-9">
        <div className="bg-white rounded-md overflow-hidden">
          <div className="py-10 border-b border-b-[#F5F6FA] w-full">
            <div className="w-full sm:w-2/3 md:w-1/2 flex items-center px-6 md:px-10">
              <input
                className="
                    flex-1 w-full h-9 appearance-none border border-[#D7D7D7] rounded bg-white px-3 text-[#242424] text-sm 
                    leading-tight focus:outline-none focus:shadow-none placeholder:italic"
                type="text"
                name="query"
                onChange={handleOnchangeQuery}
                value={query}
                placeholder="Search Beneficiaries"
              />
              {/* <div className="border border-[#D7D7D7] border-l-0 w-20 h-9 rounded-r text-center text-xs flex justify-center items-center px-3 cursor-pointer">Search</div> */}
            </div>
          </div>
          <div className="min-h-[400px]">
            <div className="p-6 sm:px-10 auto-grid">
              {data.map(beneficiary =>
                <div key={beneficiary.guid} className="border border-[#D7D7D7] rounded flex flex-col justify-center items-center px-4 py-5 bg-white">
                  <div
                    className="w-16 h-16 rounded-full flex justify-center items-center"
                    style={{ backgroundColor: stringToHslColor(`${beneficiary.guid}`) }}>
                    <h3 className="text-lg font-bold uppercase">{beneficiary.full_name.charAt(0)}</h3>
                  </div>
                  <div className="mt-2.5 text-center">
                    <p className="text-xs font-semibold">{beneficiary.full_name}</p>
                    <p className="text-xs mt-2">{beneficiary.delivery_method}</p>
                    <div className="flex justify-center items-center mt-2.5 space-x-1">
                      <img src={renderFlag(beneficiary.country_currency)} alt="Nigeria Flag" className="w-[18px] h-3" />
                      <p className="text-[10px]">{beneficiary.country_name}</p>
                    </div>
                    <p className="text-xs font-medium mt-5 text-green-color cursor-pointer">Send Money</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="py-6 px-6 md:px-10 border-t border-t-[#F5F6FA] flex justify-end items-center">
            {pages > 1 &&
              <Pagination
                page={page}
                pages={pages}
                limit={limit}
                changePage={changePage}
                totalRecords={total}
                showDetails={false}
              />
            }
          </div>
        </div>
      </section>
    </main>
  )
}
