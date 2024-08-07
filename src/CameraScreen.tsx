import React, {useRef, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import Tts from 'react-native-tts';
import TextRecognition from '@react-native-ml-kit/text-recognition';

export const CameraToTTS = () => {
  const device = useCameraDevice('back');
  const [preview, setPreview] = useState<string | null>(null);
  const cameraRef = useRef<Camera>(null);

  const takePicture = async () => {
    try {
      if (!cameraRef.current) {
        return;
      }

      Tts.stop();
      const data = await cameraRef.current.takePhoto({
        enableShutterSound: true,
      });
      setPreview(data.path);

      const result = await TextRecognition.recognize('file://' + data.path);
      Tts.speak(result.text);
    } catch (error) {
      console.error(error);
    }
  };

  const goBack = () => {
    setPreview(null);
    Tts.stop();
  };

  if (!device) {
    return <Text>Camera is not Available</Text>;
  }

  return (
    <View style={styles.container}>
      {!preview && (
        <>
          <Camera
            ref={cameraRef}
            style={styles.camera}
            device={device}
            photo
            isActive
          />
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text>Capture and Read</Text>
          </TouchableOpacity>
        </>
      )}
      {!!preview && (
        <>
          <Image style={styles.camera} source={{uri: 'file://' + preview}} />
          <TouchableOpacity style={styles.button} onPress={goBack}>
            <Text>Go Back</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  camera: {flex: 1},
  button: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
});
