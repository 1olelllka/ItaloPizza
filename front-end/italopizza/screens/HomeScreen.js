import React from 'react';
import { View, Text, Image, StyleSheet, Modal, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Login from './login';
import SignUp from './signup';


export default function HomeScreen({ navigation }) {

  const [pizza, setPizza] = useState([
  ]);

  const [user, setUser] = useState([
  ]);

  const [token, setToken] = useState([
  ]);

  const [loginModal, setloginModal] = useState(false)

  const [signupModal, setsignupModal] = useState(false)

  const loginUser = (person) => {
    setUser((list) => {
      console.log("List: " + list)
      return [
        person,
        login(person),
        ...list,
      ]
    });
    setloginModal(false)
  }

  const createUser = (person) => {
    setUser((list) => {
      return [
        person,
        signup(person),
        ...list,
      ]
    });
    setsignupModal(false)
  }

  const signup = (elem) => {
    fetch('http://localhost:8000/auth/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(elem),
    })
      .then(response => response.json())
      .then((data) => {
        console.log('SIGN UP DATA -----' + elem)
        login(elem)
      })
  }

  const login = (person) => {
    fetch('http://localhost:8000/auth/token/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(person),
    })
      .then(response => response.json())
      .then((data) => {
        console.log('LOGIN DATA -----' + data)
        setToken(data)

      })
  }

  const logout = () => {
    fetch('http://localhost:8000/auth/token/logout/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token.auth_token}`
      },
    }).then(
      user.shift(),
      setUser(''),
      setToken('')
    )
  }

  useEffect(() => {
    fetch('http://localhost:8000/', {
    })
      .then(response => response.json())
      .then((data) => {
        setPizza(data)
      })
  }, [])

  return (
    <ScrollView style={Styles.Background} contentInsetAdjustmentBehavior='automatic'>
      <SafeAreaView>
        {user.length < 1
          ? <Text style={Styles.BackgroundText}>ItaloPizza</Text>
          : <Text style={Styles.BackgroundText}>Hello, {user[0].username}!</Text>
        }
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {user.length < 1
            ? <AntDesign name="login" size={26} color="black" style={{ left: wp('3%'), top: hp('-3.5%'), width: '10%', marginBottom: hp('2%') }} onPress={() => setloginModal(true)} />
            : <AntDesign name="logout" size={24} color="black" style={{ left: wp('3%'), top: hp('-3.5%'), width: '10%', marginBottom: hp('2%') }} onPress={() => logout()} />
          }

          {user.length < 1
            ? <AntDesign name="paperclip" size={28} color="black" style={{ textAlign: 'right', top: hp('-3.5%'), right: wp('4%'), width: '10%', justifyContent: 'flex-end' }} onPress={() => setsignupModal(true)} />
            : <AntDesign name="shoppingcart" size={26} color="black" style={{ textAlign: 'right', top: hp('-3.5%'), right: wp('4%'), width: '10%', justifyContent: 'flex-end' }} onPress={() => navigation.navigate('Cart', token)} />
          }
        </View>

        {/* Login Form */}
        <View>
          <Modal visible={loginModal}>
            <SafeAreaView style={{backgroundColor: '#ffe1d4'}}>
              <View style={{ backgroundColor: '#ffe1d4', flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{ marginTop: hp('1.5%') }}>
                  <Ionicons name="chevron-back-sharp" size={24} color="black" style={{ left: wp('3%') }} onPress={() => setloginModal(false)} />
                </View>
                <View style={{ marginTop: hp('1%') }}>
                  <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: hp('2%') }}>Log in Please</Text>
                </View>
                <View style={{ width: wp('4%') }}></View>
              </View>
            </SafeAreaView>
            
            <Login addUser={loginUser} />
          </Modal>
        </View>

        {/* Authentication Form */}
        <View>
          <Modal visible={signupModal}>
            <SafeAreaView style={{backgroundColor: '#ffe1d4'}}>
              <View style={{ backgroundColor: '#ffe1d4', flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{ marginTop: hp('1.5%') }}>
                  <Ionicons name="chevron-back-sharp" size={24} color="black" style={{ left: wp('3%'), top: hp('0%') }} onPress={() => setsignupModal(false)} />
                </View>
                <View style={{ marginTop: hp('1%') }}>
                  <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: hp('2%') }}>Sign Up Please</Text>
                </View>
                <View style={{ width: wp('4%') }}></View>
              </View>
            </SafeAreaView>
            <SignUp addUser={createUser} />
          </Modal>
        </View>

        <View style={[Styles.Header, Styles.elevation]}>
          {pizza.results !== undefined && pizza.results.map((item, key) => (
            <View style={[Styles.Box1, Styles.elevation]} key={key}>
              <View>
                <Image source={{ uri: item.photo }} style={{ height: hp('11%'), width: wp('23%'), top: hp('2%'), right: wp('-3%'), borderRadius: 40 }} />
              </View>
              <View style={{ top: hp('-10%') }}>
                <Text style={Styles.TextBox1}>{item.name}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <Text style={Styles.GrayText}>{item.kkal} kkal</Text>
                  <Text style={Styles.GrayText}>|</Text>
                  <Text style={Styles.GrayText}>{item.weight} g</Text>
                </View>
                <Text style={Styles.Money}>${item.price}</Text>
                <AntDesign name="shoppingcart" size={26} color="black" style={Styles.Cart} onPress={() => navigation.navigate('Details', [item, token])} />
              </View>
            </View>
          ))}
        </View>
        <StatusBar
          animated={true}
          backgroundColor='#ffe1d4'
          barStyle='dark-content'
        />
      </SafeAreaView>
    </ScrollView>
  );
}


const Styles = StyleSheet.create({
  Background: {
    flex: 1,
    height: hp('110%'),
    width: wp('100%'),
    backgroundColor: "#ffe1d4",
  },
  BackgroundText: {
    marginTop: hp('1%'),
    fontSize: 24,
    textAlign: 'center',
  },
  Header: {
    width: wp('100%'),
    height: hp('105%'),
    backgroundColor: '#ffffff',
    borderRadius: 30,
    marginTop: hp('-3%')
  },
  Box1: {
    width: wp('94%'),
    height: hp('15%'),
    borderColor: '#000000',
    borderRadius: 30,
    marginLeft: wp('3%'),
    marginRight: wp('3%'),
    marginTop: hp('2%'),
    marginBottom: hp('0.1%'),
    backgroundColor: '#d4d4d4',
  },
  TextBox1: {
    marginTop: hp('3%'),
    fontSize: 20,
    marginTop: '3%',
    textAlign: 'center',
  },
  Cart: {
    marginLeft: '85%',
    marginRight: '5%',
    marginTop: '3%',
    textAlign: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
  Money: {
    textAlign: 'right',
    marginTop: hp('-6%'),
    marginRight: '5%',
    fontSize: 20,
  },
  GrayText: {
    color: 'gray',
    marginLeft: wp('2%'),
    marginTop: hp('0.5%'),
  },
  elevation: {
    elevation: 11,
    shadowColor: '#000000'
  },
});



