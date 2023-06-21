import { Fragment } from 'react'
import { IUser } from '../../../api/types/user-types'
import renderFlag from '../../../utils/flags'
import { currencyMask, numberFormat, removeCommaFromNumber, roundToTwoDP } from '../../../utils/helper'
import Button from '../../shared/Button'
import { FormInput } from '../../shared/Form'
import { ICountry } from '../../../api/types/country-types'
import CountryCurrencyListOptions from '../../shared/CountryCurrencyListOptions'

type TNewTransfer = {
  sentAmount: string
  currency: string
  country: string
  rate: string
  authUser: IUser | null | undefined
  hasBtnSend?: boolean
  countries: ICountry[] | undefined
  handleOnchange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  handleOnclick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const NewTransferSend = ({
  sentAmount, currency, country, countries, rate, authUser, hasBtnSend = false,
  handleOnchange, handleSelectChange, handleOnclick
}: TNewTransfer) => {
  return (
    <Fragment>
      <div className="mt-3">
        <div className="bg-[#F5F6FA] pt-2 pb-3 rounded-md flex justify-between space-x-4 items-center">
          <div className="flex-1">
            {/* <p className="text-[#888888] text-[10px]">You send</p>
                  <input
                    className="
                      appearance-none border-0 border-transparent bg-[#F5F6FA] w-full py-1 text-[#242424] text-base font-medium 
                      leading-tight focus:outline-none focus:shadow-none peer inline-block"
                    type="number"
                    name=""
                    placeholder="100,000"
                    required
                  /> */}
            <FormInput
              label="You send"
              type="text"
              name="sentAmount"
              value={sentAmount}
              onChange={(e) => handleOnchange(currencyMask(e))}
              placeholder="100,000"
              required
            />
          </div>
          <div className="text-center pr-6">
            <img src={renderFlag(authUser?.country.country_name)} alt="Country Flag" className="mx-auto w-6 h-4" />
            <p className="text-xs font-medium mt-1">{authUser?.country.currency.currency_code}</p>
          </div>
        </div>
        <div className="bg-[#F5F6FA] py-4 pl-3 pr-4 rounded-md flex justify-between items-center mt-[2px]">
          <div>
            <p className="text-[#888888] text-[10px]">Recipient gets</p>
            <p className="text-base font-medium mt-1">
              {numberFormat(roundToTwoDP(+removeCommaFromNumber(sentAmount) * +rate))}
            </p>
          </div>
          <div className="text-center">
            <img src={renderFlag(country)} alt="Country Flag" className="mx-auto w-6 h-4" />
            <div className="relative mt-1 w-11">
              <select
                defaultValue={country}
                onChange={handleSelectChange}
                className="appearance-none w-full bg-transparent border-0 text-gray-700 focus:outline-none focus:bg-transparent text-xs font-medium">
                {authUser &&
                  <CountryCurrencyListOptions countries={countries} rates={authUser?.country.currency.rates} />
                }
              </select>
              <div className="pointer-events-none absolute top-[2px] bottom-0 right-0 flex items-center text-gray-800">
                <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      {hasBtnSend &&
        <>
          <div className="text-[10px] mt-3">You send {authUser?.country.currency.currency_code} 1.00 = {`${rate} ${currency}`}</div>
          <div className="mt-3">
            <Button
              type="button"
              onClick={handleOnclick}
            >
              <div className="bg-green-color py-3 px-4 rounded-md w-full">Send Money</div>
            </Button>
          </div>
        </>
      }
    </Fragment>
  )
}

export default NewTransferSend