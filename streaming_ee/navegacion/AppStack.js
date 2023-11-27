import React, {useContext} from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import Home from '../screens/Home';
import Proximamente from '../screens/Proximamente';

import MovieScreen from '../screens/MovieScreen';
import PersonScreen from '../screens/PersonScreen';
import SearchScreen from '../screens/SearchScreen';

import CatalogoScreen from '../screens/CatalogoScreen';

const Stack = createStackNavigator();

import {AuthContext} from '../context/AuthContext'

const AppStack = () => {
  return (
      <Stack.Navigator options={{headerShown: false}}>
        <Stack.Screen name="HomeHome" options={{headerShown: false}} component={Home} />
        <Stack.Screen name="Movie" options={{headerShown: false}} component={MovieScreen} />
        <Stack.Screen name="Person" options={{headerShown: false}} component={PersonScreen} />
        <Stack.Screen name="Search" options={{headerShown: false}} component={SearchScreen} />
      </Stack.Navigator>
  );
};


const ProximamenteStackNavigator = () => {
  return (
    <Stack.Navigator options={{headerShown: false}}>
      <Stack.Screen name="ProximamenteTe" options={{headerShown: false}} component={Proximamente} />
      <Stack.Screen name="Movie" options={{headerShown: false}} component={MovieScreen} />
      <Stack.Screen name="Person" options={{headerShown: false}} component={PersonScreen} />
      <Stack.Screen name="Search" options={{headerShown: false}} component={SearchScreen} />
    </Stack.Navigator>
  );
}

const CatalogoStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Catalogo"options={{headerShown: false}} component={CatalogoScreen} />
      <Stack.Screen name="Movie" options={{headerShown: false}} component={MovieScreen} />
      <Stack.Screen name="Person" options={{headerShown: false}} component={PersonScreen} />
      <Stack.Screen name="Search" options={{headerShown: false}} component={SearchScreen} />
    </Stack.Navigator>
  );
}


export {AppStack, ProximamenteStackNavigator, CatalogoStack};