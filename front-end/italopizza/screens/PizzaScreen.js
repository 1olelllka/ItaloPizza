import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, Text, Image, ScrollView, Alert } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import InputSpinner from "react-native-input-spinner";


export default function PizzaScreen({ route, navigation }) {

    const [detail, setDetail] = useState([]);

    const [quantity, setQuantity] = useState();

    console.log('Token for Detail: ' + route.params[1].auth_token + '\n -----')


    useEffect(() => {
        // fetch(`http://localhost:9000/pizza/${route.params.slug}/`, {
        fetch(`http://localhost:8000/pizza/${route.params[0].slug}/`, {
        })
            .then(response => response.json())
            .then((data) => {
                setDetail(data)
            })
    }, [])

    const add_to_cart = () => {
        fetch(`http://localhost:8000/add-from-detail/${route.params[0].slug}/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${route.params[1].auth_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quantity),
        })
            .then(
                Alert.alert(
                    "All Successful",
                    "You can go to cart. If you touch by mistake, you can also delete this in cart",
                    [
                        {
                            text: 'Go to cart',
                            onPress: () => navigation.navigate('Cart', route.params[1])
                        },
                        {
                            text: "Cancel",
                            style: "cancel",
                        },
                    ])
            )
    }

    return (
        <ScrollView style={Styles.Main}contentInsetAdjustmentBehavior="automatic">
            <SafeAreaView>
            <Text style={Styles.Text1}>{detail.name}</Text>
            <Ionicons name="chevron-back-sharp" size={24} color="black" style={{ left: wp('3%'), top: hp('-1.9%') }} onPress={() => navigation.navigate('ItaloPizza')} />
            <View style={[Styles.ImageBox, Styles.elevation]}>
                <Image style={[Styles.Image]} source={{ uri: detail.photo }} />
                <Text style={{ textAlign: 'center', fontSize: 24 }}>{detail.name}</Text>
                <Text style={{ marginTop: hp('1%'), marginLeft: wp('5%'), marginRight: wp('5%'), textAlign: 'justify', fontSize: 16 }}>{detail.description}</Text>
                <Text style={{ marginTop: hp('1%'), fontSize: 26, marginLeft: wp('5%') }}>${detail.price}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    {route.params[1].auth_token != undefined &&
                        <InputSpinner
                            max={10}
                            min={0}
                            step={1}
                            color={"#ffe1d4"}
                            skin="clean"
                            onChange={(num) => setQuantity({ "quantity": num })}
                        />
                    }
                </View>
                {route.params[1].auth_token == undefined
                    ? <Text style={Styles.warning}>Sign Up or Log In, to buy this one</Text>
                    : <Text style={Styles.cart} onPress={() => add_to_cart()}>Add to Cart</Text>
                }
            </View>
            </SafeAreaView>
        </ScrollView>
    )
}

const Styles = StyleSheet.create({
    Main: {
        flex: 1,
        height: hp('100%'),
        width: wp('100%'),
        backgroundColor: '#ffe1d4',
    },
    ImageBox: {
        backgroundColor: '#ffffff',
        maxHeight: hp('105%'),
        minHeight: hp('88.5%'),
        width: wp('100%'),
        marginTop: hp('1%'),
        borderRadius: 30,
        marginBottom: hp('3.6%')
    },
    Image: {
        height: hp('45%'),
        width: wp('85%'),
        borderRadius: 10000,
        left: wp('8%'),
        top: hp('0%'),
    },
    Text1: {
        top: hp('1.5%'),
        fontSize: 24,
        textAlign: 'center',
    },
    cart: {
        textAlign: 'center',
        marginLeft: wp('30%'),
        marginRight: wp('30%'),
        marginTop: hp('5%'),
        marginBottom: hp('2%'),
        textAlign: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 26,
    },
    warning: {
        textAlign: 'center',
        marginTop: hp('2%'),
        marginHorizontal: hp('7%'),
        backgroundColor: '#ffe1d4',
        padding: 10,
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: hp('2%'),
    },
    elevation: {
        elevation: 18,
        shadowColor: '#000000',
    },
});
