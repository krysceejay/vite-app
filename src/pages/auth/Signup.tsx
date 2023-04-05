import { Link } from 'react-router-dom'
import Button from '../../components/shared/Button'

export default function Signup() {
  return (
    <section className="h-[86vh]">
      <div className="container h-full flex justify-center items-center">
        <div className="w-full max-w-sm bg-white py-11 px-6 sm:p-11 shadow-md rounded-md">
          <form className="w-full">
            <h3 className="text-xl font-medium">Glad to have you...</h3>
            <p className="text-xs mt-6">Register now to start sending money</p>
            <div className="flex w-full space-x-2">
              <div className="mt-5 rounded-md overflow-hidden bg-[#F5F6FA] flex-1">
                <label className="text-[#888888] text-[10px] px-3 pt-3 block">
                  First name
                </label>
                <input
                  className="
                    h-10 appearance-none border border-transparent bg-[#F5F6FA] w-full px-3 pb-2 text-[#242424] text-[15px] font-medium 
                    leading-tight focus:outline-none focus:shadow-none"
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                />
              </div>
              <div className="mt-5 rounded-md overflow-hidden bg-[#F5F6FA] flex-1">
                <label className="text-[#888888] text-[10px] px-3 pt-3 block">
                  Last Name
                </label>
                <input
                  className="
                    h-10 appearance-none border border-transparent bg-[#F5F6FA] w-full px-3 pb-2 text-[#242424] text-[15px] font-medium 
                    leading-tight focus:outline-none focus:shadow-none"
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                />
              </div>
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
            <div className="mt-2 w-full rounded-md overflow-hidden bg-[#F5F6FA]">
              <label className="text-[#888888] text-[10px] px-3 pt-3 block">
                Location
              </label>
              <div className="relative">
                <select className="appearance-none w-full bg-transparent border-0 text-gray-700 pt-1 pb-3 px-3 pr-8 rounded focus:outline-none focus:bg-transparent text-[15px]">
                  <option>Senegal</option>
                  <option>Nigeria</option>
                  <option>Ghana</option>
                </select>
                <div className="pointer-events-none absolute top-0 right-0 flex items-center px-2 text-gray-800">
                  <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>
            <div className="mt-5 w-full rounded-md overflow-hidden bg-[#F5F6FA]">
              <label className="text-[#888888] text-[10px] px-3 pt-3 block">
                Phone
              </label>
              <div className="flex">
                <div className="relative flex-none w-[70px]">
                  <select className="appearance-none w-full bg-transparent border-0 text-gray-700 p-2 rounded focus:outline-none focus:bg-transparent text-[15px]">
                    <option>+221</option>
                    <option>+234</option>
                    <option>+233</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-gray-800">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
                <input
                  className="
                    h-10 appearance-none border border-transparent bg-[#F5F6FA] w-full px-3 py-2 text-[#242424] text-[15px] font-medium 
                    leading-tight focus:outline-none focus:shadow-none"
                  type="phone"
                  name="phone"
                  placeholder="77223344"
                />
              </div>
            </div>
            <div className="mt-3">
              <Button>
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
