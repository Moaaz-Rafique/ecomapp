import {useFocusEffect} from '@react-navigation/core';
import React, {useCallback, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {MenuItem} from '../Components';
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
    <View>
      <Text>Menu</Text>
      <FlatList
        data={myNavScreens}
        renderItem={({item}) => (
          <MenuItem item={item} navigation={navigation} />
        )}
        keyExtractor={link => {          
          console.log(link)
          return link.name
        }}
      />
    </View>
  );
}

export default MenuScreen;
