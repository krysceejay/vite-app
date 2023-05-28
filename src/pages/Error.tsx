import { useRouteError } from 'react-router-dom'
import { AxiosError } from 'axios'
import NotFound from './NotFound'

type ErrProp = {
  error: AxiosError
}

const ErrorPage = ({error}: ErrProp) => {
  let rnder: JSX.Element

  switch (error.response?.status) {
    case 404:
      rnder = <NotFound />
      break;
    default:
      rnder = <NotFound />
      break;
  }

  return rnder
}

export default ErrorPage