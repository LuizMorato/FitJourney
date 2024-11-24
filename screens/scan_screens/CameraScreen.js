import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';

export default function App({ navigation }) {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaLibraryPermissionResponse, requestMediaLibraryPermission] = MediaLibrary.usePermissions();
  const [cameraProps, setCameraProps] = useState({
    zoom: 0,
    facing: 'front',
    flash: 'on',
    enableTorch: false
  });
  const [image, setImage] = useState(null);
  const [previousImage, setPreviousImage] = useState(null);

  const cameraRef = useRef(null);

  // To load the last saved image when permissions change
  useEffect(() => {
    if (
      cameraPermission &&
      cameraPermission.granted &&
      mediaLibraryPermissionResponse &&
      mediaLibraryPermissionResponse.status === 'granted'
    ) {
      getLastSavedImage();
    }
  }, [cameraPermission, mediaLibraryPermissionResponse]);

  if (!cameraPermission || !mediaLibraryPermissionResponse) {
    // Permissions are still loading.
    return <View />;
  }

  if (!cameraPermission.granted || mediaLibraryPermissionResponse.status !== 'granted') {
    // Permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text>We need camera and gallery permissions to continue.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            requestCameraPermission();
            requestMediaLibraryPermission();
          }}
        >
          <Text style={styles.buttonText}>Grant Permissions</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Function to toggle camera properties
  const toggleProperty = (prop, option1, option2) => {
    setCameraProps((current) => ({
      ...current,
      [prop]: current[prop] === option1 ? option2 : option1
    }));
  };

  // Function to zoom in
  const zoomIn = () => {
    setCameraProps((current) => ({
      ...current,
      zoom: Math.min(current.zoom + 0.1, 1)
    }));
  };

  // Function to zoom out
  const zoomOut = () => {
    setCameraProps((current) => ({
      ...current,
      zoom: Math.max(current.zoom - 0.1, 0)
    }));
  };

  // Function to take a picture and show it without saving it
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const picture = await cameraRef.current.takePictureAsync();
        setImage(picture.uri);
      } catch (err) {
        console.log('Error while taking the picture : ', err);
      }
    }
  };

  // Function to save the picture using MediaLibrary
  const savePicture = async () => {
    if (image) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image);
        const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id);
        Alert.alert('Photo saved!', image);
        setImage(null);
        getLastSavedImage();
      } catch (err) {
        console.log('Error while saving the picture : ', err);
      }
    }
  };

  // Function to get the last saved image from the 'DCIM' album created in the gallery by expo
  const getLastSavedImage = async () => {
    if (mediaLibraryPermissionResponse && mediaLibraryPermissionResponse.status === 'granted') {
      const dcimAlbum = await MediaLibrary.getAlbumAsync('DCIM');

      if (dcimAlbum) {
        const { assets } = await MediaLibrary.getAssetsAsync({
          album: dcimAlbum,
          sortBy: [[MediaLibrary.SortBy.creationTime, false]],
          mediaType: MediaLibrary.MediaType.photo,
          first: 1
        });

        if (assets.length > 0) {
          const assetInfo = await MediaLibrary.getAssetInfoAsync(assets[0].id);
          setPreviousImage(assetInfo.localUri || assetInfo.uri);
        } else {
          setPreviousImage(null);
        }
      } else {
        setPreviousImage(null);
      }
    }
  };

  const onBarcodeScanned = ({ type, data }) => {
    if (type === 'ean13') {
      Alert.alert(
        'Código Escaneado',
        `Código: ${data}\nClique para ver a análise`,
        [
          {
            text: 'Ver Análise',
            onPress: () => {
              navigation.navigate('Analysis', { barcode: data });
            }
          }
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      {!image ? (
        <>
          <View style={styles.topControlsContainer}>
            <TouchableOpacity
              onPress={() => toggleProperty('flash', 'on', 'off')}
            >
              <Ionicons
                name={cameraProps.flash === 'on' ? 'flash' : 'flash-off'}
                size={30}
                color="white"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => toggleProperty('enableTorch', true, false)}
            >
              <Ionicons
                name={cameraProps.enableTorch ? 'flashlight' : 'flashlight-outline'}
                size={30}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <CameraView
            style={styles.camera}
            zoom={cameraProps.zoom}
            facing={cameraProps.facing}
            flash={cameraProps.flash}
            enableTorch={cameraProps.enableTorch}
            ref={cameraRef}
            barcodeScannerSettings={{
              barcodeTypes: ['ean13'],
            }}
            onBarcodeScanned={onBarcodeScanned}
          />
          <View style={styles.sliderContainer}>
            <TouchableOpacity onPress={zoomOut}>
              <Ionicons name="search-outline" size={30} color="white" />
            </TouchableOpacity>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={cameraProps.zoom}
              onValueChange={(value) => setCameraProps((current) => ({ ...current, zoom: value }))}
              step={0.1}
            />
            <TouchableOpacity onPress={zoomIn}>
              <Ionicons name="search" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomControlsContainer}>
            <TouchableOpacity onPress={() => previousImage && setImage(previousImage)}>
              <Image source={{ uri: previousImage }} style={styles.previousImage} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { height: 60, width: 60 }]}
              onPress={takePicture}
            >
              <Ionicons name="camera" size={40} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => toggleProperty('facing', 'front', 'back')}
            >
              <Ionicons name="camera-reverse" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Image source={{ uri: image }} style={styles.camera} />
          <View style={styles.bottomControlsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setImage(null)}
            >
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={savePicture}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30,
  },
  topControlsContainer: {
    height: 100,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  sliderContainer: {
    position: 'absolute',
    bottom: 120,
    left: 20,
    right: 20,
    flexDirection: 'row',
  },
  bottomControlsContainer: {
    height: 100,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  previousImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});
