import React from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Formik } from 'formik'

export default function SignUp({ addUser }) {
    return (
        <View style={styles.Background}>
            <View style={styles.Header}>
                <Formik initialValues={{ username: '', password: '', email: '' }} onSubmit={(values, action) => {
                    addUser(values),
                        action.resetForm();
                }}>
                    {(props) => (
                        <View>
                            <TextInput
                                placeholder='Write Your Username'
                                style={styles.input}
                                placeholderTextColor='#404040'
                                value={props.values.username}
                                onChangeText={props.handleChange('username')} />
                            <TextInput
                                placeholder='Write Your Email'
                                style={styles.input}
                                placeholderTextColor='#404040'
                                value={props.values.email}
                                onChangeText={props.handleChange('email')} />
                            <TextInput
                                placeholder='Write Your Password'
                                style={styles.input}
                                placeholderTextColor='#404040'
                                secureTextEntry={true}
                                value={props.values.password}
                                onChangeText={props.handleChange('password')} />
                            <Text style={styles.forTip}>At least 10 letters/symbols/numbers</Text>
                            <TouchableOpacity style={styles.forButton} onPress={props.handleSubmit}>
                                <Text style={{ color: '#404040', fontSize: 18, fontWeight: 'bold' }}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Background: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: "#ffe1d4",
    },
    Header: {
        width: '100%',
        height: '100%',
        marginBottom: hp('-10%'),
        backgroundColor: '#ffffff',
        borderRadius: 30,
    },
    input: {
        fontSize: 20,
        marginTop: hp('5%'),
        marginLeft: wp('5%'),
        marginRight: wp('5%'),
        backgroundColor: '#d4d4d4',
        borderRadius: 20,
        padding: 19
    },
    forButton: {
        borderWidth: 0.5,
        borderRadius: 20,
        padding: 15,
        alignSelf: 'flex-end',
        marginTop: hp('2%'),
        marginRight: wp('5%')
    },
    forTip: {
        color: 'red',
        marginTop: hp('1%'),
        marginLeft: wp('6%'),
        marginRight: wp('5%'),
    }
})