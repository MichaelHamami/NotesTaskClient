import React, {useEffect} from 'react';
import {AppRegistry, I18nManager} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {FingerprintJsProProvider} from '@fingerprintjs/fingerprintjs-pro-react-native';
import {MenuProvider} from 'react-native-popup-menu';
import config from './config';

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
    <MenuProvider>
      <FingerprintJsProProvider apiKey={config.FINGERPRINT_API_KEY} region="en">
        <App />
      </FingerprintJsProProvider>
    </MenuProvider>
  );
};

AppRegistry.registerComponent(appName, () => WrappedApp);
