
const layout = ({ children }: { children: React.ReactNode}) => {
  return (
    <div>
      <nav className="bg-black text-white">
        C&apos;est ma navbar
      </nav>
      {children}
    </div>
  )
}

export default layout