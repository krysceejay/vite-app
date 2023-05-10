interface ButtonProps {
  children: React.ReactNode
  type?: "button" | "submit" | "reset" | undefined
  disabled?: boolean
}

export default function Button({ children, type = 'button', disabled = false }: ButtonProps) {
  return (
    <button
      className="block text-white text-xs font-medium focus:outline-none focus:shadow-outline w-full"
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  )
}