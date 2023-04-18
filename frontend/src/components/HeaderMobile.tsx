import { useAppDispatch, useAppSelector } from 'app/hooks'
import { loginModalOpen, selectAccessToken } from 'features/auth/authSlice'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from 'styles/components/HeaderMobile.module.css'
import Logo from 'assets/selectool_logo.svg'
import LogoDark from 'assets/selectool_logo_dark.svg'
import Favicon from 'assets/favicon.png'
import { BsFillPersonFill } from 'react-icons/bs'
import { FiMenu } from 'react-icons/fi'
import { IoMdClose } from 'react-icons/io'
import { setSelectContent } from 'reducers/settingReducer'
import { setSearchKey } from 'reducers/guideReducer'
import { changeMenuStatus, menuStatus } from 'reducers/commonReducer'

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
        if (title === '가이드') {
          dispatch(setSearchKey(''))
        }
        dispatch(changeMenuStatus())
      }}
    >
      <div>{title}</div>
    </Link>
  )
}

const HeaderMobile = ({ title }: LayoutProps) => {
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
  const dispatch = useAppDispatch()
  const modalOpen = () => dispatch(loginModalOpen())
  const { pathname } = useLocation()
  const isMenuOpen = useAppSelector(menuStatus)

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
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
            <img className={styles.favicon} src={Favicon} alt={'셀렉툴 로고'} />
            <img
              className={styles.logo}
              src={scrollPosition < 100 && title === '홈' ? Logo : LogoDark}
              alt={'셀렉툴 로고'}
            />
          </Link>
          <div className={styles.menu}>
            {isLogon ? (
              <Link
                className={`${
                  pathname.startsWith('/mypage')
                    ? styles.selected
                    : scrollPosition < 100 && title === '홈'
                    ? styles.unselectedHome
                    : styles.unselected
                } ${styles.mypage}`}
                to='/mypage'
                onClick={() => dispatch(setSelectContent('혼자써요'))}
              >
                <BsFillPersonFill />
              </Link>
            ) : (
              <button
                className={
                  scrollPosition < 100 && title === '홈'
                    ? styles.buttonHome
                    : styles.button
                }
                onClick={modalOpen}
              >
                로그인
              </button>
            )}
            <div className={styles.toggle}>
              <a id='nav-toggle' onClick={() => dispatch(changeMenuStatus())}>
                {isMenuOpen ? <IoMdClose /> : <FiMenu />}
              </a>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen ? (
        <div
          className={`${
            scrollPosition < 100 && title === '홈'
              ? styles.headerBottom
              : scrollPosition < 200 && title === '홈'
              ? styles.middleHeaderBottom
              : styles.changeHeaderBottom
          } ${styles.menuOpenStyle}`}
        >
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
        </div>
      ) : (
        ''
      )}
    </header>
  )
}

export default HeaderMobile
