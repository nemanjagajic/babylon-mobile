import React from 'react'
import AuthLoadingScreen from './screens/AuthLoadingScreen'
import { setConsole } from 'react-query'
import AuthProvider from './providers/AuthProvider'

setConsole({
  log: console.log,
  warn: console.log,
  error: console.log,
})

const App = () => {
  return (
    <AuthProvider>
      <AuthLoadingScreen />
    </AuthProvider>
  )
}

export default App
