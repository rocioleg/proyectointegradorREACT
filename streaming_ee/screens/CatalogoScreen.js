import { AuthContext } from "../context/AuthContext";

import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState, useContext } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import {styles} from "../theme"
import TrendingMovie from "../components/TrendingMovies";
import MovieList from "../components/MovieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { fetchMovieGenres, fetchGenres } from "../api/moviedb";


export default function CatalogoScreen(){
  const navigation = useNavigation();
  const [loading,setLoading]= useState(true);

  const [idRomance, setIDRomance] = useState();
  const [idFantasy, setIDFantasy] = useState();
  const [idComedy, setIDComedy] = useState();
  const [idAdventure, setIDAdventure] = useState();

  const [genreRomance, setRomance] = useState([]);
  const [genreAdventure, setAdventure] = useState([]);
  const [genreFantasy, setFantasy] = useState([]);
  const [genreComedy, setComedy] = useState([]);

  useEffect(()=>{
    getGenreIDs();
    getRomance();
    getAdventure();
    getComedy();
    getFantasy();
  },[])

  const getGenreIDs = async () => {
    try {
      const genresData = await fetchGenres();
      const genres = genresData.genres;
  
      const romance = genres.find(genre => genre.name.toLowerCase() == 'romance');
      if (romance) setIDRomance(romance.id);
  
      const fantasy = genres.find(genre => genre.name.toLowerCase() == 'fantasy');
      if (fantasy) setIDFantasy(fantasy.id);
  
      const comedy = genres.find(genre => genre.name.toLowerCase() == 'comedy');
      if (comedy) setIDComedy(comedy.id);
  
      const adventure = genres.find(genre => genre.name.toLowerCase() === 'adventure');
      if (adventure) setIDAdventure(adventure.id);

      setLoading(false);

    } catch (error) {
      console.log('Error fetching genres: ', error);
    }
  };

  const getRomance = async () => {
    try {
      const data = await fetchMovieGenres(idRomance);
      if (data && data.results) {
        setRomance(data.results);
      }
    } catch (error) {
      console.log('Error fetching romance movies: ', error);
    }
  };

  const getAdventure = async () => {
    try {
      const data = await fetchMovieGenres(idAdventure);
      if (data && data.results) {
        setAdventure(data.results);
      }
    } catch (error) {
      console.log('Error fetching Adventure movies: ', error);
    }
  };

  const getComedy = async () => {
   try {
    const data = await fetchMovieGenres(idComedy);
    if (data && data.results) {
      setComedy(data.results);
    }
    } catch (error) {
    console.log('Error fetching Comedy movies: ', error);
   }
  };

  const getFantasy = async () => {
    try {
      const data = await fetchMovieGenres(idFantasy);
      if (data && data.results) {
        setFantasy(data.results);
      }
    } catch (error) {
      console.log('Error fetching Fantasy movies: ', error);
    }
  };

  return(
      <View className="flex-1 bg-neutral-800">
          {/*busqueda y logo */}
          <SafeAreaView className="mb-3" style={{ paddingTop: 30}}>
              <StatusBar style="light" />
              <View className="flex-row justify-between items-center mx-4">
                  <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white"/>
                  <Text className="text-white text-3xl font-bold">
                      <Text style={styles.text}>M</Text>ovies
                  </Text>
                  <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
                      <MagnifyingGlassIcon size="30" strokeWidth={2} color="white"/>
                  </TouchableOpacity>
              </View>
          </SafeAreaView>
          {
              loading? (
                  <Loading />
              ):(
                  <ScrollView
                          showsVerticalScrollIndicator={false}
                          contentContainerStyle={{paddingBottom: 10}}
                      >
                      {/* Peliculas de aventura */}
                      <MovieList title="Adventure" data={genreAdventure} />

                      {/* Peliculas de comedia */}
                      <MovieList title="Comedy" data={genreComedy} />
                      
                      {/* Peliculas de romance */}
                      <MovieList title="Romance" data={genreRomance} />

                      {/* Peliculas de fantasia */}
                      <MovieList title="Fantasy" data={genreFantasy} />
                  </ScrollView>
              )
          }
      </View>
  )
}
