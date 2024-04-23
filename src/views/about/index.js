import React from 'react'
import CaptionAboutus from './CaptionAboutus/CaptionAboutus.js'
import AboutUS from './AboutUs/AboutUS.js'

const About = () => {
  return (
    <>
      <CaptionAboutus />
      <AboutUS />
    </>
  )
}

export default React.memo(About)
