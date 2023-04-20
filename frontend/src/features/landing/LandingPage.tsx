import React, { useEffect } from 'react'
import {
  LandingHero,
  LandingIntroduceSection,
  LandingCTASection,
  LandingContactSection,
  LandingDetailSection,
} from '../../containers/LandingPage'
import AOS from 'aos'
import 'aos/dist/aos.css'

const LandingPage = () => {
  useEffect(() => {
    AOS.init()
  })

  return (
    <>
      <LandingHero />
      <LandingIntroduceSection />
      <LandingDetailSection />
      <LandingCTASection />
      <LandingContactSection />
    </>
  )
}

export default LandingPage
