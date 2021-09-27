import axios from 'axios';
import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {SIGNUP_USER} from '../Constants/apis';
import {SET_USER_DETAILS} from '../Redux/types';
import {BorderedTextInput} from '../Components/SimpleComponents';

function SignupScreen({navigation}) {
  const [username, setUsername] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordMask, setPasswordMask] = useState(true);
  const dispatch = useDispatch();
  const signupUser = async user => {
    try {
      const data = await axios.post(SIGNUP_USER, user);
      if (data?.data?.success) {
        if (data?.data?.newUser) {
          dispatch({type: SET_USER_DETAILS, payload: data.data.data});

          console.log(
            'Congratulations',
            'User Signup was successful',
            'success',
          );
          navigation.navigate('Home');
        } else {
          dispatch({
            type: SET_USER_DETAILS,
            payload: data?.data?.existingData,
          });
          // console.log(data?.data?.existingData);
          console.log(
            'Welcome back ' + data?.data?.existingData?.username,
            '',
            'success',
          );
          navigation.navigate('Home');
        }
      } else {
        console.log(
          'Error in Sign up',
          data?.data?.message || 'unknown Error',

          'error',
        );
      }
    } catch (error) {
      // console.log(error);
      console.log(
        'Error in Sign up',
        error?.response?.data?.message ||
          error?.data?.message ||
          error?.message ||
          'unknown Error',
        'error',
      );
      // swal(err?.message)
    }
  };

  const authAndLoginWithEmail = () => {
    if (!username || !email || !password || !passwordConfirmation) {
      console.log('', 'Please enter enter all info correctly', 'error');
      return;
    } else if (password !== passwordConfirmation) {
      console.log(
        '',
        'Password and Password Confirmation should be same',
        'error',
      );
      return;
    }
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(email)) {
      console.log('', 'Please enter a valid email', 'error');

      return;
    }
    const passwordHash = password;
    const newUser = {
      username,
      email,
      loginType: 'email',
      passwordHash,
      status: 'normal',
    };
    signupUser(newUser);
    // console.log(newUser);
  };

  const sigupWithFacebook = user => {
    console.log('fb return-->', user);
    const newUser = {
      username: user.name,
      id: user.id,
      email: user.email,
      loginType: 'facebook',
      imageUrl: user.picture.data.url,
      status: 'normal',
    };
    signupUser(newUser);
    // console.log(newUser);
  };
  const sigupWithGoogle = e => {
    console.log('google return--->', e);
    const user = e.profileObj;
    const newUser = {
      username: user.name,
      id: user.googleId,
      email: user.email,
      loginType: 'google',
      imageUrl: user.imageUrl,
      status: 'normal',
    };
    signupUser(newUser);
  };
  return (
    <ScrollView>
      <Text>Signup</Text>
      <BorderedTextInput
        placeholder="Enter username"
        value={username}
        onChangeText={e => setUsername(e)}
      />
      <BorderedTextInput
        placeholder="Enter email"
        value={email}
        onChangeText={e => setEmail(e)}
      />
      {/* Password and confirm */}
      <View>
        <BorderedTextInput
          placeholder="Enter password"
          secureTextEntry={true}
          textContentType={'password'}
          value={password}
          onChangeText={e => setPassword(e)}
        />

        <BorderedTextInput
          placeholder="Re-enter password"
          value={passwordConfirmation}
          secureTextEntry={true}
          textContentType={'password'}
          onChangeText={e => setPasswordConfirmation(e)}
        />
      </View>
      <Button onPress={authAndLoginWithEmail}>Create account</Button>
      <Button onPress={() => navigation.navigate('Home')}>Home</Button>
    </ScrollView>
  );
}

export default SignupScreen;