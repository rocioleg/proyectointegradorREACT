import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthContext } from '../context/AuthContext'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';

const Login = ({ navigation }) => {
  const [mail, setMail] = useState(null);
  const [password, setPassword] = useState(null);
  const { isLoading, login } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <Image source={require('../assets/images/icon.png')} style={styles.logo} /> 
      <Text style={styles.login}>Login</Text>

      <View style={styles.email}>
        <MaterialIcons name='alternate-email' size={20} color='#fff' style={{ marginBottom: 5 }} />
        <TextInput placeholder='Email ID' style={{ flex: 1, paddingVertical: 0, color: '#fff' }} placeholderTextColor='#666' keyboardType='email-address' value={mail} onChangeText={text => setMail(text)} />
      </View>

      <View style={styles.email}>
        <Ionicons name='ios-lock-closed-outline' size={20} color='#fff' style={{ marginBottom: 5 }} />
        <TextInput placeholder='Password' style={{ flex: 1, paddingVertical: 0, color: '#fff' }} placeholderTextColor='#666' secureTextEntry={true} value={password} onChangeText={text => setPassword(text)} />

        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.olvidopass}>Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => { login(mail, password) }} style={styles.loginbutton}>
        <Text style={styles.logintext}>Login</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
        <Text style={{ color: '#fff' }}>Nuevo?</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.registrarse}>Registrarse.</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    backgroundColor: '#1f1f1f',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  login: {
    fontFamily: '', 
    fontSize: 28,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 30,
  },
  email: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
  },
  olvidopass: {
    color: '#fff',
    fontWeight: '700',
  },
  loginbutton: {
    backgroundColor: '#D4AF37',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    width: '80%',
  },
  logintext: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 15,
    color: '#1f1f1f',
  },
  registrarse: {
    color: '#D4AF37',
    fontWeight: '700',
  },
  inputPlaceholder: {
    color: '#fff', // Color del placeholder en blanco
  },
});

export default Login;
