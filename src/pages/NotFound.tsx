import { useNavigate } from 'react-router-dom'
import Button from '../components/shared/Button'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div
      id='error-page'
      className='flex flex-col gap-8 justify-center items-center h-screen'
    >
      <h1 className='text-4xl font-bold'>Oops!</h1>
      <p>Sorry, page not found.</p>
      <Button>
        <div 
        onClick={() => navigate(-1)}
        className="inline-block bg-green-color py-2 sm:py-3 px-4 rounded-md">Go back</div>
      </Button>
    </div>
  )
}

export default NotFound