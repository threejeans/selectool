import { getAuthSelfSpecificInfoAPI } from 'api/authSelf'
import { getAuthWithSpecificInfoAPI } from 'api/authWith'
import { getSelfSpecificInfoAPI } from 'api/self'
import { getWithSpecificInfoAPI } from 'api/with'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import ContentSpinner from 'components/ContentSpinner'
import {
  CommonCardSection,
  DetailContentCard,
  DetailMainCard,
} from 'containers/Common'
import { selectAccessToken } from 'features/auth/authSlice'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { setSelfSpecificInfo } from 'reducers/selfReducer'
import {
  changeToolSpecificModalStatus,
  setWithSpecificInfo,
  withSpecificInfo,
} from 'reducers/withReducer'
import WithToolModal from '../WithToolModal'
import styles from './WithDetailMain.module.css'
import { Mobile, MobileWide, Pc, Tablet } from 'components/Layout'

const WithDetailMain = () => {
  const { corpId } = useParams()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const specificInfo = useAppSelector(withSpecificInfo)

  const isLogon = useAppSelector(selectAccessToken)

  const branchDescription = '* 상위 ' + specificInfo.branches.length + '개 기준'
  const [toastStatus, setToastStatus] = useState(false)

  const handleToast = () => {
    setToastStatus(true)
  }

  const getWithSpecificInfo = async () => {
    const response = isLogon
      ? await dispatch(getAuthWithSpecificInfoAPI(corpId)).unwrap()
      : await getWithSpecificInfoAPI(corpId)

    if (response.isNotFound404) {
      navigate('/error')
    } else {
      dispatch(setWithSpecificInfo(response.data))
    }
  }

  const getToolSpecificInfo = async (toolId: number) => {
    const response = isLogon
      ? await dispatch(getAuthSelfSpecificInfoAPI(toolId.toString())).unwrap()
      : await getSelfSpecificInfoAPI(toolId.toString())
    if (response.isNotFound404) {
      navigate('/error')
    } else {
      dispatch(setSelfSpecificInfo(response.data))
    }
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
    getWithSpecificInfo()
  }, [toastStatus])

  return (
    <>
      {specificInfo.nameKr === '' ? (
        <div className={styles.spinnerLayout}>
          <ContentSpinner />
        </div>
      ) : (
        <>
          <Pc>
            <div className={styles.contentLayout}>
              <WithToolModal />
              {toastStatus && (
                <div className={styles.toast}>링크가 복사되었어요</div>
              )}
              <DetailMainCard
                id={specificInfo.id}
                isBookmarked={specificInfo.isBookmarked}
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
                <DetailContentCard
                  title='기업 소개'
                  description='* 공식 홈페이지 기준'
                >
                  <div className={styles.content}>{specificInfo.content}</div>
                </DetailContentCard>
                <DetailContentCard
                  title='자회사'
                  description={branchDescription}
                >
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
                <DetailContentCard
                  title='조직문화'
                  description='* 공식 홈페이지 기준'
                >
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
                          getToolSpecificInfo(tool.id)
                          dispatch(changeToolSpecificModalStatus())
                        }}
                      >
                        <img
                          src={tool.image}
                          className={styles.toolImage}
                        ></img>
                        <div className={styles.toolName}>{tool.nameKr}</div>
                      </div>
                    ))}
                  </div>
                </DetailContentCard>
              </div>{' '}
            </div>
          </Pc>
          <Tablet>
            <div className={styles.contentLayoutTablet}>
              <WithToolModal />
              {toastStatus && (
                <div className={styles.toast}>링크가 복사되었어요</div>
              )}
              <DetailMainCard
                id={specificInfo.id}
                isBookmarked={specificInfo.isBookmarked}
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
                <DetailContentCard
                  title='기업 소개'
                  description='* 공식 홈페이지 기준'
                >
                  <div className={styles.content}>{specificInfo.content}</div>
                </DetailContentCard>
                <DetailContentCard
                  title='자회사'
                  description={branchDescription}
                >
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
                <DetailContentCard
                  title='조직문화'
                  description='* 공식 홈페이지 기준'
                >
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
                          getToolSpecificInfo(tool.id)
                          dispatch(changeToolSpecificModalStatus())
                        }}
                      >
                        <img
                          src={tool.image}
                          className={styles.toolImage}
                        ></img>
                        <div className={styles.toolName}>{tool.nameKr}</div>
                      </div>
                    ))}
                  </div>
                </DetailContentCard>
              </div>{' '}
            </div>
          </Tablet>
          <MobileWide>
            <div className={styles.contentLayoutTablet}>
              <WithToolModal />
              {toastStatus && (
                <div className={styles.toast}>링크가 복사되었어요</div>
              )}
              <DetailMainCard
                id={specificInfo.id}
                isBookmarked={specificInfo.isBookmarked}
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
                <DetailContentCard
                  title='기업 소개'
                  description='* 공식 홈페이지 기준'
                >
                  <div className={styles.content}>{specificInfo.content}</div>
                </DetailContentCard>
                <DetailContentCard
                  title='자회사'
                  description={branchDescription}
                >
                  <div className={styles.branchLayoutMobile}>
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
                <DetailContentCard
                  title='조직문화'
                  description='* 공식 홈페이지 기준'
                >
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
                  <div className={styles.toolsLayoutMobile}>
                    {specificInfo.tools.map((tool, index) => (
                      <div
                        key={index}
                        className={styles.toolContainer}
                        onClick={() => {
                          getToolSpecificInfo(tool.id)
                          dispatch(changeToolSpecificModalStatus())
                        }}
                      >
                        <img
                          src={tool.image}
                          className={styles.toolImageMobile}
                        ></img>
                        <div className={styles.toolName}>{tool.nameKr}</div>
                      </div>
                    ))}
                  </div>
                </DetailContentCard>
              </div>
            </div>
          </MobileWide>
          <Mobile>
            <div className={styles.contentLayoutTablet}>
              <WithToolModal />
              {toastStatus && (
                <div className={styles.toast}>링크가 복사되었어요</div>
              )}
              <DetailMainCard
                id={specificInfo.id}
                isBookmarked={specificInfo.isBookmarked}
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
                <DetailContentCard
                  title='기업 소개'
                  description='* 공식 홈페이지 기준'
                >
                  <div className={styles.content}>{specificInfo.content}</div>
                </DetailContentCard>
                <DetailContentCard
                  title='자회사'
                  description={branchDescription}
                >
                  <div className={styles.branchLayoutMobile}>
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
                <DetailContentCard
                  title='조직문화'
                  description='* 공식 홈페이지 기준'
                >
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
                  <div className={styles.toolsLayoutMobile}>
                    {specificInfo.tools.map((tool, index) => (
                      <div
                        key={index}
                        className={styles.toolContainer}
                        onClick={() => {
                          getToolSpecificInfo(tool.id)
                          dispatch(changeToolSpecificModalStatus())
                        }}
                      >
                        <img
                          src={tool.image}
                          className={styles.toolImageMobile}
                        ></img>
                        <div className={styles.toolName}>{tool.nameKr}</div>
                      </div>
                    ))}
                  </div>
                </DetailContentCard>
              </div>
            </div>
          </Mobile>
        </>
      )}
    </>
  )
}

export default WithDetailMain
