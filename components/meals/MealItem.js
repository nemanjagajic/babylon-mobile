import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors'

const MealItem = ({ picture, name, description, price, navigation }) => {
  const [ showDefault, setShowDefault ] = useState(false)

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('MealScreen', { selectedFood: { picture, name, description, price } })
      }}
    >
      {showDefault && (
        <View style={[styles.image, styles.imagePlaceholder]}>
          <Text style={styles.placeholderText}>{name && name[0]}</Text>
        </View>
      )}
      <Image
        source={{ uri: picture }}
        style={styles.image}
        onLoadStart={() => setShowDefault(true)}
        onLoad={() => setShowDefault(false)}
      />
      <View style={styles.contentLeft}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>{`${price} rsd`}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BLACK_200,
    width: '100%',
    height: 120,
    marginTop: 25,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  contentLeft: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  title: {
    color: Colors.WHITE,
    fontSize: 20,
    paddingBottom: 5
  },
  description: {
    color: Colors.GRAY_200,
    fontSize: 12,
    width: 200
  },
  price: {
    color: Colors.GRAY_200,
    fontSize: 16,
    position: 'absolute',
    bottom: 10,
    left: 10
  },
  image: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  imagePlaceholder: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.BLACK_300,
    position: 'absolute',
    zIndex: 1
  },
  placeholderText: {
    fontSize: 25,
    color: Colors.GRAY
  }
})

export default MealItem