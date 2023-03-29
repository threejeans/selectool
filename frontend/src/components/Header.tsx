import Logo from 'assets/selectool_logo.svg'
import LogoDark from 'assets/selectool_logo_dark.svg'
import Favicon from 'assets/favicon.png'
import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from 'app/hooks'
import { loginModalOpen, selectAccessToken } from 'features/auth/authSlice'
import { Link, useLocation } from 'react-router-dom'
import styles from 'styles/components/Header.module.css'

type MenuLinkProps = {
  path: string
  title: string
  scrollPosition?: number
  isHome?: boolean
}

type LayoutProps = {
  title: string
}

const MenuLink = ({
  path,
  title,
  scrollPosition = 0,
  isHome = false,
}: MenuLinkProps) => {
  const { pathname } = useLocation()
  return (
    <Link
      className={
        pathname.startsWith(path)
          ? styles.selected
          : scrollPosition < 100 && isHome
          ? styles.unselected_home
          : styles.unselected
      }
      to={path}
    >
      <div>{title}</div>
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
      <header className={styles.header}>
        <div
          className={
            scrollPosition < 100 && title === '홈'
              ? styles.container
              : scrollPosition < 200 && title === '홈'
              ? styles.middle_container
              : styles.change_container
          }
        >
          <Link to={'/'} className={styles.logo_container}>
            <img className={styles.favicon} src={Favicon} alt={'셀렉툴 로고'} />
            <img
              className={styles.logo}
              src={scrollPosition < 100 && title === '홈' ? Logo : LogoDark}
              alt={'셀렉툴 로고'}
            />
            <span className={styles.line}>{' | '}</span>
          </Link>
          <div className={styles.menu}>
            <MenuLink
              path={'/self'}
              title={'혼자써요'}
              scrollPosition={scrollPosition}
              isHome={title === '홈'}
            />
            <MenuLink
              path={'/with'}
              title={'함께써요'}
              scrollPosition={scrollPosition}
              isHome={title === '홈'}
            />
            <MenuLink
              path={'/guide'}
              title={'가이드'}
              scrollPosition={scrollPosition}
              isHome={title === '홈'}
            />
            <span className={styles.line}>{' | '}</span>
            {isLogon ? (
              <MenuLink
                path={'/mypage'}
                title={'마이페이지'}
                scrollPosition={scrollPosition}
                isHome={title === '홈'}
              />
            ) : (
              <a
                className={
                  scrollPosition < 100 && title === '홈'
                    ? styles.unselected_home
                    : styles.unselected
                }
                onClick={modalOpen}
              >
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
