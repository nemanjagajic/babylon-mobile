import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen'
import Colors from '../constants/Colors'
import $t from '../i18n'
import Logout from '../screens/auth/Logout'
import HomeStack from './HomeStack'

const Drawer = createDrawerNavigator();

export default () => {
  return (
      <Drawer.Navigator
        initialRouteName={'HomeStack'}
        drawerContentOptions={{
          activeTintColor: Colors.MAIN,
          activeBackgroundColor: Colors.BLACK,
          inactiveTintColor: Colors.WHITE,
          labelStyle:{
            marginLeft: 5
          },
          backgroundColor: Colors.BLACK_200,
        }}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Drawer.Screen
          name={'HomeStack'}
          component={HomeStack}
        />
        <Drawer.Screen
          name={'Logout'}
          component={Logout}
        />
      </Drawer.Navigator>
  );
}