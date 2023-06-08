import Logo from 'assets/selectool_logo.svg'
import LogoDark from 'assets/selectool_logo_dark.svg'
import Favicon from 'assets/favicon.png'
import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from 'app/hooks'
import { loginModalOpen, selectAccessToken } from 'features/auth/authSlice'
import { Link, useLocation } from 'react-router-dom'
import styles from 'styles/components/Header.module.css'
import { setSelectContent } from 'reducers/settingReducer'
import { setSearchKey } from 'reducers/guideReducer'

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

  const dispatch = useAppDispatch()

  return (
    <Link
      className={
        pathname.startsWith(path)
          ? styles.selected
          : scrollPosition < 100 && isHome
          ? styles.unselectedHome
          : styles.unselected
      }
      to={path}
      onClick={() => {
        if (title === '마이페이지') {
          dispatch(setSelectContent('직무별 툴'))
        }
        if (title === '가이드') {
          dispatch(setSearchKey(''))
        }
      }}
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
              ? styles.middleContainer
              : styles.changeContainer
          }
        >
          <Link to={'/'} className={styles.logoContainer}>
            <img className={styles.favicon} src={Favicon} alt={'셀렉툴'} />
            <img
              className={styles.logo}
              src={scrollPosition < 100 && title === '홈' ? Logo : LogoDark}
              alt={'셀렉툴'}
            />
            <span className={styles.line}>{' | '}</span>
          </Link>
          <div className={styles.menu}>
            <MenuLink
              path={'/self'}
              title={'직무별 툴'}
              scrollPosition={scrollPosition}
              isHome={title === '홈'}
            />
            <MenuLink
              path={'/with'}
              title={'기업별 툴'}
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
                    ? styles.unselectedHome
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
