import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  CommonCardSection,
  DetailContentCard,
  DetailMainCard,
} from 'containers/Common'
import { useEffect, useState } from 'react'
import {
  changeToolSpecificModalStatus,
  withSpecificInfo,
} from 'reducers/withReducer'
import WithToolModal from '../WithToolModal'
import styles from './WithDetailMain.module.css'

const WithDetailMain = () => {
  const specificInfo = useAppSelector(withSpecificInfo)
  const branchDescription = '* 상위 ' + specificInfo.branches.length + '개 기준'
  const dispatch = useAppDispatch()
  const [toolId, setToolId] = useState(0)
  const [toastStatus, setToastStatus] = useState(false)
  const handleToast = () => {
    setToastStatus(true)
  }

  const copyLink = async () => {
    await navigator.clipboard.writeText(
      `https://www.selectool.info/with/${specificInfo.id}`,
    )
    handleToast()
  }

  useEffect(() => {
    if (toastStatus) {
      setTimeout(() => setToastStatus(false), 1000)
    }
  })

  return (
    <>
      <WithToolModal toolId={toolId} />
      {toastStatus && <div className={styles.toast}>링크가 복사되었어요</div>}

      <DetailMainCard
        image={specificInfo.image}
        nameKr={specificInfo.nameKr}
        info={specificInfo.info}
        button1ClickEvent={() => {
          document.location.href = specificInfo.url
        }}
        button2ClickEvent={() => {
          copyLink()
        }}
        button3ClickEvent={() => {
          alert('서비스 준비중입니다.')
        }}
      />
      <div className={styles.rightSection}>
        <DetailContentCard title='기업 소개' description='* 공식 홈페이지 기준'>
          <div className={styles.content}>{specificInfo.content}</div>
        </DetailContentCard>
        <DetailContentCard title='자회사' description={branchDescription}>
          <div className={styles.branchLayout}>
            {specificInfo.branches.map((branch, index) => (
              <a href={branch.name} key={index}>
                <img
                  key={index}
                  src={branch.image}
                  className={styles.branch}
                ></img>
              </a>
            ))}
          </div>
        </DetailContentCard>
        <DetailContentCard title='조직문화' description='* 공식 홈페이지 기준'>
          <div className={styles.culturesLayout}>
            {specificInfo.cultures.map((culture, index) => (
              <CommonCardSection
                key={index}
                name={culture.title}
                content={culture.content}
              />
            ))}
          </div>
        </DetailContentCard>
        <DetailContentCard
          title='사내 협업툴'
          description='* 협업툴 공식 홈페이지 고객사 기준'
        >
          <div className={styles.toolsLayout}>
            {specificInfo.tools.map((tool, index) => (
              <div
                key={index}
                className={styles.toolContainer}
                onClick={() => {
                  setToolId(tool.id)
                  dispatch(changeToolSpecificModalStatus())
                }}
              >
                <img src={tool.image} className={styles.toolImage}></img>
                <div className={styles.toolName}>{tool.nameKr}</div>
              </div>
            ))}
          </div>
        </DetailContentCard>
      </div>
    </>
  )
}

export default WithDetailMain
