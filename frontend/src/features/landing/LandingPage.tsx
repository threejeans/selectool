import React, { useEffect } from 'react'
import {
  LandingContactSection,
  LandingCTASection,
  LandingDetailSection,
  LandingHero,
  LandingHeroMobile,
  LandingHeroTablet,
  LandingIntroduceSection,
} from '../../containers/LandingPage'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Mobile, MobileWide, Pc, Tablet } from 'components/Layout'

const LandingPage = () => {
  useEffect(() => {
    AOS.init()
  })

  return (
    <>
      <Pc>
        <LandingHero />
        <LandingIntroduceSection />
        <LandingDetailSection />
        <LandingCTASection />
        <LandingContactSection />
      </Pc>
      <Tablet>
        <LandingHeroTablet />
        <LandingIntroduceSection />
        <LandingDetailSection />
        <LandingCTASection />
        <LandingContactSection />
      </Tablet>
      <MobileWide>
        <LandingHeroMobile />
        <LandingIntroduceSection />
        <LandingDetailSection />
        <LandingCTASection />
        <LandingContactSection />
      </MobileWide>
      <Mobile>
        <LandingHeroMobile />
        <LandingIntroduceSection />
        <LandingDetailSection />
        <LandingCTASection />
        <LandingContactSection />
      </Mobile>
    </>
  )
}

export default LandingPage
