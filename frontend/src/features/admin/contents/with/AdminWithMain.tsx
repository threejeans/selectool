import { useAppDispatch } from 'app/hooks'
import AdminButton from 'components/admin/AdminButton'
import CategoryGroup from 'components/admin/CategoryGroup'
import TextInputBox from 'components/admin/TextInputBox'
import ThumbnailInput from 'components/admin/ThumbnailInput'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toast'
import styles from 'styles/admin/pages/contents/AdminSelfMain.module.css'
import {
  createWithMainTmpInfo,
  popToast,
  WithMainTmpInfo,
} from '../adminContentsSlice'

const AdminWithMain = () => {
  const koRef = useRef<HTMLInputElement | null>(null)
  const enRef = useRef<HTMLInputElement | null>(null)
  const discriptionRef = useRef<HTMLInputElement | null>(null)
  const teamKoRef = useRef<HTMLInputElement | null>(null)
  const teamEnRef = useRef<HTMLInputElement | null>(null)

  const list = ['금융', '커뮤니티', '모빌리티', '여행/레져', '커머스', 'Other']
  const [category, setCategory] = useState('Other')

  const [thumbnail, setThumbnail] = useState('')

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()

    const data: WithMainTmpInfo = {
      groupCorpNameKr: '',
      groupCorpNameEn: '',
      groupCorpInfo: '',
      groupCorpTeamNameKr: '',
      groupCorpTeamNameEn: '',
      groupCorpTag: '',
      groupCorpLogo: '',
    }

    if (koRef.current) {
      if (koRef.current.value.length === 0) {
        koRef.current.focus()
        popToast(false)
        return
      } else data.groupCorpNameKr = koRef.current.value
    }
    if (enRef.current) {
      if (enRef.current.value.length === 0) {
        enRef.current.focus()
        popToast(false)
        return
      } else data.groupCorpNameEn = enRef.current.value
    }
    if (discriptionRef.current) {
      if (discriptionRef.current.value.length === 0) {
        discriptionRef.current.focus()
        popToast(false)
        return
      } else data.groupCorpInfo = discriptionRef.current.value
    }
    if (teamKoRef.current) {
      if (teamKoRef.current.value.length === 0) {
        teamKoRef.current.focus()
        popToast(false)
        return
      } else data.groupCorpTeamNameKr = teamKoRef.current.value
    }
    if (teamEnRef.current) {
      if (teamEnRef.current.value.length === 0) {
        teamEnRef.current.focus()
        popToast(false)
        return
      } else data.groupCorpTeamNameEn = teamEnRef.current.value
    }
    if (category) data.groupCorpTag = category
    if (thumbnail === '') {
      popToast('섬네일')
      return
    } else data.groupCorpLogo = thumbnail

    dispatch(createWithMainTmpInfo(data))
      .then(e => {
        if (e.meta.requestStatus === 'fulfilled')
          navigate('/admin/contents/with/specific')
        else
          toast('🚨저장이 실패했어요!', {
            backgroundColor: '#f59892',
            color: 'white',
          })
      })
      .catch(err => toast.error(err))
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>함께써요 main</h3>
      <div className={styles.section}>
        <TextInputBox
          textRef={koRef}
          title={'회사 이름'}
          placeholder={'예시: 토스, 야놀자'}
          required={true}
        />
        <TextInputBox
          textRef={enRef}
          title={'회사 영문명'}
          placeholder={'예시: Toss, Baemin'}
          required={true}
        />
        <TextInputBox
          textRef={discriptionRef}
          title={'회사 한 줄 소개'}
          placeholder={
            '예시: 숙박, 여행, 레저, 액티비티 정보제공 및 예약 서비스 플랫폼 [야놀자]를 운영하는 기업'
          }
          required={true}
        />
        <TextInputBox
          textRef={teamKoRef}
          title={'팀 이름'}
          placeholder={'예시: (주)비바 리퍼블리카'}
          required={true}
        />
        <TextInputBox
          textRef={teamEnRef}
          title={'팀 영문명'}
          placeholder={'예시: Viva Republica'}
          required={true}
        />
        <CategoryGroup
          title={'회사 분류'}
          required={false}
          list={list}
          category={category}
          setCategory={setCategory}
        />
        <ThumbnailInput thumbnail={thumbnail} setThumbnail={setThumbnail} />
      </div>
      <div className={styles.btnGroup}>
        <AdminButton
          color={'white'}
          size={'md'}
          text={'Cancel'}
          onClick={() => navigate('/admin/contents')}
        />
        <AdminButton
          color={'white'}
          size={'md'}
          text={'Save'}
          onClick={(e: React.MouseEvent) => console.log(e.target)}
        />
        <AdminButton
          color={'next'}
          size={'md'}
          text={'Next'}
          onClick={handleNext}
        />
      </div>
    </div>
  )
}

export default AdminWithMain
