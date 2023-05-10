import { useState, useEffect } from 'react'
import { isAxiosError } from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import Button from '../../components/shared/Button'
import { FormDoubleInput, FormInput, FormSelect } from '../../components/shared/Form'
import { createUser } from '../../api/users'

interface IUserFormInput {
  ufirstName: string
  ulastName: string
  uemail: string
  upassword: string
  uphoneNumber: string
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
  location: string
}

interface Location {
  key: string
  value: string
  dataCode: string
}

const userLocation: Location[] = [
  { key: '1', value: 'Senegal', dataCode: '+221' },
  { key: '2', value: 'Ghana', dataCode: '+233' },
  { key: '3', value: 'Nigeria', dataCode: '+234' },
  { key: '4', value: 'Kenya', dataCode: '+254' }
]

export default function Signup() {
  //const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<IUserFormInput>({
    ufirstName: '',
    ulastName: '',
    uemail: '',
    upassword: '',
    uphoneNumber: '',
    ulocation: '',
    mobile: '',
    dialingCode: ''
  })

  const { ufirstName, ulastName, uemail, upassword, mobile, dialingCode, ulocation } = formData

  const [errorMsg, setErrorMsg] = useState<IUserInputError>({
    first_name: '',
    email: '',
    last_name: '',
    password: '',
    phone_number: '',
    location: ''
  })

  const { first_name, last_name, email, password, phone_number, location } = errorMsg

  const { isLoading, mutate: registerUser } = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      // Invalidate and refetch
      //queryClient.invalidateQueries({ queryKey: ['users'], exact: true})
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
      ulocation: e.target.value,
      dialingCode: e.target.selectedOptions[0].getAttribute('data-code') ?? ''
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newUser = {
      first_name: ufirstName,
      last_name: ulastName,
      email: uemail,
      password: upassword,
      location: ulocation,
      phone_number: dialingCode + mobile
    }
    registerUser(newUser)
  }

  if (isLoading) return <div>Loading...</div>
  return (
    <section className="my-12">
      <div className="container h-full flex justify-center items-center">
        <div className="w-full max-w-md bg-white py-11 px-6 sm:p-11 shadow-md rounded-md">
          <form className="w-full" onSubmit={handleSubmit}>
            <h3 className="text-xl font-medium">Glad to have you...</h3>
            <p className="text-xs mt-6">Register now to start sending money</p>
            <div className="mt-2 pb-3 w-full rounded-md overflow-hidden bg-[#F5F6FA]">
              <FormInput
                label="First Name"
                type="text"
                name="ufirstName"
                value={ufirstName}
                onChange={handleOnchange}
                placeholder="First Name"
                required
                hasError={first_name == '' ? false : true}
                errorMessage={first_name !== '' ? first_name : "First name is required"}
              />
            </div>
            <div className="mt-2 pb-3 w-full rounded-md overflow-hidden bg-[#F5F6FA]">
              <FormInput
                label="Last Name"
                type="text"
                name="ulastName"
                value={ulastName}
                onChange={handleOnchange}
                placeholder="Last Name"
                required
                hasError={last_name == '' ? false : true}
                errorMessage={last_name !== '' ? first_name : "Last name is required"}
              />
            </div>
            <div className="mt-2 pb-3 w-full rounded-md overflow-hidden bg-[#F5F6FA]">
              <FormInput
                label="Email"
                type="email"
                name="uemail"
                value={uemail}
                onChange={handleOnchange}
                placeholder="xyz@gmail.com"
                required
                hasError={email == '' ? false : true}
                errorMessage={email !== '' ? email : "Must be a valid email"}
              />
            </div>
            <div className="mt-2 pb-3 w-full rounded-md overflow-hidden bg-[#F5F6FA]">
              <FormInput
                label="Password"
                type="password"
                name="upassword"
                value={upassword}
                onChange={handleOnchange}
                placeholder="*****************"
                required
                pattern="^.{8,20}$"
                hasError={password == '' ? false : true}
                errorMessage={password !== '' ? password : "Password is required and should be 8 to 20 characters"}
              />
            </div>
            <div className="mt-2 pb-3 w-full rounded-md overflow-hidden bg-[#F5F6FA]">
              <FormSelect
                label="Location"
                value={ulocation}
                onChange={handleSelectChange}
                required
                options={userLocation}
                hasError={location == '' ? false : true}
                errorMessage={location !== '' ? location : "Location is required"}
              />
            </div>
            <div className="mt-2 pb-3 w-full rounded-md overflow-hidden bg-[#F5F6FA]">
              <FormDoubleInput
                label="Phone"
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
                errorMessage={phone_number !== '' ? phone_number : "Please enter a valid mobile number"}
              />
            </div>
            <div className="mt-3">
              <Button type="submit" disabled={isLoading}>
                <div className="bg-green-color py-3 px-4 rounded-md">Create an acocunt</div>
              </Button>
            </div>
            <p className="text-xs mt-5">
              By continuing, you agree to our <Link to="/" className="text-green-color">terms and conditions</Link>.
            </p>
            <p className="text-xs mt-2">
              Already have a Vargent account? <Link to="/" className="text-green-color">Log in here</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
