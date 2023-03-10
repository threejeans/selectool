import React, { useEffect } from 'react'
import AdminHeader from './AdminHeader'

import { useAppSelector } from 'app/hooks'
import { selectAccessToken } from 'features/admin/auth/adminAuthSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import styles from 'styles/admin/components/AdminLayout.module.css'

type AdminLayoutProps = {
  title: string
  children: React.ReactNode
}

const AdminLayout = ({ title, children }: AdminLayoutProps) => {
  const accessToken = useAppSelector(selectAccessToken)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (!pathname.startsWith('/admin/login'))
      if (accessToken === undefined) navigate('login')
  }, [pathname])
  return (
    <div className={styles.container}>
      <AdminHeader title={title} />
      <section>{children}</section>
    </div>
  )
}

export default AdminLayout
