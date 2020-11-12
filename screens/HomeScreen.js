import React from 'react'
import { useQuery } from 'react-query'
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native'
import Colors from '../constants/Colors'
import MealsService from '../services/api/MealsService'
import Center from '../components/Center'

const HomeScreen = () => {
  const { data: meals, isLoading } = useQuery('meals', async () => {
    const { data } = await MealsService.getMeals()
    return data?.results
  })

  console.log({ meals })

  if (isLoading) return (
    <Center>
      <ActivityIndicator size={'large'} color={Colors.MAIN} />
    </Center>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.BLACK
  },
  title: {
    fontSize: 28,
    marginBottom: 20
  },
  logoutButton: {
    padding: 10
  }
})

export default HomeScreen