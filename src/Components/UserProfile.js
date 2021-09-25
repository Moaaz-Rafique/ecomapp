import React from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';

function UserProfile() {
  const user = useSelector(state => state.userReducer.user_details);
  if (!user) return <Text>{'no user'}</Text>;
  return (
    <View
      style={{
        nmargin: 10,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>

      <Text>{user?.username}</Text>
      <Text>{user?.email}</Text>
      <Text>{user?.status}</Text>
      {/*  */}
    </View>
  );
}
export default UserProfile;
