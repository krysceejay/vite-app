import { Link, useLocation } from 'react-router-dom'

export default function AccountCreated() {
  const { state } = useLocation()

  if (!state){
    return <div>Go back to home</div>
  }

  return (
    <div>
      <h3>Account creation</h3>
      <p>
        Your account has been created. Kindly check your email address <span><strong>{state?.email}</strong></span> to verify that your account
      </p>
      <p className="mt-2">
        <Link to="/" className="text-green-color">Log in here</Link>
      </p>
    </div>
  )
}
