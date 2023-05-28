import { IPageState, TAddBeneficiaryInput, TCountry, TNewTransfer, TPaymentMethod, TSelectBeneficiary } from "../../../common-types"
import { useCountryBeneficiaryData } from "../../../hooks/useBeneficiary"
import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'
import Pagination from "../../shared/Pagination"
import { useState } from "react"
import { stringToHslColor } from "../../../utils/helper"
import Modal from "../../shared/Modal"
import { FormInput, FormSelect } from "../../shared/Form"
import Button from "../../shared/Button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addBeneficiary } from "../../../api/beneficiaries"
import useCountryData from "../../../hooks/useCountryData"

interface BeneficiaryProps {
  goTo: (int: number) => void
  newTransfer: TNewTransfer
  handleSelectBeneficiary: (b: TSelectBeneficiary) => void
  toggleModal: () => void
  paymentMethodOptions: TPaymentMethod[]
}

export default function Beneficiary({ goTo, newTransfer, handleSelectBeneficiary, 
  toggleModal, paymentMethodOptions }: BeneficiaryProps) {
  const queryClient = useQueryClient()
  let countryOptions: TCountry[] = []
  const { payoutCurrency, isModalOpen } = newTransfer
  const [pageState, setPageState] = useState<IPageState>({
    page: 1,
    limit: 10
  })

  const [formData, setFormData] = useState<TAddBeneficiaryInput>({
    bfullName: '',
    bsendNumber: '',
    service: '',
    bdeliveryMethod: '',
    countryName: '',
    countryCurrency: ''
  })

  const { bfullName, bsendNumber, service, bdeliveryMethod, countryName, countryCurrency } = formData

  const { page, limit } = pageState

  const changePage = (num: number) => {
    setPageState(prev => ({ ...prev, page: num }))
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
        datacurrency: currency,
        opt: country_name
      })
    )
  }
  
  const { isLoading: beneficiaryIsLoading, isError: beneficiaryIsError, data: beneficiaryData } = useCountryBeneficiaryData(payoutCurrency, pageState)
  const { isLoading: addBeneficiaryIsLoading, mutate: addNewBeneficiary } = useMutation({
    mutationFn: addBeneficiary,
    onSuccess: () => {
      toggleModal()
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

  // const handleClick = () => {
  //   if (!beneficiaryName || !beneficiarySendNumber || !deliveryMethod || !beneficiaryService) {
  //     toast.error('Kindly add a beneficiary.')
  //     return
  //   }
  //   goTo(2)
  // }

  const userSelectBeneficiary = (ben: TSelectBeneficiary) => {
    handleSelectBeneficiary(ben)
    goTo(2)
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

  const handleSelectCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      countryName: e.target.value,
      countryCurrency: e.target.selectedOptions[0].getAttribute('datacurrency') ?? ''
    }))
  }

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
    <div className="w-full sm:w-[420px] mx-auto">
      {isModalOpen &&
        <Modal hide={() => toggleModal()}>
          <form className="w-full my-8" onSubmit={handleSubmit}>
            <h3 className="text-xl font-medium">Add new beneficiary</h3>
            <div className="mt-2 pb-3 w-full rounded-md overflow-hidden bg-[#F5F6FA]">
              <FormInput
                label="Full Name"
                type="text"
                name="bfullName"
                value={bfullName}
                onChange={handleOnchange}
                placeholder=""
                required
                errorMessage="Beneficiary full name is required"
              />
            </div>
            <div className="mt-2 pb-3 w-full rounded-md overflow-hidden bg-[#F5F6FA]">
              <FormInput
                label="Send Number"
                type="text"
                name="bsendNumber"
                value={bsendNumber}
                onChange={handleOnchange}
                placeholder=""
                required
                errorMessage="Beneficiary account number is required"
              />
            </div>
            <div className="mt-2 pb-3 w-full rounded-md overflow-hidden bg-[#F5F6FA]">
              <FormInput
                label="Service"
                type="text"
                name="service"
                value={service}
                onChange={handleOnchange}
                placeholder=""
                required
                errorMessage="Service is required"
              />
            </div>
            <div className="mt-2 w-full rounded-md overflow-hidden bg-[#F5F6FA] pb-3 p-1 pr-2">
              <FormSelect
                label="Delivery Method"
                value={bdeliveryMethod}
                onChange={handleSelect}
                required
                options={paymentMethodOptions}
                emptyOption="Select delivery method"
                errorMessage="Delivery Method is required"
              />
            </div>
            <div className="mt-2 w-full rounded-md overflow-hidden bg-[#F5F6FA] pb-3 p-1 pr-2">
              <FormSelect
                label="Country"
                value={countryName}
                onChange={handleSelectCountry}
                required
                options={countryOptions}
                emptyOption="Select country"
                errorMessage="Country is required"
              />
            </div>
            <div className="mt-3">
              <Button type="submit" disabled={addBeneficiaryIsLoading}>
                <div className="bg-green-color py-3 px-4 rounded-md flex items-center justify-center">
                  {addBeneficiaryIsLoading &&
                    <svg className="mr-4 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  }
                  <span className="font-medium"> Add Beneficiary </span>
                </div>
              </Button>
            </div>
          </form>
        </Modal>}
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
                    flex-1 w-full h-9 appearance-none border border-[#D7D7D7] rounded-l rounded-r-none bg-white px-3 text-[#242424] text-sm 
                    leading-tight focus:outline-none focus:shadow-none placeholder:italic"
            type="text"
            name="firstname"
            placeholder="Search Beneficiaries"
          />
          <div className="border border-[#D7D7D7] border-l-0 w-20 h-9 rounded-r text-center text-xs flex justify-center items-center px-3 cursor-pointer">Search</div>
        </div>
        <div className="mt-5 auto-grid2">
          <div
            onClick={() => toggleModal()}
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