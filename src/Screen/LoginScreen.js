import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Button } from 'react-native-paper'

function LoginScreen({navigation}){
    return <ScrollView>
        <View>
            <Text>LoginScreen</Text>
            <Button onPress={()=>navigation.navigate("Home")}>Goto Home</Button>
        </View>
    </ScrollView>
}
export default LoginScreen
