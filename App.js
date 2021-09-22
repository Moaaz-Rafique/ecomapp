import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DefaultTheme} from 'react-native-paper';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configStore from './src/Redux';
import NavigationScreensContainer from './src/NavigationScreensContainer';

function App() {
 
 
  const {store, persistor} = configStore();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationScreensContainer />
      </PersistGate>
    </Provider>
  );
}
export default App;
