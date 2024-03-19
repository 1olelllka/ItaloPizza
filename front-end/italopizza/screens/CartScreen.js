import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Text, Image, StyleSheet, Alert, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function Cart({ navigation, route }) {
    const [pizza, setPizza] = useState([
    ]);

    useEffect(() => {
        fetch('http://localhost:8000/orders/', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${route.params.auth_token}`
            }
        })
            .then(response => response.json())
            .then((data) => {
                setPizza(data)
            })
    }, [])

    const remove = (elem) => {
        fetch(`http://localhost:8000/remove-from-cart/${elem}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${route.params.auth_token}`
            }
        })
            .then(
                Alert.alert('All Fine', '1 element has been removed, you can continue shopping', [
                    {
                        'text': 'Continue...',
                        onPress: () => {
                            fetch('http://localhost:8000/orders/', {
                                method: 'get',
                                headers: {
                                    'Authorization': `Token ${route.params.auth_token}`
                                }
                            })
                                .then(response => response.json())
                                .then((data) => {
                                    setPizza(data)
                                })
                        }
                    }
                ])
            )
    }

    const add = (elem) => {
        fetch(`http://localhost:8000/add-to-cart/${elem}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${route.params.auth_token}`
            }
        })
            .then(
                Alert.alert('All Fine', '1 element has been added, you can continue shopping', [
                    {
                        'text': 'Continue...',
                        onPress: () => {
                            fetch('http://localhost:8000/orders/', {
                                method: 'get',
                                headers: {
                                    'Authorization': `Token ${route.params.auth_token}`
                                }
                            })
                                .then(response => response.json())
                                .then((data) => {
                                    setPizza(data)
                                })
                        }
                    }
                ])
            )
    }

    const buy = () => {
        fetch('http://localhost:8000/buy/', {
            headers: {
                'Authorization': `Token ${route.params.auth_token}`
            }
        })
            .then(
                Alert.alert('All Fine', 'You can continue , you can continue shopping', [
                    {
                        'text': 'Continue...',
                        onPress: () => {
                            fetch('http://localhost:8000/orders/', {
                                method: 'get',
                                headers: {
                                    'Authorization': `Token ${route.params.auth_token}`
                                }
                            })
                                .then(response => response.json())
                                .then((data) => {
                                    setPizza(data)
                                })
                        }
                    }
                ])
            )
    }

    const LeftSwipeActions = () => {
        return (
            <View
                style={{
                    backgroundColor: '#38fa23',
                    justifyContent: 'center',
                    borderTopLeftRadius: 30,
                    borderBottomLeftRadius: 30,
                }} >
                <Text
                    style={{
                        color: '#000000',
                        fontSize: 17,
                        paddingHorizontal: 10,
                        paddingHorizontal: 30,
                        paddingVertical: 20,
                    }}
                >
                    Add One
                </Text>
            </View>
        );
    };
    const rightSwipeActions = () => {
        return (
            <View
                style={{
                    justifyContent: 'center',
                    backgroundColor: '#ff4d2e',
                    borderTopRightRadius: 30,
                    borderBottomRightRadius: 30,
                }}
            >
                <Text
                    style={{
                        color: '#000000',
                        fontSize: 17,
                        paddingHorizontal: 10,
                        paddingHorizontal: 30,
                        paddingVertical: 20,
                    }}
                >
                    Delete One
                </Text>
            </View>
        );
    };

    const swipeFromLeftOpen = (data) => {
        add(data)
    };

    const swipeFromRightOpen = (data) => {
        remove(data)
    };
    return (
        <ScrollView style={Styles.Main} contentInsetAdjustmentBehavior="automatic">
            <SafeAreaView>
                <Text style={[Styles.BackgroundText]}>Cart</Text>
                <Ionicons name="chevron-back-sharp" size={24} color="black" style={{ left: wp('3%'), top: hp('-1.5%') }} onPress={() => navigation.navigate('ItaloPizza')} />
                <View style={[Styles.Header, Styles.elevation]}>
                    {pizza.results !== undefined && pizza.results.map((item, key) => (
                        < Swipeable
                            renderLeftActions={LeftSwipeActions}
                            renderRightActions={rightSwipeActions}
                            onSwipeableRightOpen={() => swipeFromRightOpen(item.pizza)}
                            onSwipeableLeftOpen={() => swipeFromLeftOpen(item.pizza)}
                            key={key}
                        >
                            <View style={[Styles.Box, Styles.elevation]}>
                                <View>
                                    <Image source={{ uri: item.pizza_img }} style={{ height: hp('11%'), width: wp('23%'), top: hp('2%'), right: wp('-3%'), borderRadius: 30 }} />
                                </View>
                                <View style={{ top: hp('-10%') }}>
                                    <Text style={Styles.TextBox1}>{item.pizza_name}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        <Text style={Styles.GrayText}>Quantity: {item.quantity}</Text>
                                    </View>
                                    <Text style={Styles.Money}>${item.total}</Text>
                                </View>
                            </View>
                        </ Swipeable >
                    ))}
                    <View>
                        <TouchableOpacity onPress={() => buy()} style={Styles.forButton}>
                            <Text style={{ color: '#404040', fontSize: 18, fontWeight: 'bold' }}>Buy</Text>
                        </TouchableOpacity>
                    </View>
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
    BackgroundText: {
        textAlign: 'center',
        top: hp('2%'),
        fontSize: 24,
    },
    Header: {
        width: wp('100%'),
        minHeight: hp('90%'),
        maxHeight: hp('170%'),
        marginTop: hp('2%'),
        backgroundColor: '#ffffff',
        borderRadius: 30,
    },
    Box: {
        width: wp('94%'),
        height: hp('15%'),
        borderColor: '#000000',
        borderRadius: 30,
        marginLeft: wp('3%'),
        marginRight: wp('3%'),
        marginTop: hp('1%'),
        marginBottom: hp('1%'),
        backgroundColor: '#d4d4d4',
    },
    Money: {
        textAlign: 'right',
        marginTop: hp('-5%'),
        marginRight: '5%',
        fontSize: 20,
    },
    GrayText: {
        color: 'gray',
        marginLeft: wp('2%'),
        marginTop: hp('0.5%'),
    },
    TextBox1: {
        marginTop: hp('3%'),
        fontSize: 20,
        marginTop: '3%',
        textAlign: 'center',
    },
    forButton: {
        borderWidth: 0.5,
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: hp('2%'),
        marginBottom: hp('2%'),
        paddingVertical: hp('1%'),
        paddingHorizontal: hp('3%')
    },
    elevation: {
        elevation: 10,
        shadowRadius: 10,
        shadowColor: '#000000',
    },
    itemSeparator: {
        flex: 1,
        height: 1,
        backgroundColor: '#444',
    },
})