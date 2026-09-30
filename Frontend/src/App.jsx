import React from 'react'
import { RouterProvider } from "react-router"
import { router } from "../app.route"
import { Authprovider } from './Features/auth/auth.context'
import { InterviewProvider } from './Features/interview/interview.context'
const App = () => {
  return (
   <>
   <Authprovider>
    <InterviewProvider>
  <RouterProvider router={router} />
  </InterviewProvider>
  </Authprovider>
   </>
  )
}

export default App