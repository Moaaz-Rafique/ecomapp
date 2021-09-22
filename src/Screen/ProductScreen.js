import {useFocusEffect} from '@react-navigation/core';
import axios from 'axios';
import QueryString from 'qs';
import React, {useCallback, useState} from 'react';
import {FlatList, Image, ScrollView, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {ProductCard} from '../Components';
import {FETCH_PRODUCT} from '../Constants/apis';
import {SET_PRODUCT_DETAILS, SET_SIMILAR_PRODUCTS} from '../Redux/types';

function ProductScreen({navigation, route}) {
  const {id} = route?.params;
  console.log(id);
  const user = useSelector(state => state?.userReducer?.user_details);
  // const user = useSelector((state) => state.userReducer.user_details);
  const dispatch = useDispatch();
  const allProducts = useSelector(
    state => state?.productReducer?.product_details,
  );
  const product = useSelector(
    state => state?.productReducer?.product_details?.[id],
  );
  const similar = useSelector(state => state?.productReducer?.similar);
  const [networkError, setNetworkError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [similarLoaded, setSimilarLoaded] = useState(false);

  const getProductFromId = async () => {
    let query = {
      id,
    };
    try {
      const data = await axios.get(
        FETCH_PRODUCT + QueryString.stringify(query),
      );

      // console.log(data.data);
      dispatch({type: SET_PRODUCT_DETAILS, payload: data.data.data});
      dispatch({type: SET_SIMILAR_PRODUCTS, payload: data.data.similar});
      // setProduct(data.data.data);
      setLoading(false);

      setSimilarLoaded(true);
    } catch (error) {
      if (!error.response) {
        setNetworkError(true);
      } else {
        console.log(error);
      }
    }
  };
  const addProductToCart = async () => {
    if (!user?._id) {
      console.log('user Not found');
      return;
    }
    try {
      const data = await axios.post(ADD_CART, {
        product: product?._id,
        user: user?._id,
      });
    } catch (err) {
      console.log(err);
      //   swal("", err.message, "error");
    }
  };
  const handleUpdateProduct = () => {
    history.push('/admin/product/' + id);
  };
  const handleRemoveProduct = async () => {
    try {
      axios.post(REMOVE_PRODUCT + '/?id=' + product?._id);
    } catch (error) {
      if (!error.response) {
        console.log('axios implement error or net off');
        setNetworkError(true);
      } else {
        console.log(error);
      }
    }
  };
  useFocusEffect(
    useCallback(() => {
      // console.log(allProducts);
      setLoading(false);
      if (!allProducts?.[id]) {
        setLoading(true);
      }
      setSimilarLoaded(false);
      getProductFromId();
    }, [id]),
  );
  return (
    <ScrollView>
      <View style={{backgroundColor: 'white'}}>
        <View
          style={{
            flex: 1,
            margin: 20,
            borderRadius: 20,
            backgroundColor: '#FF2A44',
            overflow: 'hidden',
            padding: 10,
            paddingBottom: 50,
          }}>
          <Text style={{fontSize: 30, color: '#fff', textAlign: 'center'}}>
            {product?.title}
          </Text>
          <Image
            source={{uri: product?.image}}
            style={{
              width: '100%',
              aspectRatio: 1,
              resizeMode: 'contain',
              marginBottom: 50,
              backgroundColor: '#fee',
              borderRadius: 20,
              overflow: 'hidden',
            }}
          />
          <Text style={{fontSize: 16, textAlign: 'left'}}>
            {product?.description}
          </Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Rs. {product?.price}
          </Text>
        </View>
        <View
          style={{
            flex: 1,

            margin: 20,
            marginTop: 0,
            borderRadius: 20,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Similar products
          </Text>
          <FlatList
            horizontal={true}
            data={similar}
            renderItem={item => (
              <ProductCard product={item?.item} navigation={navigation} />
            )}
            keyExtractor={product => product?._id}
          />
        </View>
        {/* <Text>{id}</Text><Button onPress={() => console.log(product)}>Show Product</Button><Button onPress={() => console.log(similar)}>Show Similar</Button> */}
      </View>
    </ScrollView>
  );
}
export default ProductScreen;
