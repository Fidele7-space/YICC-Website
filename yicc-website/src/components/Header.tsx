import React, { useEffect, useState } from 'react'

export default function Header() {
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY
    const onScroll = () => {
      const currentScrollY = window.scrollY
      setHidden(currentScrollY > lastScrollY && currentScrollY > 50)
      lastScrollY = currentScrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transform transition-transform bg-white/90 backdrop-blur-sm dark:bg-[#0f1720]/90 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/newhome" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md overflow-hidden bg-green-600 flex items-center justify-center">
              <img src="/assets/yicc-logo.png" alt="YICC Logo" className="w-8 h-8 object-contain" />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-sm md:text-base text-gray-900 dark:text-white">YICC</div>
              <div className="text-xs text-gray-500 dark:text-gray-300">FUTURE IS GREEN</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-4" aria-label="Primary navigation">
            <a href="/newhome" className="text-sm font-medium text-green-700">Home</a>
            <a href="/about" className="text-sm font-medium text-gray-700 dark:text-gray-200">About</a>
            <a href="/programs" className="text-sm font-medium text-gray-700 dark:text-gray-200">Programs</a>
            <a href="/impact" className="text-sm font-medium text-gray-700 dark:text-gray-200">Impact</a>
            <a href="/team" className="text-sm font-medium text-gray-700 dark:text-gray-200">Team</a>
            <a href="/contact" className="text-sm font-medium text-gray-700 dark:text-gray-200">Contact</a>
          </nav>

          <button
            className="md:hidden p-2 rounded-md focus:outline-none focus:ring"
            aria-label="Toggle menu"
            onClick={() => setOpen(o => !o)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-gray-800 dark:text-white">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {open && (
          <div className="md:hidden py-2">
            <nav className="flex flex-col gap-2">
              <a href="/newhome" className="p-2 rounded text-sm">Home</a>
              <a href="/about" className="p-2 rounded text-sm">About</a>
              <a href="/programs" className="p-2 rounded text-sm">Programs</a>
              <a href="/impact" className="p-2 rounded text-sm">Impact</a>
              <a href="/team" className="p-2 rounded text-sm">Team</a>
              <a href="/contact" className="p-2 rounded text-sm">Contact</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
