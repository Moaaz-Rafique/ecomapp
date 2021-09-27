import React from 'react';
import {Text, View} from 'react-native';
import {Avatar} from 'react-native-paper';
import {useSelector} from 'react-redux';

function CustomNavigationBar({navigation}) {
  const user = useSelector(state => state.userReducer.user_details);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
      }}>
      <Text
        style={{fontSize: 30, fontWeight: 'bold', color: '#FF2A44'}}
        onPress={() => navigation.navigate('Home')}>
        E<Text style={{color: '#000'}}>-com</Text>
      </Text>
      <Text onPress={() => navigation.navigate('Menu')}>
        <Avatar.Image
          icon="account"
          size={40}
          source={{
            icon: 'home',
            uri:
              user?.imageUrl ||
              'https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_grey_512dp.png',
          }}
        />
      </Text>
    </View>
  );
}
export default CustomNavigationBar;