import React from "react";
import { Text } from "react-native";

function MenuItem({item,navigation}){
    return <Text onPress={() => navigation.navigate(item?.name)}>{item?.name}</Text>
}
export default MenuItem;