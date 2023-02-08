import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useCallback, useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash'

import styles from 'styles/admin/pages/contents/AdminContentsList.module.css'
import {
  getContentsList,
  selectContentsList,
  TYPE_GUIDE,
  TYPE_SELF,
  TYPE_WITH,
} from './adminContentsSlice'
import AdminButton from 'components/admin/AdminButton'
type ContentsListProps = {
  type: TYPE_SELF | TYPE_WITH | TYPE_GUIDE
}

const AdminContentsList = ({ type }: ContentsListProps) => {
  const contentsList = useAppSelector(selectContentsList)
  const [totalPage, setTotalPage] = useState(1)
  const [page, setPage] = useState(1)
  const [entry, setEntry] = useState(10)
  const [remain, setRemain] = useState(0)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getContentsList({ type }))
  }, [])

  useEffect(() => {
    setTotalPage(Math.ceil(contentsList.length / entry))
  }, [entry, contentsList])

  const ContentItems = () => {
    const tmp = contentsList.map((item, index) => {
      if (Math.ceil((index + 1) / entry) === page) {
        let description = `${item.description}`
        if (description.length > 15)
          description = description.substring(0, 15) + '...'
        return (
          <tr key={index} onClick={() => console.log(item)}>
            <td className={styles.one}>{item.index}</td>
            <td className={styles.two}>{item.type}</td>
            <td className={styles.thr}>{item.title}</td>
            <td className={styles.fur}>{description}</td>
            <td className={styles.fiv}>
              <span
                onClick={e => {
                  e.stopPropagation()
                  console.log(`delete ${item.index}`)
                }}
              >
                <AdminButton
                  color={'primary'}
                  size={'sm'}
                  text={'삭제'}
                  onClick={undefined}
                />
              </span>{' '}
              <span
                onClick={e => {
                  e.stopPropagation()
                  console.log(`read ${item.index}`)
                }}
              >
                <AdminButton
                  color={'secondary'}
                  size={'sm'}
                  text={'열람'}
                  onClick={undefined}
                />
              </span>
            </td>
          </tr>
        )
      }
    })
    return tmp
  }
  const RemainItems = () => {
    let cnt = 0
    contentsList.map((_, index) => {
      if (Math.ceil((index + 1) / entry) === page) cnt++
    })
    if (entry > cnt)
      return [...Array(entry - cnt)].map((_, index) => {
        return (
          <tr key={index}>
            <td className={styles.one}>{}</td>
            <td className={styles.two}>{}</td>
            <td className={styles.thr}>{}</td>
            <td className={styles.fur}>{}</td>
            <td className={styles.fiv} style={{ visibility: 'hidden' }}>
              <AdminButton
                color={''}
                size={'sm'}
                text={''}
                onClick={(e: any) => console.log(e)}
              />
            </td>
          </tr>
        )
      })
  }
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h3>콘텐츠 수정, 삭제</h3>
        <h5>* 작성한 게시글 수정 및 삭제 가능한 공간입니다.</h5>
      </div>
      <div className={styles.section}>
        <h5>SELECTOOL 게시글 목록</h5>
        <hr />
        <div className={styles.selectTool}>
          <p>
            {'Show'}
            <input
              type='number'
              min={10}
              max={50}
              step={5}
              value={entry}
              onChange={e => setEntry(parseInt(e.target.value))}
            />
            {'entries'}
          </p>
          <p>
            {'Search'}
            <input type='text' />
            {/* 검색기능은 api연결예정 */}
          </p>
        </div>
        <div>
          <table className={styles.theadTable}>
            <thead>
              <tr>
                <th className={styles.one}>번호</th>
                <th className={styles.two}>위치</th>
                <th className={styles.thr}>제목</th>
                <th className={styles.fur}>내용</th>
                <th className={styles.fiv}>관리</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <tbody className={styles.tbody}>
              {ContentItems()}
              {RemainItems()}
            </tbody>
          </table>
        </div>
        <div>
          <div className={styles.pages}>
            {page} / {totalPage}
          </div>
          <div className={styles.btnGroup}>
            <span
              onClick={() => {
                if (page > 1) setPage(page - 1)
              }}
            >
              <AdminButton
                color={'white'}
                size={'md'}
                text={'Previous'}
                onClick={undefined}
              />
            </span>
            <span
              onClick={() => {
                if (page < totalPage) setPage(page + 1)
              }}
            >
              <AdminButton
                color={'white'}
                size={'md'}
                text={'Next'}
                onClick={undefined}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminContentsList
