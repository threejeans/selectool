import React from 'react'
import styles from './Sidebar.module.css'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectContent, setSelectContent } from 'reducers/settingReducer'
import { Mobile, MobileWide, Pc, Tablet } from 'components/Layout'

const Sidebar = () => {
  const selectedContent = useAppSelector(selectContent)

  const dispatch = useAppDispatch()

  const subSection = ['혼자써요', '함께써요', '가이드']

  return (
    <>
      <Pc>
        <div className={styles.layout}>
          <div className={styles.title}>내 정보</div>
          <div
            className={
              selectedContent !== '설정'
                ? styles.sectionContainerActive
                : styles.sectionContainer
            }
          >
            <div
              className={`${
                selectedContent !== '설정'
                  ? styles.mainSectionActive
                  : styles.mainSection
              } ${styles.mainSectionWithSub}`}
              onClick={() => {
                selectedContent !== '설정'
                  ? dispatch(setSelectContent('설정'))
                  : dispatch(setSelectContent('혼자써요'))
              }}
            >
              <div>북마크 컨텐츠</div>
              {selectedContent !== '설정' ? (
                <BsChevronUp className={styles.chevron} />
              ) : (
                <BsChevronDown className={styles.chevron} />
              )}
            </div>
            {selectedContent !== '설정' ? (
              <div className={styles.subSectionContainer}>
                {subSection.map((item, index) => (
                  <div
                    className={
                      selectedContent === item
                        ? styles.subSectionActive
                        : styles.subSection
                    }
                    key={index}
                    onClick={() => dispatch(setSelectContent(item))}
                  >
                    {item}
                  </div>
                ))}
              </div>
            ) : (
              ''
            )}
          </div>
          <div
            className={
              selectedContent === '설정'
                ? styles.mainSectionActive
                : styles.mainSection
            }
            onClick={() => {
              selectedContent !== '설정'
                ? dispatch(setSelectContent('설정'))
                : dispatch(setSelectContent('혼자써요'))
            }}
          >
            설정
          </div>
        </div>
      </Pc>
      <Tablet>
        <div className={styles.layout}>
          <div className={styles.title}>내 정보</div>
          <div
            className={
              selectedContent !== '설정'
                ? styles.sectionContainerActive
                : styles.sectionContainer
            }
          >
            <div
              className={`${
                selectedContent !== '설정'
                  ? styles.mainSectionActive
                  : styles.mainSection
              } ${styles.mainSectionWithSub}`}
              onClick={() => {
                selectedContent !== '설정'
                  ? dispatch(setSelectContent('설정'))
                  : dispatch(setSelectContent('혼자써요'))
              }}
            >
              <div>북마크 컨텐츠</div>
              {selectedContent !== '설정' ? (
                <BsChevronUp className={styles.chevron} />
              ) : (
                <BsChevronDown className={styles.chevron} />
              )}
            </div>
            {selectedContent !== '설정' ? (
              <div className={styles.subSectionContainer}>
                {subSection.map((item, index) => (
                  <div
                    className={
                      selectedContent === item
                        ? styles.subSectionActive
                        : styles.subSection
                    }
                    key={index}
                    onClick={() => dispatch(setSelectContent(item))}
                  >
                    {item}
                  </div>
                ))}
              </div>
            ) : (
              ''
            )}
          </div>
          <div
            className={
              selectedContent === '설정'
                ? styles.mainSectionActive
                : styles.mainSection
            }
            onClick={() => {
              selectedContent !== '설정'
                ? dispatch(setSelectContent('설정'))
                : dispatch(setSelectContent('혼자써요'))
            }}
          >
            설정
          </div>
        </div>
      </Tablet>
      <MobileWide>
        <div className={styles.layoutMobile}>
          <div className={styles.sectionContainerMobile}>
            <div className={styles.mainSectionMobile}>💌 북마크 컨텐츠</div>
            <div className={styles.subSectionContainerMobile}>
              {subSection.map((item, index) => (
                <div
                  className={
                    selectedContent === item
                      ? styles.subSectionActive
                      : styles.subSection
                  }
                  key={index}
                  onClick={() => dispatch(setSelectContent(item))}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.sectionContainerMobile}>
            <div className={styles.mainSectionMobile}>⚙️ 설정</div>
            <div className={styles.subSectionContainerMobile}>
              <div
                className={
                  selectedContent === '설정'
                    ? styles.subSectionActive
                    : styles.subSection
                }
                onClick={() => {
                  selectedContent !== '설정'
                    ? dispatch(setSelectContent('설정'))
                    : dispatch(setSelectContent('혼자써요'))
                }}
              >
                계정 설정
              </div>
            </div>
          </div>
          <hr className={styles.line}></hr>
        </div>
      </MobileWide>
      <Mobile>
        <div className={styles.layoutMobile}>
          <div className={styles.sectionContainerMobile}>
            <div className={styles.mainSectionMobile}>💌 북마크 컨텐츠</div>
            <div className={styles.subSectionContainerMobile}>
              {subSection.map((item, index) => (
                <div
                  className={
                    selectedContent === item
                      ? styles.subSectionActive
                      : styles.subSection
                  }
                  key={index}
                  onClick={() => dispatch(setSelectContent(item))}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.sectionContainerMobile}>
            <div className={styles.mainSectionMobile}>⚙️ 설정</div>
            <div className={styles.subSectionContainerMobile}>
              <div
                className={
                  selectedContent === '설정'
                    ? styles.subSectionActive
                    : styles.subSection
                }
                onClick={() => {
                  selectedContent !== '설정'
                    ? dispatch(setSelectContent('설정'))
                    : dispatch(setSelectContent('혼자써요'))
                }}
              >
                계정 설정
              </div>
            </div>
          </div>
          <hr className={styles.line}></hr>
        </div>
      </Mobile>
    </>
  )
}

export default Sidebar
