import React from 'react'
import LogoImage from "../assets/logo.svg"

function Logo({width='100px'}) {
  return (
      <img className='h-12' src={LogoImage}/>
  )
}

export default Logo