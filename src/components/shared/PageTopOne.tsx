import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

interface PageTopOneProps {
  title: string,
  buttonText?: string,
  link?: string,
  hasBtn?: boolean
  isLink?: boolean
  onClick?: () => void
}

export default function PageTopOne({ title, buttonText, link = "/", hasBtn = false,
  isLink = true, onClick }: PageTopOneProps) {
  return (
    <div className="min-[360px]:flex justify-between items-center block">
      <h3 className="text-xl sm:text-2xl font-semibold">{title}</h3>
      {hasBtn ?
        isLink ?
        <Link to={link} className="inline-block mt-2 min-[360px]:mt-0">
          <Button>
            <div className="flex items-center space-x-2 bg-green-color py-2 sm:py-3 px-4 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span className="whitespace-nowrap">{buttonText}</span>
            </div>
          </Button>
        </Link>
        :
        <div className="inline-block mt-2 min-[360px]:mt-0">
          <Button
            onClick={onClick}
          >
            <div className="flex items-center space-x-2 bg-green-color py-2 sm:py-3 px-4 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span className="whitespace-nowrap">{buttonText}</span>
            </div>
          </Button>
        </div>
        : null
      }
    </div>
  )
}