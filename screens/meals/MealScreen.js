import React, { useState, useEffect, useContext } from 'react'
import { useQuery } from 'react-query'
import { View, Text, Image, StyleSheet, TextInput, Platform, TouchableOpacity, Keyboard } from 'react-native'
import Colors from '../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import $t from '../../i18n'
import MealsService from '../../services/api/MealsService'
import {MealsContext} from '../../providers/MealsProvider'

const MealScreen = ({
  navigation,
  route: { params: { selectedFood: { id, picture, name, description, price }, selectedSideDishes = [] } }
}) => {
  const [ showDefault, setShowDefault ] = useState(false)
  const [ comment, setComment ] = useState('')
  const [ count, setCount ] = useState(1)
  const [ isKeyboardVisible, setIsKeyboardVisible ] = useState(false)

  const { data: sideDishes } = useQuery('sideDishes', async () => {
    const { data } = await MealsService.getSideDishes()
    return data?.results
  })

  const { order, setOrder } = useContext(MealsContext)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
      setIsKeyboardVisible(true)
    })
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener && keyboardDidShowListener.remove()
    }
  })

  const openSideDishes = () => {
    navigation.navigate('SideDishesScreen', {
      sideDishes,
      selectedSideDishes
    })
  }

  const handleSetOrder = () => {
    setOrder([...order, {
      meal: { id, picture, name, description, price },
      side_dishes: selectedSideDishes,
      count
    }])
    navigation.navigate('HomeScreen')
  }

  return (
    <View style={styles.container}>
      {!isKeyboardVisible && (
        <Image
          source={{ uri: picture }}
          style={styles.image}
          onLoadStart={() => setShowDefault(true)}
          onLoad={() => setShowDefault(false)}
        />
      )}
      {showDefault && !isKeyboardVisible && (
        <View style={[styles.image, styles.imagePlaceholder]}/>
      )}
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>{`${price * count} rsd`}</Text>
      <TouchableOpacity
        onPress={openSideDishes}
        style={styles.additionsWrapper}
      >
        <View style={styles.additions}>
          <Text style={styles.additionsText}>{$t('Food.chooseAdditions')}</Text>
          <Ionicons name={'ios-arrow-forward'} size={20} color={Colors.WHITE} />
        </View>
        {selectedSideDishes?.length > 0 && (
          <View style={styles.selectedAdditions}>
            {selectedSideDishes.map((sd, i) => {
              return i !== (selectedSideDishes.length - 1) ? (
                <Text key={sd.id} style={styles.selectedAddition}>{`${sd.name}, `}</Text>
              ) : (
                <Text key={sd.id} style={styles.selectedAddition}>{sd.name}</Text>
              )
            })}
          </View>
        )}
      </TouchableOpacity>
      <TextInput
        value={comment}
        onChangeText={text => setComment(text)}
        style={styles.input}
        placeholder={$t('Food.optionalComment')}
        placeholderTextColor={Colors.GRAY}
        color={Platform.OS === 'ios' ? Colors.WHITE : null}
        autoCapitalize={'none'}
      />
      <View style={styles.orderContainer}>
        <View style={styles.orderLeft}>
          <TouchableOpacity
            style={styles.countButton}
            onPress={() => {
              if (count > 1) setCount(count - 1)
            }}
          >
            <Text style={styles.countText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.countNumber}>{ count }</Text>
          <TouchableOpacity
            style={styles.countButton}
            onPress={() => setCount(count + 1)}
          >
            <Text style={styles.countText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleSetOrder}
        >
          <Text style={styles.addButtonText}>{$t('Food.addToCart')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND
  },
  image: {
    width: '100%',
    height: 240
  },
  imagePlaceholder: {
    display: 'flex',
    backgroundColor: Colors.BACKGROUND,
    position: 'absolute',
    zIndex: 1
  },
  title: {
    color: Colors.WHITE,
    fontSize: 24,
    paddingBottom: 10,
    paddingTop: 25,
    paddingLeft: 10
  },
  description: {
    color: Colors.GRAY_200,
    fontSize: 14,
    width: 200,
    paddingLeft: 10
  },
  price: {
    fontSize: 20,
    color: Colors.WHITE,
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 10
  },
  additions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  additionsWrapper: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    padding: 20,
    borderRadius: 15,
    backgroundColor: Colors.BLACK_200
  },
  additionsText: {
    fontSize: 16,
    color: Colors.WHITE
  },
  input: {
    height: 50,
    backgroundColor: Colors.BLACK_200,
    borderRadius: 15,
    paddingLeft: 20,
    marginTop: 20,
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
  },
  orderContainer: {
    width: '100%',
    height: 110,
    backgroundColor: Colors.BLACK_200,
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between'
  },
  countButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 15,
    backgroundColor: Colors.BLACK_100
  },
  countText: {
    fontSize: 20,
    color: Colors.WHITE
  },
  countNumber: {
    fontSize: 22,
    marginLeft: 25,
    marginRight: 25,
    color: Colors.WHITE,
    width: 30,
    textAlign: 'center'
  },
  orderLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButton: {
    width: 120,
    height: 40,
    backgroundColor: Colors.MAIN,
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.BLACK
  },
  selectedAdditions: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
    flexWrap: 'wrap'
  },
  selectedAddition: {
    color: Colors.GRAY
  }
})

export default MealScreen