interface ButtonProps {
  children: React.ReactNode
}

export default function Button({ children }: ButtonProps) {
  return (
    <button className="block text-white text-xs font-medium focus:outline-none focus:shadow-outline w-full" type="button">
      {children}
    </button>
  )
}