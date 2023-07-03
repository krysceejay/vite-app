import { useState } from 'react'
import { isAxiosError } from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import Button from '../../components/shared/Button'
import { FormDoubleInput, FormInput, FormSelect } from '../../components/shared/Form'
import { createUser } from '../../api/users'
import {useCountryData} from '../../hooks/useCountryData'
import { transformData } from '../../utils/helper'
import useTranslate from '../../hooks/useTranslate'

interface IUserFormInput {
  ufirstName: string
  ulastName: string
  uemail: string
  upassword: string
  uphoneNumber: string
  ucountry: string
  ulocation: string
  mobile: string
  dialingCode: string
}

interface IUserInputError {
  first_name: string
  last_name: string
  email: string
  password: string
  phone_number: string
  country_guid: string
  location: string
}

interface Location {
  key: string
  value: string
  dialcode: string
  opt: string
}

export default function Signup() {
  const {t} = useTranslate()
  const navigate = useNavigate()
  let countryOptions: Location[] = []

  const [formData, setFormData] = useState<IUserFormInput>({
    ufirstName: '',
    ulastName: '',
    uemail: '',
    upassword: '',
    uphoneNumber: '',
    ucountry: '',
    ulocation: '',
    mobile: '',
    dialingCode: ''
  })

  const { ufirstName, ulastName, uemail, upassword, mobile, dialingCode, ucountry, ulocation } = formData

  const [errorMsg, setErrorMsg] = useState<IUserInputError>({
    first_name: '',
    email: '',
    last_name: '',
    password: '',
    phone_number: '',
    country_guid: '',
    location: ''
  })

  const { first_name, last_name, email, password, phone_number, country_guid, location } = errorMsg

  const { isLoading: countryIsLoading, data: countryData } = useCountryData()

  if (!countryIsLoading && countryData) {
    countryOptions = countryData.map(
      ({
        guid,
        country_name,
        dial_code
      }) => ({
        key: guid,
        value: guid,
        dialcode: dial_code,
        opt: country_name
      })
    )
  }

  const { isLoading, mutate: registerUser } = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      navigate('/account-successful', {
        replace: true,
        state: {
          email: data.email
        }
      })
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        setErrorMsg({
          first_name: '',
          email: '',
          last_name: '',
          password: '',
          phone_number: '',
          country_guid: '',
          location: ''
        })

        const resErrors = err.response?.data.message
        let errorMsgs: object = {}

        resErrors.forEach((er: { field: string, error: string }) => {
          Object.assign(errorMsgs, { [er.field]: er.error.replace('_', ' ') })
        })
        setErrorMsg(prev => ({ ...prev, ...errorMsgs }))
      } else {
        console.log('unexpected', err)
      }
    }
  })

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      ucountry: e.target.value,
      dialingCode: e.target.selectedOptions[0].getAttribute('dialcode') ?? ''
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newUser = {
      first_name: ufirstName,
      last_name: ulastName,
      email: uemail,
      password: upassword,
      country_guid: ucountry,
      location: ulocation,
      phone_number: dialingCode + mobile
    }
    registerUser(newUser)
  }

  return (
    <section className="my-12">
      <div className="container h-full flex justify-center items-center">
        <div className="w-full max-w-md bg-white py-11 px-6 sm:p-11 shadow-md rounded-md">
          <form className="w-full" onSubmit={handleSubmit}>
            <h3 className="text-xl font-medium">{t('signUpPage.welcome')}...</h3>
            <p className="text-xs mt-6">{t('signUpPage.instruction')}</p>
            <div className="mt-5 pb-3 w-full rounded-md overflow-hidden bg-[#F5F6FA]">
              <FormInput
                label={t('firstName.text')}
                type="text"
                name="ufirstName"
                value={ufirstName}
                onChange={handleOnchange}
                placeholder={t('firstName.text')}
                required
                hasError={first_name == '' ? false : true}
                errorMessage={first_name !== '' ? t('firstName.apiError') : t('firstName.error')}
                onInvalid={(e: React.ChangeEvent<HTMLInputElement>) => e.target.setCustomValidity(t('firstName.error'))}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => e.target.setCustomValidity('')}
              />
            </div>
            <div className="mt-2 pb-3 w-full rounded-md overflow-hidden bg-[#F5F6FA]">
              <FormInput
                label={t('lastName.text')}
                type="text"
                name="ulastName"
                value={ulastName}
                onChange={handleOnchange}
                placeholder={t('lastName.text')}
                required
                hasError={last_name == '' ? false : true}
                errorMessage={last_name !== '' ? t('lastName.apiError') : t('lastName.error')}
                onInvalid={(e: React.ChangeEvent<HTMLInputElement>) => e.target.setCustomValidity(t('lastName.error'))}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => e.target.setCustomValidity('')}
              />
            </div>
            <div className="mt-2 pb-3 w-full rounded-md overflow-hidden bg-[#F5F6FA]">
              <FormInput
                label={t('email.text')}
                type="email"
                name="uemail"
                value={uemail}
                onChange={handleOnchange}
                placeholder="xyz@gmail.com"
                required
                hasError={email == '' ? false : true}
                errorMessage={email !== '' ? t('email.apiError') : t('email.error')}
                onInvalid={(e: React.ChangeEvent<HTMLInputElement>) => e.target.setCustomValidity(t('email.error'))}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => e.target.setCustomValidity('')}
              />
            </div>
            <div className="mt-2 pb-3 w-full rounded-md overflow-hidden bg-[#F5F6FA]">
              <FormInput
                label={t('password.text')}
                type="password"
                name="upassword"
                value={upassword}
                onChange={handleOnchange}
                placeholder="*****************"
                required
                pattern="^.{8,20}$"
                hasError={password == '' ? false : true}
                errorMessage={password !== '' ? t('password.apiError') : t('password.errorTwo')}
                onInvalid={(e: React.ChangeEvent<HTMLInputElement>) => e.target.setCustomValidity(t('password.error'))}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => e.target.setCustomValidity('')}
              />
            </div>
            <div className="mt-2 pb-3 w-full rounded-md overflow-hidden bg-[#F5F6FA]">
              <FormSelect
                label={t('country.text')}
                value={ucountry}
                onChange={handleSelectChange}
                required
                options={countryOptions}
                emptyOption={t('country.empty')}
                hasError={country_guid == '' ? false : true}
                errorMessage={country_guid !== '' ? t('country.apiError') : t('country.error')}
                onInvalid={(e: React.ChangeEvent<HTMLSelectElement>) => e.target.setCustomValidity(t('country.error'))}
                onInput={(e: React.ChangeEvent<HTMLSelectElement>) => e.target.setCustomValidity('')}
              />
            </div>
            <div className="mt-2 pb-3 w-full rounded-md overflow-hidden bg-[#F5F6FA]">
              <FormDoubleInput
                label={t('phone.text')}
                type="tel"
                value={mobile}
                placeholder="77223344"
                type2="text"
                name="mobile"
                value2={dialingCode}
                onChange={handleOnchange}
                placeholder2="+233"
                required
                hasError={phone_number == '' ? false : true}
                errorMessage={phone_number !== '' ? t('phone.apiError') : t('phone.error')}
                onInvalid={(e: React.ChangeEvent<HTMLInputElement>) => e.target.setCustomValidity(t('phone.error'))}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => e.target.setCustomValidity('')}
              />
            </div>
            <div className="mt-2 pb-3 w-full rounded-md overflow-hidden bg-[#F5F6FA]">
              <FormInput
                label={t('location.text')}
                type="text"
                name="ulocation"
                value={ulocation}
                onChange={handleOnchange}
                placeholder={t('location.placeholder')}
                hasError={location == '' ? false : true}
                errorMessage={location !== '' ? t('location.apiError') : ""}
                onInvalid={(e: React.ChangeEvent<HTMLInputElement>) => e.target.setCustomValidity(t('location.error'))}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => e.target.setCustomValidity('')}
              />
            </div>
            <div className="mt-3">
              <Button type="submit" disabled={isLoading}>
                <div className="bg-green-color py-3 px-4 rounded-md flex items-center justify-center">
                  {isLoading &&
                    <svg className="mr-4 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  }
                  <span className="font-medium"> {t('button.createAccount')}</span>
                </div>
              </Button>
            </div>
            <p className="text-xs mt-5">
              {t('signUpPage.byContinue')} <Link to="/" className="text-green-color">{t('term.condition')}</Link>.
            </p>
            <p className="text-xs mt-2">
              {t('signUpPage.haveAccount')}? <Link to="/" className="text-green-color">{t('signUpPage.loginHere')}</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
