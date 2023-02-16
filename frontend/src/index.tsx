import AdminLayout from 'components/admin/AdminLayout'
import AdminMain from 'features/admin/AdminMain'
import AdminAlarm from 'features/admin/alarm/AdminAlarm'
import AdminAuth from 'features/admin/auth/AdminAuth'
import AdminLogin from 'features/admin/auth/AdminLogin'
import AdminContents from 'features/admin/contents/AdminContents'
import AdminContentsList from 'features/admin/contents/AdminContentsList'
import AdminGuide from 'features/admin/contents/AdminGuide'
import AdminWith from 'features/admin/contents/AdminWith'
import AdminSelfMain from 'features/admin/contents/self/AdminSelfMain'
import AdminSelfSpecific from 'features/admin/contents/self/AdminSelfSpecific'
import AdminData from 'features/admin/data/AdminData'
import Auth from 'features/auth/Auth'
import Mypage from 'features/auth/Mypage'
import Guide from 'features/guide/Guide'
import LandingPage from 'features/landing/LandingPage'
import Self from 'features/self/Self'
import With from 'features/with/With'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { store } from './app/store'
import Layout from './components/Layout'
import './styles/globals.css'

const container = document.getElementById('root')!
const root = createRoot(container)

// url이름은 임시로 달아놨습니다.
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout
        title={'홈'}
        description={'셀렉툴 | 올인원 툴 선택, 셀렉툴에서 해결해요.'}
      >
        <LandingPage />
      </Layout>
    ),
  },
  {
    path: 'self',
    // eslint-disable-next-line react/no-children-prop
    element: <Layout title={'혼자써요'} description={''} children={<Self />} />,
  },
  {
    path: 'with',
    // eslint-disable-next-line react/no-children-prop
    element: <Layout title={'함께써요'} description={''} children={<With />} />,
  },
  {
    path: 'guide',
    // eslint-disable-next-line react/no-children-prop
    element: <Layout title={'가이드'} description={''} children={<Guide />} />,
  },
  {
    path: 'mypage',
    element: (
      <Layout title={'마이페이지'} description={'셀렉툴 마이페이지'}>
        <Mypage />
      </Layout>
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
                children: [
                  { path: 'main', element: <AdminSelfMain /> },
                  { path: 'specific', element: <AdminSelfSpecific /> },
                ],
              },
              { path: 'list', element: <AdminContentsList type='self' /> },
            ],
          },
          {
            path: 'with',
            children: [
              { path: 'write', element: <AdminWith /> },
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
        element: <AdminData />,
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
])

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
