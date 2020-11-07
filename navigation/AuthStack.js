import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../screens/AuthScreen'
import LoginScreen from '../screens/auth/LoginScreen'
import SignUpScreen from '../screens/auth/SignUpScreen'
import Colors from '../constants/Colors'
import { LOGIN_EMAIL } from '../constants/Auth'
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
    />
  </Stack.Navigator>
)

export default AuthStack