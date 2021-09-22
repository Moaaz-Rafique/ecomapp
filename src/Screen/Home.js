import {useFocusEffect} from '@react-navigation/core';
import axios from 'axios';
import React, {useCallback, useState} from 'react';
import {
  FlatList,
  TextInput,
  TextInputBase,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {ProductCard} from '../Components';
import {BorderedTextInput} from '../Components/SimpleComponents';
import {FETCH_ALL_CATEGORIES, FETCH_ALL_PRODUCTS} from '../Constants/apis';
import {SET_CATEGORIES, SET_PRODUCT_LIST} from '../Redux/types';
// import swal from 'react-native-sweet-alert';

function Home({navigation}) {
  const products = useSelector(state => state.productReducer.product_list);
  const categories = useSelector(state => state.categoryReducer.categories);
  const user = useSelector(state => state.userReducer.user_details);
  const dispatch = useDispatch();
  const [networkError, setNetworkError] = useState(false);
  useFocusEffect(
    useCallback(() => {
      getCategoryList();
      getProductList();
    }, []),
  );

  const getProductList = async () => {
    try {
      const data = await axios.get(FETCH_ALL_PRODUCTS);
      // console.log(data.data);
      dispatch({type: SET_PRODUCT_LIST, payload: data?.data?.data});
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
  const getCategoryList = async () => {
    try {
      const data = await axios.get(FETCH_ALL_CATEGORIES);
      dispatch({type: SET_CATEGORIES, payload: data.data.data});
    } catch (error) {
      console.log(error);
    }
  };
  //   if (networkError) {
  //     //   navigation.navigate('Login');
  //     alert('no network', 'sadsad','error')
  //     // return
  //   }
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
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
      <FlatList
        data={categories}
        horizontal={true}
        renderItem={({item}) => {
          // console.log(item);
          return (
            <Text
              style={{
                margin: 10,
                padding: 10,
                borderRadius: 20,
                fontWeight: 'bold',
                color: 'white',
                backgroundColor: item?.color,
              }}>
              {item?.title || 'notfound'}
            </Text>
          );
        }}
        keyExtractor={product => product?._id}
      />
      <FlatList
        style={
          {
            // marginTop: 50,
          }
        }
        numColumns={3}
        horizontal={false}
        data={products}
        renderItem={item => (
          <ProductCard product={item?.item} navigation={navigation} />
        )}
        keyExtractor={product => product?._id}
      />
      <Button onPress={() => console.log(user)}>Show</Button>
    </ScrollView>
  );
}
export default Home;
