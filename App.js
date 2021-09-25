import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DefaultTheme} from 'react-native-paper';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configStore from './src/Redux';
import NavigationScreensContainer from './src/NavigationScreensContainer';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {Text, View} from 'react-native';
function App() {
  const {store, persistor} = configStore();
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId:
      '625880864683-85eas2jrtq1p5smbsr9s7md2ttfge44u.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  });
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log({userInfo});
    } catch (error) {
      console.log(error.message);
      // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      //   // user cancelled the login flow
      // } else if (error.code === statusCodes.IN_PROGRESS) {
      //   // operation (e.g. sign in) is in progress already
      // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      //   // play services not available or outdated
      // } else {
      //   // some other error happened
      // }
    }
  };
  return (
    <View>
      <Text onPress={signIn}>Sign in</Text>
    </View>
    // <Provider store={store}>
    //   <PersistGate loading={null} persistor={persistor}>
    //     <NavigationScreensContainer />
    //   </PersistGate>
    // </Provider>
  );
}
export default App;
