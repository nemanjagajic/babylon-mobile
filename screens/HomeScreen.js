import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import Colors from '../constants/Colors'
import MealsService from '../services/api/MealsService'
import Center from '../components/Center'
import MealItem from '../components/meals/MealItem'
import { MealsContext } from '../providers/MealsProvider'
import $t from '../i18n'

const HomeScreen = ({ navigation }) => {
  const { data: meals, isLoading } = useQuery('meals', async () => {
    const { data } = await MealsService.getMeals()
    return data?.results
  })

  const { order } = useContext(MealsContext)

  const isButtonVisible = order?.length > 0
  const itemsCount = order?.length > 0 && order.reduce((currentValue, order) => order.count + currentValue, 0)
  const totalPrice = order?.length > 0 && order.reduce((currentValue, order) => (order.meal?.price * order.count) + currentValue, 0)

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
        renderItem={({ item, index }) => (
          <MealItem isLast={index === (meals.length - 1)} isButtonVisible={isButtonVisible} {...item} navigation={navigation} />
        )}
        keyExtractor={item => item?.id?.toString()}
      />
      {isButtonVisible && (
        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => {
            // TODO Implement this
            console.log('here make order')
          }}
        >
          <View style={styles.orderSideItem}>
            <View style={styles.orderSideItemLeft}>
              <Text style={[styles.orderItem, { color: Colors.WHITE }]}>{itemsCount}</Text>
            </View>
          </View>
          <Text style={styles.orderItem}>{$t('Food.makeOrder')}</Text>
          <Text style={[styles.orderItem, styles.orderSideItem, styles.orderSideItemRight]}>{`${totalPrice} rsd`}</Text>
        </TouchableOpacity>
      )}
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
  },
  orderButton: {
    position: 'absolute',
    bottom: 40,
    width: '90%',
    height: 60,
    backgroundColor: Colors.MAIN,
    borderRadius: 15,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  orderSideItem: {
    minWidth: 70,
  },
  orderItem: {
    color: Colors.BLACK,
    fontWeight: '600',
    fontSize: 16,
  },
  orderSideItemLeft: {
    width: 25,
    height: 25,
    backgroundColor: Colors.BLACK,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  orderSideItemRight: {
    textAlign: 'right'
  }
})

export default HomeScreen