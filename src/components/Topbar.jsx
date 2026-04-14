import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Bell, Moon, Sun, User, Menu } from 'lucide-react'
import { clsx } from 'clsx'

export function Topbar({ toggleMobile }) {
  const { user } = useAuth()
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header className="h-14 sm:h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 sm:px-6">
      {/* Mobile menu button */}
      <button 
        onClick={toggleMobile} 
        className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Menu size={20} className="text-gray-600 dark:text-gray-400" />
      </button>
      
      <div className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
        Welcome, <span className="font-medium text-gray-900 dark:text-white">{user?.name}</span>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
          {darkMode ? <Sun size={18} className="sm:w-5 sm:h-5" /> : <Moon size={18} className="sm:w-5 sm:h-5" />}
        </button>
        <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
          <Bell size={18} className="sm:w-5 sm:h-5" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full" />
        </button>
        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
          <User size={16} className="sm:w-[18px] sm:h-[18px] text-primary-600" />
        </div>
      </div>
    </header>
  )
}
