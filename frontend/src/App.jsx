import React from 'react'
import Routers from './routers/Routers'
import Recaptcha from './captcha/ReCAPTCHA'

const App = () => {
  return (
     <div className='bg-dark-900'>
        <Routers />
        {/* <Recaptcha/> */}
     </div>
  )
}

export default App
