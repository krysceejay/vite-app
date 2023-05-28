import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import React from 'react'
import Button from '../components/shared/Button'
import { isAxiosError } from 'axios'
import ErrorPage from './Error'

type QuerySuspenseError = {
  children: React.ReactNode
}

const ReactQuerySuspenseError = ({children}: QuerySuspenseError) => {
  let flag: string
  return (
    <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ error, resetErrorBoundary }) => (
          isAxiosError(error) ? 
          <ErrorPage error={error} />
          // <div>
          //   <div onClick={() => console.log(error)}>show</div>
          //   There was an error!
          //   <Button type="button" onClick={() => resetErrorBoundary()}>
          //     <div className="bg-green-color py-3 px-4 rounded-md">Try again</div>
          //   </Button>
          // </div> 
          : null
          
        )}
      >
        {children}
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
  )
}

export default ReactQuerySuspenseError