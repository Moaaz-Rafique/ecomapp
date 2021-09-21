import React from 'react';
import {Image, Text, TouchableWithoutFeedback, View} from 'react-native';

function ProductCard(props) {
  const {product, navigation} = props;
  // console.log(product);
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Product', {id: product?._id})}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'pink',
          margin: 10,
          padding: 10,
          borderRadius: 10,
          justifyContent: 'space-between'
        }}>
        <Image
          source={{uri: product?.image}}
          style={{
            height: 40,
            resizeMode: 'contain',
            backgroundColor: '#f0f0f0',
          }}
        />
        {/* <Typography></Typography> */}
        <Text style={{textAlign: 'center',color: '#FF2A44'}}>{product?.title}</Text>
        <Text style={{textAlign: 'center'}}>Rs. {product?.price}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default ProductCard;
