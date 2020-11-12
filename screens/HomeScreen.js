import React from 'react'
import { useQuery } from 'react-query'
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image } from 'react-native'
import Colors from '../constants/Colors'
import MealsService from '../services/api/MealsService'
import Center from '../components/Center'
import MealItem from '../components/meals/MealItem'

const HomeScreen = ({ navigation }) => {
  const { data: meals, isLoading } = useQuery('meals', async () => {
    const { data } = await MealsService.getMeals()
    return data?.results
  })

  if (isLoading) return (
    <Center>
      <ActivityIndicator size={'large'} color={Colors.MAIN} />
    </Center>
  )

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.listContainer}
        data={meals}
        renderItem={({ item }) => <MealItem {...item} navigation={navigation} />}
        keyExtractor={item => item?.id?.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.BLACK,
    width: '100%'
  },
  title: {
    fontSize: 28,
    marginBottom: 20
  },
  logoutButton: {
    padding: 10
  },
  listContainer: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 15
  }
})

export default HomeScreen