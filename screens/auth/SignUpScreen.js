import React, { useState, useEffect, useContext } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native'
import $t from '../../i18n'
import Colors from '../../constants/Colors'
import ButtonStep from '../../components/buttons/ButtonStep'
import { REGISTER_EMAIL, REGISTER_PASSWORD, REGISTER_USER_DATA } from '../../constants/Auth'
import { Ionicons } from '@expo/vector-icons'
import {useMutation} from 'react-query'
import authService from '../../services/api/AuthService'
import {AuthContext} from '../../providers/AuthProvider'

const MIN_PASSWORD_LENGTH = 8

const SignUpScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const { setUser } = useContext(AuthContext)

  const [login,  { isLoading: loginInProgress }] = useMutation(authService.logIn, {
    onSuccess: ({ data }) => {
      AsyncStorage.setItem('user', JSON.stringify(data))
      setUser(data)
    }
  })

  const [register,  { isLoading: registerInProgress }] = useMutation(authService.register, {
    onSuccess: () => login({ email, password })
  })
  
  useEffect(() => {
    navigation.setParams({ step: REGISTER_EMAIL })
  }, [])

  const handleButtonStepPressed = () => {
    if (isButtonDisabled()) return
    const step = route.params?.step
    if (step === REGISTER_EMAIL) {
      navigation.setParams({ step: REGISTER_USER_DATA })
    } else if (step === REGISTER_USER_DATA) {
      navigation.setParams({ step: REGISTER_PASSWORD })
    } else {
      register({ email, password })
    }
  }

  const isEmailValid = () => /\S+@\S+\.\S+/.test(email)
  const isPasswordValid = () => password.length >= MIN_PASSWORD_LENGTH
  const isFullNameValid = () => firstName.trim() !== '' && lastName.trim() !== ''

  const isButtonDisabled = () => {
    return loginInProgress
      || registerInProgress
      || !isEmailValid()
      || (step === REGISTER_USER_DATA && !isFullNameValid())
      || (step === REGISTER_PASSWORD && !isPasswordValid())
  }

  const step = route.params?.step

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.container}
      keyboardVerticalOffset={90}
    >
      {step === REGISTER_EMAIL && (
        <View style={styles.contentContainer}>
          <Text style={styles.enterText}>{$t('Auth.enterEmail')}</Text>
          <TextInput
            value={email}
            style={styles.input}
            onChangeText={text => setEmail(text)}
            placeholder={$t('Auth.email')}
            placeholderTextColor={Colors.GRAY}
            color={Platform.OS === 'ios' ? Colors.WHITE : null}
            autoCapitalize={'none'}
            onSubmitEditing={handleButtonStepPressed}
            autoFocus={true}
          />
          <Text style={styles.inputDescription}>
            Please enter <Text style={{ color: isEmailValid() ? Colors.ACCENT : Colors.RED }}>valid</Text> email format
          </Text>
        </View>
      )}
      {step === REGISTER_USER_DATA && (
        <View style={styles.contentContainer}>
          <Text style={styles.enterText}>{$t('Auth.enterFullName')}</Text>
          <TextInput
            value={firstName}
            style={styles.input}
            onChangeText={text => setFirstName(text)}
            placeholder={$t('Auth.firstName')}
            placeholderTextColor={Colors.GRAY}
            color={Platform.OS === 'ios' ? Colors.WHITE : null}
            onSubmitEditing={handleButtonStepPressed}
            autoFocus={true}
          />
          <TextInput
            value={lastName}
            style={styles.input}
            onChangeText={text => setLastName(text)}
            placeholder={$t('Auth.lastName')}
            placeholderTextColor={Colors.GRAY}
            color={Platform.OS === 'ios' ? Colors.WHITE : null}
            onSubmitEditing={handleButtonStepPressed}
          />
          <Text style={styles.inputDescription}>
            Both fields must be <Text style={{ color: isFullNameValid() ? Colors.ACCENT : Colors.RED }}>populated</Text>
          </Text>
        </View>
      )}
      {step === REGISTER_PASSWORD && (
        <View style={styles.contentContainer}>
          <Text style={styles.enterText}>{$t('Auth.enterPassword')}</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              value={password}
              secureTextEntry={!showPassword}
              style={styles.inputPassword}
              onChangeText={text => setPassword(text)}
              placeholder={$t('Auth.password')}
              placeholderTextColor={Colors.GRAY}
              color={Platform.OS === 'ios' ? Colors.WHITE : null}
              onSubmitEditing={handleButtonStepPressed}
              autoFocus={true}
            />
            {showPassword ? (
              <TouchableOpacity
                onPress={() => setShowPassword(false)}
              >
                <Ionicons name={'md-eye-off'} size={24} color={Colors.MAIN} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setShowPassword(true)}
              >
                <Ionicons name={'md-eye'} size={24} color={Colors.MAIN} />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.inputDescription}>
            Password must be at least
            <Text style={{ color: isPasswordValid() ? Colors.ACCENT : Colors.RED }}> {MIN_PASSWORD_LENGTH} characters</Text> long
          </Text>
        </View>
      )}
      <View style={styles.bottomContainer}>
        <View style={styles.circlesWrapper}>
          <View style={[styles.circle, step === REGISTER_EMAIL ? styles.circleSelected : null]} />
          <View style={[styles.circle, step === REGISTER_USER_DATA ? styles.circleSelected : null]} />
          <View style={[styles.circle, step === REGISTER_PASSWORD ? styles.circleSelected : null]} />
        </View>
        <ButtonStep disabled={isButtonDisabled()} inProgress={loginInProgress || registerInProgress} onPress={handleButtonStepPressed} />
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    paddingHorizontal: 20,
    paddingTop: 50
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.BLACK_100,
    borderRadius: 20,
    paddingLeft: 10,
    marginTop: 20,
    fontSize: 18
  },
  inputPassword: {
    width: '85%',
    height: 50,
    backgroundColor: Colors.BLACK_100,
    borderRadius: 20,
    paddingLeft: 10,
    fontSize: 18
  },
  enterText: {
    fontSize: 20,
    paddingLeft: 5,
    color: Colors.BLACK,
  },
  contentContainer: {
    flex: 5
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20
  },
  circlesWrapper: {
    flex: 1,
    height: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 60
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: Colors.GRAY_200,
    margin: 5
  },
  circleSelected: {
    backgroundColor: Colors.MAIN
  },
  inputDescription: {
    fontSize: 15,
    marginTop: 30,
    paddingLeft: 5,
    color: Colors.GRAY_500
  },
  passwordContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
    paddingRight: 10
  }
})

export default SignUpScreen