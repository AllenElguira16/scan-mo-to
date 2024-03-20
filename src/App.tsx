import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  Button,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useCameraPermission} from 'react-native-vision-camera';
import {CameraToTTS} from './CameraScreen';
import splash from './splash.png';

function App(): JSX.Element {
  const {hasPermission, requestPermission} = useCameraPermission();
  const [canView, setCanView] = useState(false);

  useEffect(() => {
    const backAction = () => {
      if (canView) {
        setCanView(false);
        return true;
      }

      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [canView]);

  const handleStart = () => {
    if (!hasPermission) {
      requestPermission();
    }

    setCanView(true);
  };

  if (!hasPermission && canView) {
    return <Text>You don't have permission to access camera</Text>;
  }

  if (hasPermission && canView) {
    return <CameraToTTS />;
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={splash} resizeMode="contain" />

      <Button title="Start" onPress={handleStart} />
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
