import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../screens/AuthScreen'
import LoginScreen from '../screens/auth/LoginScreen'
import SignUpScreen from '../screens/auth/SignUpScreen'
import Colors from '../constants/Colors'
import {LOGIN_EMAIL, REGISTER_EMAIL, REGISTER_USER_DATA} from '../constants/Auth'
import { Ionicons } from '@expo/vector-icons';
import $t from '../i18n'

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={'AuthScreen'}
      component={AuthScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={'LoginScreen'}
      component={LoginScreen}
      options={({ navigation, route }) => ({
        title: $t('Auth.loginTitle'),
        headerStyle: {
          backgroundColor: Colors.BACKGROUND,
          shadowColor: 'transparent',
          elevation: 0
        },
        headerLeft: () => (
          <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={() => {
              route.params?.step === LOGIN_EMAIL
                ? navigation.goBack()
                : navigation.setParams({ step: LOGIN_EMAIL })
            }}
          >
            <Ionicons name={'md-arrow-back'} size={24} />
          </TouchableOpacity>
        )
      })}
    />
    <Stack.Screen
      name={'SignUpScreen'}
      component={SignUpScreen}
      options={({ navigation, route }) => ({
        title: $t('Auth.signUp'),
        headerStyle: {
          backgroundColor: Colors.BACKGROUND,
          shadowColor: 'transparent',
          elevation: 0
        },
        headerLeft: () => (
          <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={() => {
              const step = route.params?.step
              if (step === REGISTER_EMAIL) {
                navigation.goBack()
              } else if (step === REGISTER_USER_DATA) {
                navigation.setParams({ step: REGISTER_EMAIL })
              } else {
                navigation.setParams({ step: REGISTER_USER_DATA })
              }
            }}
          >
            <Ionicons name={'md-arrow-back'} size={24} />
          </TouchableOpacity>
        )
      })}
    />
  </Stack.Navigator>
)

export default AuthStack