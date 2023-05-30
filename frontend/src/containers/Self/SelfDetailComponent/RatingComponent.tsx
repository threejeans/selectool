import React from 'react'
import appstoreImage from 'assets/appstore.png'
import playstoreImage from 'assets/playstore.png'
import emptyStar from 'assets/empty_star.svg'
import fullStar from 'assets/full_star.svg'
import styles from './SelfDetailComponent.module.css'
import { Mobile, MobileWide, Pc, Tablet } from 'components/Layout'

type RatingProps = {
  isAppstore?: boolean
  ratingScore: string
}
const RatingComponent = ({ isAppstore = false, ratingScore }: RatingProps) => {
  let noRating = false
  const starView =
    Number(ratingScore) && Number(ratingScore) <= 5
      ? Number(ratingScore) * 15.9
      : 0
  const starViewMobile =
    Number(ratingScore) && Number(ratingScore) <= 5
      ? Number(ratingScore) * 14
      : 0

  if (starView === 0 || starViewMobile === 0) {
    noRating = true
  }
  return (
    <>
      <Pc>
        <div className={styles.ratingLayout}>
          <img
            className={noRating ? styles.noRatingImage : styles.ratingImage}
            src={isAppstore ? appstoreImage : playstoreImage}
          ></img>
          <div className={styles.ratingScoreContainer}>
            {noRating ? (
              <div className={styles.noRatingScore}>
                <div>등록된 리뷰가 없어요 :&#40;</div>
              </div>
            ) : (
              <>
                <div className={styles.ratingScore}>{ratingScore}</div>
                <div>
                  <img src={emptyStar} className={styles.emptyStar}></img>
                  <div className={styles.starBox} style={{ width: starView }}>
                    <img src={fullStar} className={styles.fullStar}></img>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Pc>
      <Tablet>
        <div className={styles.ratingLayout}>
          <img
            className={noRating ? styles.noRatingImage : styles.ratingImage}
            src={isAppstore ? appstoreImage : playstoreImage}
          ></img>
          <div className={styles.ratingScoreContainer}>
            {noRating ? (
              <div className={styles.noRatingScore}>
                <div>등록된 리뷰가 없어요 :&#40;</div>
              </div>
            ) : (
              <>
                <div className={styles.ratingScore}>{ratingScore}</div>
                <div>
                  <img src={emptyStar} className={styles.emptyStar}></img>
                  <div className={styles.starBox} style={{ width: starView }}>
                    <img src={fullStar} className={styles.fullStar}></img>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Tablet>
      <MobileWide>
        <div className={styles.ratingLayoutMobile}>
          <img
            className={noRating ? styles.noRatingImage : styles.ratingImage}
            src={isAppstore ? appstoreImage : playstoreImage}
          ></img>
          <div className={styles.ratingScoreContainerMobile}>
            {noRating ? (
              <div className={styles.noRatingScore}>
                <div>등록된 리뷰가 없어요 :&#40;</div>
              </div>
            ) : (
              <>
                <div className={styles.ratingScore}>{ratingScore}</div>
                <div>
                  <img src={emptyStar} className={styles.emptyStarMobile}></img>
                  <div
                    className={styles.starBox}
                    style={{ width: starViewMobile }}
                  >
                    <img src={fullStar} className={styles.fullStarMobile}></img>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </MobileWide>
      <Mobile>
        <div className={styles.ratingLayoutMobile}>
          <img
            className={
              noRating ? styles.noRatingImageMobile : styles.ratingImageMobile
            }
            src={isAppstore ? appstoreImage : playstoreImage}
          ></img>
          <div className={styles.ratingScoreContainerMobile}>
            {noRating ? (
              <div className={styles.noRatingScoreMobile}>
                <div>등록된 리뷰가 없어요 :&#40;</div>
              </div>
            ) : (
              <div className={styles.alignCenter}>
                <div className={styles.ratingScoreMobile}>{ratingScore}</div>
                <div>
                  <img src={emptyStar} className={styles.emptyStarMobile}></img>
                  <div
                    className={styles.starBox}
                    style={{ width: starViewMobile }}
                  >
                    <img src={fullStar} className={styles.fullStarMobile}></img>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Mobile>
    </>
  )
}

export default RatingComponent
