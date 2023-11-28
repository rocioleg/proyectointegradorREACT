import React from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video-player';


const VideoScreen = () => {

  const [isPlaying, setIsPlaying] = useState(false);

  const handlePress = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <View>
       <Video
         source={{ uri: '../assets/videos/wishtrailer.mp4'}}
         resizeMode="cover"
         paused={!isPlaying}
       />
       <Button title="Play/Pause" onPress={handlePress} />
    </View>
   );
};



export default VideoScreen;