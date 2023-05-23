// interface ButtonProps {
//   children: React.ReactNode
//   buttonProps: React.ComponentProps<'button'>
//   // type?: "button" | "submit" | "reset" | undefined
//   // disabled?: boolean
// }

type ButtonProps = React.ComponentProps<'button'>

export default function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      className="block text-white text-xs font-medium focus:outline-none focus:shadow-outline w-full"
      {...rest}
    >
      {children}
    </button>
  )
}