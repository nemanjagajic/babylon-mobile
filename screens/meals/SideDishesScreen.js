import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors'

const SideDishesScreen = ({ navigation, route: { params: { sideDishes, selectedSideDishes: initialSideDishes = [] } } }) => {
  const [ selectedSideDishes, setSelectedSideDishes ] = useState(initialSideDishes)

  const renderSideDish = sideDish => {
    const isSelected = selectedSideDishes.find(sd => sd.id === sideDish.id)

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          const updatedSideDishes = isSelected ?
            selectedSideDishes.filter(sd => sd.id !== sideDish.id)
            : [...selectedSideDishes, sideDish]
          setSelectedSideDishes(updatedSideDishes)
          navigation.setParams({ selectedSideDishes: updatedSideDishes })
        }}
        key={sideDish?.id}
      >
        <View style={[styles.circle, { backgroundColor: isSelected ? Colors.MAIN : Colors.BLACK_100 }]} />
        <Text style={styles.text}>{sideDish?.name}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <ScrollView style={styles.container}>
      {sideDishes.map(sideDish => renderSideDish(sideDish))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    paddingHorizontal: 15,
    paddingBottom: 50
  },
  item: {
    backgroundColor: Colors.BLACK_200,
    marginTop: 10,
    marginBottom: 10,
    padding: 15,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  circle: {
    borderRadius: 100,
    width: 15,
    height: 15,
    marginRight: 20
  },
  text: {
    color: Colors.WHITE,
    fontSize: 16
  }
})

export default SideDishesScreen