import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthComponent from './src/components/Auth';
import HomeComponent from './src/components/Home';
import NotesList from './src/components/NotesProjectComponent/Note/NotesList';
import MainProductList from './src/components/ProductList/MainProductLists';
import ProductList from './src/components/ProductList/ProductList';
import ProductItem from './src/components/ProductItem/ProductItem';
import CreateList from './src/components/CreateList';
import CreateCategory from './src/components/CreateCategory';
import Profile from './src/components/Profile';
import Settings from './src/components/Settings';
import Note from './src/components/NotesProjectComponent/Note/Note';
import NoteEditor from './src/components/NotesProjectComponent/Note/NoteEditor';
import store from './src/redux/store';
import { Provider } from 'react-redux';
import { LabelsContextProvider } from './src/context/LabelsContext/label.context';

function App(): React.JSX.Element {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <LabelsContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Login" component={AuthComponent} />
            <Stack.Screen name="MainProductList" component={MainProductList} />
            <Stack.Screen name="CreateCategory" component={CreateCategory} />
            <Stack.Screen name="ProductItem" component={ProductItem} />
            <Stack.Screen name="CreateList" component={CreateList} />
            <Stack.Screen name="ProductList" component={ProductList} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="NotesList" component={NotesList} />
            <Stack.Screen name="Home" component={HomeComponent} />
            <Stack.Screen name="Note" component={Note} />
            <Stack.Screen name="NoteEditor" component={NoteEditor} />
          </Stack.Navigator>
        </NavigationContainer>
      </LabelsContextProvider>
    </Provider>
  );
}

export default App;
