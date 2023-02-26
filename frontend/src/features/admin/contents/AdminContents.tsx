import { Link } from 'react-router-dom'

import styles from 'styles/admin/pages/contents/AdminContents.module.css'

type Section = {
  title: string
  write: string
  list: string
}

const Section = ({ title, write, list }: Section) => {
  return (
    <div className={styles.section}>
      <p className={styles.sectionTitle}>{title}</p>
      <div className={styles.linkBox}>
        <Link className={styles.writeBtn} to={write}>
          <p>게시글 작성</p>
        </Link>
        <Link className={styles.listBtn} to={list}>
          <p>게시글 목록</p>
        </Link>
      </div>
    </div>
  )
}

const AdminContents = () => {
  const manage = [
    {
      title: '혼자써요',
      write: 'self/main',
      list: 'self/list',
    },
    {
      title: '함께써요',
      write: 'with/main',
      list: 'with/list',
    },
    {
      title: '가이드',
      write: 'guide/write',
      list: 'guide/list',
    },
  ]
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h3>콘텐츠 관리</h3>
        <h5>* 콘텐츠 관리 화면입니다.</h5>
      </div>
      <div className={styles.contents}>
        {manage.map((item, index) => {
          return (
            <Section
              title={item.title}
              write={item.write}
              list={item.list}
              key={index}
            />
          )
        })}
      </div>
      <div className={styles.title} />
    </div>
  )
}

export default AdminContents
