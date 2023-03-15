import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useEffect, useState } from 'react'

import AdminButton from 'components/admin/AdminButton'
import AdminModal from 'components/admin/AdminModal'
import ContentsDetail from 'components/admin/ContentsDetail'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import styles from 'styles/admin/pages/contents/AdminContentsList.module.css'
import swal from 'sweetalert'
import { TYPE_GUIDE, TYPE_SELF, TYPE_WITH } from 'types/types'
import { selectAccessToken } from '../auth/adminAuthSlice'
import {
  deleteItem,
  getContentsList,
  resetContentList,
  selectContentsList,
} from './adminContentsSlice'

type ContentsListProps = {
  type: TYPE_SELF | TYPE_WITH | TYPE_GUIDE
}

const AdminContentsList = ({ type }: ContentsListProps) => {
  const accessToken = useAppSelector(selectAccessToken)
  const contentsList = useAppSelector(selectContentsList)
  const [totalPage, setTotalPage] = useState(1)
  const [page, setPage] = useState(1)
  const [entry, setEntry] = useState(10)

  const [isModal, setIsModal] = useState(false)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (accessToken) dispatch(getContentsList({ type }))
    else navigate('/admin')
    return () => {
      dispatch(resetContentList())
    }
  }, [])

  useEffect(() => {
    setTotalPage(Math.ceil(contentsList.length / entry))
  }, [entry, contentsList])

  const [targetId, setTargetId] = useState(0)

  const handleRead = (id: number) => {
    setIsModal(true)
    setTargetId(id)
  }

  const handleDelete = (id: number) => {
    swal({
      title: '정말로 삭제 하시겠습니까??',
      icon: 'warning',
      buttons: ['취소', '삭제'],
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        dispatch(deleteItem({ type, id })).then(data => {
          if (data.meta.requestStatus === 'fulfilled') {
            swal('삭제가 완료되었습니다.', { icon: 'success' })
            dispatch(getContentsList({ type }))
          } else swal('삭제에 실패하였습니다.', { icon: 'warning' })
        })
      } else {
        toast('🥕 삭제가 취소되었습니다.', { autoClose: 1000 })
      }
    })
  }

  const ContentItems = () => {
    const tmp = contentsList.map((item, index) => {
      if (Math.ceil((index + 1) / entry) === page) {
        let description = item.info ? `${item.info}` : `${item.content}`
        if (description.length > 15)
          description = description.substring(0, 15) + '...'
        return (
          <tr
            key={index}
            onClick={e => {
              e.stopPropagation()
              handleRead(item.id)
            }}
          >
            <td className={styles.one}>{item.id}</td>
            <td className={styles.two}>
              {item.categories.map(item => {
                return `${item.name || ''}/`
              })}
            </td>
            <td className={styles.thr}>
              {item.nameKr ? `${item.nameKr}/${item.nameEn}` : `${item.title}`}
            </td>
            <td className={styles.fur}>{description}</td>
            <td className={styles.fiv}>
              <AdminButton
                color={'primary'}
                size={'sm'}
                text={'삭제'}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation()
                  handleDelete(item.id)
                }}
              />{' '}
              <AdminButton
                color={'secondary'}
                size={'sm'}
                text={'열람'}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation()
                  handleRead(item.id)
                }}
              />
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
    <>
      <div className={styles.container}>
        <div className={styles.section}>
          <h5>SELECTOOL 게시글 목록</h5>
          <hr />
          <div className={styles.selectTool}>
            <p>
              {'Show'}
              <input
                type='number'
                min={10}
                max={Math.min(contentsList.length + 5, 50)} // 최대갯수 제한
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
                  <th className={styles.two}>분류</th>
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
                  size={'tag'}
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
                  size={'tag'}
                  text={'Next'}
                  onClick={undefined}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      <AdminModal
        isModal={isModal}
        setIsModal={() => setIsModal(false)}
        outer={true}
      >
        <ContentsDetail type={type} id={targetId} />
      </AdminModal>
    </>
  )
}

export default AdminContentsList
