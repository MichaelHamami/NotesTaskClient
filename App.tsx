import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthComponent from './src/components/Auth';
import HomeComponent from './src/components/Home';


function App(): React.JSX.Element {
  console.log("APP Called");
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeComponent} />
        <Stack.Screen name="Login" component={AuthComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
