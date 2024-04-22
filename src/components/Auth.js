import React, {useEffect} from 'react';
import {View, Button, Alert} from 'react-native';
import TouchID from 'react-native-touch-id';
import {useVisitorData} from '@fingerprintjs/fingerprintjs-pro-react-native';
import {signUp, login} from '../api/auth.api';

const AuthComponent = ({navigation}) => {
  const {data, getData} = useVisitorData();
  useEffect(() => {
    getData();
  }, []);

  const handleLogin = async isLogin => {
    try {
      const supportOptionalConfigObject = {
        unifiedErrors: false,
      };

      const optionalConfigObject = {
        unifiedErrors: false,
        title: 'someTitle',
        imageColor: 'red',
        imageErrorColor: 'black',
        sensorDescription: 'sensor description',
        sensorErrorDescription: 'error description',
        cancelText: 'cancel button text',
      };

      const isSupported = await TouchID.isSupported(supportOptionalConfigObject);

      if (isSupported) {
        const touchIDResponse = await TouchID.authenticate('Authenticate with Touch ID', optionalConfigObject);
        if (touchIDResponse && data.visitorFound) {
          performLoginOrSignup(isLogin, data.visitorId);
        } else {
          Alert.alert('Authentication Failed', 'Please try again or enter your username and passworasdasd.');
        }
      } else {
        Alert.alert('Touch ID Not Supported', 'Please enter your username and password.');
      }
    } catch (error) {
      console.error('Touch ID Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again or enter your username and password.');
    }
  };

  const performLoginOrSignup = async (isLogin, fingerprint) => {
    console.log(`'Performing ${isLogin ? 'login' : 'signup'}...'`);
    try {
      const response = (await isLogin) ? login(fingerprint) : signUp(fingerprint);

      console.log('request successful:', response);
      navigation.navigate('Home');
    } catch (error) {
      console.log('request failed:', error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
      }}>
      <Button title="Login" onPress={() => handleLogin(true)} />
      <Button title="Signup" onPress={() => handleLogin(false)} />
    </View>
  );
};

export default AuthComponent;
