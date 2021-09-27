import {useFocusEffect} from '@react-navigation/core';
import React, {useCallback, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import { Button } from 'react-native-paper';
import {useSelector} from 'react-redux';
import {MenuItem, UserProfile} from '../Components';
import {LoggedOutScreens, permaScreens} from '../Constants/ScreenAuths';

function MenuScreen({navigation}) {
  const user = useSelector(state => state.userReducer.user_details);
  const [myNavScreens, setMyNavScreens] = useState([...permaScreens]);

  useFocusEffect(
    useCallback(() => {
      if (!user) {
        setMyNavScreens([...permaScreens, ...LoggedOutScreens]);
      }
    }, []),
  );
  return (
    <View style={{backgroundColor: 'white'}}>
      <Text>Menu</Text>
      {user ? <UserProfile /> : null}
      <FlatList
        data={myNavScreens}
        renderItem={({item}) => (
          <MenuItem item={item} navigation={navigation} />
        )}
        keyExtractor={link => {
          console.log(link);
          return link.name;
        }}
      />
      <Button onPress={() => console.log(user)}>Show</Button>

    </View>
  );
}

export default MenuScreen;