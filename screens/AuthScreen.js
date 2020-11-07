import React, { useState, useContext } from 'react'
import { useMutation } from 'react-query'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, AsyncStorage } from 'react-native'
import authService from '../services/api/AuthService'
import { AuthContext } from '../providers/AuthProvider'

const AuthScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setUser } = useContext(AuthContext)

  const [login] = useMutation(authService.logIn, {
    onSuccess: ({ data }) => {
      AsyncStorage.setItem('user', JSON.stringify(data))
      setUser(data)
    }
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Auth Screen</Text>
      <TextInput
        style={styles.input}
        placeholder={'email'}
        value={email}
        onChangeText={text => setEmail(text)}
        autoCapitalize={'none'}
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder={'password'}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity
        onPress={() => login({ email, password })}
      >
        <Text style={styles.loginButton}>Log in</Text>
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
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 7,
    margin: 5,
    padding: 10
  },
  loginButton: {
    padding: 10
  }
})

export default AuthScreen