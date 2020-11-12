import React from 'react'
import { View, StyleSheet } from "react-native"
import Colors from '../constants/Colors'

const Center = ({ children }) => (
  (
    <View style={styles.container}>
      {children}
    </View>
  )
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BACKGROUND
  }
})

export default Center