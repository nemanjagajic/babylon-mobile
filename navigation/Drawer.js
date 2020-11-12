import React from 'react'
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen'
import Colors from '../constants/Colors'
import $t from '../i18n'
import Logout from '../screens/auth/Logout'

const Drawer = createDrawerNavigator();

export default () => {
  return (
      <Drawer.Navigator
        initialRouteName={'HomeScreen'}
        drawerContentOptions={{
          activeTintColor: Colors.MAIN,
          activeBackgroundColor: Colors.BLACK,
          inactiveTintColor: Colors.WHITE,
          labelStyle:{
            marginLeft: 5
          },
          backgroundColor: Colors.BLACK_200
        }}
      >
        <Drawer.Screen
          name={'HomeScreen'}
          component={HomeScreen}
          options={{
            title: $t('Food.title'),
            headerStyle: {
              backgroundColor: Colors.BACKGROUND,
              shadowColor: 'transparent',
              elevation: 0
            },
            headerTintColor: Colors.MAIN
          }}
        />
        <Drawer.Screen
          name={'Logout'}
          component={Logout}
          options={{
            title: 'Logout',
            headerStyle: {
              backgroundColor: Colors.BACKGROUND,
              shadowColor: 'transparent',
              elevation: 0
            },
            headerTintColor: Colors.MAIN
          }}
        />
      </Drawer.Navigator>
  );
}