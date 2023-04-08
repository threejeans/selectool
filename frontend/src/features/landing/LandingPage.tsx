import React, { useEffect } from 'react'
import {
  LandingHero,
  LandingHeroTablet,
  LandingHeroMobile,
  LandingHeroMobileWide,
  LandingIntroduceSection,
  LandingIntroduceSectionTablet,
  LandingCTASection,
  LandingCTASectionMobile,
  LandingContactSection,
  LandingDetailSection,
  LandingIntroduceSectionMobile,
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
        <LandingIntroduceSectionTablet />
        <LandingDetailSection />
        <LandingCTASection />
        <LandingContactSection />
      </Tablet>
      <MobileWide>
        <LandingHeroMobileWide />
        <LandingIntroduceSectionMobile />
        <LandingDetailSection />
        <LandingCTASectionMobile />
        <LandingContactSection />
      </MobileWide>
      <Mobile>
        <LandingHeroMobile />
        <LandingIntroduceSectionMobile />
        <LandingDetailSection />
        <LandingCTASectionMobile />
        <LandingContactSection />
      </Mobile>
    </>
  )
}

export default LandingPage
