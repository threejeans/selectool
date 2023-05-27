import { useAppSelector } from 'app/hooks'
import { Link, useLocation } from 'react-router-dom'

import Logo from 'assets/favicon.png'
import Title from 'assets/selectool_logo_dark.svg'
import { selectAccessToken } from 'features/admin/auth/adminAuthSlice'
import { dropDataRoutes } from 'features/admin/data/AdminData'
import { useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import styles from 'styles/admin/components/AdminHeader.module.css'
import { DropItemType } from 'types/types'

type AdminMenuLinkProps = {
  path: string
  title: string
  dropItem?: DropItemType[]
}

type AdminHeaderProps = {
  title: string
}

const AdminMenuLink = ({ path, title, dropItem = [] }: AdminMenuLinkProps) => {
  const { pathname } = useLocation()
  return (
    <div className={styles.dropWrap}>
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
      {dropItem.length > 0 && (
        <div className={styles.dropBox}>
          {dropItem.map((item, index) => {
            return (
              <Link key={index} className={styles.dropItem} to={item.to}>
                {item.name}
              </Link>
            )
          })}
        </div>
      )}
    </div>
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
          <img className={styles.logo} src={Logo} alt={'셀렉툴'} />
          <img className={styles.logo} src={Title} alt={'셀렉툴'} />
          {'admin'}
        </Link>
        <div className={styles.menu}>
          {accessToken && (
            <>
              <AdminMenuLink path={'contents'} title={'콘텐츠 관리'} />
              <AdminMenuLink
                path={'data'}
                title={'데이터 관리'}
                dropItem={dropDataRoutes}
              />
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
