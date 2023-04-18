import Login from 'features/auth/Login'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'

import Footer from './Footer'
import Header from './Header'
import { useMediaQuery } from 'react-responsive'
import HeaderMobile from './HeaderMobile'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { getCookie } from 'util/cookie'
import apiAxios from 'app/apiAxios'
import { selectAccessToken, setAccessToken } from 'features/auth/authSlice'
import FooterMobile from './FooterMobile'

interface LayoutProps {
  title: string
  description: string
  children: React.ReactNode
}

const Layout = ({ title, description, children }: LayoutProps) => {
  const dispatch = useAppDispatch()

  const isLogon = useAppSelector(selectAccessToken)
  const refreshToken = getCookie('refresh-token')

  useEffect(() => {
    if (!isLogon) {
      apiAxios
        .get(process.env.REACT_APP_API + '/api/member/refresh', {
          data: { refreshToken: refreshToken },
        })
        .then(res => {
          const accessToken = res.data.accessToken
          dispatch(setAccessToken(accessToken))
        })
    }
  }, [])

  return (
    <>
      <Login />
      <PcToTablet>
        <Header title={title} />
      </PcToTablet>
      <MobileAll>
        <HeaderMobile title={title} />
      </MobileAll>
      <Helmet>
        <title>SELECTOOL | {title}</title>
        <meta name='description' content={description} />
      </Helmet>
      <section>{children}</section>
      <Footer />
    </>
  )
}

export default Layout

type ResponsiveProps = {
  children: React.ReactNode
}

// 모바일 세로
export const Mobile = ({ children }: ResponsiveProps) => {
  const isMobile = useMediaQuery({
    query: '(max-width:480px)',
  })
  return <>{isMobile && children}</>
}

// 모바일 가로 & 태블릿 세로
export const MobileWide = ({ children }: ResponsiveProps) => {
  const isMobile = useMediaQuery({
    query: '(min-width:481px) and (max-width:767px)',
  })
  return <>{isMobile && children}</>
}

// 태블릿 가로
export const Tablet = ({ children }: ResponsiveProps) => {
  const isMobile = useMediaQuery({
    query: '(min-width:768px) and (max-width:1079px)',
  })
  return <>{isMobile && children}</>
}

// PC & 태블릿 가로
export const Pc = ({ children }: ResponsiveProps) => {
  const isPc = useMediaQuery({
    query: '(min-width:1080px)',
  })
  return <>{isPc && children}</>
}

// PC & 태블릿 가로
export const PcToTablet = ({ children }: ResponsiveProps) => {
  const isPcToTablet = useMediaQuery({
    query: '(min-width:768px)',
  })
  return <>{isPcToTablet && children}</>
}

// PC & 태블릿 가로
export const MobileAll = ({ children }: ResponsiveProps) => {
  const isMobileAll = useMediaQuery({
    query: '(max-width:767px)',
  })
  return <>{isMobileAll && children}</>
}
