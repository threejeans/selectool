import { useAppDispatch, useAppSelector } from 'app/hooks'
import AdminButton from 'components/admin/AdminButton'
import CategoryGroup from 'components/admin/CategoryGroup'
import CustomDatePicker from 'components/admin/CustomDatePicker'
import DuplicatedCategoryGroup from 'components/admin/DuplicatedCategoryGroup'
import TextInputBox from 'components/admin/TextInputBox'
import ThumbnailInput from 'components/admin/ThumbnailInput'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import styles from 'styles/admin/pages/contents/AdminSelfMain.module.css'
import swal from 'sweetalert'
import { GuideType } from 'types/types'
import {
  createGuide,
  guideSave,
  resetTmpGuide,
  selectTmpGuide,
} from '../adminContentsSlice'

const AdminGuide = () => {
  const tmpGuide = useAppSelector(selectTmpGuide)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [title, setTitle] = useState<string>('')
  const titleRef = useRef<HTMLInputElement | null>(null)
  const [date, setDate] = useState<Date | null>() // 일자
  const dateRef = useRef<HTMLDivElement | null>(null) // 일자 포커스용
  const [content, setContent] = useState<string>('')
  const contentRef = useRef<HTMLInputElement | null>(null) // 내용
  const [source, setSource] = useState<string>('')
  const sourceRef = useRef<HTMLInputElement | null>(null) // 출처
  const [toolName, setToolName] = useState<string>('')
  const toolNameRef = useRef<HTMLInputElement | null>(null) // 툴 분류

  const funcList = ['디자인', '개발', '기획', '마케팅']
  const [func, setFunc] = useState('') // 기능 분류
  const [categories, setCategories] = useState<string[]>([]) // 카테고리 중복 분류
  const [categoryList, setCategoryList] = useState<string[]>([])

  useEffect(() => {
    setCategoryList(getCategoryList(func))
    setCategories([])
  }, [func])

  const [url, setUrl] = useState<string>('')
  const urlRef = useRef<HTMLInputElement | null>(null) // 콘텐츠 링크 URL
  const [image, setImage] = useState('') // 썸네일 이미지
  const [toolImage, setToolImage] = useState('') // 툴 이미지

  const handleComplete = () => {
    const data: GuideType = {
      title: '',
      date: undefined,
      content: '',
      source: '',
      toolName: '',
      func: '',
      categories: [],
      url: '',
      image: '',
      toolImage: '',
    }
    if (titleRef.current)
      if (!title) {
        titleRef.current.focus()
        toast('가이드 이름을 입력해주세요.')
        return
      } else data.title = title
    if (dateRef.current)
      if (!date) {
        dateRef.current.focus()
        toast('날짜를 입력해주세요.')
        return
      } else data.date = date
    if (contentRef.current)
      if (!content) {
        contentRef.current.focus()
        toast('콘텐츠 내용을 입력해주세요.')
        return
      } else data.content = content
    if (sourceRef.current)
      if (!source) {
        sourceRef.current.focus()
        toast('출처를 입력해주세요.')
        return
      } else data.source = source
    if (toolNameRef.current)
      if (!toolName) {
        toolNameRef.current.focus()
        toast('툴 이름을 입력해주세요.')
        return
      } else data.toolName = toolName
    if (!func) {
      toast('기능 분류를 선택해주세요.')
      return
    } else data.func = func
    if (categories.length === 0) {
      toast('카테고리를 한 개 이상 선택해주세요.')
      return
    } else
      data.categories = categories.map(item => {
        return {
          name: item,
        }
      })
    if (urlRef.current)
      if (!url) {
        urlRef.current.focus()
        toast('콘텐츠 링크를 입력해주세요.')
        return
      } else data.url = url
    if (!image) {
      toast('썸네일 이미지를 첨부해주세요.')
      return
    } else data.image = image
    if (!toolImage) {
      toast('썸네일 이미지를 첨부해주세요.')
      return
    } else data.toolImage = toolImage
    dispatch(guideSave(data))
  }
  useEffect(() => {
    if (
      tmpGuide.title &&
      tmpGuide.date &&
      tmpGuide.content &&
      tmpGuide.source &&
      tmpGuide.toolName &&
      tmpGuide.func &&
      tmpGuide.categories &&
      tmpGuide.url &&
      tmpGuide.image &&
      tmpGuide.toolImage
    ) {
      console.log('Guide complate', tmpGuide)
      swal({
        title: '저장 하시겠습니까?',
        icon: 'info',
        buttons: ['취소', '저장'],
      }).then(willSave => {
        if (willSave) {
          dispatch(createGuide(tmpGuide))
            .then(data => {
              if (data.meta.requestStatus === 'fulfilled') {
                swal('저장이 완료되었습니다.', { icon: 'success' }).then(_ => {
                  console.log(data)
                  dispatch(resetTmpGuide())
                  navigate('/admin/contents/guide/list')
                })
              } else toast('등록중 에러가 발생했어요.')
            })
            .catch(err => {
              console.error(err)
            })
        } else {
          toast('🥕 저장이 취소되었습니다.', { autoClose: 1000 })
        }
      })
    }
  }, [tmpGuide])

  const handleCancel = () => {
    swal({
      title: '돌아가시겠습니까?',
      icon: 'warning',
      text: '저장하지 않은 내용은 삭제됩니다.',
      buttons: ['머무르기', '메인으로'],
      dangerMode: true,
    }).then(willCancel => {
      if (willCancel) {
        toast('🥕 작성이 취소되었습니다.', { autoClose: 1000 })
        navigate('/admin/contents')
      }
    })
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>가이드 main</h3>
      <div className={styles.section}>
        <TextInputBox
          value={title}
          setValue={setTitle}
          focusRef={titleRef}
          title={'가이드 이름'}
          placeholder={'예시: 슬랙에서 인정한 슬랙 잘 쓰는 회사'}
          required={true}
        />
        <div>
          <div>
            <h5 className={styles.label}>
              콘텐츠 일자<span className={styles.required}>{'*'}</span>
            </h5>
          </div>
          <CustomDatePicker date={date} setDate={setDate} dateRef={dateRef} />
        </div>
        <TextInputBox
          value={content}
          setValue={setContent}
          focusRef={contentRef}
          title={'콘텐츠 내용'}
          placeholder={
            '예시: 피그마를 제대로 활용하기 위해선 플러그인을 활용할..'
          }
          required={true}
        />
        <TextInputBox
          value={source}
          setValue={setSource}
          focusRef={sourceRef}
          title={'콘텐츠 소스'}
          placeholder={'예시: 브런치, 토스 기술 블로그'}
          required={true}
        />
        <TextInputBox
          value={toolName}
          setValue={setToolName}
          focusRef={toolNameRef}
          title={'툴 분류'}
          placeholder={'예시: 노션, 지라'}
          required={true}
        />
        <CategoryGroup
          title={'기능 분류'}
          required={true}
          list={funcList}
          category={func}
          setCategory={setFunc}
        />
        <DuplicatedCategoryGroup
          title={'카테고리 분류'}
          required={true}
          list={categoryList}
          categories={categories}
          setCategories={setCategories}
        />
        <TextInputBox
          value={url}
          setValue={setUrl}
          focusRef={urlRef}
          title={'콘텐츠 링크'}
          placeholder={'예시: http://www.google.com/search...'}
          required={true}
        />
        <div className={styles.halfSection}>
          <div>
            <h5 className={styles.label}>
              썸네일 이미지<span className={styles.required}>{'*'}</span>
            </h5>
            <ThumbnailInput thumbnail={image} setThumbnail={setImage} />
          </div>
          <div>
            <h5 className={styles.label}>
              툴 이미지<span className={styles.required}>{'*'}</span>
            </h5>
            <ThumbnailInput thumbnail={toolImage} setThumbnail={setToolImage} />
          </div>
        </div>
      </div>
      <div className={styles.btnGroup}>
        <AdminButton
          color={'white'}
          size={'md'}
          text={'Cancel'}
          onClick={handleCancel}
        />
        <AdminButton
          color={'white'}
          size={'md'}
          text={'Save'}
          onClick={() => toast('임시 저장 구현 중')}
        />
        <AdminButton
          color={'next'}
          size={'md'}
          text={'Complete'}
          onClick={handleComplete}
        />
      </div>
    </div>
  )
}

export default AdminGuide

const getCategoryList = (value: string) => {
  switch (value) {
    case '디자인':
      return ['일반 디자인', 'UI', 'UX', 'BX', '타이포그래피', '리소스']
    case '개발':
      return [
        '일반 개발',
        '웹 개발',
        'java',
        'react',
        'vue.js',
        'angular',
        ' node.js',
        'python',
        'PHP',
        'infra',
        'structure',
        'database',
        'andriod',
        'ios',
        'git',
        '빅데이터/AI/머신러닝',
        '노코드/로우코드',
        '업무 자동화',
      ]
    case '기획':
      return [
        '서비스 기획',
        '전략 기획',
        '프로덕트 관리',
        '데이터 분석',
        '조직문화/HR',
        '그로스해킹',
        '고객 지원',
      ]
    case '마케팅':
      return [
        '일반 마케팅',
        '브랜드 마케팅',
        '그로스 마케팅',
        '콘텐츠 마케팅',
        '트렌드',
        'SEO',
      ]
    default:
      return ['기능분류가 선택되지 않았습니다.']
  }
}
