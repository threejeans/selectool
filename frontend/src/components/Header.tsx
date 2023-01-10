import Logo from 'assets/selectool_logo.svg'
import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from 'app/hooks'
import { loginModalOpen, selectAccessToken } from 'features/auth/authSlice'
import { Link, useLocation } from 'react-router-dom'
import styles from 'styles/components/Header.module.css'

type MenuLinkProps = {
  path: string
  title: string
}

type LayoutProps = {
  title: string
}

const MenuLink = ({ path, title }: MenuLinkProps) => {
  const { pathname } = useLocation()
  return (
    <Link
      className={
        pathname.startsWith(path) ? styles.selected : styles.unselected
      }
      to={path}
    >
      {title}
    </Link>
  )
}

const Header = ({ title }: LayoutProps) => {
  // scroll
  const [scrollPosition, setScrollPosition] = useState(0)
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop)
  }
  useEffect(() => {
    window.addEventListener('scroll', updateScroll)
  })

  // state
  const isLogon = useAppSelector(selectAccessToken) !== undefined
  const dispatcth = useAppDispatch()
  const modalOpen = () => dispatcth(loginModalOpen())
  return (
    <>
      <header
        className={
          scrollPosition < 100 && title === '홈'
            ? styles.header
            : styles.change_header
        }
      >
        <div className={styles.container}>
          <Link to={'/'}>
            <img className={styles.logo} src={Logo} alt={'셀렉툴 로고'} />
          </Link>
          <div className={styles.menu}>
            <MenuLink path={'/self'} title={'혼자써요'} />
            <MenuLink path={'/with'} title={'함께써요'} />
            <MenuLink path={'/guide'} title={'가이드'} />
            {' | '}
            {isLogon ? (
              <MenuLink path={'/mypage'} title={'마이페이지'} />
            ) : (
              <a className={styles.unselected} onClick={modalOpen}>
                로그인
              </a>
            )}
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
