import React, { useEffect } from 'react';
import { AppRegistry, I18nManager } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { MenuProvider } from 'react-native-popup-menu';

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
      <App />
    </MenuProvider>
  );
};

AppRegistry.registerComponent(appName, () => WrappedApp);
