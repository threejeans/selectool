import React, { useEffect } from 'react'
import AdminHeader from './AdminHeader'

import { useAppSelector } from 'app/hooks'
import { selectAccessToken } from 'features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import styles from 'styles/admin/components/Layout.module.css'

type AdminLayoutProps = {
  title: string
  children: React.ReactNode
}

const AdminLayout = ({ title, children }: AdminLayoutProps) => {
  const accessToken = useAppSelector(selectAccessToken)
  const navigate = useNavigate()
  useEffect(() => {
    if (accessToken === undefined) navigate('login')
  }, [])
  return (
    <div className={styles.container}>
      <AdminHeader title={title} />
      <section>{children}</section>
    </div>
  )
}

export default AdminLayout
