import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Colors from '../constants/Colors'
import Logout from '../screens/auth/Logout'
import HomeStack from './HomeStack'
import $t from '../i18n'

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
          options={{
            title: $t('Food.title')
          }}
        />
        <Drawer.Screen
          name={'Logout'}
          component={Logout}
        />
      </Drawer.Navigator>
  );
}