import { Outlet } from 'react-router-dom'
import { Sidebar } from '../Sidebar'
import { Topbar } from '../Topbar'
import { SidebarProvider, useSidebar } from '../../context/SidebarContext'

function DashboardContent() {
  const { collapsed, mobileOpen, toggleMobile } = useSidebar()
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleMobile}
        />
      )}
      
      {/* Sidebar - hidden on mobile by default */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:hidden ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar mobile />
      </div>
      
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      
      {/* Main content */}
      <div className={`min-h-screen transition-all duration-300 ${collapsed ? 'lg:pl-16' : 'lg:pl-64'}`}>
        <Topbar toggleMobile={toggleMobile} />
        <main className="p-4 sm:p-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <DashboardContent />
    </SidebarProvider>
  )
}
