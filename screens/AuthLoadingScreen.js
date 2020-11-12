import React, {useContext, useEffect, useState} from 'react'
import {ActivityIndicator, AsyncStorage} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Center from '../components/Center'
import { AuthContext } from '../providers/AuthProvider'
import AuthStack from '../navigation/AuthStack'
import Drawer from '../navigation/Drawer'
import Colors from '../constants/Colors'

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
      <ActivityIndicator size={'large'} color={Colors.MAIN} />
    </Center>
  )

  return (
    <NavigationContainer>
      {user ? (
        <Drawer />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  )
}

export default AuthLoadingScreen