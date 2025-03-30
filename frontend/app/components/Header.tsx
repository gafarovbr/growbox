import Link from "next/link"

const Header = () => {
  return (
    <header className="text-black border-b-2 border-black">
      <div className="flex items-center justify-between h-[60px] max-w-[1200px] m-auto px-[20px]">
        <h1>GrowBox</h1>
        <nav>
          <ul>
            <li><Link href="/login" className="underline">Войти</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header