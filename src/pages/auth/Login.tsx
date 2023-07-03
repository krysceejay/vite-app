import { useMutation, useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { currentUser, signIn } from '../../api/users'

import Button from '../../components/shared/Button'
import { FormInput } from '../../components/shared/Form'
import useAuth from '../../hooks/useAuth'
import useTranslate from '../../hooks/useTranslate'

interface ILoginInput {
  uemail: string
  upassword: string
}

export default function Login() {
  const {persist, setAuth, setPersist} = useAuth()
  const {t} = useTranslate()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  const [formData, setFormData] = useState<ILoginInput>({
    uemail: '',
    upassword: ''
  })

  const { uemail, upassword } = formData

  const { isLoading, mutate: loginUser, data: loginData } = useMutation({
    mutationFn: signIn,
    onError: (err) => {
      if (isAxiosError(err)) {
        toast.error(err.response?.data.message)
      } else {
        console.log('unexpected', err)
      }
    }
  })

  useQuery({
    queryKey: ['current-user'],
    queryFn: () => currentUser(),
    onSuccess: (data) => {
      setAuth(data)
      navigate(from, {replace: true})
      toast.success(t('loginPage.loginSuccess'))
    },
    enabled: !!loginData,
  })

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const loginInput = {
      email: uemail,
      password: upassword
    }
    loginUser(loginInput)
  }

  const togglePersist = () => {
    setPersist(prev => !prev)
  }

  useEffect(() => {
    localStorage.setItem('persist', JSON.stringify(persist))
  }, [persist])
  

  return (
    <section className="h-[86vh]">
      <div className="container h-full flex justify-center items-center">
        <div className="w-full max-w-sm bg-white py-11 px-6 sm:p-11 shadow-md rounded-md">
          <form className="w-full" onSubmit={handleSubmit}>
            <h3 className="text-xl font-medium">{t('loginPage.welcome')}!</h3>
            <p className="text-xs mt-6">{t('loginPage.instruction')}.</p>
            <div className="mt-5 pb-3 w-full rounded-md overflow-hidden bg-[#F5F6FA]">
              <FormInput
                label={t('email.text')}
                type="email"
                name="uemail"
                value={uemail}
                onChange={handleOnchange}
                placeholder="xyz@gmail.com"
                required
                errorMessage={t('email.error')}
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
                errorMessage={t('password.error')}
                onInvalid={(e: React.ChangeEvent<HTMLInputElement>) => e.target.setCustomValidity(t('password.error'))}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => e.target.setCustomValidity('')}
              />
            </div>
            <div className="flex mt-4 space-x-2">
              <input 
              onChange={togglePersist}
              checked={persist}
              className="leading-tight accent-green-color" type="checkbox" />
              <span className="text-xs font-medium">{t('loginPage.trustDevice')}?</span>
            </div>
            <Link to="/" className="text-xs text-green-color mt-5 inline-block">{t('loginPage.forgotPassword')}?</Link>
            <div className="mt-3">
              <Button type="submit" disabled={isLoading}>
                <div className="bg-green-color py-3 px-4 rounded-md flex items-center justify-center">
                  {isLoading &&
                    <svg className="mr-4 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  }
                  <span className="font-medium"> {t('button.loginText')} </span>
                </div>
              </Button>
            </div>
            <p className="text-xs mt-5">
              {t('loginPage.byLoggingIn')} <Link to="/" className="text-green-color">{t('term.condition')}</Link>.
            </p>
            <p className="text-xs mt-2">
              {t('loginPage.haveAccount')}? <Link to="/signup" className="text-green-color">{t('button.createAccount')}</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
