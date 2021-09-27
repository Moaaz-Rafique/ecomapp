import * as React from 'react';
import {View, Text, StyleSheet, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DefaultTheme} from 'react-native-paper';
import {Home, LoginScreen, ProductScreen} from './src/Screen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configStore from './src/Redux';
import {SafeAreaView} from 'react-native-safe-area-context';

function App() {
  const Stack = createNativeStackNavigator();
  const isDarkMode = useColorScheme() === 'dark';
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#3498db',
      accent: '#f1c40f',
    },
  };

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const {store, persistor} = configStore();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <SafeAreaView style={styles.container}>
            <Stack.Navigator>
              {/* <Stack.Screen name="Home1" component={HomeScreen} /> */}
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Product" component={ProductScreen} />
            </Stack.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
export default App;
