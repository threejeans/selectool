import { useAppSelector } from 'app/hooks'
import AdminButton from 'components/admin/AdminButton'
import { useNavigate } from 'react-router-dom'
import styles from 'styles/admin/AdminMain.module.css'
import { selectAccessToken } from './auth/adminAuthSlice'

const AdminMain = () => {
  const accessToken = useAppSelector(selectAccessToken)
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <AdminButton
        color={'secondary'}
        size={'lg'}
        text={'홈페이지 돌아가기'}
        onClick={() => {
          navigate('/')
        }}
      />
      {!accessToken && (
        <AdminButton
          color={'primary'}
          size={'lg'}
          text={'관리자 로그인'}
          onClick={() => {
            navigate('login')
          }}
        />
      )}
    </div>
  )
}

export default AdminMain
