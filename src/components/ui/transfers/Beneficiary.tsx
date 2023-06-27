import { IPageState, TAddBeneficiaryInput, TNewTransfer, TPaymentMethod, TSelectBeneficiary } from "../../../common-types"
import { useCountryBeneficiaryData } from "../../../hooks/useBeneficiary"
import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'
import Pagination from "../../shared/Pagination"
import { useState } from "react"
import { stringToHslColor } from "../../../utils/helper"
import Modal from "../../shared/Modal"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addBeneficiary } from "../../../api/beneficiaries"
import AddBeneficiary from "../beneficiaries/AddBeneficiary"
import { usePayoutCountryData } from "../../../hooks/useCountryData"

interface BeneficiaryProps {
  goTo: (int: number) => void
  newTransfer: TNewTransfer
  handleSelectBeneficiary: (b: TSelectBeneficiary) => void
  handleOnclick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Beneficiary({ goTo, newTransfer, handleSelectBeneficiary, handleOnclick }: BeneficiaryProps) {
  let paymentMethodOptions: TPaymentMethod[] = []
  const queryClient = useQueryClient()
  const { payoutCurrency, beneficiaryName, beneficiarySendNumber, deliveryMethod, beneficiaryCountry, country } = newTransfer
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

  const [modal, setModal] = useState({
    addOpen: false,
    confirmOpen: false
  })

  const { bfullName, bsendNumber, service, bdeliveryMethod } = formData

  const { page, limit, query } = pageState

  const changePage = (num: number) => {
    setPageState(prev => ({ ...prev, page: num }))
  }

  const handleOnchangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    setPageState(prev => ({
      ...prev, 
      query: value,
      page: 1 
    }))
  }

  const toggleAddModal = () => {
    setModal(prev => ({
     ...prev,
     addOpen: !prev.addOpen
    }))
  }

  const toggleConfirmModal = () => {
    setModal(prev => ({
     ...prev,
     confirmOpen: !prev.confirmOpen
    }))
  }

  const { isLoading: countryIsLoading, isError: countryIsError, data: countryData } = usePayoutCountryData(country)

  if (countryData) {
    paymentMethodOptions = countryData.receive_payment_method.map(
      (name, i) => ({
        key: i.toString(),
        value: name,
        opt: name
      })
    )
  }
  
  const { isLoading: beneficiaryIsLoading, isError: beneficiaryIsError, data: beneficiaryData } = useCountryBeneficiaryData(country, pageState)
  const { isLoading: addBeneficiaryIsLoading, mutate: addNewBeneficiary } = useMutation({
    mutationFn: addBeneficiary,
    onSuccess: () => {
      toggleAddModal()
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

  const userSelectBeneficiary = (ben: TSelectBeneficiary) => {
    toggleConfirmModal()
    handleSelectBeneficiary(ben)
  }

  const confirmBeneficiary = (e: React.MouseEvent<HTMLButtonElement>) => {
    toggleConfirmModal()
    handleOnclick(e)
  }

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelect =  (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      bdeliveryMethod: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newBeneficiary = {
      full_name: bfullName,
      send_number: bsendNumber,
      service,
      delivery_method: bdeliveryMethod,
      country_name: countryData ? countryData.country_name : '',
      country_currency: payoutCurrency,
    }
    addNewBeneficiary(newBeneficiary)
  }

  if (beneficiaryIsLoading || countryIsLoading) return <p>Loading...</p>
  if (beneficiaryIsError || countryIsError) return <p>Error occurred</p>

  const { pages, total, data } = beneficiaryData

  return (
    <div className="w-full sm:w-[420px] mx-auto">
      {modal.addOpen &&
        <Modal hide={() => toggleAddModal()}>
          <AddBeneficiary
            formData={formData}
            handleSubmit={handleSubmit}
            handleOnchange={handleOnchange}
            handleSelect={handleSelect}
            paymentMethodOptions={paymentMethodOptions}
            addBeneficiaryIsLoading={addBeneficiaryIsLoading}
          />
        </Modal>
      }
      {modal.confirmOpen && 
        <Modal hide={() => toggleConfirmModal()}>
          <section>
            <h3 className="text-xl font-medium">Confirm Beneficiary</h3>
            <aside className="text-xs my-2 py-2 space-y-2 border-y border-y-slate-200">
              <h3><b>Name:</b> {beneficiaryName}</h3>
              <p><b>Delivery method:</b> {deliveryMethod}</p>
              <p><b>Mobile:</b> {beneficiarySendNumber}</p>
              <p><b>Country:</b> {beneficiaryCountry}</p>
            </aside>
            <aside className="flex justify-end items-center space-x-2 mt-3">
              <button 
              onClick={() => toggleConfirmModal()}
              className="block text-xs font-medium focus:outline-none focus:shadow-outline">
                <div className="bg-transparent py-2 px-4 rounded-md">Cancel</div>
              </button>
              <button 
              onClick={(e) => confirmBeneficiary(e)}
              className="block text-white text-xs font-medium focus:outline-none focus:shadow-outline">
                <div className="bg-green-color py-2 px-4 rounded-md">Ok</div>
              </button>
            </aside>
          </section>
        </Modal>
      }
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
                before:content-[''] before:bg-green-color before:absolute before:w-full before:h-[2px] 
                before:right-1/2 before:top-[36%] before:-translate-y-2">
          <div className="w-4 h-4 bg-green-color rounded-full z-10 cursor-pointer" onClick={() => goTo(1)} />
          <p className="text-green-color text-[10px] min-[420px]:text-xs font-semibold mt-2.5">Select Beneficiary</p>
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
      <div className="mt-8 px-2">
        <div className="w-full p-4 rounded-md flex items-center">
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
        <div className="mt-5 auto-grid2">
          <div
            onClick={() => toggleAddModal()}
            className="border border-dashed border-[#D7D7D7] rounded flex flex-col justify-center items-center p-4 cursor-pointer">
            <div className="w-[38px] h-[38px] rounded-full border border-green-color flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-color">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <div className="mt-1.5 text-center">
              <p className="text-[10px]">New Recipient</p>
              <p className="text-[8px] mt-1">Create New Recipient</p>
            </div>
          </div>
          {data.map(beneficiary =>
            <div
              key={beneficiary.guid}
              className="border border-[#D7D7D7] rounded flex flex-col justify-center items-center p-4 cursor-pointer"
              onClick={() => userSelectBeneficiary({
                name: beneficiary.full_name,
                sendNumber: beneficiary.send_number,
                service: beneficiary.service,
                deliveryMethod: beneficiary.delivery_method,
                countryName: beneficiary.country_name
              })}>
              <div
                className="w-[38px] h-[38px] rounded-full flex justify-center items-center"
                style={{ backgroundColor: stringToHslColor(`${beneficiary.guid}`) }}>
                <h3 className="text-[10px] font-bold">{beneficiary.full_name.charAt(0)}</h3>
              </div>
              <div className="mt-1.5 text-center">
                <p className="text-[10px]">{beneficiary.full_name}</p>
                <p className="text-[10px] mt-1">{beneficiary.delivery_method}</p>
                <p className="text-[8px] mt-1">{beneficiary.send_number}</p>
                <p className="text-[8px] mt-1">{beneficiary.country_name}</p>
              </div>
            </div>
          )}
        </div>
        <div className="py-6 px-6 md:px-10 border-t border-t-[#F5F6FA] flex justify-end mt-4">
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
    </div>
  )
}