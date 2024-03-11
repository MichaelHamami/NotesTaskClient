import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {FingerprintJsProProvider} from '@fingerprintjs/fingerprintjs-pro-react-native';
import config from './config';

const WrappedApp = () => (
  <FingerprintJsProProvider apiKey={config.FINGERPRINT_API_KEY} region="en">
    <App />
  </FingerprintJsProProvider>
);

AppRegistry.registerComponent(appName, () => WrappedApp);
