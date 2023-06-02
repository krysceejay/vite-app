import React from 'react'
import { TAddBeneficiaryInput, TCountry, TPaymentMethod } from '../../../common-types'
import Button from '../../shared/Button'
import { FormInput, FormSelect } from '../../shared/Form'

type AddBeneficiaryProp = {
  formData: TAddBeneficiaryInput
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleOnchange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void
  handleSelectCountry: (e: React.ChangeEvent<HTMLSelectElement>) => void
  paymentMethodOptions: TPaymentMethod[]
  countryOptions: TCountry[]
  addBeneficiaryIsLoading: boolean
}

const AddBeneficiary = ({formData, handleSubmit, handleOnchange, handleSelect, 
  handleSelectCountry, paymentMethodOptions, countryOptions, addBeneficiaryIsLoading}: AddBeneficiaryProp) => {
  const { bfullName, bsendNumber, service, bdeliveryMethod, countryName, countryCurrency } = formData

  return (
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
  )
}

export default AddBeneficiary