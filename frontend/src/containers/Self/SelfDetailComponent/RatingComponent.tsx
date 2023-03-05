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
  const starView = parseInt(ratingScore) * 23.3
  return (
    <div className={styles.ratingLayout}>
      <img
        className={styles.ratingImage}
        src={isAppstore ? appstoreImage : playstoreImage}
      ></img>
      <div className={styles.ratingScoreContainer}>
        <div className={styles.ratingScore}>{ratingScore}</div>
        <div>
          <img src={emptyStar} className={styles.emptyStar}></img>
          <div className={styles.starBox} style={{ width: starView }}>
            <img src={fullStar} className={styles.fullStar}></img>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RatingComponent
