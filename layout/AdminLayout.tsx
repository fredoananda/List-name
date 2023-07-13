import { useRouter } from 'next/router'
import { FC, ReactNode, useEffect } from 'react'
import { useAdmin } from '../../hooks/useAdmin'
import Sidebar from '../organisms/Sidebar'

const AdminLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter()
  const { loggedIn, validate } = useAdmin()

  useEffect(() => {

    if (!loggedIn) {
      const accessToken = localStorage.getItem('admin_access_token')
      if (!accessToken && router.pathname !== '/admin') {
        router.push('/admin')
      }

      if (accessToken) {
        validate()
      }
    }
  }, [loggedIn, validate, router])

  if (!loggedIn && router.pathname !== '/admin') return null
  return (
    <div className="flex bg-[#FFFFFF]">
      <Sidebar />
      <div className="flex-1 max-h-[100vh] overflow-auto">
        <div>{children}</div>
      </div>
    </div>
  )
}

export default AdminLayout
