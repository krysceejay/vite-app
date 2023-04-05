import {Link} from 'react-router-dom'

interface DetailsLinkProps {
  link: string,
  text: string,
  isTable: boolean
}

export default function DetailsLink({ link, text, isTable }: DetailsLinkProps) {
  return (
    <Link to={link} className="flex flex-wrap items-center space-x-1 text-green-color">
      <span className="text-xs">{text}</span>
      {isTable ?
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
        </svg>
        :
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
        </svg>
      }
    </Link>
  )
}