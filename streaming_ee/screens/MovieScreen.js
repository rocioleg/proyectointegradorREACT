import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState, useContext, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image, StatusBar, TextInput, StyleSheet } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, theme } from '../theme';
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast";
import MovieList from "../components/MovieList";
import Loading from "../components/loading";
import Icon from 'react-native-vector-icons/FontAwesome';

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from "../api/moviedb";

var { width, height } = Dimensions.get('window');

import { AuthContext } from '../context/AuthContext'

Notifications.setNotificationHandler({
    
    handleNotification: async () => ({
   
      shouldShowAlert: true,
   
      shouldPlaySound: false,
   
      shouldSetBadge: false,
   
    }),
});


export default function MovieScreen() {
    const { params: item } = useRoute();
    
    const [isFavourite, toggleFavourite] = useState(false);
    const navigation = useNavigation();
    const [cast, setCast] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState({});

    const { crearComentario, userInfo, buscarComentarios } = useContext(AuthContext);
    const [textoComentario, setTextoComentario] = useState('');
    const [comentarios, setComentarios] = useState([]);
    
    useEffect(() => {
        getMovieDetails(item.id);
        getMovieCredits(item.id);
        getSimilarMovie(item.id);
        setLoading(false);
    }, [item])

    useEffect(() => {
        getComentarios();
    }, [])

    const getComentarios = async () => {
        const data = await buscarComentarios();
        if (data) setComentarios(data.data);
        //console.log(data.data);
    }

    const getMovieDetails = async id => {
        const data = await fetchMovieDetails(id);
        if (data) setMovie(data);
        setLoading(false);
    }

    const getMovieCredits = async id => {
        const data = await fetchMovieCredits(id);
        //console.log('got credits: ',data)
        if (data && data.cast) setCast(data.cast);
    }

    const getSimilarMovie = async id => {
        const data = await fetchSimilarMovies(id);
        //console.log('got similars: ',data)
        if (data && data.results) setSimilarMovies(data.results);
    }

    const handleEnviarComentario = () => {
        if (textoComentario.trim() !== '') {
            const nuevoComentario = {
                user: userInfo.nombre,
                texto: textoComentario,
            };
            crearComentario(nuevoComentario);
            setTextoComentario('');
        } else {
            //console.log('El campo de texto está vacío');
        }
    };

    // NOTIFICACIONES //
    const [expoPushToken, setExpoPushToken] = useState('');
    
    const [notification, setNotification] = useState(false);
    
    const notificationListener = useRef();
    
    const responseListener = useRef();
    
    useEffect(() => {
    
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
        
        notificationListener.current = Notifications.addNotificationReceivedListener(
        
            notification => {
            setNotification(notification);
            },
        );
        responseListener.current = Notifications.addNotificationResponseReceivedListener(
            response => {
                console.log(response);
            },
        );
        return () => {
            Notifications.removeNotificationSubscription(
            notificationListener.current,
            );
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);


    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className="flex-1 bg-neutral-900">

            {/* back button and movie poster */}
            <View className="w-full">
                <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 mt-3"}>
                    <TouchableOpacity style={styles.background} className="rounded-xl p-1" onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                        <HeartIcon size="35" color={isFavourite ? theme.background : "white"} />
                    </TouchableOpacity>
                </SafeAreaView>
                {
                    loading ? (
                        <Loading />
                    ) : (
                        <View>
                            <Image
                                source={{ uri: image500(movie?.poster_path) || fallbackMoviePoster }}
                                style={{ width, height: height * 0.55 }}
                            />
                            <LinearGradient
                                colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']}
                                style={{ width, height: height * 0.40 }}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                                className="absolute bottom-0"
                            />
                        </View>
                    )
                }
            </View>
            {/*movie details */}
            <View className="space-y-3">
                {/*title */}
                <Text className="text-white text-center text-3xl font-bold tracking-wider">
                    {
                        movie.title
                    }
                </Text>

                {/*LOGICA DE STREAMING*/}

                <TouchableOpacity onPress={() => navigation.navigate('VideoPlay')}>
                    <Icon name="play-circle" size={60} color="#eab308" style={{ textAlign: 'center', marginTop: 10 }} />
                </TouchableOpacity>


                {/*status, release, runtime*/}
                {
                    movie?.id ? (
                        <Text className="text-neutral-400 font-semibold text-base text-center">
                            {movie?.status} . {movie?.release_date?.split('-')[0]} . {movie?.runtime} min
                        </Text>
                    ) : null
                }


                {/* genres */}

                <View className="flex-row justify-center mx4 space-x-2">
                    {
                        movie?.genres?.map((genre, index) => {
                            let showDot = index + 1 != movie.genres.length;
                            return (
                                <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                                    {genre?.name} {showDot ? "." : null}
                                </Text>
                            )
                        })
                    }
                </View>

                {/*description */}

                <Text className="text-neutral-400 mx-4 tracking-wide">
                    {
                        movie?.overview
                    }
                </Text>
            </View>

            {/*cast */}
            <Cast navigation={navigation} cast={cast} />

            {/*similar movies */}

            <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />

            {/* MODIFICADO */}

            {loading ? (
                <Loading />
            ) : (
                <View style={estilos.container}>
                    {/* Lista de comentarios */}
                    <Text style={estilos.textComentarios}>
                        Comentarios:
                    </Text>

                    <View style={[estilos.comentariosContainer, { paddingBottom: 20 }]}>

                        {/* Mostrar comentarios*/}
                        {comentarios.map((comentario, index) => (
                            <View key={index} style={estilos.comentarioItem}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name="user" size={20} color="#FFF" style={{ marginRight: 8 }} />
                                    <Text style={estilos.comentarioTexto}>{comentario.texto}</Text>
                                </View>
                                <Text style={estilos.comentarioUsuario}>{comentario.user}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Agregar un comentario */}
                    <TextInput
                        placeholder="¿Qué Opinas?"
                        placeholderTextColor="#999999"
                        value={textoComentario}
                        onChangeText={(text) => setTextoComentario(text)}
                        multiline
                        style={estilos.textInput}
                    />

                    <TouchableOpacity style={estilos.button} onPress={() => {
                        handleEnviarComentario();
                        schedulePushNotification();
                    }}>
                        <Text style={estilos.buttonText}>Enviar Comentario</Text>
                    </TouchableOpacity>

                </View>
            )}
        </ScrollView>
    )
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 20,
    },
    comentariosContainer: {
        marginBottom: 20,
    },
    comentarioItem: {
        marginBottom: 10,
        borderBottomColor: '#999999',
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    comentarioTexto: {
        color: '#FFF',
        fontSize: 16,
    },
    comentarioUsuario: {
        color: '#999',
        fontSize: 14,
    },
    textInput: {
        height: 100,
        borderWidth: 1,
        borderColor: '#FFF',
        color: '#FFF',
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    button: {
        backgroundColor: '#3F51B5',
        paddingVertical: 8,
        paddingHorizontal: 15,
        alignItems: 'center',
        borderRadius: 15,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    textComentarios: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 26,
        paddingBottom: 10
    }
});

async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
   
      content: {
   
        title: "Notificacion",
   
        body: 'Se agrego un comentario',
   
   
      },
   
      trigger: {seconds: 2},
   
    });
   
   }

async function registerForPushNotificationsAsync() {
    
    let token;
   
    if (Platform.OS === 'android') {
   
      await Notifications.setNotificationChannelAsync('default', {
   
        name: 'default',
   
        importance: Notifications.AndroidImportance.MAX,
   
        vibrationPattern: [0, 250, 250, 250],
   
        lightColor: '#FF231F7C',
   
      });
   
    }
   
    if (Device.isDevice) {
   
      const {status: existingStatus} = await Notifications.getPermissionsAsync();
   
      let finalStatus = existingStatus;
   
      if (existingStatus !== 'granted') {
   
        const {status} = await Notifications.requestPermissionsAsync();
   
        finalStatus = status;
   
      }
   
      if (finalStatus !== 'granted') {
   
        alert('Failed to get device push token for push notification!');
   
        return;
   
      }
   
      token = (await Notifications.getExpoPushTokenAsync()).data;
   
      console.log(token);
   
    } else {
   
      alert('Must use a physical device for Push Notifications');
   
    }
   
    return token;
   
   }