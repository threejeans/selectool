import Auth from 'features/auth/Auth'
import Mypage from 'features/auth/Mypage'
import Guide from 'features/guide/Guide'
import LandingPage from 'features/landing/LandingPage'
import Self from 'features/self/Self'
import With from 'features/with/With'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
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
])

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
