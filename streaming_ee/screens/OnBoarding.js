import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Onboarding = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/icon.png')} style={styles.logo} />
      <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#fff', marginTop: 20 }}>
        Bienvenido!
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.button}>
        <Text style={styles.buttonText}>Let's Begin</Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f1f1f', // Cambiar el color de fondo a oscuro
  },
  button: {
    backgroundColor: '#D4AF37',
    padding: 15, 
    width: '50%', 
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16, 
    color: 'black', 
  },
  logo: {
    width: 300, 
    height: 250, 
    resizeMode: 'contain', 
  },
});

export default Onboarding;
