import React from 'react'
import { StyleSheet, TouchableOpacity, ActivityIndicator, Text } from 'react-native'
import Colors from '../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'


const ButtonStep = ({ onPress, inProgress = false, disabled = false }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress} style={[styles.container, disabled ? styles.disabledButton : null]}
    >
      {inProgress ? (
        <ActivityIndicator size="small" color={Colors.WHITE} />
      ) : (
        <Ionicons name={'md-arrow-forward'} size={24} color={Colors.WHITE} />
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: Colors.MAIN,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  disabledButton: {
    backgroundColor: Colors.GRAY_100
  }
})

export default ButtonStep