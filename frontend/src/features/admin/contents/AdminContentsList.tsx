import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useCallback, useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash'

import styles from 'styles/admin/pages/contents/ContentsList.module.css'
import {
  getContentsList,
  selectContentsList,
  TYPE_GUIDE,
  TYPE_SELF,
  TYPE_WITH,
} from './adminContentsSlice'
type ContentsListProps = {
  type: TYPE_SELF | TYPE_WITH | TYPE_GUIDE
}
const AdminContentsList = ({ type }: ContentsListProps) => {
  const contentsList = useAppSelector(selectContentsList)
  const [totalPage, setTotalPage] = useState(1)
  const [page, setPage] = useState(1)
  const [entry, setEntry] = useState(10)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getContentsList({ type }))
  }, [])

  useEffect(() => {
    setTotalPage(Math.ceil(contentsList.length / entry))
  }, [entry, contentsList])

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
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.one}>번호</th>
                <th className={styles.two}>위치</th>
                <th className={styles.thr}>제목</th>
                <th className={styles.fur}>내용</th>
                <th className={styles.fiv}>수정/삭제</th>
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {contentsList.map((item, index) => {
                if (Math.ceil((index + 1) / entry) === page)
                  return (
                    <tr key={index}>
                      <td className={styles.one}>{item.index}</td>
                      <td className={styles.two}>{item.type}</td>
                      <td className={styles.thr}>{item.title}</td>
                      <td className={styles.fur}>{item.description}</td>
                      <td className={styles.fiv}></td>
                    </tr>
                  )
              })}
            </tbody>
          </table>
        </div>
        <div>
          {page}/{totalPage}
          <div>
            <button
              onClick={() => {
                if (page > 1) setPage(page - 1)
              }}
            >
              {'Previous'}
            </button>
            <button
              onClick={() => {
                if (page < totalPage) setPage(page + 1)
              }}
            >
              {'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminContentsList
