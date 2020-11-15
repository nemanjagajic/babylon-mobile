import React from 'react'
import { StyleSheet, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen'
import MealScreen from '../screens/meals/MealScreen'
import $t from '../i18n'
import Colors from '../constants/Colors'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import SideDishesScreen from '../screens/meals/SideDishesScreen'
import { HeaderStyleInterpolators } from '@react-navigation/stack';

const Stack = createStackNavigator();

const HomeStack = ({ navigation }) => (
  <View style={styles.container}>
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
      <Stack.Screen
        name={'SideDishesScreen'}
        component={SideDishesScreen}
        options={{
            title: $t('Food.selectSideDishes'),
            headerStyle: {
              backgroundColor: Colors.BACKGROUND,
              shadowColor: 'transparent',
              elevation: 0
            },
            headerTintColor: Colors.MAIN,
            headerStyleInterpolator: HeaderStyleInterpolators.forFade,
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 15 }}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name={'md-arrow-back'} size={24} color={Colors.MAIN} />
              </TouchableOpacity>
            )
          }}
      />
    </Stack.Navigator>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND
  }
})

export default HomeStack