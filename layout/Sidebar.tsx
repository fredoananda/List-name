import React from 'react'
import { useAdmin } from '../../hooks/useAdmin'
import SidebarMenu from '../molecules/SidebarMenu'
import SidebarProfile from '../molecules/SidebarProfile'

function Sidebar() {
  const { admin } = useAdmin()
  console.log(admin?.menu_access);
  
  return (
    <div className="w-full max-w-xs h-screen bg-[#0F172A] text-white overflow-auto scrollbar-hide">
      <SidebarProfile />
      <div className="pb-10 scrollbar-hide">
        {admin &&
          admin.menu_access.map((item, index) => {
            return <SidebarMenu key={index} item={item} />
          })}
      </div>
    </div>
  )
}

export default Sidebar
