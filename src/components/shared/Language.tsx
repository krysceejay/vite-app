import React from 'react'

type LanguageProp = {
	lang?: string
	handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const languages = [
	{name: 'English', value: 'en'},
	{name: 'French', value: 'fr'},
]

const Language = ({lang, handleSelectChange}: LanguageProp) => {
  return (
    <div className="relative">
			<select 
				value={lang}
				onChange={handleSelectChange}
				className="appearance-none w-full bg-transparent border-0 text-gray-700 py-3 px-4 pr-8 rounded focus:outline-none focus:bg-transparent text-sm">
				{languages.map(l => (
						<option key={l.value} value={l.value}>{l.name}</option>
					))
				}
			</select>
			<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-800">
				<svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
			</div>
		</div>
  )
}

export default Language