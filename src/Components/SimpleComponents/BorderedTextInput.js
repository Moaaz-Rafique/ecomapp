import React from 'react';
import {TextInput} from 'react-native';

function BorderedTextInput(props) {
  return (
    <TextInput
      style={{
        flex: 0.7,
        borderRadius: 10,
        borderColor: '#FF2A44',
        margin: 10,
        marginRight: 0,
        borderWidth: 2,
        fontSize: 20,
        paddingLeft: 10,
        paddingRight: 10,
      }}
      {...props}
    />
  );
}

export default BorderedTextInput;