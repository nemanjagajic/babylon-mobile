import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native'
import {AuthContext} from '../providers/AuthProvider'

const HomeScreen = () => {
  const { setUser } = useContext(AuthContext)

  const logOut = () => {
    AsyncStorage.removeItem('user')
    setUser(null)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <TouchableOpacity
        onPress={logOut}
        style={styles.logoutButton}
      >
        <Text>Log out</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 28,
    marginBottom: 20
  },
  logoutButton: {
    padding: 10
  }
})

export default HomeScreen