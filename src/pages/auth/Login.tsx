import { Link } from 'react-router-dom'

import Button from '../../components/shared/Button'

export default function Login() {
  return (
    <section className="h-[86vh]">
      <div className="container h-full flex justify-center items-center">
        <div className="w-full max-w-sm bg-white py-11 px-6 sm:p-11 shadow-md rounded-md">
          <form className="w-full">
            <h3 className="text-xl font-medium">You’re Welcome!</h3>
            <p className="text-xs mt-6">Enter your registered email address and password to continue.</p>
            <div className="mt-5 w-full rounded-md overflow-hidden bg-[#F5F6FA]">
              <label className="text-[#888888] text-[10px] px-3 pt-3 block">
                  Email
              </label>
              <input 
                className="
                  h-10 appearance-none border border-transparent bg-[#F5F6FA] w-full px-3 pb-2 text-[#242424] text-[15px] font-medium 
                  leading-tight focus:outline-none focus:shadow-none" 
                type="email" 
                id="email"
                name="email"
                placeholder="xyz@gmail.com" 
              />
            </div>
            <div className="mt-2 w-full rounded-md overflow-hidden bg-[#F5F6FA]">
              <label className="text-[#888888] text-[10px] px-3 pt-3 block">
                  Password
              </label>
              <input 
                className="
                  h-10 appearance-none border-0 border-transparent bg-[#F5F6FA] w-full px-3 pb-2 text-[#242424] text-[15px] font-medium 
                  leading-tight focus:outline-none focus:shadow-none" 
                type="password" 
                id="password"
                name="password"
                placeholder="*****************" 
              />
            </div>
            <Link to="/" className="text-xs text-green-color mt-5">Forgot Password?</Link>
            <div className="mt-3">
              <Link to="/dashboard">
                <Button>
                  <div className="bg-green-color py-3 px-4 rounded-md">Log in to Vargent</div>
                </Button>
              </Link>
            </div>
            <p className="text-xs mt-5">
              By logging in, you agree to our <Link to="/" className="text-green-color">terms and conditions</Link>.
            </p>
            <p className="text-xs mt-2">
              Don't have a Vargent account yet? <Link to="/signup" className="text-green-color">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
