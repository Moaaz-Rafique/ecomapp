import React from 'react';
import {Text} from 'react-native';

function MenuItem({item, navigation}) {
  return (
    <Text
      style={{
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#FF2A44',
      }}
      onPress={() => navigation.navigate(item?.name)}>
      {item?.name}
    </Text>
  );
}
export default MenuItem;
