import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthComponent from './src/components/Auth';
import HomeComponent from './src/components/Home';
import NotesList from './src/components/NotesList';
import store from './src/redux/store';
import {Provider} from 'react-redux';

function App(): React.JSX.Element {
  console.log('APP Called');
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="NotesList" component={NotesList} />
          <Stack.Screen name="Home" component={HomeComponent} />
          <Stack.Screen name="Login" component={AuthComponent} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
