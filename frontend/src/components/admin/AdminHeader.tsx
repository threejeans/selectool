import { useAppDispatch, useAppSelector } from 'app/hooks'
import { Link, useLocation } from 'react-router-dom'

import { AiOutlineMenu } from 'react-icons/ai'
import Logo from 'assets/favicon.png'
import Title from 'assets/selectool_logo_dark.svg'
import styles from 'styles/admin/components/AdminHeader.module.css'
import { selectAccessToken } from 'features/admin/auth/adminAuthSlice'
import { useState } from 'react'

type AdminMenuLinkProps = {
  path: string
  title: string
}

type AdminHeaderProps = {
  title: string
}

const AdminMenuLink = ({ path, title }: AdminMenuLinkProps) => {
  const { pathname } = useLocation()
  return (
    <Link
      className={
        pathname.startsWith('/admin/' + path)
          ? styles.selected
          : styles.unselected
      }
      to={path}
    >
      {title}
    </Link>
  )
}

const AdminHeader = ({ title }: AdminHeaderProps) => {
  const accessToken = useAppSelector(selectAccessToken)
  // state
  const [isAside, setIsAside] = useState(false)
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <Link className={styles.logoBox} to={'/admin'}>
          <img className={styles.logo} src={Logo} alt={'셀렉툴 로고'} />
          <img className={styles.logo} src={Title} alt={'셀렉툴'} />
          {'admin'}
        </Link>
        <div className={styles.menu}>
          {accessToken && (
            <>
              <AdminMenuLink path={'contents'} title={'콘텐츠 관리'} />
              <AdminMenuLink path={'data'} title={'데이터 관리'} />
              <AdminMenuLink path={'alarm'} title={'알림 관리'} />
            </>
          )}
        </div>

        <div className={styles.collaped}>
          {accessToken && (
            <>
              <button>
                <AiOutlineMenu
                  className={styles.manuBtn}
                  onClick={() => {
                    setIsAside(!isAside)
                  }}
                />
              </button>
              {/* 수정중 */}
              <div
                className={isAside ? styles.collapedBtnGroup : styles.menu}
                onClick={() => {
                  setIsAside(false)
                }}
              >
                <AdminMenuLink path={'contents'} title={'콘텐츠 관리'} />
                <span className={styles.guideLine} />
                <AdminMenuLink path={'data'} title={'데이터 관리'} />
                <span className={styles.guideLine} />
                <AdminMenuLink path={'alarm'} title={'알림 관리'} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminHeader
