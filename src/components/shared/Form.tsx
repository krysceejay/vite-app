import React, { useState } from 'react'

type FormInputProps = React.ComponentProps<'input'> & {
  label?: string 
  errorMessage?: string 
  showLabel?: boolean 
  hasError?: boolean
}

type Option = {
  value: string
  key: string
  dataCode?: string
}

interface FormSelectProps<T> {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onInvalid?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onInput?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  required?: boolean
  errorMessage: string
  emptyOption?: string
  hasError?: boolean
  options: T[]
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
    required = false,
    ...inputProps
  } = props

  const handleFocus = () => {
    setFocused(true)
  }

  return (
    <>
      {showLabel && <label className={`text-[#888888] text-[10px] px-3 pt-3 block ${required && "after:content-['*'] after:text-red-500 after:ml-0.5"}`}>
        {label}
      </label>
      }
      <input
        className="
          appearance-none border-0 border-transparent bg-[#F5F6FA] w-full px-3 pt-2 pb-1 text-[#242424] text-[15px] font-medium 
          leading-tight focus:outline-none focus:shadow-none peer"
        {...inputProps}
        required={required}
        onBlur={handleFocus}
        data-focused={focused.toString()}
        data-haserror={hasError.toString()}
      />
      {errorMessage &&
        <div
          className="text-red-500 text-xs px-3 py-1 hidden peer-invalid:peer-data-[focused='true']:block peer-data-[haserror='true']:block">
          {errorMessage}
        </div>
      }
    </>
  )
}

export const FormSelect = <T extends { value: string, key: string, opt: string }>(props: FormSelectProps<T>) => {
  const [focused, setFocused] = useState<boolean>(false)
  const {
    label,
    errorMessage,
    options,
    hasError = false,
    required = false,
    emptyOption = 'Select an option',
    ...inputProps
  } = props

  const handleFocus = () => {
    setFocused(true)
  }

  return (
    <>
      <label className={`text-[#888888] text-[10px] px-3 pt-3 block ${required && "after:content-['*'] after:text-red-500 after:ml-0.5"}`}>
        {label}
      </label>
      <div className="relative">
        <select
          {...inputProps}
          required={required}
          onBlur={handleFocus}
          data-focused={focused.toString()}
          data-haserror={hasError.toString()}
          className="appearance-none w-full bg-transparent border-0 text-gray-700 pt-1 pb-1 px-3 pr-8 rounded focus:outline-none focus:bg-transparent text-[15px] peer">
          <option value="" key="">{emptyOption}</option>
          {options.map((option, ind) => (
            // <option value={option.value} key={option.guid} data-code={option.dataCode}>{option.value}</option>
            <option {...option}>{option.opt}</option>
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
    required = false,
    ...inputProps
  } = props

  const handleFocus = () => {
    setFocused(true)
  }
  return (
    <>
      {showLabel && <label className={`text-[#888888] text-[10px] px-3 pt-3 block ${required && "after:content-['*'] after:text-red-500 after:ml-0.5"}`}>
        {label}
      </label>
      }
      <input
        disabled
        className="
            w-[16%] pl-2 appearance-none border-0 border-transparent bg-[#F5F6FA] pt-1 pb-2 text-[#242424] text-[15px] font-medium 
            leading-tight focus:outline-none focus:shadow-none inline-block"
        type={type2}
        value={value2}
        placeholder={placeholder2}
      />
      <input
        className="
            appearance-none border-0 border-transparent bg-[#F5F6FA] w-[84%] pr-2 pt-1 pb-2 text-[#242424] text-[15px] font-medium 
            leading-tight focus:outline-none focus:shadow-none peer inline-block"
        {...inputProps}
        required={required}
        onBlur={handleFocus}
        data-focused={focused.toString()}
        data-haserror={hasError.toString()}
      />
      <div className="text-red-500 text-xs px-3 py-1 hidden peer-invalid:peer-data-[focused='true']:block peer-data-[haserror='true']:block">{errorMessage}</div>
    </>
  )
}