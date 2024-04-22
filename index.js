import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {I18nManager} from 'react-native';
import {FingerprintJsProProvider} from '@fingerprintjs/fingerprintjs-pro-react-native';
import config from './config';
import React, {useEffect} from 'react';

const WrappedApp = () => {
  const isRTL = I18nManager.isRTL;
  useEffect(() => {
    if (isRTL) {
      I18nManager.forceRTL(true);
    } else {
      I18nManager.forceRTL(false);
    }
  }, [isRTL]);

  return (
    <FingerprintJsProProvider apiKey={config.FINGERPRINT_API_KEY} region="en">
      <App />
    </FingerprintJsProProvider>
  );
};

AppRegistry.registerComponent(appName, () => WrappedApp);
