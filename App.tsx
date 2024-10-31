import React, { useEffect } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { Provider } from 'react-redux';
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
import { LabelsContextProvider, NoteEditorContextProvider } from './src/context';
import { navigationRef, navigate } from './src/services/navigation';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  useEffect(() => {
    // Listen for the intent data from native side
    const subscription = DeviceEventEmitter.addListener('intentData', intentData => {
      const { screenName, noteId } = intentData;
      if (screenName === 'Note') {
        navigate(screenName, { noteId: noteId });
      }
    });

    return () => subscription.remove();
  }, []);

  return (
    <Provider store={store}>
      <LabelsContextProvider>
        <NoteEditorContextProvider>
          <NavigationContainer ref={navigationRef}>
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
        </NoteEditorContextProvider>
      </LabelsContextProvider>
    </Provider>
  );
}

export default App;
