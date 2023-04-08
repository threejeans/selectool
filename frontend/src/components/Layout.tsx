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
      <Pc>
        <Header title={title} />
      </Pc>
      <Tablet>
        <Header title={title} />
      </Tablet>
      <MobileWide>
        <HeaderMobile title={title} />
      </MobileWide>
      <Mobile>
        <HeaderMobile title={title} />
      </Mobile>

      <Helmet>
        <title>SELECTOOL | {title}</title>
        <meta name='description' content={description} />
      </Helmet>
      <section>{children}</section>
      <Pc>
        <Footer />
      </Pc>
      <Tablet>
        <Footer />
      </Tablet>
      <MobileWide>
        <FooterMobile />
      </MobileWide>
      <Mobile>
        <FooterMobile />
      </Mobile>
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
