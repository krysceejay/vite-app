import React, { useState } from 'react'

interface FormInputProps {
  label?: string
  type: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  required: boolean
  errorMessage: string
  pattern?: string
  showLabel?: boolean
  hasError?: boolean
}

type Option = {
  value: string
  key: string
  dataCode?: string
}

interface FormSelectProps {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  required: boolean
  errorMessage: string
  hasError?: boolean
  options: Array<Option>
}

interface FormDoubleInputProps extends FormInputProps {
  type2: string
  value2: string
  placeholder2: string
}


export const FormInput = (props: FormInputProps) => {
  const [focused, setFocused] = useState<boolean>(false)
  const {
    label,
    errorMessage,
    showLabel = true,
    hasError = false,
    ...inputProps
  } = props

  const handleFocus = () => {
    setFocused(true)
  }

  return (
    <>
      {showLabel && <label className="text-[#888888] text-[10px] px-3 pt-3 block">
        {label}
      </label>
      }
      <input
        className="
          appearance-none border-0 border-transparent bg-[#F5F6FA] w-full px-3 pt-2 pb-1 text-[#242424] text-[15px] font-medium 
          leading-tight focus:outline-none focus:shadow-none peer"
        {...inputProps}
        onBlur={handleFocus}
        data-focused={focused.toString()}
        data-haserror={hasError.toString()}
      />
      <div className="text-red-500 text-xs px-3 py-1 hidden peer-invalid:peer-data-[focused='true']:block peer-data-[haserror='true']:block">{errorMessage}</div>
    </>
  )
}

export const FormSelect = (props: FormSelectProps) => {
  const [focused, setFocused] = useState<boolean>(false)
  const {
    label,
    errorMessage,
    options,
    hasError = false,
    ...inputProps
  } = props

  const handleFocus = () => {
    setFocused(true)
  }

  return (
    <>
      <label className="text-[#888888] text-[10px] px-3 pt-3 block">
        {label}
      </label>
      <div className="relative">
        <select
          {...inputProps}
          onBlur={handleFocus}
          data-focused={focused.toString()}
          data-haserror={hasError.toString()}
          className="appearance-none w-full bg-transparent border-0 text-gray-700 pt-1 pb-1 px-3 pr-8 rounded focus:outline-none focus:bg-transparent text-[15px] peer">
          <option value="" key="">Select your location</option>
          {options.map(option => (
            <option value={option.value} key={option.key} data-code={option.dataCode}>{option.value}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute top-1 right-0 flex items-center px-2 text-gray-800">
          <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
        <div className="text-red-500 text-xs px-3 py-1 hidden peer-invalid:peer-data-[focused='true']:block peer-data-[haserror='true']:block">{errorMessage}</div>
      </div>
    </>
  )
}

export const FormDoubleInput = (props: FormDoubleInputProps) => {
  const [focused, setFocused] = useState<boolean>(false)
  const {
    label,
    errorMessage,
    showLabel = true,
    type2,
    value2,
    placeholder2,
    hasError = false,
    ...inputProps
  } = props

  const handleFocus = () => {
    setFocused(true)
  }
  return (
    <>
      {showLabel && <label className="text-[#888888] text-[10px] px-3 pt-3 block">
        {label}
      </label>
      }
        <input
          disabled
          className="
            w-[20%] pl-2 appearance-none border-0 border-transparent bg-[#F5F6FA] pt-1 pb-2 text-[#242424] text-[15px] font-medium 
            leading-tight focus:outline-none focus:shadow-none inline-block"
          type={type2}
          value={value2}
          placeholder={placeholder2}
        />
        <input
          className="
            appearance-none border-0 border-transparent bg-[#F5F6FA] w-[80%] px-2 pt-1 pb-2 text-[#242424] text-[15px] font-medium 
            leading-tight focus:outline-none focus:shadow-none peer inline-block"
          {...inputProps}
          onBlur={handleFocus}
          data-focused={focused.toString()}
          data-haserror={hasError.toString()}
        />
      <div className="text-red-500 text-xs px-3 py-1 hidden peer-invalid:peer-data-[focused='true']:block peer-data-[haserror='true']:block">{errorMessage}</div>
    </>
  )
}