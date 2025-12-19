"use client"

import { useState } from "react"
import { Search, Bell, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"

export function Header({user}: {user?:any}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="px-4 md:px-8 lg:px-12 py-4">
        <div className="flex items-start justify-between">
          <Image src="/logo-movie- champ.jpg" alt="Logo" width={40} height={40} className="h-10 w-10" />
          <div className="flex items-center space-x-8">
            <div className="text-2xl md:hidden sm:block font-bold text-primary">MovieChamp256</div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/movies" className="text-muted-foreground hover:text-primary transition-colors">
                Movies
              </Link>
              <Link href="/series" className="text-muted-foreground hover:text-primary transition-colors">
                Series
              </Link>
              {/* <Link href="/documentaries" className="text-muted-foreground hover:text-primary transition-colors">
                Documentaries
              </Link> */}
              <Link href="/list" className="text-muted-foreground hover:text-primary transition-colors">
                My List
              </Link>
              {/* <Link href="/shows" className="text-muted-foreground hover:text-primary transition-colors">
                TV Shows
              </Link> */}
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search movies, series..." className="pl-10 w-64 bg-secondary border-border" />
              </div>
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Bell className="w-5 h-5" />
            </Button>

            {/* Profile */}
           {/* Profile */}
{user ? (
  <div className="relative group">
    <button className="flex items-center gap-2 focus:outline-none">
      {user.image ? (
        <Image
          src={user.image}
          alt={user.name}
          width={32}
          height={32}
          className="rounded-full"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold">
          {user.email?.[0]?.toUpperCase()}
        </div>
      )}
      <span className="hidden md:block text-sm text-foreground">
        {user.email}
      </span>
    </button>

    {/* Dropdown */}
    <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
      <div className="px-4 py-3 border-b border-border">
        <p className="text-sm font-medium">{user.name}</p>
        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
      </div>

      <button
        onClick={() => {
          // 🔴 replace with your logout action
          fetch("/api/logout").then(() => location.reload())
        }}
        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-secondary"
      >
        Logout
      </button>
    </div>
  </div>
) : (
  <Link href="/login">
    <Button variant="default">Login</Button>
  </Link>
)}


            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

         {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col space-y-4 mt-4">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/movies" className="text-muted-foreground hover:text-primary transition-colors">
                Movies
              </Link>
              <Link href="/series" className="text-muted-foreground hover:text-primary transition-colors">
                Series
              </Link>
              <Link href="/documentaries" className="text-muted-foreground hover:text-primary transition-colors">
                Documentaries
              </Link>
              <Link href="/list" className="text-muted-foreground hover:text-primary transition-colors">
                My List
              </Link>
              <div className="pt-4">
                <Input placeholder="Search movies, series..." className="bg-secondary border-border" />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
