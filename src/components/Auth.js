import React, {useEffect, useState} from 'react';
import {View, Button, StyleSheet, TextInput, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {signUp, login} from 'api/auth.api';
import {getUserInfo} from 'api/user.api';
import {addUser} from 'redux/actions/user.actions';
import {useLabelsContext} from 'context/LabelsContext/label.context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';

const AuthComponent = ({navigation}) => {
  const labels = useLabelsContext();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const savedUsername = await AsyncStorage.getItem('username');
        const savedPassword = await AsyncStorage.getItem('password');
        if (!savedUsername || !savedPassword) {
          setIsLoading(false);
          return;
        }
        performLoginOrSignup(true, {username: savedUsername, password: savedPassword});
        setIsLoading(false);
      } catch (e) {
        console.error('Failed to load credentials', e);
        setIsLoading(false);
      }
    };

    loadCredentials();
  }, []);

  const handleAuthAction = async isLogin => {
    setErrorMessage('');

    if (!username || !password) {
      setErrorMessage(labels.usernameAndPasswordRequired);
      return;
    }

    if (rememberMe) {
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('password', password);
    } else {
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('password');
    }
    performLoginOrSignup(isLogin, {username, password});
  };

  const fetchUserInfo = async () => {
    try {
      const user = await getUserInfo();
      if (!user) return;

      dispatch(addUser(user));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSuccessAuthAction = async () => {
    await fetchUserInfo();
  };

  const performLoginOrSignup = async (isLogin, data) => {
    try {
      const response = isLogin ? await login(data) : await signUp(data);
      await handleSuccessAuthAction();
      navigation.navigate('MainProductList');
    } catch (error) {
      setErrorMessage(labels.defaultAuthErrorMessage);
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('password');
    }
  };

  if (isLoading) {
    return <Text>{labels.loading}...</Text>;
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder={labels.userName} value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder={labels.password} value={password} onChangeText={setPassword} />
      <View style={styles.checkboxContainer}>
        <CheckBox value={rememberMe} onValueChange={setRememberMe} />
        <Text style={styles.label}>{labels.rememberMe}</Text>
      </View>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <Button title={labels.login} onPress={() => handleAuthAction(true)} />
      <Button title={labels.signup} onPress={() => handleAuthAction(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    gap: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    margin: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
});
export default AuthComponent;
