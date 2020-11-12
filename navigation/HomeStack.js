import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen'
import MealScreen from '../screens/meals/MealScreen'
import $t from '../i18n'
import Colors from '../constants/Colors'
import {TouchableOpacity} from 'react-native'
import {Ionicons} from '@expo/vector-icons'

const Stack = createStackNavigator();

const HomeStack = ({ navigation, route }) => (
  <Stack.Navigator>
    <Stack.Screen
      name={'HomeScreen'}
      component={HomeScreen}
      options={{
        title: $t('Food.title'),
        headerStyle: {
          backgroundColor: Colors.BACKGROUND,
          shadowColor: 'transparent',
          elevation: 0
        },
        headerTintColor: Colors.MAIN,
        headerLeft: () => (
          <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={navigation.openDrawer}
          >
            <Ionicons name={'md-menu'} size={24} color={Colors.MAIN} />
          </TouchableOpacity>
        )
      }}
    />
    <Stack.Screen
      name={'MealScreen'}
      component={MealScreen}
      options={{
        title: '',
        headerStyle: {
          backgroundColor: Colors.BACKGROUND,
          shadowColor: 'transparent',
          elevation: 0
        },
        headerTintColor: Colors.MAIN,
        headerLeft: () => (
          <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={navigation.goBack}
          >
            <Ionicons name={'md-arrow-back'} size={24} color={Colors.MAIN} />
          </TouchableOpacity>
        )
      }}
    />
  </Stack.Navigator>
)

export default HomeStack