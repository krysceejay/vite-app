import React, { useState } from 'react'
import { FormInput, FormSelect } from '../../shared/Form'
import Button from '../../shared/Button'
import { useKycSmileService } from '../../../hooks/useKycData'

interface SmileServiceProps {
  title: string
  country: string
  handleContinue: (e: React.MouseEvent<HTMLButtonElement>) => void
	handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>, n: string) => void
}

// interface CountryDoc {
//   [key: string]: any
// }

const SmileService = ({title, country, handleContinue, handleSelectChange}: SmileServiceProps) => {
	// console.log('smileData', smileData.hosted_web.doc_verification)
	const [IdOptions, setIdOptions] = useState<any[]>([])
	let countryOptions: any[] = []
	
	const { isLoading: smileIsLoading, isError: smileIsError, data: smileData } = useKycSmileService()

	if (smileData) {
		// const co: CountryDoc[][] = Object.entries(smileData.hosted_web.doc_verification)
    countryOptions = Object.entries(smileData.hosted_web.doc_verification).map(
      (name: any, i) => ({
        key: i.toString(),
        value: name[0],
        opt: name[1].name,
				datadoc: JSON.stringify(name[1].id_types)
      })
    )
  }

	if (smileIsLoading) return <p>Loading...</p>
  if (smileIsError) return <p>Error occurred</p>

	const userSelectCountry = (e: React.ChangeEvent<HTMLSelectElement> ) => { 
    handleSelectChange(e, 'country')
		let idOpt = Object.entries(JSON.parse(e.target.selectedOptions[0].getAttribute('datadoc') || 'null') || {}).map(
			(name: any, i) => ({
				key: i.toString(),
				value: name[0],
				opt: name[1].label
			})
		)
		setIdOptions(prev => idOpt)
  }
	
  return (
    <div>
			<div className="mt-2 pb-3 w-full rounded-md overflow-hidden bg-[#F5F6FA]">
				<FormSelect
					label="Country"
					value={country}
					onChange={userSelectCountry}
					required
					options={countryOptions}
					emptyOption="Select country where ID was issued"
					errorMessage="Country is required"
				/>
			</div>
			<div className="mt-2 pb-3 w-full rounded-md overflow-hidden bg-[#F5F6FA]">
				<FormSelect
					label="Document Type"
					value={title}
					onChange={(e) => handleSelectChange(e, 'title')}
					required
					options={IdOptions}
					emptyOption="Select Document type"
					errorMessage="Document type is required"
				/>
			</div>
			<div className="mt-3">
				<Button
				onClick={handleContinue}
				>
					<div className="bg-green-color py-3 px-4 rounded-md flex items-center justify-center">
						<span className="font-medium">Next</span>
					</div>
				</Button>
			</div>
		</div>
  )
}

export default SmileService