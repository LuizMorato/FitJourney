import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [productInfo, setProductInfo] = useState(null);

  // Solicita permissão para usar a câmera
  useEffect(() => {
    const getPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getPermission();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);

    if (type === BarCodeScanner.Constants.BarCodeType.ean13) {
      try {
        const response = await axios.get(`https://my-json-server.typicode.com/trabalhos-etec/api-fitjourney/db/products/${data}`);
        setProductInfo(response.data);
        // Se você deseja navegar para outra tela com as informações do produto
        navigation.navigate('ProductDetails', { product: response.data });
      } catch (error) {
        Alert.alert('Erro', 'Produto não encontrado!');
      }
    } else {
      Alert.alert('Erro', 'Formato de código de barras inválido!');
    }
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão para acessar a câmera...</Text>;
  }

  if (hasPermission === false) {
    return <Text>Sem permissão para acessar a câmera!</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}>
        <View style={styles.overlay}>
          <Text style={styles.scanText}>Aponte para o código de barras EAN-13</Text>
        </View>
      </Camera>

      {scanned && (
        <TouchableOpacity style={styles.scanAgainButton} onPress={() => setScanned(false)}>
          <Ionicons name="reload" size={40} color="white" />
        </TouchableOpacity>
      )}

      {productInfo && (
        <View style={styles.productInfoContainer}>
          <Text style={styles.productInfoText}>Nome do Produto: {productInfo.name}</Text>
          <Text style={styles.productInfoText}>Descrição: {productInfo.description}</Text>
          <Text style={styles.productInfoText}>Preço: R${productInfo.price}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  overlay: {
    position: 'absolute',
    top: '50%',
    left: '10%',
    right: '10%',
    bottom: '50%',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 20,
  },
  scanText: {
    position: 'absolute',
    top: '50%',
    left: '10%',
    right: '10%',
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scanAgainButton: {
    position: 'absolute',
    bottom: 30,
    left: '50%',
    transform: [{ translateX: -25 }],
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 30,
  },
  productInfoContainer: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  productInfoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
});

export default CameraScreen;
