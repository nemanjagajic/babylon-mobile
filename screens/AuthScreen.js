import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Colors from '../constants/Colors'
import $t from '../i18n'
import babylonLogo from '../assets/babylon-logo.jpg'
import googleLogo from '../assets/google-logo.png'

const AuthScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.upperContent}>
        <Image source={babylonLogo} style={styles.icon} />
        <Text>
          <Text style={styles.header}>Babylon </Text>
          <Text style={styles.description}>Delivery</Text>
        </Text>
      </View>
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
        <TouchableOpacity
          onPress={() => {}}
          style={styles.googleLoginButton}
        >
          <Image style={styles.googleLogo} source={googleLogo} />
          <Text style={styles.googleText}>{$t('Auth.loginWithGoogle')}</Text>
        </TouchableOpacity>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.BLACK_TRUE
  },
  authContent: {
    height: 220,
    backgroundColor: Colors.BLACK_TRUE,
    paddingHorizontal: 20,
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
    borderWidth: 1,
    borderColor: Colors.MAIN
  },
  loginButton: {
    backgroundColor: Colors.BLACK,
    borderWidth: 1,
    borderColor: Colors.MAIN
  },
  loginText: {
    fontSize: 18,
    color: Colors.MAIN,
    fontWeight: '500'
  },
  signupText: {
    fontSize: 18,
    color: Colors.BLACK,
    fontWeight: '500'
  },
  icon: {
    width: 200,
    height: 200,
    borderRadius: 100
  },
  header: {
    color: Colors.MAIN,
    fontSize: 32,
    letterSpacing: 3
  },
  description: {
    color: Colors.WHITE,
    fontSize: 32,
    paddingHorizontal: 20,
    textAlign: 'center'
  },
  googleLoginButton: {
    backgroundColor: Colors.BLACK,
    marginTop: 30,
    height: 50,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
  },
  googleLogo: {
    width: 25,
    height: 25,
    marginLeft: 5
  },
  googleText: {
    fontSize: 16,
    color: Colors.WHITE,
    flex: 1,
    textAlign: 'center',
    marginLeft: -40,
  }
})

export default AuthScreen