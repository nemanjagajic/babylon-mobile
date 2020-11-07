import React, {useContext, useEffect, useState} from 'react'
import {ActivityIndicator, AsyncStorage} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Center from '../components/Center'
import AuthScreen from './AuthScreen'
import HomeScreen from './HomeScreen'
import { AuthContext } from '../providers/AuthProvider'

const AuthLoadingScreen = () => {
  const [isLoadingUser, setIsLoadingUser] = useState(true)

  const { user, setUser } = useContext(AuthContext)

  useEffect(() => {
    checkLoggedUser()
  }, [])

  const checkLoggedUser = async () => {
    try {
      const userString = await AsyncStorage.getItem('user')
      if (userString) setUser(JSON.parse(userString))
      setIsLoadingUser(false)
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoadingUser) return (
    <Center>
      <ActivityIndicator size={'large'} />
    </Center>
  )

  return (
    <NavigationContainer>
      {user ? (
        <HomeScreen />
      ) : (
        <AuthScreen />
      )}
    </NavigationContainer>
  )
}

export default AuthLoadingScreen