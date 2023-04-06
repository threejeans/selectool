import AdminLayout from 'components/admin/AdminLayout'
import AdminMain from 'features/admin/AdminMain'
import AdminAlarm from 'features/admin/alarm/AdminAlarm'
import AdminAuth from 'features/admin/auth/AdminAuth'
import AdminLogin from 'features/admin/auth/AdminLogin'
import AdminContents from 'features/admin/contents/AdminContents'
import AdminContentsList from 'features/admin/contents/AdminContentsList'
import AdminGuide from 'features/admin/contents/guide/AdminGuide'
import AdminSelfTool from 'features/admin/contents/self/AdminSelfTool'
import AdminWithCorp from 'features/admin/contents/with/AdminWithCorp'
import AdminData from 'features/admin/data/AdminData'
import AdminRequestList from 'features/admin/data/request/AdminRequestList'
import AdminUserList from 'features/admin/data/user/AdminUserList'
import Auth from 'features/auth/Auth'
import Mypage from 'features/auth/Mypage'
import Guide from 'features/guide/Guide'
import LandingPage from 'features/landing/LandingPage'
import NotFound404 from 'features/notFound404/NotFound404'
import Self from 'features/self/Self'
import SelfDetail from 'features/self/SelfDetail'
import With from 'features/with/With'
import WithDetail from 'features/with/WithDetail'
import { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './app/store'
import Layout from './components/Layout'
import './styles/globals.css'
import { CookiesProvider } from 'react-cookie'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!
const root = createRoot(container)

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

// url이름은 임시로 달아놨습니다.
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <ScrollToTop />
        <Layout
          title={'홈'}
          description={'셀렉툴 | 올인원 툴 선택, 셀렉툴에서 해결해요.'}
        >
          <LandingPage />
        </Layout>
      </>
    ),
  },
  {
    path: 'self',
    element: (
      <>
        <ScrollToTop />
        <Layout title={'혼자써요'} description={'셀렉툴 | 혼자써요'}>
          <Self />
        </Layout>
      </>
    ),
  },
  {
    path: 'self/:toolId',
    element: (
      <>
        <ScrollToTop />
        <Layout title={'혼자써요'} description={'셀렉툴 | 혼자써요'}>
          <SelfDetail />
        </Layout>
      </>
    ),
  },
  {
    path: 'with',
    element: (
      <>
        <ScrollToTop />
        <Layout title={'함께써요'} description={'셀렉툴 | 함께써요'}>
          <With />
        </Layout>
      </>
    ),
  },
  {
    path: 'with/:corpId',
    element: (
      <>
        <ScrollToTop />
        <Layout title={'함께써요'} description={'셀렉툴 | 함께써요'}>
          <WithDetail />
        </Layout>
      </>
    ),
  },
  {
    path: 'guide',
    element: (
      <>
        <ScrollToTop />
        <Layout title={'가이드'} description={'셀렉툴 | 가이드'}>
          <Guide />
        </Layout>
      </>
    ),
  },
  {
    path: 'mypage',
    element: (
      <>
        <ScrollToTop />
        <Layout title={'마이페이지'} description={'셀렉툴 | 마이페이지'}>
          <Mypage />
        </Layout>
      </>
    ),
  },
  {
    // redirect
    path: 'mypage/:status',
    element: (
      <>
        <ScrollToTop />
        <Layout title={'마이페이지'} description={'셀렉툴 | 마이페이지'}>
          <Mypage />
        </Layout>
      </>
    ),
  },
  {
    path: 'auth/:type',
    element: <Auth />,
  },
  {
    path: 'admin',
    element: (
      <AdminLayout title={'관리자 페이지'}>
        <Outlet />
      </AdminLayout>
    ),
    children: [
      {
        path: '',
        element: <AdminMain />,
      },
      {
        path: 'contents',
        children: [
          {
            path: '',
            element: <AdminContents />,
          },
          {
            path: 'self',
            children: [
              {
                path: '',
                children: [{ path: '', element: <AdminSelfTool /> }],
              },
              { path: 'list', element: <AdminContentsList type='self' /> },
            ],
          },
          {
            path: 'with',
            children: [
              {
                path: '',
                children: [{ path: '', element: <AdminWithCorp /> }],
              },
              { path: 'list', element: <AdminContentsList type='with' /> },
            ],
          },
          {
            path: 'guide',
            children: [
              { path: 'write', element: <AdminGuide /> },
              { path: 'list', element: <AdminContentsList type='guide' /> },
            ],
          },
        ],
      },
      {
        path: 'data',
        children: [
          { path: '', element: <AdminData /> },
          { path: 'user', element: <AdminUserList /> },
          { path: 'request', element: <AdminRequestList /> },
        ],
      },
      {
        path: 'alarm',
        element: <AdminAlarm />,
      },
      {
        path: 'login',
        children: [
          { path: '', element: <AdminLogin /> },
          {
            path: 'auth',
            element: <AdminAuth />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: (
      <>
        <ScrollToTop />
        <Layout title={'404'} description={'셀렉툴 | 404NotFound'}>
          <NotFound404 />
        </Layout>
      </>
    ),
  },
])

root.render(
  <Provider store={store}>
    <CookiesProvider>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        <ToastContainer autoClose={2000} />
      </PersistGate>
    </CookiesProvider>
  </Provider>,
)
