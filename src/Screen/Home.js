import {useFocusEffect} from '@react-navigation/core';
import axios from 'axios';
import React, {useCallback, useState} from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  ScrollView,
  Text,
  Image,
} from 'react-native';
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {ProductCard} from '../Components';
import Camera from '../Components/Camera';
import {BorderedTextInput} from '../Components/SimpleComponents';
import {FETCH_ALL_PRODUCTS} from '../Constants/apis';
import {SET_PRODUCT_LIST} from '../Redux/types';
// import swal from 'react-native-sweet-alert';

function Home({navigation}) {
  const products = useSelector(state => state.productReducer.product_list);
  const dispatch = useDispatch();
  const [networkError, setNetworkError] = useState(false);
  useFocusEffect(
    useCallback(() => {
      getProductList();
    }, []),
  );
  const getProductList = async () => {
    try {
      const data = await axios.get(FETCH_ALL_PRODUCTS);
      console.log(data.data);
      if (!data?.data?.data) {
        throw new Error(data?.data?.message);
      }
      dispatch({type: SET_PRODUCT_LIST, payload: data?.data?.data});
      console.log('Product list', data?.data);
    } catch (error) {
      if (!error.response) {
        // network error
        console.log('net error', error);
        setNetworkError(true);
      } else {
        // this.errorStatus = error.response.data.message;
        console.log('normal error', error);
        alert(error?.response?.data?.message || 'unknown Error' || 'error');
      }
    }
  };
  const [imageUri, setImageUri] = useState(null);
  //   if (networkError) {
  //     //   navigation.navigate('Login');
  //     alert('no network', 'sadsad','error')
  //     // return
  //   }
  return (
    <ScrollView>
      <View>
        {/* Search */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <BorderedTextInput />
          <TouchableOpacity style={{flex: 0.3}}>
            <Text
              style={{
                fontSize: 20,
                textAlign: 'center',
                padding: 15,
                margin: 10,
                backgroundColor: '#FF2A44',
                color: '#f0f0f0',
                borderRadius: 10,
              }}>
              Search
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <FlatList
        // style={{height: 300}}
        numColumns={2}
        horizontal={false}
        data={products}
        renderItem={item => (
          <ProductCard product={item?.item} navigation={navigation} />
        )}
        keyExtractor={product => product?._id}
      /> */}

      <Camera setImageUri={setImageUri} />
      <Image
        style={{
          height: 500,
          resizeMode: 'contain',
          backgroundColor: '#f0f0f0',
        }}
        source={{uri: imageUri}}
      />
    </ScrollView>
  );
}
export default Home;
