import React, { useState, useContext } from 'react'
import { useMutation } from 'react-query'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, AsyncStorage } from 'react-native'
import authService from '../services/api/AuthService'
import { AuthContext } from '../providers/AuthProvider'
import Colors from '../constants/Colors'
import $t from '../i18n'

const AuthScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.upperContent} />
      <View style={styles.authContent}>
        <View style={styles.authButtonsWrapper}>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen')}
            style={[styles.authButton, styles.loginButton]}
          >
            <Text style={styles.loginText}>{$t('Auth.logIn')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUpScreen')}
            style={styles.authButton}
          >
            <Text style={styles.signupText}>{$t('Auth.signUp')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex'
  },
  upperContent: {
    flex: 3,
    backgroundColor: Colors.MAIN
  },
  authContent: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 20
  },
  authButtonsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30
  },
  authButton: {
    width: '47%',
    backgroundColor: Colors.MAIN,
    height: 60,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.MAIN
  },
  loginButton: {
    backgroundColor: Colors.WHITE,
    borderWidth: 2,
    borderColor: Colors.MAIN
  },
  loginText: {
    fontSize: 20,
    color: Colors.MAIN,
    fontWeight: '500'
  },
  signupText: {
    fontSize: 20,
    color: Colors.WHITE,
    fontWeight: '500'
  },
  googleLoginButton: {
    backgroundColor: Colors.WHITE_200,
    marginTop: 20,
    height: 50,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center'
  },
  googleLogo: {
    width: 35,
    height: 35
  },
  googleText: {
    fontSize: 18,
    color: Colors.GRAY_400,
    flex: 1,
    textAlign: 'center',
    marginLeft: -40,
  }
})

export default AuthScreen