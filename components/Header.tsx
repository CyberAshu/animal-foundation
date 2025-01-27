"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/report", label: "Report an Animal" },
    { href: "/adopt", label: "Adopt an Animal" },
    { href: "/store", label: "Store" },
    { href: "/collaborations", label: "Collaborations" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            Animal Foundation
          </Link>
          <nav className="hidden md:flex space-x-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`hover:text-primary transition-colors ${pathname === item.href ? "text-primary font-semibold" : "text-gray-600"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button variant="outline" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 hover:bg-gray-100 ${pathname === item.href ? "text-primary font-semibold" : "text-gray-600"}`}
              onClick={toggleMenu}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}

export default Header

