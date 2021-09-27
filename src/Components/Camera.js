import React, {useState} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text>Waiting</Text>
  </View>
);
export default ({setImageUri}) => {
  //   render() {
  const [faceDetected, setFaceDetected] = useState(false);
  const handleFaceDetected = faces => {
    if (!faces?.faces[0]) setFaceDetected(false);
    else setFaceDetected(true);
  };
  const takePicture = async function (camera) {
    try {
      const options = {quality: 1, base64: true};
      const data = await camera.takePictureAsync(options);
      //  eslint-disable-next-line
      console.log(data.uri);
      setImageUri(data.uri);
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        //   faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
        faceDetectorSettings={{
          mode: RNCamera.Constants.FaceDetection.Mode.fast,
          detectLandmarks: RNCamera.Constants.FaceDetection.Mode.none,
          runClassifications: RNCamera.Constants.FaceDetection.Mode.none,
        }}
        //   onFaceDetectionError={(e)=>alert('error')}
        onFacesDetected={handleFaceDetected}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        {({camera, status, recordAudioPermissionStatus}) => {
          if (status !== 'READY') return <PendingView />;
          return (
            <View
              style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={() => takePicture(camera)}
                style={styles.capture}>
                <Text style={{fontSize: 14}}> SNAP </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
      {faceDetected ? <Text style={{color: 'red'}}>Face Detected</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    overflow: 'hidden',
    height: 500,
    justifyContent: 'flex-end',
    margin: 10,
    backgroundColor: '#f00',
    alignItems: 'center',
  },
  capture: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

AppRegistry.registerComponent('App', () => ExampleApp);
