import Link from "next/link"

const Footer = () => {
  return (
    <footer className="text-black border-t-2 border-black">
      <div className="flex items-center justify-between h-[60px] max-w-[1200px] m-auto px-[20px]">
        <Link href="" className="underline">GitHub</Link>
      </div>
    </footer>
  )
}

export default Footer