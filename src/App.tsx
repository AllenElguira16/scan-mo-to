import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useCameraPermission} from 'react-native-vision-camera';
import {CameraToTTS} from './CameraScreen';
import splash from './splash.png';

function App(): JSX.Element {
  const {hasPermission, requestPermission} = useCameraPermission();
  const [canView, setCanView] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (!hasPermission) {
        requestPermission();
      }

      setCanView(true);
    }, 3000);
  }, [hasPermission, requestPermission]);

  if (!hasPermission && canView) {
    return <Text>You don't have permission to access camera</Text>;
  }

  if (hasPermission && canView) {
    return <CameraToTTS />;
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={splash} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  image: {
    width: '200%',
  },
  button: {
    backgroundColor: 'black',
  },
});

export default App;
