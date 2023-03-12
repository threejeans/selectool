import React from 'react'
import appstoreImage from 'assets/appstore.png'
import playstoreImage from 'assets/playstore.png'
import emptyStar from 'assets/empty_star.svg'
import fullStar from 'assets/full_star.svg'
import styles from './SelfDetailComponent.module.css'

type RatingProps = {
  isAppstore?: boolean
  ratingScore: string
}
const RatingComponent = ({ isAppstore = false, ratingScore }: RatingProps) => {
  let noRating = false
  const starView =
    Number(ratingScore) && Number(ratingScore) <= 5
      ? Number(ratingScore) * 17.3
      : 0
  if (starView === 0) {
    noRating = true
  }
  return (
    <div className={styles.ratingLayout}>
      <img
        className={noRating ? styles.noRatingImage : styles.ratingImage}
        src={isAppstore ? appstoreImage : playstoreImage}
      ></img>
      <div className={styles.ratingScoreContainer}>
        {noRating ? (
          <div className={styles.noRatingScore}>
            <div>웁스!</div>
            <div>아직 등록된 리뷰가 없어요 :&#40;</div>
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
  )
}

export default RatingComponent
