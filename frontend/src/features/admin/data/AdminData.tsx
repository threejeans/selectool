import { useNavigate } from 'react-router-dom'
import styles from 'styles/admin/pages/data/AdminData.module.css'
import { DropItemType } from 'types/types'

export const dropDataRoutes: DropItemType[] = [
  {
    to: '/admin/data/user',
    name: '가입 현황',
  },
  {
    to: '/admin/data/request',
    name: '요청 현황',
  },
]

const AdminData = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <div className={styles.dataButtonGroup}>
        {dropDataRoutes.map((item, index) => {
          return (
            <button
              key={index}
              className={styles.dataButton}
              onClick={() => navigate(item.to)}
            >
              {item.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default AdminData
