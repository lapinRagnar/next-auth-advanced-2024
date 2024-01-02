
const AuthLayout = ({
  children,
}: { children : React.ReactNode}) => {
  return (
    <div
    className="
      flex h-full items-center justify-center
      bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]
      from-neutral-700 to-yellow-800
      
      "
    >
      {children}
    </div>
  )
}

export default AuthLayout