import React, { useContext, useEffect } from 'react'
import {AsyncStorage, StyleSheet, View} from 'react-native'
import { AuthContext } from '../../providers/AuthProvider'
import Colors from '../../constants/Colors'

const Logout = () => {
  const { setUser } = useContext(AuthContext)

  useEffect(() => {
    logOut()
  }, [])

  const logOut = () => {
    AsyncStorage.removeItem('user')
    setUser(null)
  }
  return (
    <View style={styles.container} />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK
  },
})

export default Logout