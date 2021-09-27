import axios from 'axios';
import React, { useState } from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import {BorderedTextInput} from '../Components/SimpleComponents';
import { LOGIN_USER } from '../Constants/apis';
import { SET_USER_DETAILS } from '../Redux/types';

function LoginScreen({navigation}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordMask, setPasswordMask] = useState(false);
  const loginHandler = () => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email || !password) {
      console.log('You must enter all info correctly', 'warning');
      return;
    }
    if (!re.test(email)) {
      console.log('Enter Valid Mail', 'error');
      return;
    }
    const passwordHash = password;
    const newUser = {
      email,
      passwordHash,
    };
    loginUser(newUser);
  };
  const loginUser = async user => {
    try {
      console.log(user);
      const userData = await axios.post(LOGIN_USER, user);
      //   console.log(userData);
      if (userData.data.success) {
        dispatch({type: SET_USER_DETAILS, payload: userData.data.data});
        navigation.navigate('Home');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ScrollView>
      <View>
        <BorderedTextInput
          value={email}
          placeholder="Email"
          onChangeText={e => setEmail(e)}
        />
        <BorderedTextInput
          value={password}
          placeholder="Password"
          onChangeText={e => setPassword(e)}
          secureTextEntry={true}
          textContentType={'password'}
        />
        <Button onPress={loginHandler}>Login</Button>
        <Button onPress={() => navigation.navigate('Signup')}>
          Signup Instead
        </Button>
      </View>
    </ScrollView>
  );
}
export default LoginScreen;
