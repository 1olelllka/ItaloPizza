import React from 'react';
import HomeScreen from './screens/HomeScreen'
import PizzaScreen from './screens/PizzaScreen';
import CartScreen from './screens/CartScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();

const navigation = () => {
    return (
    <NavigationContainer>
        <Stack.Navigator 
        screenOptions = {{
            headerShown: false
        }}>
            <Stack.Screen 
                name = 'ItaloPizza'
                component={HomeScreen}
            />
            <Stack.Screen 
                name = 'Details'
                component = {PizzaScreen}
            />
            <Stack.Screen
                name = 'Cart'
                component = {CartScreen}
            />
        </Stack.Navigator>
    </NavigationContainer> )
}


export default navigation