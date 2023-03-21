import React from 'react'
import { Link } from 'react-router-dom'
import styles from 'styles/pages/notFound404/NotFound404.module.css'

const NotFound404 = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div>
          <div className={styles.mainTitle}>404</div>
          <div className={styles.textSection}>
            <div className={styles.mainText}>
              아쉽지만 요청하신 페이지를 찾을 수 없어요 :&#40;
            </div>
            <div className={styles.subText}>
              입력하신 페이지가 변경, 삭제 되었거나 존재하지 않는 주소를
              입력하셨어요.
            </div>
          </div>
        </div>

        <Link to='/' className={styles.linkText}>
          홈으로
        </Link>
      </div>
    </div>
  )
}

export default NotFound404
