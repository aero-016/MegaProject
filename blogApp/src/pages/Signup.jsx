import React from 'react'
import {Signup as SignupComponent} from "../components"
function Signup() {
  console.log("In sign up Page")
  return (
    <div className='py-8'>
        <SignupComponent/>
    </div>
  )
}

export default Signup