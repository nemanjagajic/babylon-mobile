import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors'

const SideDishesScreen = ({ navigation, route: { params: { sideDishes, selectedSideDishes: initialSideDishes = [] } } }) => {
  const [ selectedSideDishes, setSelectedSideDishes ] = useState(initialSideDishes)
  const [ isChangeMade, setIsChangeMade ] = useState(false)
  const [ initialSideDishesState, setInitialSideDishesState ] = useState(null)

  useEffect(() => {
    setInitialSideDishesState([...initialSideDishes])
  }, [])

  const applySideDishes = () => {
    navigation.navigate('MealScreen', { selectedSideDishes })
  }

  const handleSelection = (sideDish, isSelected) => {
    const updatedSideDishes = isSelected ?
      selectedSideDishes.filter(sd => sd.id !== sideDish.id)
      : [...selectedSideDishes, sideDish]
    setSelectedSideDishes(updatedSideDishes)
    navigation.setParams({ selectedSideDishes: updatedSideDishes })
    const isSideDishesStateChanged = initialSideDishesState.map(sd => sd.id).sort().join('')
      !== updatedSideDishes.map(sd => sd.id).sort().join('')
    setIsChangeMade(isSideDishesStateChanged)
  }

  const renderSideDish = sideDish => {
    const isSelected = selectedSideDishes.find(sd => sd.id === sideDish.id)

    return (
      <TouchableWithoutFeedback
        onPress={() => handleSelection(sideDish, isSelected)}
        key={sideDish?.id}
      >
        <View style={styles.item}>
          <View style={[styles.circle, { backgroundColor: isSelected ? Colors.MAIN : Colors.BLACK_100 }]} />
          <Text style={styles.text}>{sideDish?.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollWrapper}>
        {sideDishes.map(sideDish => renderSideDish(sideDish))}
      </ScrollView>
      <View style={styles.applyContainer}>
        <TouchableOpacity
          style={[styles.applyButton, { backgroundColor: isChangeMade ? Colors.MAIN : Colors.GRAY_400 }]}
          onPress={applySideDishes}
          disabled={!isChangeMade}
        >
          <Text style={styles.applyText}>Apply</Text>
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
  scrollWrapper: {
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
  },
  applyContainer: {
    height: 100,
    borderTopWidth: 1,
    borderColor: Colors.BLACK_100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20
  },
  applyButton: {
    height: 50,
    backgroundColor: Colors.MAIN,
    width: '80%',
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  applyText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.BLACK
  }
})

export default SideDishesScreen