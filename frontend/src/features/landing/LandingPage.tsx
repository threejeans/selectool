import React, { useEffect } from 'react'
import {
  LandingHero,
  LandingHeroTablet,
  LandingHeroMobile,
  LandingHeroMobileWide,
  LandingIntroduceSection,
  LandingIntroduceSectionTablet,
  LandingCTASection,
  LandingContactSection,
  LandingDetailSection,
  LandingIntroduceSectionMobile,
  LandingIntroduceSectionMobileWide,
  LandingDetailSectionTablet,
  LandingDetailSectionMobile,
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
        <LandingDetailSectionTablet />
        <LandingCTASection />
        <LandingContactSection />
      </Tablet>
      <MobileWide>
        <LandingHeroMobileWide />
        <LandingIntroduceSectionMobileWide />
        <LandingDetailSectionMobile />
        <LandingCTASection />
        <LandingContactSection />
      </MobileWide>
      <Mobile>
        <LandingHeroMobile />
        <LandingIntroduceSectionMobile />
        <LandingDetailSectionMobile />
        <LandingCTASection />
        <LandingContactSection />
      </Mobile>
    </>
  )
}

export default LandingPage
